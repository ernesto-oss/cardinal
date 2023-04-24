import { printSchema } from 'graphql';
import type { CodegenConfig } from '@graphql-codegen/cli';
import { schema } from './src/schema';

const config: CodegenConfig = {
  schema: printSchema(schema),
  silent: true,
  ignoreNoDocuments: true,
  generates: {
    'schema.graphql': {
      plugins: ['schema-ast'],
    },
  },
};

export default config;
