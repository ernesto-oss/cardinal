import { request } from "graphql-request";
import { useQuery } from "@tanstack/react-query";
import { graphql } from "@/generated/graphql";
import { getGraphqlUrl } from "@/utils/getBaseUrl";
import { Layout } from '@/layouts/layout';
import { Hero } from "@/components/hero";
import { DocsCard } from "@/components/docs-card";

import type { NextPage } from "next";

const greetingsQuery = graphql(`
  query Greetings {
    greeting
  }
`);

const Home: NextPage = () => {
  const { data: query, isLoading: queryLoading } = useQuery({
    queryKey: ["greetings"],
    queryFn: async () => request(getGraphqlUrl(), greetingsQuery),
  });

  return (
    <Layout>
      <Hero />
      <div className="flex w-full flex-col justify-between items-center">
        <div className="flex max-w-5xl flex-col items-center justify-center px-6">
          <div className="mb-24 w-fit rounded-md border-2 border-slate-200/5 bg-slate-400/10 px-10 py-2 text-center">
            {queryLoading && (
              <p className="font-mono font-semibold text-slate-300">Loading query</p>
            )}
            {query && <p className="font-mono font-semibold text-slate-300">{query.greeting}</p>}
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
