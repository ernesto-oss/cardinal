import { createYoga } from "graphql-yoga";
import type { NextApiRequest, NextApiResponse } from "next";
import { schema } from "@acme/graphql";
import { getServerAuthSession } from "@acme/auth";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default createYoga<{
  req: NextApiRequest;
  res: NextApiResponse;
}>({
  context: async ({ req, res }) => ({
    req: req,
    res: res,
    session: await getServerAuthSession(req, res),
  }),
  schema,
  /**
   * Needs to be defined explicitly because our endpoint lives at a different path other than `/graphql`
   * */
  graphqlEndpoint: "/api/graphql",
});
