import { buildSchema, g, InferResolvers } from "garph";
import { InferClient } from "garph/dist/client";
import { createYoga, YogaInitialContext } from "graphql-yoga";
import { type NextRequest } from "next/server";

import { createClient, type QueryFetcher } from "./client";
import { createGeneratedSchema, createScalarsEnumsHash } from "./utils";

type Context = YogaInitialContext & {
  request: NextRequest;
};

const queryType = g.type("Query", {
  greetings: g.string().description("Greets a person"),
});

const resolvers: InferResolvers<
  { Query: typeof queryType },
  { context: Context }
> = {
  Query: {
    greetings: () => {
      return "Greetings from GraphQL";
    },
  },
};

export type SchemaTypes = InferClient<{ query: typeof queryType }>;

export const schema = buildSchema({ g, resolvers });

const { handleRequest } = createYoga<Context>({
  fetchAPI: { Response },
  schema: schema,
  graphqlEndpoint: "/api/graphql",
});

export {
  handleRequest,
  createGeneratedSchema,
  createScalarsEnumsHash,
  createClient,
};
export type { QueryFetcher };
