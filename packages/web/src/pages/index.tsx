import { useMemo } from "react";
import { useTypedQuery } from "@/utils/urql";
import { Layout } from "@/layouts/layout";
import { Hero } from "@/components/hero";
import { DocsCard } from "@/components/docs-card";

import type { NextPage } from "next";

const Home: NextPage = () => {
  const context = useMemo(() => ({ additionalTypenames: ["Greetings"] }), []);
  const [greetings] = useTypedQuery({
    query: {
      greeting: true,
    },
    context,
  });

  return (
    <Layout>
      <Hero />
      <div className="flex w-full flex-col items-center justify-between">
        <div className="flex max-w-5xl flex-col items-center justify-center px-6">
          <div className="mb-24 w-fit rounded-md border-2 border-slate-200/5 bg-slate-400/10 px-10 py-2 text-center">
            {greetings.fetching && (
              <p className="font-mono font-semibold text-slate-300">Loading query</p>
            )}
            {greetings.data?.greeting && (
              <p className="font-mono font-semibold text-slate-300">{greetings.data.greeting}</p>
            )}
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
    </Layout>
  );
};

export default Home;
