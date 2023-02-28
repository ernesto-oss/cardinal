import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth-options";

export const getServerAuthSession = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  return await getServerSession(req, res, authOptions);
};
