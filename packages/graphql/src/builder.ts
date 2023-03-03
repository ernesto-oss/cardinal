import { prisma } from "@acme/database";
import SchemaBuilder from "@pothos/core";
import ScopeAuthPlugin from "@pothos/plugin-scope-auth";
import PrismaPlugin from "@pothos/plugin-prisma";
import RelayPlugin from "@pothos/plugin-relay";
import { DateTimeResolver } from "graphql-scalars";

import type { Session } from "@acme/auth";
import type PrismaTypes from "@pothos/plugin-prisma/generated";
import type { NextApiRequest, NextApiResponse } from "next";

const isDevelopment = process.env.NODE_ENV === "development";

/**
 * We check for the NODE_ENV to allow re-registration of plugins in development mode. This is used to
 * bypass Next.js behavior that triggers the error `Received multiple implementations for plugin {pluginName}`
 * @see: https://github.com/hayes/pothos/issues/696
 * */
if (isDevelopment) {
  SchemaBuilder.allowPluginReRegistration = true;
}

/**
 * The builder is used to register all plugins and custom scalars. It is also used to register all schema
 * entities. The resulting schema is exported to be used by Yoga Server on the Next.js API route.
 * @see: https://pothos-graphql.dev/docs/api/schema-builder#schemabuilder
 * */
export const builder = new SchemaBuilder<{
  AuthScopes: {
    authorizedUser: boolean;
  };
  PrismaTypes: PrismaTypes;
  Context: {
    req: NextApiRequest;
    res: NextApiResponse;
    session: Session | null;
  };
  Scalars: {
    DateTime: {
      Input: Date;
      Output: Date;
    };
  };
}>({
  /**
   * When using scope-auth with other plugins, always make sure that the scope-auth plugin is registered first.
   * @see: https://pothos-graphql.dev/docs/plugins/scope-auth#important
   */
  plugins: [ScopeAuthPlugin, PrismaPlugin, RelayPlugin],
  scopeAuthOptions: {
    treatErrorsAsUnauthorized: true,
  },
  authScopes: async (context) => ({
    authorizedUser: context.session ? true : false,
  }),
  relayOptions: {
    clientMutationId: "omit",
    cursorType: "String",
  },
  prisma: {
    client: prisma,
  },
});

/**
 * Register the root types of the schema. This is required to be able to use the `queryType` and `mutationType`
 * on all other files inside the `schema` folder.
 * */
builder.queryType();
// builder.mutationType();

/**
 * Register the custom scalars. The scalars registered here can be used to define fields on the schema entities.
 * @see: https://pothos-graphql.dev/docs/guide/scalars#scalars
 * */
builder.addScalarType("DateTime", DateTimeResolver, {});
// builder.addScalarType("Json", JSONResolver, {});
