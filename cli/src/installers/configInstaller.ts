import path from "path";
import fs from "fs-extra";
import { sortPackageJson } from "sort-package-json";
import { type PackageJson } from "type-fest";

import { TEMPLATE_DIR } from "@/consts.js";
import { type ProjectOptions } from "@/index.js";

export const configInstaller = ({
  projectOptions,
  projectDir,
  projectName,
}: {
  projectOptions: ProjectOptions;
  projectDir: string;
  projectName: string;
}) => {
  const { frontendFramework, authentication, databaseProvider } = projectOptions;
  const configTemplateRoot = path.join(TEMPLATE_DIR, "config");
  const configTemplate =
    frontendFramework === "next" && databaseProvider && authentication
      ? path.join(configTemplateRoot, "with-next-auth-database")
      : frontendFramework === "next" && databaseProvider
      ? path.join(configTemplateRoot, "with-next-database")
      : null;

  const projectWorkspaceDir = path.join(projectOptions.appDir, "packages/config");

  const configDestination = path.join(projectWorkspaceDir);

  if (configTemplate) {
    fs.copySync(configTemplate, configDestination);

    const databasePackageJson = fs.readJSONSync(path.join(configTemplate, "package.json")) as PackageJson;
    databasePackageJson.name = "@acme/config";
    const sortedPackageJson = sortPackageJson(databasePackageJson);

    fs.outputJsonSync(path.join(configDestination, "package.json"), sortedPackageJson, {
      spaces: 2,
    });

    fs.removeSync(path.join(configDestination, "node_modules"));
  }
};
