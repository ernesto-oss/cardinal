import React from 'react';
import { siteConfig } from '@/config/site'

import { type Client } from '@acme/api/genql'
export { generateQueryOp, createClient } from '@acme/api/genql';

export const getBaseUrl = () => {
  if (process.env.NODE_ENV === "production") return siteConfig.url;

  /**
   * Assume localhost. Using ipv4 address because of an
   * ongoing issue with Node.js `undici` library
   * @see https://github.com/nodejs/undici/issues/1602
   * @see https://github.com/vercel/next.js/issues/44062
   */
  return `http://127.0.0.1:${process.env.PORT ?? 3000}`;
};

export function registerClient(makeClient: () => Client) {
  const getClient = React.cache(makeClient);
  return {
    getClient,
  };
}
