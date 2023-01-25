import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./auth-options";

/**
 * Wrapper for the `unstable_getServerSession` function from `next-auth` used on
 * GraphQL request context and on restricted API Routes.
 * 
 * The `unstable` prefix is used because it may change on future versions of next-auth,
 * but it's safe to use.
 * 
 * @see: https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  return await unstable_getServerSession(req, res, authOptions);
};
