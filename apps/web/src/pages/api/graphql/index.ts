import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginLandingPageDisabled } from "@apollo/server/plugin/disabled";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { NextApiResponse, NextApiRequest } from "next";
import { schema } from "@acme/graphql";
import { getServerSession } from "@acme/auth";

const isDevelopment = process.env.NODE_ENV === "development";

export const apolloServer = new ApolloServer({
  plugins: [
    isDevelopment
      ? ApolloServerPluginLandingPageLocalDefault()
      : ApolloServerPluginLandingPageDisabled(),
  ],
  introspection: isDevelopment ? true : false,
  csrfPrevention: isDevelopment ? true : false,
  schema,
});

export default startServerAndCreateNextHandler(apolloServer, {
  context: async (req: NextApiRequest, res: NextApiResponse) => ({
    req,
    res,
    session: await getServerSession(req, res),
  }),
});
