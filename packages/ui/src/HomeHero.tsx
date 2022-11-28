import * as React from "react";
import { IoLogoGithub } from "react-icons/io";

export const HomeHero: React.FC = () => {
  return (
    <main className="font-default px-8 pb-48 flex justify-center items-center">
      <div className="max-w-2xl w-full">
        <div className="pb-10">
          <h1 className="tracking-tight font-extrabold text-center text-6xl text-slate-900">
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
            className="flex justify-center gap-2 cursor-pointer py-2 px-5 rounded-md bg-slate-800/10 hover:bg-slate-800/20 text-slate-900 bold font-semibold transition duration-100"
          >
            <IoLogoGithub className="h-6 w-6" />
            See on GitHub
          </a>
        </div>
      </div>
    </main>
  );
};
