"use client";

import * as React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { IoLogoGithub as Github, IoLogoGoogle as Google } from "react-icons/io5";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const userAuthSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormData = z.infer<typeof userAuthSchema>;

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  loginForm: boolean;
  signupForm: boolean;
}

export const UserAuthForm: React.FC<UserAuthFormProps> = ({ className, ...props }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  });

  const [disableForm, setDisableForm] = React.useState<boolean>(false);

  const { loginForm } = props;

  async function submit(data: FormData) {
    setDisableForm(true);

    await fetch(`/api/auth/${loginForm ? "login" : "signup"}`, {
      method: "POST",
      body: JSON.stringify({ email: data.email.toLowerCase(), password: data.password }),
    });
  }

  return (
    <div className={clsx("grid gap-6", className)}>
      <form onSubmit={handleSubmit(submit)}>
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
            {errors?.email && <p className="px-1 text-xs text-red-600">{errors.email.message}</p>}
          </div>

          <div className="grid-gap-2">
            <Label htmlFor="password" className="sr-only">
              Password
            </Label>
            <Input id="password" type="password" disabled={disableForm} {...register("password")} />
            {errors?.email && <p className="px-1 text-xs text-red-600">{errors.email.message}</p>}
          </div>
          <button
            className="h-10 py-2 px-4 inline-flex w-full items-center justify-center rounded-md bg-gray-300 text-sm font-bold text-slate-900 hover:border-gray-300/90"
            disabled={disableForm}
            type="submit"
          >
            Signin
          </button>
        </div>
      </form>
      {/* Divisory line with label */}
      <div className="relative mb-2">
        <div className="absolute inset-0 flex items-center">
          <hr className="w-full border-t border-slate-700"></hr>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-slate-900 px-2 text-slate-400">Or with</span>
        </div>
      </div>
      {/* oAuth providers Signin buttons */}
      <div className="flex gap-4">
        <button
          className="inline-flex h-10 w-full items-center justify-center rounded-md border border-gray-300 px-4 py-2 text-sm font-bold text-gray-300"
          disabled={disableForm}
          type="button"
        >
          <div className="flex gap-1">
            <Google className="h-5 w-5" />
            Google
          </div>
        </button>
        <button
          className="inline-flex h-10 w-full items-center justify-center rounded-md border border-gray-300 px-4 py-2 text-sm font-bold text-gray-300"
          disabled={disableForm}
          type="button"
        >
          <div className="flex gap-1">
            <Github className="h-5 w-5" />
            GitHub
          </div>
        </button>
      </div>
    </div>
  );
};
