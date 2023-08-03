import { type PackageJson } from "type-fest";

import { type PackageManager } from "@/utils/getUserPackageManager.js";

export const coreScriptsMap = {
  /* Scripts used by nearly all packages */
  "with-env": "dotenv -e ../../.env",
  typecheck: "tsc --noEmit",
  "format": "pnpm prettier . --check --ignore-unknown",
  "format:write": "pnpm format --writer"
};

export const rootScripts = {
  lint: "turbo lint",
  build: "turbo build",
  dev: "turbo dev --parallel --color",
};

export const graphQLScriptsMap = {};

export const databaseScriptsMap = {
  /* Core scripts used by `drizzle-kit` operations */
  "db-migration": "<pkgCommand> with-env drizzle-kit generate",
  "db-introspect": "<pkgCommand> with-env drizzle-kit introspect",
  "db-drop": "<pkgCommand> with-env drizzle-kit drop out=drizzle",
};

export const nextScriptsMap = {
  /* Core scripts used by `next` */
  dev: "<pkgCommand> with-env next dev",
  build: "<pkgCommand> with-env next build",
  start: "<pkgCommand> with-env next start",
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
  const { packageManager, packageJson, scripts, scriptsMap, commandSuffix } =
    opts;

  function getPackageManagerPrefix() {
    const packageManagerPrefix =
      packageManager === "npm"
        ? "npm run"
        : packageManager === "yarn"
        ? "yarn"
        : "pnpm";
    return packageManagerPrefix;
  }

  scripts.forEach((scriptKey) => {
    const scriptCommand = scriptsMap[scriptKey];
    const packageManagerPrefix = getPackageManagerPrefix();
    const formattedScriptCommand = scriptCommand.replace(
      /<pkgCommand>/g,
      packageManagerPrefix,
    );

    packageJson.scripts![scriptKey] = `${formattedScriptCommand}${
      commandSuffix ? `:${commandSuffix}` : ""
    }`;
  });

  return packageJson;
}
