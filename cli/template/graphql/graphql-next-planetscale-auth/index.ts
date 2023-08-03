import { buildSchema, g, InferResolvers } from "garph";
import { InferClient } from "garph/dist/client";
import { createYoga, YogaInitialContext } from "graphql-yoga";
import { cookies } from "next/headers";
import { type NextRequest } from "next/server";

import { auth, Session } from "@acme/auth";

import { createClient, type QueryFetcher } from "./client";
import { createGeneratedSchema, createScalarsEnumsHash } from "./utils";

type Context = YogaInitialContext & {
  session: Session | null;
  request: NextRequest;
};

const queryType = g.type("Query", {
  greetings: g.string().description("Greets a person"),
  authorizedOnly: g
    .string()
    .optional()
    .description("Sends a message only to authorized users"),
});

const resolvers: InferResolvers<
  { Query: typeof queryType },
  { context: Context }
> = {
  Query: {
    greetings: () => {
      return "Greetings from GraphQL";
    },
    authorizedOnly: (_parent, _args, context) => {
      if (context.session) {
        return "Greetings from protected query";
      } else {
        return null;
      }
    },
  },
};

export type SchemaTypes = InferClient<{ query: typeof queryType }>;

export const schema = buildSchema({ g, resolvers });

const { handleRequest } = createYoga<Context>({
  fetchAPI: { Response },
  schema: schema,
  graphqlEndpoint: "/api/graphql",
  context: async ({ request }) => {
    const authRequest = auth.handleRequest({ cookies, request });
    const session = await authRequest.validateBearerToken();
    return { session };
  },
});

export {
  handleRequest,
  createGeneratedSchema,
  createScalarsEnumsHash,
  createClient,
};
export type { QueryFetcher };
