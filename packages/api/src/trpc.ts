import * as trpc from "@trpc/server";
import {
  awsLambdaRequestHandler,
  CreateAWSLambdaContextOptions,
} from "@trpc/server/adapters/aws-lambda";
import { APIGatewayProxyEventV2 } from "aws-lambda";

export const t = trpc.initTRPC.create();

const appRouter = t.router({
  hello: t.procedure.query(() => {
    return {
      greeting: `Hello from tRPC`,
    };
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;

const createContext =
  ({}: CreateAWSLambdaContextOptions<APIGatewayProxyEventV2>) => ({}); // no context

export type Context = trpc.inferAsyncReturnType<typeof createContext>;

export const handler = awsLambdaRequestHandler({
  router: appRouter,
  createContext,
});
