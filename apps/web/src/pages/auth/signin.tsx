import type { NextPage } from "next";
import { LoginLayout } from "@acme/ui";
import { UserAuthForm } from "@/components/user-auth-form";

const LoginPage: NextPage = () => {
  return (
    <LoginLayout>
      <UserAuthForm />
    </LoginLayout>
  );
};

export default LoginPage;
