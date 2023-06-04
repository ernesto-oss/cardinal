import { type PackageJson } from "type-fest";

import { type PackageManager } from "@/utils/getUserPackageManager.js";

export const coreScriptsMap = {
  /* Scripts used by nearly all packages */
  "with-env": "dotenv -e ../../.env",
  typecheck: "tsc --noEmit",
};

export const graphQLScriptsMap = {
  /* Core scripts used by graphql-codegen */
  "codegen:schema": "graphql-codegen --config codegen.ts",
  "codegen:client": "npx @genql/cli --output ./genql --schema ./schema.graphql --esm",
  codegen: "codegen:schema && codegen:client",
  dev: 'chokidar "**/*.ts" --silent --initial -i "node_modules" -i "genql" -c "<pkgCommand> codegen"',
};

export const databaseScriptsMap = {
  /* Core scripts used by `drizzle-kit` operations */
  "db-migration": "with-env drizzle-kit generate",
  "db-introspect": "with-env drizzle-kit introspect",
  "db-drop": "with-env drizzle-kit drop out=drizzle",
};

export const nextScriptsMap = {
  /* Core scripts used by `next` */
  dev: "with-env next dev",
  build: "with-env next build",
  start: "with-env next start",
  lint: "next lint",
};

export type ScriptMap = { [key: string]: string };
export type Scripts<T extends string> = T[];

/**
 * Inserts the scripts from a given set of `scriptsMap` into a
 * given `package.json`
 */
export function createPackageScripts<T extends string>(opts: {
  scriptsMap: ScriptMap;
  scripts: Scripts<T>;
  packageManager: PackageManager;
  packageJson: PackageJson;
  commandSuffix?: string;
}) {
  const { packageManager, packageJson, scripts, scriptsMap, commandSuffix } = opts;

  scripts.forEach((scriptKey) => {
    const scriptCommand = scriptsMap[scriptKey];

    const packageManagerPrefix = packageManager === "npm" ? "npm run" : packageManager === "yarn" ? "yarn" : "pnpm";
    const formattedScriptCommand = scriptCommand.replace("<pkgCommand>", packageManagerPrefix);

    packageJson.scripts![scriptKey] = `${formattedScriptCommand}${commandSuffix ? `:${commandSuffix}` : ""}`;
  });

  return packageJson;
}
