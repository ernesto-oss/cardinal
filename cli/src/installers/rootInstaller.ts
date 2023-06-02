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
  const projectDestination = projectDir;

  const copyFile = async (fileName: string) =>
    fs.copySync(path.join(templateRoot, fileName), path.join(projectDestination, fileName));
  
  copyFile("tsconfig.json");
  copyFile(".eslintrc.cjs");
  copyFile(".gitignore");
  copyFile(".prettierignore");
  copyFile(".npmrc");
  copyFile(".prettierrc.js");

  const rootPackageJson = fs.readJsonSync(path.join(templateRoot, "package.json")) as PackageJson;
  rootPackageJson.name = projectName;

  if (pkgManager === "pnpm") {
    const workspaceYaml = yaml.dump({ packages: ["packages/**"] });
    fs.outputFileSync(path.join(projectDestination, "pnpm-workspace.yaml"), workspaceYaml);
  }

  if (pkgManager === "npm" || pkgManager === "yarn"){ 
    rootPackageJson.workspaces = ["packages/**"]; 
  } 

  const sortedPackageJson = sortPackageJson(rootPackageJson);
  fs.outputJsonSync(path.join(projectDestination, "package.json"), sortedPackageJson, {
    spaces: 2,
  });
};
