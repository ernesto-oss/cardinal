import * as React from "react";
import { signIn } from "next-auth/react";
import { clsx } from "clsx";
import { z } from "zod";
import { zfd } from "zod-form-data";
import create from "zustand";
import { persist } from "zustand/middleware";
import {
  IoLogoGithub as Github,
  IoLogoGoogle as Google,
} from "react-icons/io5";

interface EmailState {
  email: string;
  addEmail: (email: string) => void;
}

export const useEmailStore = create<EmailState>()(
  persist(
    (set) => ({
      email: "",
      addEmail: (email: string) => set({ email }),
      removeEmail: () => set({ email: "" }),
    }),
    {
      name: "email-login-persist",
    },
  ),
);

const checkAuthEmail = zfd.formData({
  email: zfd.text(z.string().email()),
});

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;
type ValidationErrors = z.typeToFlattenedError<z.infer<typeof checkAuthEmail>>;

export const UserAuthForm: React.FC<UserAuthFormProps> = ({
  className,
  ...props
}) => {
  const [errors, setErrors] = React.useState<ValidationErrors>();
  const [disableForm, setDisableForm] = React.useState<boolean>(false);
  const addEmailState = useEmailStore((state) => state.addEmail);

  const handleEmailSignIn = (data: FormData) => {
    const result = checkAuthEmail.safeParse(data);

    if (!result.success) {
      setErrors(result.error.flatten());
    } else {
      setErrors(undefined);
      setDisableForm(true);
      const email = data.get("email") as string;

      if (email) {
        addEmailState(email);
        signIn("email", { email, callbackUrl: "/dashboard/posts" });
      }
    }
  };

  const handleOAuthSignIn = (provider: "google" | "github") => {
    setDisableForm(true);
    signIn(provider, { callbackUrl: "/dashboard/posts" });
  };

  return (
    <div className={clsx(className, "pb-8")} {...props}>
      <form
        noValidate
        className="pb-4"
        onSubmit={async (e) => {
          e.preventDefault();
          const data = new FormData(e.currentTarget);
          handleEmailSignIn(data);
        }}
      >
        {/* Form email input */}
        <div className="flex flex-col pb-6">
          <label className="pb-2 text-sm font-semibold" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            placeholder="name@example.com"
            className="block h-9 w-full rounded-md border border-slate-300 py-4 px-3 text-base placeholder:text-slate-400 hover:border-slate-400 focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-slate-300"
            type="email"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            name="email"
            disabled={disableForm}
          />
          <div className="h-4">
            {errors?.fieldErrors.email ? (
              <span className="text-sm text-red-400">
                Insert a valid email address
              </span>
            ) : null}
          </div>
        </div>
        <div>
          <button
            disabled={disableForm}
            type="submit"
            className="w-full cursor-pointer rounded-md bg-slate-800/10 py-2 px-4 text-sm font-semibold text-slate-900 transition duration-100 hover:bg-slate-800/20 focus:outline-none focus:ring-2 focus:ring-slate-300 disabled:cursor-not-allowed disabled:opacity-80 disabled:hover:bg-slate-800/10"
          >
            Sign In
          </button>
        </div>
      </form>
      {/* Divisory line with label */}
      <div className="relative mb-4">
        <div className="absolute inset-0 flex items-center">
          <hr className="w-full border-t border-slate-300"></hr>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-slate-600">Or with</span>
        </div>
      </div>
      {/* oAuth providers sign in buttons */}
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
