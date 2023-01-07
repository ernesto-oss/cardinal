import { useSession, signOut } from "next-auth/react";
import { DashboardNav } from "@acme/ui";

type DashboardLayoutProps = {
  children?: React.ReactNode;
};

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { data: session, status } = useSession();

  return (
    <>
      <DashboardNav
        session={session}
        status={status}
        handleSignOut={() => signOut({ callbackUrl: "/" })}
      />
      <div>{children}</div>
    </>
  );
};
