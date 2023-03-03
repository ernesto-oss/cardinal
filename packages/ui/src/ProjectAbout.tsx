import * as React from "react";
import { ProjectDirectoryIllustration } from "./assets/ProjectDirectory";

export const ProjectAbout: React.FC = () => {
  return (
    <section className="font-default flex items-center justify-center px-8 pb-48">
      <div className="flex w-full max-w-2xl flex-col items-center justify-center gap-2 sm:flex-row">
        <div className="w-full">
          <h1 className="pb-8 text-4xl font-extrabold tracking-tight text-slate-900">
            What's going on here?
          </h1>
          <p className="pb-8 text-base leading-7 text-gray-600">
            This is a relatively opinionated template for a monorepo project structure that uses a
            Next.js in conjunction with TurboRepo as a build tool. The GraphQL endpoint is served
            from your main application, and the monorepo supports the sharing of local modules,
            allowing you to add new applications as you see fit.{" "}
          </p>
          <p className="text-base leading-7 text-gray-600">
            The page you're seeing now is a deployed demo for this very project. You can login with
            an oAuth provider to test the auth features, and see the GraphQL endpoint in action on a
            protected route.
          </p>
        </div>
        <ProjectDirectoryIllustration className="w-4/5 max-w-xs" />
      </div>
    </section>
  );
};
