import * as React from "react";
import { ProjectCard } from "./ProjectCard";

import { NextLogo } from "./assets/NextLogo";
import { GraphQLLogo } from "./assets/GraphqlLogo";
import { PrismaLogo } from "./assets/PrismaLogo";
import { NextAuthLogo } from "./assets/NextAuthLogo";

export const ProjectFeatures: React.FC = () => {
  return (
    <section id="features" className="font-default scroll-mt-24 flex items-center justify-center px-8 pb-48">
      <div className="w-full max-w-2xl">
        <h1 className="pb-8 text-4xl font-extrabold tracking-tight text-slate-900">
          Features
        </h1>
        <p className="pb-8 text-base leading-7 text-gray-600">
          Built on a set of solid technologies around Next.js and serverless
          ecosystem.
        </p>

        <div className="grid grid-cols-2 gap-5">
          <ProjectCard
            title="Next.js 13"
            description="Updated to the latest Next version and leveraging API routes for the GraphQL endpoint"
            icon={<NextLogo />}
          />
          <ProjectCard
            title="GraphQL"
            description="Declarative and typesafe resolvers on the server, automatic types for your queries on the client"
            icon={<GraphQLLogo />}
          />
          <ProjectCard
            title="Prisma"
            description="Typesafe database client that can be shared between applications. You choose your database"
            icon={<PrismaLogo />}
          />
          <ProjectCard
            title="NextAuth.js"
            description="Support for modern authentication strategies with secure configurations by default"
            icon={<NextAuthLogo />}
          />
        </div>
      </div>
    </section>
  );
};
