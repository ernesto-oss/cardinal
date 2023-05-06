import { createYoga } from "graphql-yoga";
import { NextApiRequest, NextApiResponse} from "next";
import { schema } from "@acme/api";
// import { getServerAuthSession } from "@acme/auth";

const handler = createYoga<{
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
    // session: await getServerAuthSession(req, res),
  }),
  schema,
  /**
   * Needs to be defined explicitly because our endpoint lives at a different
   * path other than `/graphql`
   */
  graphqlEndpoint: "/api/graphql",
});

export default handler;
