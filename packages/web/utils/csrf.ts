import { NextRequest } from 'next/server';

export function csrfCheck(req: NextRequest) {
  const isDevelopment = process.env.NODE_ENV === "development";
  const requestOrigin = req.headers.get("origin");
  const url = new URL(req.url);
  const isValidRequest = !!requestOrigin && requestOrigin === url.origin;

  if (isDevelopment) {
    return true;
  }

  return isValidRequest;
}
