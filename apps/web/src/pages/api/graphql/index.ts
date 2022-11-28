import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { NextApiResponse, NextApiRequest } from "next";
import { schema, context } from "@acme/graphql";

const isDevelopment = process.env.NODE_ENV === "development";

export const apolloServer = new ApolloServer({
  introspection: isDevelopment ? true : false,
  csrfPrevention: isDevelopment ? true : false,
  schema,
});

export default startServerAndCreateNextHandler(apolloServer, {
  context: async (req: NextApiRequest, res: NextApiResponse) => ({
    req,
    res,
    prisma: context.prisma,
  }),
});
