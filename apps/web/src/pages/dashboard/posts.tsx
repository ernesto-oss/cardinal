import { type NextPage } from "next";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import { DashboardLayout } from "@/layouts/DashboardLayout";
import { TitleAndMetaTags } from "@/components/seo";

export const Page: NextPage = () => {
  const router = useRouter();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/auth/signin");
    },
  });

  return (
    <>
      <TitleAndMetaTags />
      <DashboardLayout></DashboardLayout>
    </>
  );
};
