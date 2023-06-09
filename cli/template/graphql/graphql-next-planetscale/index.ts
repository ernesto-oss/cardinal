import { createYoga } from 'graphql-yoga';

import { schema } from './schema';

const { handleRequest } = createYoga({
  fetchAPI: { Response },
  schema: schema,
  graphqlEndpoint: '/api/graphql',
});

export { handleRequest };