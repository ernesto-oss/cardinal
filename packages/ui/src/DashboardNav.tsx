import * as React from "react";
import Link from "next/link";

import { UserDropdown } from "./UserDropdown";
import { CardinalLogoSolid } from "./assets/CardinalLogo";
import { type Session } from "@acme/auth";

type DashboardNavProps = {
  session?: Session | null;
  status: "loading" | "unauthenticated" | "authenticated" | undefined;
  handleSignOut: () => Promise<undefined>;
};

const DashboardNavComponent: React.FC<DashboardNavProps> = ({
  session,
  status,
  handleSignOut,
}) => {
  return (
    <div className="fixed z-50 w-full">
      <div className="relative flex h-14 items-center justify-center bg-gray-800 px-8">
        <div className="border-light-slate/10 flex h-full w-full max-w-2xl items-center justify-between">
          <nav className="flex items-center justify-center gap-16">
            <CardinalLogoSolid className="h-4" />
            <ul className="font-default hidden gap-8 text-sm font-semibold text-slate-800 sm:flex">
              <li>
                <Link href="/dashboard/posts">Posts</Link>
              </li>
              <li>
                <Link href="/dashboard/settings">Docs</Link>
              </li>
            </ul>
          </nav>
          <div className="flex items-center justify-center gap-4">
            {status === "loading" && null}

            {status === "authenticated" && session && (
              <UserDropdown session={session} handleSignOut={handleSignOut} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const DashboardNav = React.memo(DashboardNavComponent);
