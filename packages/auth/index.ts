import type { Session } from 'lucia-auth'
import lucia from "lucia-auth";
import { web } from "lucia-auth/middleware";
import { sign, decode } from 'jsonwebtoken';
import { env } from '@acme/config/env'

/* Prisma client and adapter */
import prismaAdapter from "@lucia-auth/adapter-prisma";
import { prisma as db } from "@acme/database";

/* Crypto pollyfill for Node.js 18 and bellow.
 * You can remove it if you're using a recent version of Node
 * that doesn´t need to be polyfilled */
import "lucia-auth/polyfill/node";

const authSecret = env.AUTH_SECRET;

export const auth = lucia({
  adapter: prismaAdapter(db as any),
  env: process.env.NODE_ENV === "development" ? "DEV" : "PROD",
  middleware: web(),
  transformDatabaseUser: (userData) => {
    return {
      userId: userData.id,
      email: userData.email,
    };
  },
});

export const signJwtToken = (session: Session) => {
  const { sessionId, activePeriodExpiresAt, state } = session; 
  const tokenPayload = { sessionId, expires: activePeriodExpiresAt, state }

  return sign(tokenPayload, authSecret)
}

export const decodeJwtToken = (token: string) => {
  return decode(token);
}

export type JwtPayload = {
  sessionId: string;
  expires: string;
  state: "idle" | "active";
  iat: number;
};


export type ErrorMessage = "AUTH_INVALID_SESSION_ID" | "AUTH_INVALID_PASSWORD" | "AUTH_DUPLICATE_SESSION_ID" | "AUTH_DUPLICATE_KEY_ID" | "AUTH_INVALID_KEY_ID" | "AUTH_INVALID_USER_ID" | "AUTH_INVALID_REQUEST" | "AUTH_NOT_AUTHENTICATED" | "REQUEST_UNAUTHORIZED" | "UNKNOWN_ERROR" | "AUTH_OUTDATED_PASSWORD" | "AUTO_USER_ID_GENERATION_NOT_SUPPORTED" | "AUTH_EXPIRED_KEY";

export type Auth = typeof auth;
export type { Session } from 'lucia-auth'
export { LuciaError, SESSION_COOKIE_NAME } from 'lucia-auth';

/* Export providers */
export { credentialsHandler, credentialsAuthSchema } from "./providers/credentials";
