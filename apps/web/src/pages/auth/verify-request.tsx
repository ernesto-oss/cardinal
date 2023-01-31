import type { NextPage } from "next";
import { TitleAndMetaTags } from "@/components/seo";
import dynamic from "next/dynamic";

const VerifyRequestComponent = dynamic(
  () =>
    import("@/components/verify-request").then(
      (mod) => mod.VerifyRequestComponent,
    ),
  { ssr: false },
);

const VerifyRequestPage: NextPage = () => {
  return (
    <>
      <TitleAndMetaTags title="Email sent | Cardinal" />
      <VerifyRequestComponent />
    </>
  );
};

export default VerifyRequestPage;
