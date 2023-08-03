import path from "path";
import fs from "fs-extra";
import yaml from "js-yaml";
import { sortPackageJson } from "sort-package-json";
import { type PackageJson } from "type-fest";

import { TEMPLATE_DIR } from "@/consts.js";
import {
  addPackageDependency,
  coreDependencyMap,
  type AvailableCoreDependenciesKeys,
} from "@/helpers/addPackageDependency.js";
import {
  createPackageScripts,
  rootScripts,
} from "@/helpers/createPackageScripts.js";
import { type ProjectOptions } from "@/index.js";
import { type PackageManager } from "@/utils/getUserPackageManager.js";

export const rootInstaller = ({
  projectDir,
  projectName,
  pkgManager,
  projectOptions,
}: {
  projectDir: string;
  projectName: string;
  pkgManager: PackageManager;
  projectOptions: ProjectOptions;
}) => {
  const { frontendFramework } = projectOptions;
  const templateRoot = path.join(TEMPLATE_DIR);
  const projectDestination = projectDir;

  const copyAndRename = (origin: string, destinationFile: string) =>
    fs.copySync(
      path.join(templateRoot, origin),
      path.join(projectDestination, destinationFile),
    );

  copyAndRename("_tsconfig.json", "tsconfig.json");
  copyAndRename("_.gitignore", ".gitignore");
  copyAndRename("_turbo-next.json", "turbo.json");

  // if (frontendFramework === "next")
  //   copyAndRename("_.eslintrc-next.js", ".eslintrc.js");

  const rootPackageJson = fs.readJsonSync(
    path.join(templateRoot, "package.json"),
  ) as PackageJson;
  rootPackageJson.name = projectName;
  rootPackageJson.dependencies = {};
  rootPackageJson.devDependencies = {};

  /* When the package manager is pnpm, write the root yaml file with
  the workspace definitions */
  if (pkgManager === "pnpm") {
    const workspaceYaml = yaml.dump({ packages: ["packages/*"] });
    fs.outputFileSync(
      path.join(projectDestination, "pnpm-workspace.yaml"),
      workspaceYaml,
    );
    copyAndRename("_.npmrc", ".npmrc");
  }

  /* When the package manager is npm or yarn, just write to the
  "workspaces" field of package.json */
  if (pkgManager === "npm" || pkgManager === "yarn") {
    rootPackageJson.workspaces = ["packages/*"];
  }

  const rootDependencies = [
    "turbo",
    "prettier",
    "eslint",
    "typescript",
    "@types/node",
    "@types/eslint",
    "@types/prettier",
  ] as AvailableCoreDependenciesKeys[];

  const withAddedDependencies = addPackageDependency({
    dependencyMap: coreDependencyMap,
    packageJson: rootPackageJson,
    dependencies: rootDependencies,
    devDependency: false,
  });

  /* Set `package.json` scripts */
  const scriptsMap = { ...rootScripts };
  const withAddedScripts = createPackageScripts<keyof typeof scriptsMap>({
    packageJson: withAddedDependencies,
    scriptsMap: scriptsMap,
    packageManager: pkgManager,
    scripts: ["dev", "lint", "build"],
  });

  const sortedPackageJson = sortPackageJson(withAddedScripts);

  fs.outputJsonSync(
    path.join(projectDestination, "package.json"),
    sortedPackageJson,
    {
      spaces: 2,
    },
  );
};
