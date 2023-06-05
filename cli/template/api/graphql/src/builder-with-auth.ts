import { NextRequest } from 'next/server';
import { type Session } from '@acme/auth';
import SchemaBuilder from '@pothos/core';
import ScopeAuthPlugin from '@pothos/plugin-scope-auth';
import type { YogaInitialContext } from 'graphql-yoga';

/**
 * This is where all the GraphQL stuff for Pothos is created and configured. This file documents
 * many possible permutations of features you might want to have on your GraphQL API.
 * @see: https://pothos-graphql.dev/docs/guide/schema-builder
 */

/**
 * We check for the NODE_ENV to allow re-registration of plugins in development mode. This is used to
 * bypass Next.js behavior that triggers the error `Received multiple implementations for plugin {pluginName}`
 * @see: https://github.com/hayes/pothos/issues/696
 * */
const isDevelopment = process.env.NODE_ENV === 'development';

if (isDevelopment) {
  SchemaBuilder.allowPluginReRegistration = true;
}

export const builder = new SchemaBuilder<{
  /** AUTHORIZATION
   *
   * This property defines the authorization scopes present on your GraphQL. You can one or multiple
   * authorization roles, and define them based on roles or permission access from your business logic.
   * @see: https://pothos-graphql.dev/docs/plugins/scope-auth
   */
  AuthScopes: {
    authorized: boolean;
  };

  /** CONTEXT
   *
   * This property defines the contexts that are available in the API, and are sent from the client with each
   * new request. Populating the context allows you to access relevant things when precessing the request,
   * such as session information.
   * @see: https://pothos-graphql.dev/docs/guide/context
   */
  Context: {
    request: NextRequest & YogaInitialContext;
    session: Session | null;
  };
}>({
  /**
   * This is where you will register some of the Pothos plugins you configured earlier.
   * Check the docs to see other available plugins.
   * @see: https://pothos-graphql.dev/docs/plugins
   *
   * When using scope-auth with other plugins, always make sure that the scope-auth plugin is registered first.
   * @see: https://pothos-graphql.dev/docs/plugins/scope-auth#important
   */
  plugins: [ScopeAuthPlugin],

  /** This option configures how the authScopes you defined earlier are resolved.
   * In this example, we use information from the request's context to see if the user
   * is authorized.
   *
   * @see: https://pothos-graphql.dev/docs/plugins/scope-auth
   */
  authScopes: async (context) => ({
    authorized: () => Boolean(context.session),
  }),
});

/**
 * Register the root types of the schema. This is required to be able to use the `queryType` and `mutationType`
 * on all other files inside the `schema` folder.
 * */
builder.queryType();
// builder.mutationType();