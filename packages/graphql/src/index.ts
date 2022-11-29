import { makeSchema, fieldAuthorizePlugin, connectionPlugin } from "nexus";
import path from "path";
import * as types from "./resolvers";
export { context } from "./context";

const pathToTypegen = path.resolve(
  "../../packages/graphql/node_modules/@types/nexus-typegen/index.d.ts",
);
const pathToSchema = path.resolve("../../packages/graphql/src/schema.graphql");
const pathToContext = path.resolve("../../packages/graphql/src/context.ts");

export const schema = makeSchema({
  types,
  plugins: [fieldAuthorizePlugin(), connectionPlugin()],
  contextType: {
    module: pathToContext,
    export: "Context",
  },
  outputs: {
    typegen: pathToTypegen,
    schema: pathToSchema,
  },
});
