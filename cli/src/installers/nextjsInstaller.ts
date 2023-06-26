import path from "path";
import { inspect } from "util";
import fs from "fs-extra";
import { type NextConfig } from "next";
import { sortPackageJson } from "sort-package-json";
import { type PackageJson, type TsConfigJson } from "type-fest";

import { TEMPLATE_DIR } from "@/consts.js";
import {
  addPackageDependency,
  nextjsDependencyMap,
  type AvailableNextjsDependenciesKeys,
} from "@/helpers/addPackageDependency.js";
import {
  coreScriptsMap,
  createPackageScripts,
  nextScriptsMap,
} from "@/helpers/createPackageScripts.js";
import { removeArtifacts } from "@/helpers/removeArtifacts.js";
import { type ProjectOptions } from "@/index.js";
import { type PackageManager } from "@/utils/getUserPackageManager.js";

export const nextjsInstaller = ({
  pkgManager,
  projectOptions,
  projectDir,
}: {
  pkgManager: PackageManager;
  projectOptions: ProjectOptions;
  projectDir: string;
}) => {
  const { backendType, authentication } = projectOptions;
  const nextTemplateRoot = path.join(TEMPLATE_DIR, "next");
  const nextDestination = path.join(projectDir, "packages/web");

  const getTemplateTypeDirectory = () => {
    if (backendType === "graphql") {
      if (authentication) return "next-graphql-auth";
      return "next-graphql";
    }

    return "";
  };

  fs.copySync(
    path.join(nextTemplateRoot, getTemplateTypeDirectory()),
    path.join(nextDestination),
  );

  /* Write `tsconfig.json` */
  const templateNextTsConfig = fs.readJsonSync(
    path.join(nextTemplateRoot, "tsconfig.json"),
  ) as TsConfigJson;
  templateNextTsConfig.extends = "../../tsconfig.json";
  templateNextTsConfig.exclude = ["node_modules"];
  templateNextTsConfig.include = [
    "next.env.d.ts",
    ".next/types/**/*.ts",
    "**/*.ts",
    "**/*.tsx",
  ];
  fs.outputJsonSync(
    path.join(nextDestination, "tsconfig.json"),
    templateNextTsConfig,
    { spaces: 2 },
  );

  /* Supply the correct dependencies to nextConfig.transpilePackages */
  const transpilePackages = [
    "@acme/config",
  ] as AvailableNextjsDependenciesKeys[];
  if (authentication) transpilePackages.push("@acme/auth");
  if (backendType !== "rsc") transpilePackages.push("@acme/api");
  const nextConfig = { reactStrictMode: true, transpilePackages } as NextConfig;

  const nextConfigWritableFile = fs.createWriteStream(
    path.join(nextDestination, "next.config.mjs"),
    {
      encoding: "utf-8",
    },
  );

  /* TODO: This is ugly as fuck and can probably be wrapped in a helper `createWritableFile` later */
  nextConfigWritableFile.write(`/** @type {import("next").NextConfig} */`);
  nextConfigWritableFile.write(`\n`);
  nextConfigWritableFile.write(`const config = ${inspect(nextConfig)};`);
  nextConfigWritableFile.write(`\n \n`);
  nextConfigWritableFile.end(`export default config;`);

  /* Set correct dependencies on `package.json` */
  const templateNextjsPackageJson = fs.readJsonSync(
    path.join(nextTemplateRoot, "package.json"),
  ) as PackageJson;
  const nextDependencies = [
    "@acme/config",
    "autoprefixer",
    "clsx",
    "postcss",
    "tailwindcss",
    "next",
    "react",
    "react-dom",
    "react-icons",
  ] as AvailableNextjsDependenciesKeys[];

  const nextDevDependencies = [
    "@types/node",
    "@types/react",
    "@types/react-dom",
    "dotenv-cli",
    "eslint",
    "eslint-config-next",
  ] as AvailableNextjsDependenciesKeys[];

  if (backendType) {
    nextDependencies.push("@acme/api");
    backendType === "graphql" ? nextDependencies.push("graphql") : null;
  }

  if (authentication)
    nextDependencies.push(
      "@acme/auth",
      "react-hook-form",
      "@hookform/resolvers",
      "@radix-ui/react-label",
      "zod",
    );

  /* Wipe "dependencies" field from `package.json` in order to replace with the
  correct dependency map */
  templateNextjsPackageJson.name = "@acme/web";
  templateNextjsPackageJson.dependencies = {};
  templateNextjsPackageJson.devDependencies = {};

  const withAddedDependencies =
    addPackageDependency<AvailableNextjsDependenciesKeys>({
      dependencyMap: nextjsDependencyMap,
      packageJson: templateNextjsPackageJson,
      dependencies: nextDependencies,
      devDependency: false,
    });

  const withAddedDevDependencies =
    addPackageDependency<AvailableNextjsDependenciesKeys>({
      dependencyMap: nextjsDependencyMap,
      packageJson: withAddedDependencies,
      dependencies: nextDevDependencies,
      devDependency: true,
    });

  /* Set `package.json` scripts */
  const scriptsMap = { ...nextScriptsMap, ...coreScriptsMap };

  const withAddedScripts = createPackageScripts<keyof typeof scriptsMap>({
    packageJson: withAddedDevDependencies,
    scriptsMap: scriptsMap,
    packageManager: pkgManager,
    scripts: ["with-env", "build", "dev", "lint", "start", "typecheck"],
  });

  const sortedPackageJson = sortPackageJson(withAddedScripts);

  fs.outputJsonSync(
    path.join(nextDestination, "package.json"),
    sortedPackageJson,
    {
      spaces: 2,
    },
  );
};
