import { CodegenConfig } from "@graphql-codegen/cli";

/** This object configures the type code generation for your GraphQL API.
 * For more details about how this works, check the docs at: https://the-guild.dev/graphql/codegen/docs/getting-started
 */
const config: CodegenConfig = {
  /* The schema field should point to the URL where your GraphQL endpoint is being served during development. If you're using something other then the defaults provided by the template, change it here. */
  schema: `http://localhost:3000/api/graphql`,

  /* By default, the watch mode for the codegen uses the system's native support to watch for changes in the project. Optionally, you can configure to watch to use a time interval pooling in the `watchConfig` object bellow. */
  watch: true,
  // watchConfig: {
  //   usePolling: true,
  //   interval: 1000,
  // },

  /* Suppress errors when there are no documents to generate and keep running the codegen */
  ignoreNoDocuments: true,

  documents: ["**/*.tsx"],
  generates: {
    "./apps/web/src/utils/gql/": {
      preset: "client",
      plugins: [],
    },
  },
};

export default config;
