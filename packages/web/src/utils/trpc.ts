import { createTRPCReact } from '@trpc/react-query'
import type { AppRouter } from '@acme/api/src/trpc';

export const trpc = createTRPCReact<AppRouter>();
