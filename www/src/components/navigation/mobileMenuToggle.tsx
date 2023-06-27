import { clsx } from "clsx";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/navigation/dialog";

export const MobileMenuToggle: React.FC<{
  homepage: boolean;
  children?: React.ReactNode;
}> = ({ homepage, children }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);

  if (!mounted)
    return (
      <div className="md:hidden">
        <button
          className={clsx({
            "p-2": true,
            "text-slate-50": homepage,
            "text-slate-900 dark:text-slate-50": !homepage,
          })}
        >
          <div className="h-6 w-6"></div>
        </button>
      </div>
    );

  return (
    <div className="md:hidden">
      <Dialog>
        <DialogTrigger asChild>
          <button
            className={clsx({
              "py-2": true,
              "text-slate-50": homepage,
              "text-slate-900 dark:text-slate-50": !homepage,
            })}
          >
            <Menu size={24} />
          </button>
        </DialogTrigger>
        {!children && (
          <DialogContent className="fixed right-4 top-4 z-50 grid w-full max-w-xs gap-4 rounded-lg rounded-b-lg bg-slate-900 p-6 shadow-lg animate-in data-[state=open]:fade-in-90 data-[state=open]:slide-in-from-top-2">
            <ul className="flex flex-col gap-6 text-lg font-semibold text-slate-300">
              <li className="transition duration-150 hover:text-slate-50">
                <a href="/docs/introduction">Docs</a>
              </li>
              <li className="transition duration-150 hover:text-slate-50">
                <a href="#">Features</a>
              </li>
              <li className="transition duration-150 hover:text-slate-50">
                <a href="/roadmap">Roadmap</a>
              </li>
            </ul>
            <DialogClose className="h-6 w-6 text-slate-50" />
          </DialogContent>
        )}
        {children && (
          <DialogContent className="fixed z-50 min-h-screen w-full bg-slate-50 shadow-lg animate-in data-[state=open]:fade-in-90 data-[state=open]:slide-in-from-top-2 dark:bg-docs-dark">
            {children}
            <DialogClose className="h-6 w-6 text-slate-900 dark:text-slate-50" />
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default MobileMenuToggle;
