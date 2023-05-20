import { cookies } from 'next/headers';
import { type NextRequest } from 'next/server';
import { auth } from '@acme/auth';
import { createYoga } from 'graphql-yoga';

import { schema } from './schema';

export async function graphqlHandler(req: NextRequest) {
  const yoga = createYoga({
    schema: schema,
    graphqlEndpoint: '/api/graphql',
    context: async () => {
      const authRequest = auth.handleRequest({ cookies });
      const session = await authRequest.validate();

      return {
        session,
      };
    },
  });

  const response = await yoga.handleRequest(req, {});
  const responseHeaders = Object.fromEntries(response.headers.entries());

  const handlerResponse = new Response(await response.text(), {
    status: response.status,
    statusText: response.statusText,
    headers: responseHeaders,
  });

  return handlerResponse;
}
