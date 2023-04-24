import { builder } from "../builder";

builder.queryField("greeting", (t) => t.field({
  type: "String",
  resolve: () => "Hello from GraphQL"
}))

builder.queryField("somethingElse", (t) => t.field({
  type: "String",
  resolve: () => "This is... something else"
}))
