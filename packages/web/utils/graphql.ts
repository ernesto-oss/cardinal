import { cookies } from 'next/headers';
import { createClient } from '@acme/api/genql';

export { createClient, generateQueryOp } from '@acme/api/genql';

export type ReadonlyRequestCookies = typeof cookies;

export const getBaseUrl = () => {
  if (typeof window !== 'undefined') return '';
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
};

export const getGraphqlUrl = () => {
  return `/api/graphql`;
};

export const client = createClient({
  url: getGraphqlUrl(),
});
