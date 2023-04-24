import * as React from "react";
import { signIn } from "next-auth/react";
import { clsx } from "clsx";
import { IoLogoGithub as Github, IoLogoGoogle as Google } from "react-icons/io5";

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

export const UserAuthForm: React.FC<UserAuthFormProps> = ({ className, ...props }) => {
  const [disableForm, setDisableForm] = React.useState<boolean>(false);

  const handleOAuthSignIn = (provider: "google" | "github") => {
    setDisableForm(true);
    signIn(provider, { callbackUrl: "/" });
  };

  return (
    <div className={clsx(className, "pb-8")} {...props}>
      <div className="flex gap-4">
        <button
          disabled={disableForm}
          type="button"
          className="inline-flex w-full items-center justify-center gap-1 rounded-lg border bg-white px-5 py-2.5 text-center text-sm font-medium text-slate-900 transition duration-100 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-300 disabled:cursor-not-allowed disabled:opacity-80 disabled:hover:bg-white"
          onClick={() => handleOAuthSignIn("google")}
        >
          <Google className="h-5 w-5" />
          Google
        </button>
        <button
          disabled={disableForm}
          type="button"
          className="inline-flex w-full items-center justify-center gap-1 rounded-lg border bg-white px-5 py-2.5 text-center text-sm font-medium text-slate-900 transition duration-100 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-300 disabled:cursor-not-allowed disabled:opacity-80 disabled:hover:bg-white"
          onClick={() => handleOAuthSignIn("github")}
        >
          <Github className="h-5 w-5" />
          GitHub
        </button>
      </div>
    </div>
  );
};
