import type { NextPage } from "next";
import { TitleAndMetaTags } from "@/components/seo";
import { LoginLayout } from "@/layouts/signin-layout";
import { UserAuthForm } from "@/components/user-auth-form";

const LoginPage: NextPage = () => {
  return (
    <>
      <TitleAndMetaTags />
      <LoginLayout>
        <UserAuthForm />
      </LoginLayout>
    </>
  );
};

export default LoginPage;
