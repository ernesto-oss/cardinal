import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./auth-options";

export const getServerAuthSession = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  return await unstable_getServerSession(req, res, authOptions);
};
