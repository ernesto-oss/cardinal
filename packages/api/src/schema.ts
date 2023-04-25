/* Import all used schemas here to register them. Make sure to update the import list whenever you create new schema entities */
import "./types/greeting";
import "./types/article";

import { builder } from "./builder";

export const schema = builder.toSchema();
