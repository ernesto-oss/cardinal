import { memo } from "react";
import Image from "next/image";
import { IoMenu } from "react-icons/io5";
import { useSession, signOut } from "next-auth/react";
import { CardinalLogo, UserDropdown } from "@acme/ui";
import BackgroundGradient from "@/assets/images/BackgroundGradient.png";

const NavHeaderComponent: React.FC = ({}) => {
  const { data: session, status } = useSession();

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
          <div className="flex items-center justify-center gap-4">
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
              <UserDropdown
                session={session}
                handleSignOut={() => signOut({ callbackUrl: "/" })}
              />
            )}
            {/* Mobile only view */}
            <div className="sm:hidden">
              <button className="flex h-full w-full items-center justify-center">
                <IoMenu className="h-7 w-7" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export const NavHeader = memo(NavHeaderComponent);

type HomeLayoutProps = {
  children: React.ReactNode;
};

export const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
  return (
    <>
      <NavHeader />
      <Image
        className="absolute top-0 -z-10"
        src={BackgroundGradient}
        quality={50}
        fill
        alt=""
      />
      <div className="pt-36">{children}</div>
    </>
  );
};
