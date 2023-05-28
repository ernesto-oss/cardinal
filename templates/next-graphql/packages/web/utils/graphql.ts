import React from 'react';
import { cookies } from 'next/headers';
import { type Client } from '@acme/api/genql';
import { type GraphqlOperation } from '@acme/api/genql/runtime';

export { generateQueryOp, createClient } from '@acme/api/genql';

export const getBaseUrl = () => {
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return `http://127.0.0.1:${process.env.PORT ?? 3000}`;
};

export function registerClient(makeClient: () => Client) {
  const getClient = React.cache(makeClient);
  return {
    getClient,
  };
}

export function getDefaultGraphqlHeaders(
  operation: GraphqlOperation | GraphqlOperation[],
) {
  const options = {
    method: 'POST',
    body: JSON.stringify(operation),
    headers: {
      Accept: 'application/json',
      'content-type': 'application/json',
      'content-length': Buffer.byteLength(JSON.stringify(operation)).toString(),
    },
  } as RequestInit;
  return options;
}

export async function defaultFetcher({
  operation,
  fetchOptions,
}: {
  operation: GraphqlOperation | GraphqlOperation[];
  fetchOptions?: RequestInit;
})
{
  const response = await fetch(`${getBaseUrl()}/api/graphql`, {
    ...getDefaultGraphqlHeaders(operation),
    ...fetchOptions,
  });

  return await response.json();
}

export async function protectedFetcher({
  operation,
  fetchOptions,
}: {
  operation: GraphqlOperation | GraphqlOperation[];
  fetchOptions?: RequestInit;
})
{
  const response = await fetch(`${getBaseUrl()}/api/graphql`, {
    ...getDefaultGraphqlHeaders(operation),
    ...fetchOptions,
    headers: {
      Authorization: `Bearer ${cookies().get('auth_session')?.value}`,
    }
  });

  return await response.json();
}
