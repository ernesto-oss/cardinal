import { NextPage } from "next";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";

const Dashboard: NextPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/signin");
    },
  });
  console.log(session);

  if (status === "loading") {
    return <div>Loading</div>;
  }

  return (
    <>
      <button onClick={() => signOut({ callbackUrl: "/" })}>SignOut</button>
    </>
  );
};

export default Dashboard;
