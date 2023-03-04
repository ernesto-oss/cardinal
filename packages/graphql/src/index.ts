/* Import all used schemas here to register them. Make sure to update the import list whenever you create new schema entities */
import "./schema/user";
import "./schema/greeting";

/* Import the builder to with defined plugins and custom scalars */
import { builder } from "./builder";

export const schema = builder.toSchema();
