import { lucia } from "lucia";
import { nextjs } from "lucia/middleware";

import { planetscale } from "@lucia-auth/adapter-mysql";

import { connection } from "@acme/database";

export const SESSION_COOKIE_NAME = "auth_session";
/**
 * This is the Lucia Auth initializer. From here, you can define
 * how Lucia connects with your database, session expiry and
 * other attributes.
 *
 * @see https://lucia-auth.com/start-here/getting-started
 */
export const auth = lucia({
  adapter: planetscale(connection, {
    key: "auth_key",
    session: "auth_session",
    user: "auth_user",
  }),
  env: process.env.NODE_ENV === "development" ? "DEV" : "PROD",
  middleware: nextjs(),
  getUserAttributes: (userData) => {
    return {
      userId: userData.id,
      email: userData.email,
    };
  },
  sessionCookie: { name: SESSION_COOKIE_NAME, expires: false },
  csrfProtection: false,
});

export type ErrorMessage =
  | "AUTH_INVALID_SESSION_ID"
  | "AUTH_INVALID_PASSWORD"
  | "AUTH_DUPLICATE_SESSION_ID"
  | "AUTH_DUPLICATE_KEY_ID"
  | "AUTH_INVALID_KEY_ID"
  | "AUTH_INVALID_USER_ID"
  | "AUTH_INVALID_REQUEST"
  | "AUTH_NOT_AUTHENTICATED"
  | "REQUEST_UNAUTHORIZED"
  | "UNKNOWN_ERROR"
  | "AUTH_OUTDATED_PASSWORD"
  | "AUTO_USER_ID_GENERATION_NOT_SUPPORTED"
  | "AUTH_EXPIRED_KEY";

export type Auth = typeof auth;
export type { Session } from "lucia";
export { LuciaError } from "lucia";

/* Export providers */
export {
  credentialsHandler,
  credentialsAuthSchema,
} from "./providers/credentials";
