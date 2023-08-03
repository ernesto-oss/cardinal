import React from "react";

import { client } from "@/utils/graphql";
import { Hero } from "@/components/hero";
import { LogoutButton } from "@/components/logout";
import { QueryBox } from "@/components/query-box";

export const dynamic = "force-dynamic";
export const runtime = "edge";

export const metadata = {
  title: "Protected",
};

/**
 * When fetching from the GraphQL endpoint, remember that Next.js will try
 * to make the request on the server to generate the cache and prerender the
 * page at build time. Make sure that, when building the application, it is
 * pointing to an endpoint that will send back a response, otherwise, it will
 * fail on the pre-render stage with a `fetch` error.
 *
 * You can also change the page rendering behavior to by changing
 * the `fetch` caching behavior, or the route segment config:
 *
 * @see https://nextjs.org/docs/app/building-your-application/data-fetching/caching
 * @see https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic-rendering#using-dynamic-data-fetches
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
 */
export default async function ProtectedPage() {
  const data = await client.resolve(({ query: { authorizedOnly } }) => ({
    greetingMessage: authorizedOnly,
  }));

  return (
    <>
      <Hero protectedRoute />
      <div className="flex w-full flex-col items-center justify-between">
        <div className="flex max-w-5xl flex-col items-center justify-center px-6">
          <QueryBox>
            <pre className="semibold font-mono text-slate-300">
              {JSON.stringify(data)}
            </pre>
          </QueryBox>
          <LogoutButton />
          <div className="mb-8 flex w-full items-center justify-center gap-2"></div>
        </div>
      </div>
    </>
  );
}
