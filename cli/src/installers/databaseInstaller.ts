import path from "path";
import fs from "fs-extra";
import { sortPackageJson } from "sort-package-json";
import { type PackageJson, type TsConfigJson } from "type-fest";

import { TEMPLATE_DIR } from "@/consts.js";
import {
  addPackageDependency,
  databaseDependencyMap,
  type AvailableDatabaseDependenciesKeys,
} from "@/helpers/addPackageDependency.js";
import { coreScriptsMap, createPackageScripts, databaseScriptsMap } from "@/helpers/createPackageScripts.js";
import { type ProjectOptions } from "@/index.js";
import { type PackageManager } from "@/utils/getUserPackageManager.js";

export const databaseInstaller = ({
  pkgManager,
  projectOptions,
  projectDir,
}: {
  pkgManager: PackageManager;
  projectOptions: ProjectOptions;
  projectDir: string;
}) => {
  const { authentication, databaseProvider } = projectOptions;
  const databaseTemplateRoot = path.join(TEMPLATE_DIR, "database");
  const databaseDestination = path.join(projectDir, "packages/database");

  const copyFile = (fileName: string) =>
    fs.copySync(path.join(databaseTemplateRoot, fileName), path.join(databaseDestination, fileName));

  const copyAndRenameFile = (origin: string, destinationFile: string) =>
    fs.copySync(path.join(databaseTemplateRoot, origin), path.join(databaseDestination, destinationFile));

  /* Copy the main drizzle configuration file */
  copyFile("drizzle.config.ts");

  /* Copy relevant files for the correct database driver */
  if (databaseProvider === "planetscale") {
    copyAndRenameFile("src/index-with-planetscale.ts", "src/index.ts");
    authentication ? copyAndRenameFile("src/schema-with-auth-planetscale.ts", "src/schema.ts") : null;
  }
  /* Write `tsconfig.json` */
  const templateDatabaseTsConfig = fs.readJsonSync(path.join(databaseTemplateRoot, "tsconfig.json")) as TsConfigJson;
  templateDatabaseTsConfig.extends = "../../tsconfig.json";
  templateDatabaseTsConfig.include = ["src/index.ts"];
  fs.outputJsonSync(path.join(databaseDestination, "tsconfig.json"), templateDatabaseTsConfig, { spaces: 2 });

  /* Set correct dependencies on `package.json` */
  const templateDatabasePackageJson = fs.readJsonSync(path.join(databaseTemplateRoot, "package.json")) as PackageJson;
  const databaseDependencies = ["drizzle-orm", "@acme/config"] as AvailableDatabaseDependenciesKeys[];
  const databaseDevDependencies = ["drizzle-kit"] as AvailableDatabaseDependenciesKeys[];

  if (databaseProvider === "planetscale") databaseDependencies.push("@planetscale/database");

  /* Wipe "dependencies" field from `package.json` in order to replace with the
  correct dependency map */
  templateDatabasePackageJson.dependencies = {};

  const withAddedDependencies = addPackageDependency<AvailableDatabaseDependenciesKeys>({
    dependencyMap: databaseDependencyMap,
    packageJson: templateDatabasePackageJson,
    dependencies: databaseDependencies,
    devDependency: false,
  });

  const withAddedDevDependencies = addPackageDependency<AvailableDatabaseDependenciesKeys>({
    dependencyMap: databaseDependencyMap,
    packageJson: withAddedDependencies,
    dependencies: databaseDevDependencies,
    devDependency: true,
  });

  /* Set `package.json` scripts */
  const scriptsMap = { ...databaseScriptsMap, ...coreScriptsMap };

  const withSuffixedScripts = createPackageScripts<keyof typeof scriptsMap>({
    packageJson: withAddedDevDependencies,
    scriptsMap: scriptsMap,
    packageManager: pkgManager,
    commandSuffix: databaseProvider === "planetscale" ? "mysql" : "sqlite",
    scripts: ["db-introspect"],
  });

  const withAddedScripts = createPackageScripts<keyof typeof scriptsMap>({
    packageJson: withSuffixedScripts,
    scriptsMap: scriptsMap,
    packageManager: pkgManager,
    scripts: ["with-env", "db-drop", "db-migration"],
  });

  const sortedPackageJson = sortPackageJson(withAddedScripts);

  fs.outputJsonSync(path.join(databaseDestination, "package.json"), sortedPackageJson, {
    spaces: 2,
  });
};
