import { builder } from '../builder';

builder.queryField('authorizedOnly', (t) =>
  t.field({
    authScopes: {
      authorized: true,
    },
    type: 'String',
    resolve: async (_query, _args) => {
      return 'Greetings from a protected query';
    },
  }),
);
