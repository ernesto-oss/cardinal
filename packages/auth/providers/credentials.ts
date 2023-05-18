import { SESSION_COOKIE_NAME } from "lucia-auth";
import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@acme/database";
import { auth, signJwtToken, decodeJwtToken, LuciaError } from "..";
import { z } from "zod";

import type { JwtPayload } from "..";

type CredentialsOperations = "login" | "logout" | "signup" | "renew";

export const credentialsAuthSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

/**
 * In development, you might want to allow request from all
 */
function csrfCheck(req: NextRequest) {
  const isDevelopment = process.env.NODE_ENV === "development";
  const requestOrigin = req.headers.get("origin");
  const url = new URL(req.url);
  const isValidRequest = !!requestOrigin && requestOrigin === url.origin;

  if (isDevelopment) {
    return true;
  }

  return isValidRequest;
}

/**
 * If the error was thrown by Prisma or Lucia-Auth, we can safely assume it was related
 * to the authorization proccess, and return 403:Forbidden
 */
function errorHandler(error: unknown) {
  if (error instanceof LuciaError || error instanceof Prisma.PrismaClientKnownRequestError)
    return NextResponse.json({ error: error.message }, { status: 403 });
  else return NextResponse.json({ error: "UNKNOWN_ERROR" }, { status: 500 });
}

/**
 * This is where most of your auth handling for the Next.js app will happen.
 *
 * Remember, Lucia is not a plug-and-play library like Next-Auth, but it
 * provides you with the building tools to handle users and validate sessions.
 *
 * The function bellow is a single Next.js Route Handler that will handle
 * most common functions of a email/password authentication flow. You can
 * update this to match your specific application needs. Remember to follow
 * Lucia Auth's documentation and following authentication best-practices.
 */
export async function credentialsHandler(
  request: NextRequest,
  { params }: { params: { slug: CredentialsOperations } },
) {
  const signedToken = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const slug = params.slug;
  const isRequestFromValidHost = csrfCheck(request);

  if (!isRequestFromValidHost) return new Response(null, { status: 403 });

  /* Signup endpoint handler */
  if (slug === "signup")
    try {
      const requestBody = await request.json();
      const creds = credentialsAuthSchema.safeParse(requestBody);

      if (!creds.success)
        return new Response(null, {
          status: 400,
          statusText: "BAD_PAYLOAD",
        });

      if (creds.success) {
        const { email, password } = creds.data;

        /**
         * Attempt to create the new user with provided credentials
         * @see https://lucia-auth.com/basics/users#create-users
         */
        const user = await auth.createUser({
          primaryKey: {
            providerId: "email",
            providerUserId: email,
            password: password,
          },
          attributes: {
            email,
          },
        });

        /**
         * Create the session on the database, generate cookie properties and
         * sign the JWT token that will be stored on the client.
         * @see https://lucia-auth.com/basics/sessions#create-new-session
         */
        const session = await auth.createSession(user.userId);
        const sessionCookie = auth.createSessionCookie(session);
        const { expires } = sessionCookie.attributes;
        const signedToken = signJwtToken(session);

        return new Response(null, {
          status: 302,
          headers: {
            "Set-Cookie": `${SESSION_COOKIE_NAME}=${signedToken}; Expires=${expires?.toUTCString()}; Path=/; SameSite=Lax; HttpOnly`,
          },
        });
      }
    } catch (error) {
      errorHandler(error);
    }

  /* Login endpoint handler */
  if (slug === "login")
    try {
      const requestBody = await request.json();
      const creds = credentialsAuthSchema.safeParse(requestBody);

      /** Validate the request payload */
      if (!creds.success)
        return new Response(null, {
          status: 400,
          statusText: "BAD_PAYLOAD",
        });

      if (creds.success) {
        /**
         * Attempt to login the user with credentials and generate
         * the signed JWT on success
         * @see https://lucia-auth.com/basics/keys#use-keys
         */
        const { email, password } = creds.data;
        const key = await auth.useKey("email", email, password);
        const session = await auth.createSession(key.userId);
        const sessionCookie = auth.createSessionCookie(session);
        const { expires } = sessionCookie.attributes;
        const signedToken = signJwtToken(session);

        return new Response(null, {
          status: 302,
          headers: {
            "Set-Cookie": `${SESSION_COOKIE_NAME}=${signedToken}; Expires=${expires?.toUTCString()}; Path=/; SameSite=Lax; HttpOnly`,
          },
        });
      }
    } catch (error) {
      if (error instanceof LuciaError || error instanceof Prisma.PrismaClientKnownRequestError)
        return NextResponse.json({ error: error.message }, { status: 403 });
      else return NextResponse.json({ error: "UNKNOWN_ERROR" }, { status: 500 });
    }

  /* Logout endpoint handler */
  if (slug === "logout")
    try {
      if (signedToken) {
        const sessionObject = decodeJwtToken(signedToken) as JwtPayload;
        const isValidSession = await auth.getSession(sessionObject.sessionId);

        /**
         * Check the session `state`. If this is a dead session, unauthorize and attempt
         * to remove the dead session from the client
         * @see https://lucia-auth.com/basics/sessions#session-states
         */
        if (!isValidSession)
          return new Response(null, {
            status: 403,
            headers: {
              "Set-Cookie": `${SESSION_COOKIE_NAME}=; Expires=${new Date().toUTCString()}; Path=/; SameSite=Lax; HttpOnly`,
            },
          });

        /**
         * If the session is valid, invalidate the session on the server and remove
         * the cookie from the client
         * @see https://lucia-auth.com/basics/sessions#invalidate-sessions
         */
        if (isValidSession) {
          await auth.invalidateSession(sessionObject.sessionId);
          return new Response(null, {
            status: 302,
            headers: {
              "Set-Cookie": `${SESSION_COOKIE_NAME}=; Expires=${new Date().toUTCString()}; Path=/; SameSite=Lax; HttpOnly`,
              Location: "/login",
            },
          });
        }
      }

      return new Response(null, { status: 403 });
    } catch (error) {
      errorHandler(error);
    }

  if (slug === "renew")
    try {
      if (signedToken) {
        const sessionObject = decodeJwtToken(signedToken) as JwtPayload;
        const isValidSession = await auth.getSession(sessionObject.sessionId);

        /**
         * Check the session `state`. If this is a dead session, unauthorize and attempt
         * to remove the dead session from the client
         * @see https://lucia-auth.com/basics/sessions#session-states
         */
        if (!isValidSession)
          return new Response(null, {
            status: 403,
            headers: {
              "Set-Cookie": `${SESSION_COOKIE_NAME}=; Expires=${new Date().toUTCString()};`,
            },
          });

        /**
         * If the session is still active, but gained an `idle status, we renew
         * the session and invalidate the previous one
         * @see https://lucia-auth.com/basics/sessions#manually-renew-sessions
         */
        if (isValidSession && sessionObject.state === "idle") {
          const renewedSession = await auth.renewSession(sessionObject.sessionId);
          const sessionCookie = auth.createSessionCookie(renewedSession);
          const { expires } = sessionCookie.attributes;
          const signedSession = signJwtToken(renewedSession);
          const user = auth.getSessionUser(renewedSession.sessionId)

          return NextResponse.json(user, {
            status: 302,
            headers: {
              "Set-Cookie": `auth_session=${signedSession}; Expires=${expires?.toUTCString()}; Path=/; SameSite=Lax HttpOnly=true`,
              // Location: "/protected",
            },
          });
          /**
           * If the session is valid and active, just return the user corresponding
           * to the session
           */
        } else if (isValidSession && sessionObject.state === "active") {
          return new Response(null, {
            status: 302,
            headers: {
              Location: "/protected",
            },
          });
        }
      }
    } catch (error) {
      errorHandler(error);
    }
}
