import Link from "next/link";

import { client } from "@/utils/graphql";
import { DocsCard } from "@/components/docs-card";
import { Hero } from "@/components/hero";
import { QueryBox } from "@/components/query-box";

export const dynamic = "force-dynamic";
export const runtime = "edge";

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
export default async function IndexPage() {
  const data = await client.resolve(({ query: { greetings } }) => ({
    greetingMessage: greetings,
  }));

  return (
    <>
      <Hero />
      <div className="flex w-full flex-col items-center justify-between">
        <div className="flex max-w-5xl flex-col items-center justify-center px-6">
          <QueryBox>
            <pre className="semibold font-mono text-slate-300">
              {JSON.stringify(data)}
            </pre>
          </QueryBox>
          <div className="mb-8 flex w-full items-center justify-center gap-2">
            <Link
              href="/login"
              className="inline-flex h-10 items-center justify-center rounded-md bg-gradient-to-b from-slate-300 to-slate-300/80 px-10 py-2 text-sm font-bold text-slate-900 hover:border-gray-300/90"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="inline-flex h-10 items-center justify-center rounded-md border border-gray-300 px-10 py-2 text-sm font-bold text-gray-300"
            >
              Signup
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-6">
            <DocsCard
              href="https://cardinal.ernestoresende.com/docs/first-steps"
              title="First Steps"
              description="The bare minimum you will need to setup database, authentication and deployment for your application."
            />
            <DocsCard
              href="https://cardinal.ernestoresende.com/docs/introduction"
              title="Documentation"
              description="Find in-depth information about the tech stack and recommended setups for the libraries in use."
            />
            <DocsCard
              href="https://cardinal.ernestoresende.com/docs/introduction"
              title="Deployment"
              description="Learn how use the provided deployment paths based on your stack."
            />
          </div>
        </div>
      </div>
    </>
  );
}
