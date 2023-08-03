"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import { type ErrorMessage } from "@acme/auth";
import { credentialsAuthSchema } from "@acme/auth/validation/credentials";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type FormData = z.infer<typeof credentialsAuthSchema>;

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  loginForm: boolean;
  signupForm: boolean;
}

export const UserAuthForm: React.FC<UserAuthFormProps> = ({
  className,
  ...props
}) => {
  const [disableForm, setDisableForm] = React.useState<boolean>(false);
  const [error, setError] = React.useState<ErrorMessage | undefined>(undefined);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(credentialsAuthSchema),
  });

  const { loginForm } = props;

  async function submit(data: FormData) {
    setError(undefined);
    setDisableForm(true);

    const request = await fetch(`/api/auth/${loginForm ? "login" : "signup"}`, {
      method: "POST",
      body: JSON.stringify({
        email: data.email.toLowerCase(),
        password: data.password,
      }),
    });

    if (request.status === 403 || request.status === 500) {
      const json = (await request.json()) as { error: ErrorMessage };

      setError(json.error);
      setDisableForm(false);
    }

    if (request.status === 302) router.push("/protected");
  }

  return (
    <div className={clsx("grid gap-6", className)}>
      <form noValidate onSubmit={handleSubmit(submit)}>
        <div className="grid gap-4">
          <div className="grid-gap-4">
            <Label htmlFor="email" className="sr-only">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={disableForm}
              {...register("email")}
            />
            <div className="h-3 py-1">
              {errors?.email && (
                <p className="px-1 text-xs text-pink-500">
                  {errors.email.message?.toString()}
                </p>
              )}
            </div>
          </div>
          <div className="grid-gap-2">
            <Label htmlFor="password" className="sr-only">
              Password
            </Label>
            <Input
              autoComplete="current-password"
              id="password"
              type="password"
              disabled={disableForm}
              {...register("password")}
            />
            <div className="h-3 py-1">
              {errors?.password && (
                <p className="px-1 text-xs text-pink-500">
                  {errors?.password.message === "min_8" &&
                    "Password should have at least 8 characters"}
                  {errors?.password.message === "max_20" &&
                    "Password should have no more then 20 characters"}
                </p>
              )}
            </div>
          </div>
          <div className="h-3 py-1">
            {error === "AUTH_INVALID_KEY_ID" && (
              <p className="px-1 text-center text-xs text-pink-500">
                Wrong email or password. Try again.
              </p>
            )}
            {error === "AUTH_DUPLICATE_KEY_ID" && (
              <p className="px-1 text-center text-xs text-pink-500">
                An account with that email already exists.
              </p>
            )}
            {error === "AUTH_INVALID_PASSWORD" && (
              <p className="px-1 text-center text-xs text-pink-500">
                Wrong email or password. Try again.
              </p>
            )}
          </div>
          <button
            className="inline-flex h-10 items-center justify-center rounded-md bg-gradient-to-b from-slate-300 to-slate-300/80 px-10 py-2 text-sm font-bold text-slate-900 hover:border-gray-300/90 disabled:opacity-75"
            disabled={disableForm}
            type="submit"
          >
            {loginForm ? "Login" : "Signup"}
          </button>
        </div>
      </form>
    </div>
  );
};
