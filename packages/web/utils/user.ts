import { cookies } from "next/headers";
import { auth, decodeJwtToken, JwtPayload, LuciaError, SESSION_COOKIE_NAME} from "@acme/auth";

type User = { userId: string; email: string };

export async function getUser() {
  const signedToken = cookies().get(SESSION_COOKIE_NAME);

  if (signedToken?.value) {
    const sessionObject = decodeJwtToken(signedToken.value) as JwtPayload;

    try {
      const userObject = await auth.getSessionUser(sessionObject.sessionId);
      return userObject.user as User;
    } catch (error) {
      if (error instanceof LuciaError) {
        return null;
      }
    }
  }

  return null ;
}
