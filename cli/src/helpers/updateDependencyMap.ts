import path from "path";
import { ConfirmPrompt, isCancel } from "@clack/core";
import { Command } from "@commander-js/extra-typings";
import fs from "fs-extra";
import { run as runUpdater } from "npm-check-updates";
import color from "picocolors";

import { cancel } from "@/cli/prompts.js";

import { type DependencyMap } from "../types/index.js";
import {
  authDependencyMap,
  configDependencyMap,
  coreDependencyMap,
  databaseDependencyMap,
  graphqlDependencyMap,
  nextjsDependencyMap,
  type AvailableDependenciesType,
} from "./addPackageDependency.js";

export type DependencyCategory =
  | "next"
  | "auth"
  | "core"
  | "database"
  | "graphql"
  | "config";

export type Index = {
  [key: string]: string;
};

export interface ConfirmOptions {
  message: string;
  active?: string;
  inactive?: string;
  initialValue?: boolean;
}

const promptHelper = () =>
  `${color.bold(color.bgRed(" CARDINAL_INTERNAL_USE "))}`;

/* Extracted from `@clack/core` to and stripped of unneded styling */
export const confirm = (opts: ConfirmOptions) => {
  const active = opts.active ?? "Yes";
  const inactive = opts.inactive ?? "No";
  return new ConfirmPrompt({
    active,
    inactive,
    initialValue: opts.initialValue ?? true,
    render() {
      const title = `${opts.message}\n`;
      const value = this.value ? active : inactive;

      switch (this.state) {
        case "submit":
          return `${title} ${color.dim(value)}`;
        case "cancel":
          return `${title} ${color.strikethrough(color.dim(value))}`;
        default: {
          return `${title} ${
            this.value ? `${active}` : `${color.dim(active)}`
          } ${color.dim("/")} ${
            !this.value ? `${inactive}` : `${color.dim(inactive)}`
          }`;
        }
      }
    },
  }).prompt() as Promise<boolean | symbol>;
};

async function getDiffAndPromptUpgrade(opts: {
  previousDepMap: DependencyMap;
  updatedDepMap: DependencyMap;
  depCategory: DependencyCategory;
  shouldSkipPrompt?: boolean;
}) {
  const { updatedDepMap, previousDepMap, depCategory, shouldSkipPrompt } = opts;

  const dependencyMapJsonFilename =
    depCategory === "auth"
      ? "authDependencyMap.json"
      : depCategory === "next"
      ? "nextDependencyMap.json"
      : depCategory === "core"
      ? "coreDependencyMap.json"
      : depCategory === "database"
      ? "databaseDependencyMap.json"
      : depCategory === "graphql"
      ? "graphqlDependencyMap.json"
      : depCategory === "config"
      ? "configDependencyMap.json"
      : "";

  const dependencyMap = path.join(
    __dirname,
    "dependencyMaps",
    dependencyMapJsonFilename,
  );

  const dependencyMapJson = fs.readJsonSync(dependencyMap) as Index;

  const updatedDependencyMap = {
    ...dependencyMapJson,
    ...updatedDepMap,
  };

  function getNewProperties(prevObj: DependencyMap, newObj: DependencyMap) {
    const newObjProperties = Object.keys(newObj);
    const newProperties = newObjProperties.filter(
      (prop) => prevObj[prop] !== newObj[prop],
    ) as AvailableDependenciesType[];
    return newProperties;
  }

  const diff = getNewProperties(previousDepMap, updatedDepMap);
  let dependencyUpgrades = {};

  diff.forEach((dependencyName) => {
    const oldVersion = previousDepMap[dependencyName];
    const newVersion = updatedDepMap[dependencyName];

    dependencyUpgrades = Object.assign(dependencyUpgrades, {
      [color.bold(color.cyan(dependencyName))]: `${color.dim(
        oldVersion,
      )} \u279C ${color.bold(color.green(newVersion))}`,
    }) as Index;
  });

  const dependencyUpgradeList = Object.entries(dependencyUpgrades)
    .join("\n")
    .replace(/,/g, ": ");

  if (shouldSkipPrompt) {
  } else {
    const updatePrompt = await confirm({
      message: `
    ${promptHelper()}
    Upgrading dependency map for ${color.cyan(
      depCategory,
    )} related dependencies. These dependencies will be updated:
    
    ${dependencyUpgradeList} 

    ${color.bold(color.green("Should this dependency map be updated?"))}
    `,
    });

    if (isCancel(updatePrompt)) {
      cancel("Update cancelled");
      process.exit(0);
    }

    if (updatePrompt)
      fs.writeJSONSync(dependencyMap, updatedDependencyMap, { spaces: 2 });

    return updatePrompt;
  }
}

const authPackageFile = { dependencies: authDependencyMap };
const corePackageFile = { dependencies: coreDependencyMap };
const databasePackageFile = { dependencies: databaseDependencyMap };
const graphqlPackageFile = { dependencies: graphqlDependencyMap };
const nextPackageFile = { dependencies: nextjsDependencyMap };
const configPackageFile = { dependencies: configDependencyMap };

const program = new Command();

const mainProgram = program
  .option("--CI")
  .requiredOption("-d, --dependencyCategory <value>")
  .parse(process.argv);

const options = mainProgram.opts();

const packageData =
  options.dependencyCategory === "next"
    ? nextPackageFile
    : options.dependencyCategory === "auth"
    ? authPackageFile
    : options.dependencyCategory === "core"
    ? corePackageFile
    : options.dependencyCategory === "database"
    ? databasePackageFile
    : options.dependencyCategory === "graphql"
    ? graphqlPackageFile
    : options.dependencyCategory === "next"
    ? configPackageFile
    : undefined;

const dependencyMap =
  options.dependencyCategory === "next"
    ? nextjsDependencyMap
    : options.dependencyCategory === "auth"
    ? authDependencyMap
    : options.dependencyCategory === "core"
    ? coreDependencyMap
    : options.dependencyCategory === "database"
    ? databaseDependencyMap
    : options.dependencyCategory === "graphql"
    ? graphqlDependencyMap
    : options.dependencyCategory === "config"
    ? configDependencyMap
    : undefined;

await runUpdater({
  upgrade: true,
  packageData,
  reject: "@genql/cli",
}).then(async (updated) => {
  const updatedObject = {
    ...dependencyMap,
    ...updated,
  } as DependencyMap;

  if (dependencyMap && updated) {
    if (Object.keys(updated).length === 0)
      console.log("Nothing to update in this dependency map :)");
    else
      await getDiffAndPromptUpgrade({
        previousDepMap: dependencyMap,
        updatedDepMap: updatedObject,
        depCategory: options.dependencyCategory as DependencyCategory,
        shouldSkipPrompt: options.CI,
      });
  } else {
    console.log("Nothing to update in this dependency map :)");
  }
});
