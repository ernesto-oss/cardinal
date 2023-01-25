import { createYoga } from "graphql-yoga";
import type { NextApiRequest, NextApiResponse } from "next";
import { schema } from "@acme/graphql";
import { getServerAuthSession } from "@acme/auth";
import { parse } from "cookie";

/**
 * Rename the import because Next.js lint rules thinks anything that starts with `use`
 * is a React hook and will throw an error during build.
 */
import { useResponseCache as responseCache } from "@graphql-yoga/plugin-response-cache";

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
  plugins: [
    /**
     * Session based in-memory response caching. We extract the session token value
     * from the request and use it as the cache key when existent.
     */
    responseCache({
      session: (request) => {
        const cookies = parse(request.headers.get("cookie") || "");
        const sessionToken = cookies["next-auth.session-token"];
        return sessionToken || null;
      },
    }),
  ],
  /**
   * Needs to be defined explicitly because our endpoint lives at a different
   * path other than `/graphql`
   */
  graphqlEndpoint: "/api/graphql",
});
