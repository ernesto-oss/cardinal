import * as React from "react";
import { clsx } from "clsx";
import { CardinalLogo } from "./assets/CardinalLogo";

export const NavHeader: React.FC = () => {
  const showBackgroundColor = false;
  return (
    <nav
      className={clsx({
        "fixed z-50 w-full transition duration-500": true,
        "bg-chinese-black/75": showBackgroundColor,
        "bg-transparent": !showBackgroundColor,
      })}
    >
      {/* Backdrop blur layer */}
      <div className="relative flex h-14 items-center justify-center px-8 backdrop-blur-xl">
        {/* Container layer for the navigation */}
        <div className="border-light-slate/10 flex h-full w-full max-w-2xl items-center justify-between border-b">
          {/* Left align portion of the NavBar */}
          <div className="flex items-center justify-center gap-16">
            {/* Navigation links */}
            <CardinalLogo className="h-4" />
            <ul className="font-default flex gap-8 text-sm font-semibold text-slate-800">
              <li>
                <a href="#">Features</a>
              </li>
              <li>
                <a href="#">Docs</a>
              </li>
            </ul>
          </div>
          {/* Right align portion of the navbar */}
          <div>
            <a
              href="signin"
              className="cursor-pointer rounded-md bg-slate-800/10 py-2 px-4 text-sm font-semibold text-slate-900 transition duration-100 hover:bg-slate-800/20 focus:outline-none focus:ring-2 focus:ring-slate-300"
            >
              Login
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};
