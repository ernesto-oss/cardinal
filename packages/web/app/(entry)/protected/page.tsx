import React from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from '@acme/auth';

import { Hero } from '@/components/hero';
import { LogoutButton } from '@/components/logout';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Protected',
};

export default async function IndexPage() {
  const authRequest = auth.handleRequest({ cookies });
  const { user } = await authRequest.validateUser();
  if (!user) redirect('/login');

  return (
    <>
      <Hero protectedRoute />
      <div className="flex w-full flex-col items-center justify-between">
        <div className="flex max-w-5xl flex-col items-center justify-center px-6">
          <div className="mb-8 w-fit rounded-md border-2 border-slate-200/5 bg-slate-400/10 px-10 py-2 text-center">
            <p className="font-mono font-semibold text-slate-300">
              Hello from protected query
            </p>
          </div>
          <LogoutButton />
          <div className="mb-8 flex w-full items-center justify-center gap-2"></div>
        </div>
      </div>
    </>
  );
}
