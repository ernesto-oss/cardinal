import { createYoga } from "graphql-yoga";
import type { NextApiRequest, NextApiResponse } from "next";
import { schema } from "@/../../api/src";
import { getServerAuthSession } from "@acme/auth";
/**
 * Disabling the body parsing is required to allow Yoga to handle the request body.
 * Specially useful if you're dealing with file uploads from GraphQL.
 * @see: https://the-guild.dev/graphql/yoga-server/docs/features/file-uploads
 */
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
    /**
     * Send session information trough the GraphQL context using next-auth `getServerSession()`.
     * This is used to handle authorization on the GraphQL resolvers.
     * @see: https://the-guild.dev/graphql/yoga-server/docs/features/context
     */
    session: await getServerAuthSession(req, res),
  }),
  schema,
  /**
   * Needs to be defined explicitly because our endpoint lives at a different
   * path other than `/graphql`
   */
  graphqlEndpoint: "/api/graphql",
});
