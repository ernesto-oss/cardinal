import { useState } from "react";
import { Menu } from "lucide-react";
import { clsx } from "clsx";
import { Dialog, DialogContent, DialogTrigger, DialogClose } from "@/components/Dialog/Dialog";

export const MobileMenuToggle: React.FC<{ homepage: boolean; children?: React.ReactNode }> = ({
  homepage,
  children,
}) => {
  const [isClient] = useState(() => {
    if (import.meta.env.SSR) {
      return false;
    }
    if (window) {
      return true;
    }
    return false;
  });

  if (!isClient) {
    return (
      <button
        className={clsx({
          "p-2 md:hidden": true,
          "text-slate-50": homepage,
          "text-slate-900 dark:text-slate-50": !homepage,
        })}
      >
        <Menu />
      </button>
    );
  }

  return (
    <div className="md:hidden">
      <Dialog>
        <DialogTrigger asChild>
          <button
            className={clsx({
              "p-2": true,
              "text-slate-50": homepage,
              "text-slate-900 dark:text-slate-50": !homepage,
            })}
          >
            <Menu />
          </button>
        </DialogTrigger>
        {homepage && (
          <DialogContent className="fixed top-4 right-4 z-50 grid w-full max-w-xs gap-4 rounded-lg rounded-b-lg bg-neutral-900 p-6 shadow-lg animate-in data-[state=open]:fade-in-90 data-[state=open]:slide-in-from-top-2">
            <ul className="flex flex-col gap-6 text-lg font-semibold text-slate-300">
              <li className="transition duration-150 hover:text-slate-50">
                <a href="/docs/en/introduction">Docs</a>
              </li>
              <li className="transition duration-150 hover:text-slate-50">
                <a href="#">Features</a>
              </li>
            </ul>
            <DialogClose className="h-6 w-6 text-slate-50" />
          </DialogContent>
        )}
        {!homepage && (
          <DialogContent className="fixed z-50 min-h-screen w-full bg-slate-50 shadow-lg animate-in data-[state=open]:fade-in-90 data-[state=open]:slide-in-from-top-2 dark:bg-chinese-black">
            {children}
            <DialogClose className="h-6 w-6 text-slate-900 dark:text-slate-50" />
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default MobileMenuToggle;
