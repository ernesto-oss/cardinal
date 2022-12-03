import * as React from "react";
import Link from "next/link";
import { IoChevronBack } from "react-icons/io5";

export const LoginLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center">
      <Link
        href="/"
        className="absolute top-4 left-4 inline-flex items-center justify-center rounded-md border border-transparent bg-transparent py-2 px-3 text-center text-sm font-medium text-slate-900 transition duration-100 hover:border-slate-200 hover:bg-slate-100 focus:z-10 focus:outline-none focus:ring-4 focus:ring-slate-200 md:top-8 md:left-8"
      >
        <IoChevronBack className="h-4 w-4" />
        Go Back
      </Link>
      <div className="mx-auto flex w-full flex-col items-center justify-center space-y-6">
        <div className="flex w-96 flex-col rounded-md border border-gray-200 py-5 px-6 shadow-lg shadow-slate-200/50">
          <div className="pb-4">
            <h1 className="pb-1 text-2xl font-bold tracking-tight">Sign in</h1>
            <p className="text-sm text-gray-600">
              New to Cardinal?{" "}
              <Link
                href="/signup"
                className="text-sm font-medium text-eletric-pink"
              >
                Sign up for a new account
              </Link>
              .
            </p>
          </div>
          {children}
          <span className="text-xs text-slate-500">
            This is an application built for demo purposes. The information
            and/or accounts you use here will only be used for the
            authentication process.
          </span>
        </div>
      </div>
    </main>
  );
};
