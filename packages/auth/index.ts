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
export type Auth = typeof auth;
export type { Session } from 'lucia-auth'
export { LuciaError } from 'lucia-auth';
