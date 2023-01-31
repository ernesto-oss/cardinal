import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/**
 * We use middlewares primarily to redirect users to the correct page based on their
 * authentication status.
 */
export function middleware(request: NextRequest) {
  const authenticationCookie = request.cookies.has("next-auth.session-token");

  /**
   * Authenticated user is redirected to dashboard upon trying to request the signIn
   * page.
   */
  if (request.nextUrl.pathname === "/auth/signin" && authenticationCookie) {
    const pathToRedirect = new URL("/dashboard/posts", request.url);
    return NextResponse.redirect(pathToRedirect);
  }

  /**
   * Authenticated user is redirected to dashboard upon trying to request email
   * verification page.
   */
  if (
    request.nextUrl.pathname === "/auth/verify-request" &&
    authenticationCookie
  ) {
    const pathToRedirect = new URL("/", request.url);
    return NextResponse.redirect(pathToRedirect);
  }
}
