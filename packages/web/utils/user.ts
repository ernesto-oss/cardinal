import { cookies } from "next/headers";
import { auth, decodeJwtToken, JwtPayload, LuciaError } from "@acme/auth";

type User = { userId: string; email: string };

export async function getUser() {
  const signedToken = cookies().get("auth_session");

  if (signedToken?.value) {
    const sessionObject = decodeJwtToken(signedToken.value) as JwtPayload;

    /* Wrap the Lucia request calls in a try/catch, otherwise it
    will throw an runtime error when there is no user */
    try {
      // if (sessionObject.state === "active") {
      //   const request = await fetch(`/api/auth/renew`);
      //   const user = (await request.json()) as User;
      //   console.log(request.headers.has('Set-Cookie'))

      //   return { user, idleSession: false };
      // }

      const userObject = await auth.getSessionUser(sessionObject.sessionId);
      return { user: userObject.user as User, idleSession: false };
    } catch (error) {
      if (error instanceof LuciaError) {
        return { user: null, idleSession: false };
      }
    }
  }

  return { user: null, idleSession: false };
}
