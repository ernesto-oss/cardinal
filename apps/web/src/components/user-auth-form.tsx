import * as React from "react";
import { signIn } from "next-auth/react";
import { clsx } from "clsx";

import {
  IoLogoGithub as Github,
  IoLogoGoogle as Google,
} from "react-icons/io5";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

// TODO: Implement correct input field validation
export const UserAuthForm: React.FC<UserAuthFormProps> = ({
  className,
  ...props
}) => {
  return (
    <div className={clsx(className, "pb-8")} {...props}>
      <form className="pb-4">
        {/* Form email input */}
        <div className="flex flex-col gap-2 pb-6">
          <label className="text-sm font-semibold" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            placeholder="name@example.com"
            className="my-0 mb-2 block h-9 w-full rounded-md border border-slate-300 py-2 px-3 text-sm placeholder:text-slate-400 hover:border-slate-400 focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-slate-300"
            type="email"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            name="email"
          />
          {/* TODO: Implement error message display based on validation */}
        </div>
        <div>
          <button className="w-full cursor-pointer rounded-md bg-slate-800/10 py-2 px-4 text-sm font-semibold text-slate-900 transition duration-100 hover:bg-slate-800/20 focus:outline-none focus:ring-2 focus:ring-slate-300">
            Sign In
          </button>
        </div>
      </form>
      {/* Divisory line with label */}
      <div className="relative mb-4">
        <div className="absolute inset-0 flex items-center">
          <hr className="w-full border-t border-slate-300"></hr>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-slate-600">Or with</span>
        </div>
      </div>
      {/* oAuth providers sign in buttons */}
      <div className="flex gap-4">
        <button
          type="button"
          className="inline-flex w-full items-center justify-center gap-1 rounded-lg border bg-white px-5 py-2.5 text-center text-sm font-medium text-slate-900 transition duration-100 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-300"
          onClick={() => signIn("google")}
        >
          <Google className="h-5 w-5" />
          Google
        </button>
        <button
          type="button"
          className="inline-flex w-full items-center justify-center gap-1 rounded-lg border bg-white px-5 py-2.5 text-center text-sm font-medium text-slate-900 transition duration-100 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-300"
          onClick={() => signIn("github")}
        >
          <Github className="h-5 w-5" />
          GitHub
        </button>
      </div>
    </div>
  );
};
