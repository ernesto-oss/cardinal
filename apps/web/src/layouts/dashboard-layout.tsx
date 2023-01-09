import Link from "next/link";
import { useRouter } from "next/router";
import { getSession, signOut } from "next-auth/react";
import { clsx } from "clsx";
import {
  QueryClientProvider,
  QueryClient,
  useQuery,
} from "@tanstack/react-query";
import { CardinalLogoSolid, UserDropdown } from "@acme/ui";
import { IoDocumentOutline, IoSettingsOutline } from "react-icons/io5";

type DashboardLayoutProps = {
  children?: React.ReactNode;
};

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
}) => {
  const router = useRouter();
  const currentPathname = router.pathname;

  const { status, data: session } = useQuery({
    queryKey: ["session", "dashboard"],
    queryFn: () => getSession(),
  });

  return (
    <>
      <div className="font-default fixed z-50 w-full">
        <div className="relative flex h-14 items-center justify-center bg-gray-800 px-8">
          <div className="flex h-full w-full max-w-2xl items-center justify-between border-b border-slate-700">
            <nav className="flex h-full items-center justify-center gap-16">
              <CardinalLogoSolid className="h-4" />
              <ul className="font-default flex h-full items-center justify-center gap-2 text-sm font-semibold text-slate-100">
                <li
                  className={clsx({
                    "relative flex h-full items-center": true,
                    "before:absolute before:bottom-0 before:left-2 before:right-2 before:border-b-2 before:border-slate-100 before:content-['']":
                      currentPathname === "/dashboard/posts",
                  })}
                >
                  <Link
                    className="inline-flex items-center gap-2 rounded-md py-2 px-4 transition hover:bg-slate-700"
                    href="/dashboard/posts"
                  >
                    <IoDocumentOutline className="h-5 w-5" />
                    Posts
                  </Link>
                </li>
                <li
                  className={clsx({
                    "relative flex h-full items-center": true,
                    "before:absolute before:bottom-0 before:left-2 before:right-2 before:border-b-2 before:border-slate-100 before:content-['']":
                      currentPathname === "/dashboard/settings",
                  })}
                >
                  <Link
                    className="inline-flex items-center gap-2 rounded-md py-2 px-4 transition hover:bg-slate-700"
                    href="/dashboard/settings"
                  >
                    <IoSettingsOutline className="h-5 w-5" />
                    Settings
                  </Link>
                </li>
              </ul>
            </nav>
            <div className="flex items-center justify-center gap-4">
              {status === "loading" && (
                <div className="inline-flex h-9 w-9 animate-pulse select-none items-center justify-center overflow-hidden rounded-full bg-slate-300/50 align-middle" />
              )}
              {status === "success" && session && (
                <UserDropdown
                  session={session}
                  handleSignOut={() => signOut({ callbackUrl: "/" })}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {children}
    </>
  );
};

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <DashboardLayout>{children}</DashboardLayout>
    </QueryClientProvider>
  );
};
