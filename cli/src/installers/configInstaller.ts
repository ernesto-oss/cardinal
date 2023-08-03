import path from "path";
import fs from "fs-extra";
import { sortPackageJson } from "sort-package-json";
import { type PackageJson } from "type-fest";

import { TEMPLATE_DIR } from "@/consts.js";
import {
  addPackageDependency,
  configDependencyMap,
  type AvailableConfigDependenciesKeys,
} from "@/helpers/addPackageDependency.js";
import { type ProjectOptions } from "@/index.js";

export const configInstaller = ({
  projectOptions,
  projectDir,
}: {
  projectOptions: ProjectOptions;
  projectDir: string;
}) => {
  const { frontendFramework, databaseProvider } = projectOptions;
  const configTemplateRoot = path.join(TEMPLATE_DIR, "config");
  const configDestination = path.join(projectDir, "packages/config");

  const copyFile = (fileName: string) =>
    fs.copySync(
      path.join(configTemplateRoot, fileName),
      path.join(configDestination, fileName),
    );

  const copyAndRenameFile = (origin: string, destinationFile: string) =>
    fs.copySync(
      path.join(configTemplateRoot, origin),
      path.join(configDestination, destinationFile),
    );

  copyFile("tsconfig.json");
  copyFile("prettier.config.js");

  if (frontendFramework === "next") {
    copyAndRenameFile("env-with-next.ts", "env.ts");
    copyAndRenameFile("eslint-with-next.js", "eslint.js");

    databaseProvider === "none"
      ? copyAndRenameFile("env-with-next.ts", "env.ts")
      : copyAndRenameFile("env-with-next-database.ts", "env.ts");
  }

  /* Set correct dependencies on `package.json` */
  const configPackageJson = fs.readJsonSync(
    path.join(configTemplateRoot, "package.json"),
  ) as PackageJson;

  const configDependencies = [
    "@t3-oss/env-core",
    "@typescript-eslint/eslint-plugin",
    "@typescript-eslint/parser",
    "@types/eslint",
    "eslint-config-prettier",
    "zod",
  ] as AvailableConfigDependenciesKeys[];

  const configDevDependencies = [
    "eslint",
    "prettier",
  ] as AvailableConfigDependenciesKeys[];

  if (frontendFramework === "next")
    configDependencies.push("eslint-config-next", "eslint-plugin-react");

  configPackageJson.dependencies = {};
  configPackageJson.devDependencies = {};
  configPackageJson.name = "@acme/config";

  const withAddedDependencies = addPackageDependency({
    dependencyMap: configDependencyMap,
    packageJson: configPackageJson,
    dependencies: configDependencies,
    devDependency: false,
  });

  const withAddedDevDependencies = addPackageDependency({
    dependencyMap: configDependencyMap,
    packageJson: withAddedDependencies,
    dependencies: configDevDependencies,
    devDependency: true,
  });

  const sortedPackageJson = sortPackageJson(withAddedDevDependencies);

  fs.outputJsonSync(
    path.join(configDestination, "package.json"),
    sortedPackageJson,
    {
      spaces: 2,
    },
  );
};
