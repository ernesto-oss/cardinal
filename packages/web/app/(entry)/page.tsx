import Link from 'next/link';

import { DocsCard } from '@/components/docs-card';
import { Hero } from '@/components/hero';
import { client } from '@/utils/graphql';

export const dynamic = 'force-dynamic';

export async function getGreetingMessage() {
  const greetingsQuery = await client.query({
    greeting: true,
  });

  return greetingsQuery.greeting;
}

export default async function IndexPage() {
  const greeting = await getGreetingMessage();

  return (
    <>
      <Hero />
      <div className="flex w-full flex-col items-center justify-between">
        <div className="flex max-w-5xl flex-col items-center justify-center px-6">
          <div className="mb-8 w-fit rounded-md border-2 border-slate-200/5 bg-slate-400/10 px-10 py-2 text-center">
            {greeting && (
              <p className="font-mono font-semibold text-slate-300">
                {greeting}
              </p>
            )}
          </div>
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
              href=""
              title="First Steps"
              description="The bare minimum you will need to setup database, authentication and deployment for your application."
            />
            <DocsCard
              href=""
              title="Documentation"
              description="Find in-depth information about the tech stack and recommended setups for the libraries in use."
            />
            <DocsCard
              href=""
              title="Deployment"
              description="Learn how use the provided deployment paths based on your stack."
            />
          </div>
        </div>
      </div>
    </>
  );
}
