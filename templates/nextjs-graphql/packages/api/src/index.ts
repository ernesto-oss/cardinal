import { type NextRequest } from 'next/server';
import { auth } from '@acme/auth';
import { useResponseCache } from '@graphql-yoga/plugin-response-cache';
import { createYoga } from 'graphql-yoga';

import { schema } from './schema';

export async function graphqlHandler(req: NextRequest) {
  const authorizationHeader = req.headers.get('authorization');
  const sessionToken = authorizationHeader?.split(' ').pop();

  const yoga = createYoga({
    schema: schema,
    graphqlEndpoint: '/api/graphql',
    plugins: [
      useResponseCache({
        session: () => sessionToken ? sessionToken : null,
      }),
    ],
    context: async () => {
      if (sessionToken) {
        const session = await auth.validateSessionUser(sessionToken);
        return { session };
      }
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
