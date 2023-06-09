import path from "path";
import fs from "fs-extra";
import { sortPackageJson } from "sort-package-json";
import { type PackageJson, type TsConfigJson } from "type-fest";

import { TEMPLATE_DIR } from "@/consts.js";
import {
  addPackageDependency,
  authDependencyMap,
  type AvailableAuthDependenciesKeys,
} from "@/helpers/addPackageDependency.js";
import { removeArtifacts } from "@/helpers/removeArtifacts.js";
import { type ProjectOptions } from "@/index.js";

export const authInstaller = ({
  projectOptions,
  projectDir,
}: {
  projectOptions: ProjectOptions;
  projectDir: string;
}) => {
  const { databaseProvider, frontendFramework } = projectOptions;
  const authTemplateRoot = path.join(TEMPLATE_DIR, "auth");
  const authDestination = path.join(projectDir, "packages/auth");

  const copyDir = (fileName: string) =>
    fs.copySync(path.join(authTemplateRoot, fileName), authDestination, {
      filter: removeArtifacts,
    });

  if (databaseProvider === "planetscale" && frontendFramework === "next")
    copyDir("auth-planetscale-next");

  /* Write `tsconfig.json` */
  const templateAuthTsConfig = fs.readJsonSync(
    path.join(authTemplateRoot, "tsconfig.json"),
  ) as TsConfigJson;
  templateAuthTsConfig.compilerOptions = {};
  templateAuthTsConfig.extends = "../../tsconfig.json";
  templateAuthTsConfig.include = ["index.ts", "lucia.d.ts"];
  fs.outputJsonSync(
    path.join(authDestination, "tsconfig.json"),
    templateAuthTsConfig,
    { spaces: 2 },
  );

  /* Set correct dependencies on `package.json` */
  const templateAuthPackageJson = fs.readJsonSync(
    path.join(authTemplateRoot, "package.json"),
  ) as PackageJson;

  const authDependencies = [
    "@acme/config",
    "@acme/database",
    "lucia-auth",
  ] as AvailableAuthDependenciesKeys[];
  const authDevDependencies = [] as AvailableAuthDependenciesKeys[];

  if (databaseProvider === "planetscale")
    authDependencies.push("@lucia-auth/adapter-mysql");
  if (frontendFramework === "next") authDevDependencies.push("next");

  /* Wipe "dependencies" field from `package.json` in order to replace with the
  correct dependency map */
  templateAuthPackageJson.dependencies = {};
  templateAuthPackageJson.name = "@acme/auth";

  const withAddedDependencies =
    addPackageDependency({
      dependencyMap: authDependencyMap,
      packageJson: templateAuthPackageJson,
      dependencies: authDependencies,
      devDependency: false,
    });

  const withAddedDevDependencies =
    addPackageDependency({
      dependencyMap: authDependencyMap,
      packageJson: withAddedDependencies,
      dependencies: authDevDependencies,
      devDependency: true,
    });

  const sortedPackageJson = sortPackageJson(withAddedDevDependencies);

  fs.outputJsonSync(
    path.join(authDestination, "package.json"),
    sortedPackageJson,
    {
      spaces: 2,
    },
  );
};
