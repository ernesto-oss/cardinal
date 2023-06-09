import { builder } from '../builder';

builder.queryField('greeting', (t) =>
  t.field({
    type: 'String',
    resolve: async (_query, _args) => {
      return 'Hello from GraphQl';
    },
  }),
);
