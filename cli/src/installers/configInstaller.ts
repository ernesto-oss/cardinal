import path from "path";
import fs from "fs-extra";
import { sortPackageJson } from "sort-package-json";
import { type PackageJson } from "type-fest";

import { TEMPLATE_DIR } from "@/consts.js";
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

  if (frontendFramework === "next")
    copyAndRenameFile("env-with-next.ts", "env.ts");
  if (frontendFramework === "next")
    databaseProvider === "none"
      ? copyAndRenameFile("env-with-next.ts", "env.ts")
      : copyAndRenameFile("env-with-next-database.ts", "env.ts");

  const configPackageJson = fs.readJsonSync(
    path.join(configTemplateRoot, "package.json"),
  ) as PackageJson;
  const sortedPackageJson = sortPackageJson(configPackageJson);
  fs.outputJsonSync(
    path.join(configDestination, "package.json"),
    sortedPackageJson,
    {
      spaces: 2,
    },
  );
};
