import * as React from "react";
import Link from "next/link";
import { IoMenu } from "react-icons/io5";
import { Avatar } from "./Avatar";
import { DropdownMenu, DropdownItem, DropdownSeparator } from "./DropdownMenu";
import { CardinalLogo } from "./assets/CardinalLogo";
import { type Session } from "@acme/auth";

type NavHeaderProps = {
  session?: Session | null;
  status: "loading" | "unauthenticated" | "authenticated" | undefined;
  handleSignOut: () => Promise<undefined>;
};

export const NavHeader: React.FC<NavHeaderProps> = ({
  session,
  status,
  handleSignOut,
}) => {
  const getAvatarFallback = (name?: string | null) => {
    if (name) {
      const splitName = name.split(" ");
      const stripedCharacters = splitName.map((word) => word.charAt(0));
      return stripedCharacters.join("");
    }
    return "";
  };

  return (
    <nav className="fixed z-50 w-full bg-transparent transition duration-500">
      <div className="relative flex h-14 items-center justify-center px-8 backdrop-blur-xl">
        <div className="border-light-slate/10 flex h-full w-full max-w-2xl items-center justify-between border-b">
          <div className="flex items-center justify-center gap-16">
            <CardinalLogo className="h-4" />
            <ul className="font-default hidden gap-8 text-sm font-semibold text-slate-800 sm:flex">
              <li>
                <a href="#features">Features</a>
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/ernestoresende/cardinal"
                >
                  Docs
                </a>
              </li>
            </ul>
          </div>
          {/* Right align portion of the navbar */}
          <div className="flex gap-4 justify-center items-center">
            {status === "loading" && null}
            {status === "unauthenticated" && !session && (
              <a
                href="auth/signin"
                className="cursor-pointer rounded-md bg-slate-800/10 py-2 px-4 text-sm font-semibold text-slate-900 transition duration-100 hover:bg-slate-800/20 focus:outline-none focus:ring-2 focus:ring-slate-300"
              >
                Login
              </a>
            )}
            {status === "authenticated" && session && (
              <DropdownMenu
                trigger={
                  <button className="rounded-full">
                    <Avatar
                      image={session.user?.image}
                      imageAlt={`Avatar for ${session.user?.name}`}
                      fallback={`${getAvatarFallback(session.user?.name)}`}
                    />
                  </button>
                }
                modal={false}
              >
                <div className="py-3 px-4">
                  <p className="text-base font-bold">{session.user?.name}</p>
                  <p className="text-sm">{session.user?.email}</p>
                </div>
                <DropdownSeparator
                  style={{ height: 1 }}
                  className="w-full bg-slate-300/50"
                />
                <div className="h-full w-full">
                  <DropdownItem
                    asChild
                    className="transition duration-100 hover:bg-slate-100 focus:bg-slate-100 focus:outline-none"
                  >
                    <Link
                      href="/dashboard"
                      className="block h-full w-full bg-transparent py-2 px-4 text-left text-sm text-slate-900"
                    >
                      Dashboard
                    </Link>
                  </DropdownItem>
                  <DropdownItem
                    asChild
                    className="transition duration-100 hover:bg-slate-100 focus:bg-slate-100 focus:outline-none"
                  >
                    <Link
                      href="/dashboard/settings"
                      className="block h-full w-full bg-transparent py-2 px-4 text-left text-sm text-slate-900"
                    >
                      Settings
                    </Link>
                  </DropdownItem>
                  <DropdownSeparator
                    style={{ height: 1 }}
                    className="w-full bg-slate-300/50"
                  />
                  <DropdownItem
                    asChild
                    className="transition duration-100 hover:bg-slate-100 focus:bg-slate-100 focus:outline-none"
                  >
                    <button
                      className="w-full cursor-pointer bg-transparent py-2 px-4 text-left text-sm text-slate-900 transition duration-100 hover:bg-slate-100 focus:outline-none"
                      onClick={handleSignOut}
                    >
                      Sign out
                    </button>
                  </DropdownItem>
                </div>
              </DropdownMenu>
            )}

            {/* Mobile only view */}
            <div className="block sm:hidden">
              <button className="w-full h-full flex items-center justify-center">
                <IoMenu className="h-7 w-7" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
