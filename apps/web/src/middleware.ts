import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const authenticationCookie = request.cookies.has("next-auth.session-token");
  if (request.nextUrl.pathname === "/auth/signin" && authenticationCookie) {
    const pathToRedirect = new URL("/dashboard/posts", request.url);
    return NextResponse.redirect(pathToRedirect);
  }
}
