import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { NavHeader } from "@acme/ui";
import BackgroundGradient from "@/assets/images/BackgroundGradient.png";

type HomeLayoutProps = {
  children: React.ReactNode;
};

export const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
  const { data: session, status } = useSession();

  return (
    <>
      <NavHeader
        session={session}
        status={status}
        handleSignOut={() => signOut({ callbackUrl: "/" })}
      />
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
