import { spinner as spinnerPrompt } from "@clack/prompts";

import { type ProjectOptions } from "@/index.js";
import {
  authInstaller,
  configInstaller,
  databaseInstaller,
  graphQLInstaller,
  nextjsInstaller,
  rootInstaller,
} from "@/installers/index.js";
import { PackageManager } from "@/utils/getUserPackageManager.js";

interface CreateProjectOptions {
  projectName: string;
  projectDir: string;
  projectOptions: ProjectOptions;
  pkgManager: PackageManager;
}

export const createProject = async ({ projectName, projectDir, projectOptions, pkgManager }: CreateProjectOptions) => {
  const spinner = spinnerPrompt();
  spinner.start("Scaffolding your project with selected options");

  rootInstaller({ pkgManager, projectDir, projectName, projectOptions });
  configInstaller({ projectDir, projectName, projectOptions });

  if (projectOptions.databaseProvider !== "none")
    databaseInstaller({ pkgManager, projectDir, projectName, projectOptions });

  if (projectOptions.authentication) authInstaller({ projectDir, projectName, projectOptions });

  if (projectOptions.backendType === "graphql")
    graphQLInstaller({ pkgManager, projectDir, projectName, projectOptions });

  if (projectOptions.frontendFramework === "next")
    nextjsInstaller({ pkgManager, projectDir, projectName, projectOptions });

  spinner.stop("Finished scaffolding monorepo");
};
