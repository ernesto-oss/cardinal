import * as React from "react";
import { ProjectDirectoryIllustration } from "./assets/ProjectDirectory";

export const ProjectAbout: React.FC = () => {
  return (
    <section className="font-default px-8 flex items-center justify-center">
      <div className="max-w-2xl w-full flex gap-2 justify-center items-center">
        <div className="w-full">
          <h1 className="pb-8 tracking-tight font-extrabold text-4xl text-slate-900">
            What's going on here?
          </h1>
          <p className="text-base leading-7 pb-8 text-gray-600">
            This is a relatively opinionated template for a monorepo project
            structure that uses a Next.js in conjunction with TurboRepo as a
            build tool. The GraphQL endpoint is served from your main
            application, and the monorepo supports the sharing of local modules,
            allowing you to add new applications as you see fit.{" "}
          </p>
          <p className="text-base leading-7 text-gray-600">
            The page you're seeing now is a deployed demo for this very project.
            You can login with an oAuth provider to test the auth features, and
            see the GraphQL endpoint in action on a protected route.
          </p>
        </div>
        <ProjectDirectoryIllustration className="w-4/5 max-w-xs" />
      </div>
    </section>
  );
};
