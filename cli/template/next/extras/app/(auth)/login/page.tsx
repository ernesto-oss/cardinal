import Image from 'next/image';
import Link from 'next/link';
import CardinalIcon from '@/assets/brand/cardinal-icon.svg';
import { IoChevronBack as Back } from 'react-icons/io5';

import { UserAuthForm } from '@/components/user-auth-form';

export const metadata = {
  title: 'Log into your account',
  description: 'Log into your account to get started.',
};

export default async function LoginPage() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href="/"
        className="absolute left-4 top-4 inline-flex h-10 items-center justify-center gap-1 px-4 py-2 text-sm font-bold text-slate-300 hover:border-gray-300/90 md:left-8 md:top-8"
      >
        <Back className="h-4 w-4" />
        Back to homepage
      </Link>
      <div
        className="mx-auto flex w-full flex-col justify-center space-y-6 rounded-xl border 
      border-slate-200/5 bg-slate-500/10 px-10 py-12 backdrop-blur sm:w-[400px]"
      >
        <div className="flex flex-col space-y-2 text-center">
          <div className="flex w-full justify-center">
            <Image src={CardinalIcon} alt="" />
          </div>

          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-sm text-slate-400">
            Enter your email and password bellow to sign in
          </p>
        </div>
        <UserAuthForm signupForm={false} loginForm />
        <p className="px-8 text-center text-sm text-slate-400">
          Dont&apos;t have an account?{' '}
          <Link
            href="/register"
            className="hover:text-brand underline underline-offset-4"
          >
            Sign up
          </Link>{' '}
        </p>
      </div>
    </div>
  );
}
