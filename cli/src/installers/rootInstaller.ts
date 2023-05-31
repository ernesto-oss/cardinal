import path from "path";
import fs from "fs-extra";
import yaml from "js-yaml";
import { sortPackageJson } from "sort-package-json";
import { type PackageJson } from "type-fest";

import { TEMPLATE_DIR } from "@/consts.js";
import { type ProjectOptions } from "@/index.js";
import { type PackageManager } from "@/utils/getUserPackageManager.js";

export const rootInstaller = ({
  projectDir,
  projectName,
  projectOptions,
  pkgManager,
}: {
  projectDir: string;
  projectName: string;
  projectOptions: ProjectOptions;
  pkgManager: PackageManager;
}) => {
  const templateRoot = path.join(TEMPLATE_DIR);
  const projectRootDestination = projectDir;

  fs.copySync(path.join(templateRoot, "tsconfig.json"), path.join(projectRootDestination, "tsconfig.json"));
  fs.copySync(path.join(templateRoot, ".eslintrc.cjs"), path.join(projectRootDestination, ".eslintrc.cjs"));
  fs.copySync(path.join(templateRoot, ".gitignore"), path.join(projectRootDestination, ".gitignore"));
  fs.copySync(path.join(templateRoot, ".prettierignore"), path.join(projectRootDestination, ".prettierignore"));
  fs.copySync(path.join(templateRoot, ".prettierrc.js"), path.join(projectRootDestination, ".prettierrc.js"));
  fs.copySync(path.join(templateRoot, ".npmrc"), path.join(projectRootDestination, ".npmrc"));

  const rootPackageJson = fs.readJsonSync(path.join(templateRoot, "package.json")) as PackageJson;
  rootPackageJson.name = projectName;

  if (pkgManager === "pnpm") {
    const workspaceYaml = yaml.dump({ packages: ["packages/**"] });
    fs.outputFileSync(path.join(projectRootDestination, "pnpm-workspace.yaml"), workspaceYaml);
  }
  if (pkgManager === "npm" || pkgManager === "yarn") rootPackageJson.workspaces = ["packages/**"];

  const sortedPackageJson = sortPackageJson(rootPackageJson);
  fs.outputJsonSync(path.join(projectRootDestination, "package.json"), sortedPackageJson, {
    spaces: 2,
  });

  fs.removeSync(path.join(projectRootDestination, "node_modules"));
};
