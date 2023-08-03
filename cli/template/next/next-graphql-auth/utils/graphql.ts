import { cookies } from "next/headers";

import {
  createClient,
  createGeneratedSchema,
  createScalarsEnumsHash,
  schema,
  type QueryFetcher,
} from "@acme/api";
import { SESSION_COOKIE_NAME } from "@acme/auth";

export const getBaseUrl = () => {
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return `http://127.0.0.1:${process.env.PORT ?? 3000}`;
};

function createQueryFetcher(fetchOptions?: RequestInit): QueryFetcher {
  const authorizedRequestSession = cookies().get(SESSION_COOKIE_NAME)?.value;

  return async function ({ query, variables, operationName }) {
    const response = await fetch(`${getBaseUrl()}/api/graphql`, {
      method: "POST",
      headers: {
        Authorization: authorizedRequestSession
          ? `Bearer ${authorizedRequestSession}`
          : "",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables,
        operationName,
      }),
      mode: "cors",
      ...fetchOptions,
    });

    const result = await response.json();
    return result;
  };
}

export const client = createClient({
  fetcher: createQueryFetcher(),
  generatedSchema: createGeneratedSchema(schema),
  scalarsEnumsHash: createScalarsEnumsHash(schema),
});
