import { type PackageJson } from "type-fest";

import { type PackageManager } from "@/utils/getUserPackageManager.js";

export const coreScriptsMap = {
  /* Scripts used by nearly all packages */
  "with-env": "dotenv -e ../../.env",
};

export const databaseScriptsMap = {
  /* Core scripts used by `drizzle-kit` operations */
  "db-migration": "with-env drizzle-kit generate",
  "db-introspect": "with-env drizzle-kit introspect",
  "db-drop": "with-env drizzle-kit drop out=drizzle",
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

  const packageManagerCommand = `${packageManager === "npm" ? "npm run" : packageManager === "pnpm" ? "pnpm" : "yarn"}`;

  scripts.forEach((scriptKey) => {
    const scriptCommand = scriptsMap[scriptKey];
    packageJson.scripts![scriptKey] = `${packageManagerCommand}${" "}${scriptCommand}${
      commandSuffix ? `:${commandSuffix}` : ""
    }`;
  });

  return packageJson;
}
