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

  const copyFile = (fileName: string) =>
    fs.copySync(
      path.join(nextTemplateRoot, fileName),
      path.join(nextDestination, fileName),
    );

  const copyAndRename = (origin: string, destinationFile: string) =>
    fs.copySync(
      path.join(nextTemplateRoot, origin),
      path.join(nextDestination, destinationFile),
    );

  /* Copy root config files */
  copyAndRename("_eslintrc.js", "eslintrc.js");
  copyFile("next-env.d.ts");
  copyFile("postcss.config.js");
  copyFile("tailwind.config.js");

  /* Copy the base directory with files that will be present regardless of template options */
  fs.copySync(path.join(nextTemplateRoot, "base"), path.join(nextDestination));

  if (authentication) {
    /* Auth related */
    copyAndRename("extras/app/(auth)", "app/(auth)");
    copyAndRename(
      "extras/app/(entry)/protected/loading.tsx",
      "app/(entry)/protected/loading.tsx",
    );
    copyAndRename("extras/app/api/auth", "app/api/auth");

    /* Additional components */
    copyAndRename("extras/components", "components");
  }

  if (backendType === "graphql") {
    copyAndRename("extras/app/api/graphql", "app/api/graphql");
    copyAndRename(
      "extras/app/(entry)/page-with-graphql.tsx",
      "app/(entry)/page.tsx",
    );
    copyAndRename("extras/utils/graphql.ts", "utils/graphql.ts");

    authentication
      ? copyAndRename(
          "extras/app/(entry)/protected/page-with-graphql.tsx",
          "app/(entry)/protected/page.tsx",
        )
      : null;
  }

  /* Write `tsconfig.json` */
  const templateDatabaseTsConfig = fs.readJsonSync(
    path.join(nextTemplateRoot, "tsconfig.json"),
  ) as TsConfigJson;
  templateDatabaseTsConfig.extends = "../../tsconfig.json";
  templateDatabaseTsConfig.include = [
    "next.env.d.ts",
    ".next/types/**/*.ts",
    "**/*.ts",
    "**/*.tsx",
  ];
  fs.outputJsonSync(
    path.join(nextDestination, "tsconfig.json"),
    templateDatabaseTsConfig,
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
      "@hookform/resolvers",
      "@radix-ui/react-label",
      "zod",
    );

  /* Wipe "dependencies" field from `package.json` in order to replace with the
  correct dependency map */
  templateNextjsPackageJson.dependencies = {};

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
