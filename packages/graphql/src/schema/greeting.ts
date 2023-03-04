import { builder } from "../builder";

builder.queryField("greeting", (t) => t.field({
  type: "String",
  resolve: () => "Hello from GraphQL"
}))
