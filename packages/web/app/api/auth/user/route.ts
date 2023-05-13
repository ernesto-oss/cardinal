import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { auth, decodeJwtToken, signJwtToken, LuciaError, type JwtPayload } from "@acme/auth";
import { Prisma } from "@acme/database";

/** This is the function that is called whenever we send a `GET` request to 
 * `api/auth/user`, which returns information about the current user, while at
 * the same time revalidates `idle` sessions
 */
export async function GET() {
  try {
    const signedToken = cookies().get("auth_session");

    /* If signed token is sent as a cookie, start processing the request */
    if (signedToken?.value) {
      const sessionObject = decodeJwtToken(signedToken.value) as JwtPayload;
      
      /* Only returns `active` and `idle` sessions, serving as validation */
      const isValidSession = await auth.getSession(sessionObject.sessionId);

      /** 
       * Check the session `state`. If this is a dead session, unauthorize and attempt
       * to remove the dead session from the client.
       */
      if (!isValidSession) {
        return new Response(null, {
          status: 403,
          headers: {
            "Set-Cookie": `auth_session=; Expires=${new Date().toUTCString()}; Path=/`,
          },
        });
      }

      /* If the session is still active, but gained an `idle` status, we renew the session,
       * invalidate the previous session, and return a new, updated session to the user */
      if (isValidSession && sessionObject.state === "idle") {
        const renewedSession = await auth.renewSession(sessionObject.sessionId);
        const sessionCookie = auth.createSessionCookie(renewedSession);
        const { expires } = sessionCookie.attributes;

        const sealedSession = signJwtToken(renewedSession);
        const user = await auth.getSessionUser(renewedSession.sessionId);

        return NextResponse.json(user, {
          status: 200,
          headers: {
            "Set-Cookie": `auth_session=${sealedSession}; Expires=${expires?.toUTCString()}; Path=/`,
          },
        });
        /** If the session is valid and active, just return the user corresponding
         * to the session
         */
      } else if (isValidSession && sessionObject.state === "active") {
        const user = await auth.getSessionUser(sessionObject.sessionId);

        return NextResponse.json(user, {
          status: 200,
        });
      }
    }

    return new Response(null, {
      status: 401,
    });

  } catch (error) {
    if (error instanceof LuciaError || error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
