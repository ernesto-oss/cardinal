import { awsLambdaRequestHandler } from "@trpc/server/adapters/aws-lambda";
import { createTRPCContext } from "./src/trpc";

import { appRouter } from "./src/root";

export { appRouter, type AppRouter } from "./src/root";

export const handler = awsLambdaRequestHandler({
  router: appRouter,
  createContext: createTRPCContext,
});

