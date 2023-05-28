import React from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  createClient,
  getBaseUrl,
  registerClient,
} from '@/utils/graphql';
import { auth } from '@acme/auth';

import { Hero } from '@/components/hero';
import { LogoutButton } from '@/components/logout';
import { QueryBox } from '@/components/query-box';

export const metadata = {
  title: 'Protected',
};

const makeClient = () => {
  const client = createClient({
    url: `${getBaseUrl()}/api/graphql`,
    fetch: fetch,
    cache: 'no-store',
    headers: {
      Authorization: `Bearer ${cookies().get('auth_session')?.value}`,
    }
  });

  return client;
};

const { getClient } = registerClient(makeClient);

export default async function IndexPage() {
  const authRequest = auth.handleRequest({ cookies });
  const { user } = await authRequest.validateUser();

  if (!user) redirect('/login');

  const data = await getClient().query({
    authorizedOnly: true,
  });

  return (
    <>
      <Hero protectedRoute />
      <div className="flex w-full flex-col items-center justify-between">
        <div className="flex max-w-5xl flex-col items-center justify-center px-6">
          <QueryBox>
            <pre className="font-mono semibold text-slate-300">
              {JSON.stringify(data)}
            </pre>
          </QueryBox>
          <LogoutButton />
          <div className="mb-8 flex w-full items-center justify-center gap-2"></div>
        </div>
      </div>
    </>
  );
}
