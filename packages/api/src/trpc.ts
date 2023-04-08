import * as trpc from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";

import type { CreateAWSLambdaContextOptions } from "@trpc/server/adapters/aws-lambda";
import type { APIGatewayProxyEventV2 } from "aws-lambda";

export const createTRPCContext =
  ({}: CreateAWSLambdaContextOptions<APIGatewayProxyEventV2>) => ({}); // no context

export const t = trpc.initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const createTRPCRouter = t.router;

export const publicProcedure = t.procedure;

// export const handler = awsLambdaRequestHandler({
//   router: appRouter,
//   createContext,
// });
