import * as React from "react";
import { IoLogoGithub } from "react-icons/io";

export const HomeHero: React.FC = () => {
  return (
    <main className="font-default flex items-center justify-center px-8 pb-48">
      <div className="w-full max-w-2xl">
        <div className="pb-10">
          <h1 className="text-center text-6xl font-extrabold tracking-tight text-slate-900">
            A monorepo template for full-stack applications with{" "}
            <span className="text-purple-600">Next.js</span> and{" "}
            <span className="text-eletric-pink">GraphQL</span>
          </h1>
        </div>
        <div className="pb-16">
          <p className="text-center text-base leading-8 text-gray-600">
            Cardinal is an open-source template for full-stack application
            projects built with <b>TurboRepo</b>, <b>Next.js</b> and{" "}
            <b>GraphQL</b> configured with built-in sane defaults for database,
            auth and typesafety for GraphQL queries.
          </p>
        </div>
        <div className="flex items-center justify-center">
          <a
            href="https://github.com/ernestoresende/cardinal"
            className="bold flex cursor-pointer justify-center gap-2 rounded-md bg-slate-800/10 py-2 px-5 font-semibold text-slate-900 transition duration-100 hover:bg-slate-800/20"
          >
            <IoLogoGithub className="h-6 w-6" />
            See on GitHub
          </a>
        </div>
      </div>
    </main>
  );
};
