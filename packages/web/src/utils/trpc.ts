import { createTRPCReact } from '@trpc/react-query'
import type { AppRouter } from '@react-sst-trpc/api/src/trpc';

export const trpc = createTRPCReact<AppRouter>();
