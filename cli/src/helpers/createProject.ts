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
import { type PackageManager } from "@/utils/getUserPackageManager.js";

interface CreateProjectOptions {
  projectName: string;
  projectDir: string;
  projectOptions: ProjectOptions;
  pkgManager: PackageManager;
}

export const createProject = ({ projectName, projectDir, projectOptions, pkgManager }: CreateProjectOptions) => {
  const spinner = spinnerPrompt();
  spinner.start("Scaffolding your project with selected options");

  rootInstaller({ pkgManager, projectDir, projectName });
  configInstaller({ projectDir, projectOptions });

  if (projectOptions.databaseProvider !== "none") databaseInstaller({ pkgManager, projectDir, projectOptions });

  if (projectOptions.authentication) authInstaller({ projectDir, projectOptions });

  if (projectOptions.backendType === "graphql") graphQLInstaller({ pkgManager, projectDir, projectOptions });

  if (projectOptions.frontendFramework === "next") nextjsInstaller({ pkgManager, projectDir, projectOptions });

  spinner.stop("Finished scaffolding monorepo");
};
