import path from "path";
import fs from "fs-extra";
import { sortPackageJson } from "sort-package-json";
import { type TsConfigJson, type PackageJson } from "type-fest";

import { TEMPLATE_DIR } from "@/consts.js";
import {
  addPackageDependency,
  authDependencyMap,
  type AvailableAuthDependenciesKeys,
} from "@/helpers/addPackageDependency.js";
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

  const copyFile = (fileName: string) =>
    fs.copySync(path.join(authTemplateRoot, fileName), path.join(authDestination, fileName));

  const copyAndRenameFile = (origin: string, destinationFile: string) =>
    fs.copySync(path.join(authTemplateRoot, origin), path.join(authDestination, destinationFile));

  /* Copy the main `lucia.d.ts` type definitions and the credentials validation */
  copyFile("lucia.d.ts");
  copyFile("src/validation/credentials.ts");

  /* Copy relevant files for the correct database driver */
  if (databaseProvider === "planetscale") copyAndRenameFile("src/index-with-next-planetscale.ts", "src/index.ts");
  if (frontendFramework === "next")
    copyAndRenameFile("src/providers/with-next-credentials.ts", "src/providers/credentials.ts");

  /* Write `tsconfig.json` */
  const templateAuthTsConfig = fs.readJsonSync(path.join(authTemplateRoot, "tsconfig.json")) as TsConfigJson;
  templateAuthTsConfig.extends = "../../tsconfig.json";
  templateAuthTsConfig.include = ["src/index.ts", "lucia.d.ts"];
  fs.outputJsonSync(path.join(authDestination, "tsconfig.json"), templateAuthTsConfig, { spaces: 2 });

  /* Set correct dependencies on `package.json` */
  const templateAuthPackageJson = fs.readJsonSync(path.join(authTemplateRoot, "package.json")) as PackageJson;

  const authDependencies = ["@acme/config", "@acme/database", "lucia-auth", "zod"] as AvailableAuthDependenciesKeys[];
  const authDevDependencies = [] as AvailableAuthDependenciesKeys[];

  if (databaseProvider === "planetscale") authDependencies.push("@lucia-auth/adapter-mysql");
  if (frontendFramework === "next") authDevDependencies.push("next");

  /* Wipe "dependencies" field from `package.json` in order to replace with the
  correct dependency map */
  templateAuthPackageJson.dependencies = {};

  const withAddedDependencies = addPackageDependency<AvailableAuthDependenciesKeys>({
    dependencyMap: authDependencyMap,
    packageJson: templateAuthPackageJson,
    dependencies: authDependencies,
    devDependency: false,
  });

  const withAddedDevDependencies = addPackageDependency<AvailableAuthDependenciesKeys>({
    dependencyMap: authDependencyMap,
    packageJson: withAddedDependencies,
    dependencies: authDevDependencies,
    devDependency: true,
  });

  const sortedPackageJson = sortPackageJson(withAddedDevDependencies);

  fs.outputJsonSync(path.join(authDestination, "package.json"), sortedPackageJson, {
    spaces: 2,
  });
};
