export type FrontendFramework = "next" | "react";
export type BackendType = "rest" | "trpc" | "graphql" | "rsc";
export type DatabaseProvider = "planetscale" | "sqlite" | "none";
type DeploymentProvider = "aws" | "vercel";

export type Primitive = Readonly<FrontendFramework | BackendType | DatabaseProvider | DeploymentProvider>;

export interface Option<Value extends Primitive> {
  value: Value;
  label: string;
  hint?: string;
}

export interface SelectOptions<Options extends Option<Value>[], Value extends Option> {
  message: string;
  options: Options;
  initialValue?: Value;
}
