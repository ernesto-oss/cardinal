import path from "path";
import fs from "fs-extra";
import { sortPackageJson } from "sort-package-json";
import { type PackageJson } from "type-fest";

import { TEMPLATE_DIR } from "@/consts.js";
import { type ProjectOptions } from "@/index.js";

export const databaseInstaller = ({
  projectOptions,
  projectDir,
  projectName,
}: {
  projectOptions: ProjectOptions;
  projectDir: string;
  projectName: string;
}) => {
  const { authentication, databaseProvider } = projectOptions;
  const databaseTemplateRoot = path.join(TEMPLATE_DIR, "database");
  const databaseTemplate =
    databaseProvider === "planetscale" && authentication
      ? path.join(databaseTemplateRoot, "with-auth-planetscale")
      : databaseProvider === "sqlite" && authentication
      ? path.join(databaseTemplateRoot, "with-auth-sqlite")
      : null;

  const projectWorkspaceDir = path.join(projectOptions.appDir, "packages/database");

  const databaseDestination = path.join(projectWorkspaceDir);

  if (databaseTemplate) {
    fs.copySync(databaseTemplate, databaseDestination);

    const databasePackageJson = fs.readJSONSync(path.join(databaseTemplate, "package.json")) as PackageJson;
    databasePackageJson.dependencies!["@acme/config"] = "workspace:*";
    databasePackageJson.name = "@acme/database";
    const sortedPackageJson = sortPackageJson(databasePackageJson);

    fs.outputJsonSync(path.join(databaseDestination, "package.json"), sortedPackageJson, {
      spaces: 2,
    });

    fs.removeSync(path.join(databaseDestination, "node_modules"));
  }
};
