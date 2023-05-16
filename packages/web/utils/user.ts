import { cookies } from 'next/headers';
import { auth, decodeJwtToken, JwtPayload } from '@acme/auth';

type User = { userId: string, email: string };

export async function getUser() {
  
  const signedToken = cookies().get("auth_session");

  if (signedToken?.value) {
    const sessionObject = decodeJwtToken(signedToken.value) as JwtPayload;

    if (sessionObject.state === "idle") {
      return { user: null, idleSession: true };
    }

    const userObject = await auth.getSessionUser(sessionObject.sessionId);
    return { user: userObject.user as User, idleSession: false };
  }

  return { user: null, idleSession: false };
}
