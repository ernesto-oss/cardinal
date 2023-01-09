import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import type { NextPageWithLayout } from "../../pages/_app";
import { Layout } from "@/layouts/dashboard-layout";
import { TitleAndMetaTags } from "@/components/seo";
import type { ReactElement } from "react";

const SettingsPage: NextPageWithLayout = () => {
  const router = useRouter();
  const {} = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/auth/signin");
    },
  });

  return (
    <>
      <TitleAndMetaTags />
      <div className="h-28 w-full bg-gray-800" />
    </>
  );
};

SettingsPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default SettingsPage;
