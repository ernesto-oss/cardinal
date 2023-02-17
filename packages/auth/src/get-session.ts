import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth-options";

/**
 * Wrapper for the `unstable_getServerSession` function from `next-auth` used on
 * GraphQL request context and on restricted API Routes.
 * 
 * @see: https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  return await getServerSession(req, res, authOptions);
};
