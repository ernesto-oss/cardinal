import { httpBatchLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import superjson from "superjson";

import type { AppRouter } from "@acme/api";

export const trpc = createTRPCReact<AppRouter>();

const baseUrl = import.meta.env.VITE_API_URL;

export const api = trpc.createClient({
  transformer: superjson,
  links: [
    httpBatchLink({
      url: `${baseUrl}/trpc`,
    }),
  ],
});
