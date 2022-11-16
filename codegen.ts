import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  ignoreNoDocuments: true,
  schema: `http://localhost:3000/api/graphql`,
  documents: ["**/*.tsx"],
  generates: {
    "./apps/web/src/utils/gql/": {
      preset: "client",
      plugins: [],
    },
  },
};

export default config;
