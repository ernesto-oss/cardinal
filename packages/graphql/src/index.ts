import type { GraphQLSchema } from "graphql";

/* Import all used schemas here to register them. Make sure to update the import list whenever you create new schema entities */
import "./schema/user";

/* Import the builder to with defined plugins and custom scalars */
import { builder } from "./builder";

export const schema: GraphQLSchema = builder.toSchema();
