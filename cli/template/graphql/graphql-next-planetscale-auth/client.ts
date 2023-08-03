import {
  Cache,
  CacheOptions,
  createClient as createGQtyClient,
  QueryFetcher,
  ScalarsEnumsHash,
  Schema,
  SubscriptionClient,
} from "gqty";

import { type SchemaTypes } from "./index";

export type {
  Cache,
  QueryFetcher,
  ScalarsEnumsHash,
  Schema,
  SubscriptionClient,
  CacheOptions,
} from "gqty";

export type ClientOptions = {
  generatedSchema: Schema;
  scalarsEnumsHash: ScalarsEnumsHash;
  fetcher: QueryFetcher;
  fetchOptions?: RequestInit;
  subscriptionClient?: SubscriptionClient;
  cacheOptions?: CacheOptions;
};

export function createClient<T extends SchemaTypes>(options: ClientOptions) {
  type Query = T["query"];
  type GeneratedSchema = { query: Query };

  const cache = new Cache(undefined, {
    maxAge: 0,
    staleWhileRevalidate: 5 * 60 * 1000,
    normalization: true,
    ...options.cacheOptions,
  });

  const client = createGQtyClient<GeneratedSchema>({
    scalars: options.scalarsEnumsHash,
    schema: options.generatedSchema,
    cache,
    fetchOptions: {
      fetcher: options.fetcher,
    },
  });

  return client;
}
