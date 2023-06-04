import { headers } from 'next/headers';
import { auth } from '@acme/auth';
import { createYoga } from 'graphql-yoga';

import { schema } from './schema';

const { handleRequest } = createYoga({
  fetchAPI: { Response },
  schema: schema,
  graphqlEndpoint: '/api/graphql',
  context: async () => {
    const authorizationHeader = headers().get('authorization');
    const sessionToken = authorizationHeader?.split(' ').pop();
    if (sessionToken) {
      const session = await auth.validateSessionUser(sessionToken);
      return { session };
    }
  },
});

export { handleRequest };
