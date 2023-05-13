import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { auth, decodeJwtToken, LuciaError, type JwtPayload } from "@acme/auth";
import { Prisma } from "@acme/database";

/** This is the function that is called whenever we send a `GET` request to
 * `api/auth/signout`, removes the session cookie from the client, and
 * invalidates the session on the server.
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

      /** If the session is valid, invalidate the session on the server and remove
       * the cookie from the client.
       */
      if (isValidSession) {
        await auth.invalidateSession(sessionObject.sessionId);

        return new Response(null, {
          status: 302,
          headers: {
            "Set-Cookie": `auth_session=; Expires=${new Date().toUTCString()}; Path=/`,
          },
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
