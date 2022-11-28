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
      <div className="relative flex items-center justify-center px-8 h-14 backdrop-blur-xl">
        {/* Container layer for the navigation */}
        <div className="max-w-2xl w-full h-full border-light-slate/10 border-b flex justify-between items-center">
          {/* Left align portion of the NavBar */}
          <div className="flex items-center justify-center gap-16">
            {/* Navigation links */}
            <CardinalLogo className="h-4" />
            <ul className="flex gap-8 text-slate-800 text-sm font-default font-semibold">
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
              href="https://github.com/ernestoresende/cardinal"
              className="cursor-pointer py-2 px-4 rounded-md bg-slate-800/10 hover:bg-slate-800/20 text-slate-900 text-sm font-semibold transition duration-100"
            >
              Login
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};
