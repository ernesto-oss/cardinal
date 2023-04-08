import { createTRPCRouter, publicProcedure } from '../trpc';

export const greetingsRouter = createTRPCRouter({
  hello: publicProcedure.query(() => {
    return {
      greeting: `Hello from tRPC`,
    };
  }),
});
