export type FrontendFramework = "next" | "react";
export type BackendType = "rest" | "graphql" | "rsc";
export type DatabaseProvider = "planetscale" | "none";
export type DeploymentProvider = "vercel";

export type Primitive = Readonly<
  FrontendFramework | BackendType | DatabaseProvider | DeploymentProvider
>;

export interface Option<Value extends Primitive> {
  value: Value;
  label: string;
  hint?: string;
}

export interface SelectOptions<
  Options extends Option<Value>[],
  Value extends Option,
> {
  message: string;
  options: Options;
  initialValue?: Value;
}

export type Index<T = any> = {
  [key: string]: T;
};

export type DependencyMap = Index<string>;
