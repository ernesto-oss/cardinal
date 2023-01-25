import { createYoga } from "graphql-yoga";
import { useResponseCache } from "@graphql-yoga/plugin-response-cache";
import type { NextApiRequest, NextApiResponse } from "next";
import { schema } from "@acme/graphql";
import { getServerAuthSession } from "@acme/auth";
import { parse } from "cookie";

export const config = {
  api: {
    /**
     * Disabling the body parsing is required to allow Yoga to handle the request body. Specially useful
     * if you're dealing with file uploads from GraphQL.
     * @see: https://the-guild.dev/graphql/yoga-server/docs/features/file-uploads
     */
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
  plugins: [
    /**
     * Session based in-memory response caching. We extract the session token value from the request
     * and use it as the cache key when existent.
     */
    useResponseCache({
      session: (request) => {
        const cookies = parse(request.headers.get("cookie") || "");
        const sessionToken = cookies["next-auth.session-token"];
        return sessionToken || null;
      },
    }),
  ],
  /**
   * Needs to be defined explicitly because our endpoint lives at a different path other than `/graphql`
   * */
  graphqlEndpoint: "/api/graphql",
});
