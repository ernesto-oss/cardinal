import * as trpc from '@trpc/server'
import {
  awsLambdaRequestHandler,
  CreateAWSLambdaContextOptions,
} from "@trpc/server/adapters/aws-lambda";
import { APIGatewayProxyEventV2 } from 'aws-lambda';

import { z } from "zod";

export const t = trpc.initTRPC.create();

const appRouter = t.router({
  getUser: t.procedure.input(z.string()).query((req) => {
    req.input; // string
    return { id: req.input, name: "Bilbo" };
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;

const createContext = ({}: CreateAWSLambdaContextOptions<APIGatewayProxyEventV2>) => ({}); // no context

// type Context = trpc.inferAsyncReturnType<typeof createContext>;

export const handler = awsLambdaRequestHandler({
  router: appRouter,
  createContext,
});
