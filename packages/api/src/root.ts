import { greetingsRouter } from './router/greeting';
import { createTRPCRouter } from './trpc';

export const appRouter = createTRPCRouter({
  greetings: greetingsRouter,
})

export type AppRouter = typeof appRouter;
