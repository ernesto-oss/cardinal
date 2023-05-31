import { spinner as spinnerPrompt } from "@clack/prompts";

import { type ProjectOptions } from "@/index.js";
import { rootInstaller, configInstaller, databaseInstaller } from "@/installers/index.js";
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
  databaseInstaller({ projectDir, projectName, projectOptions });

  spinner.stop("Finished scaffolding monorepo");
};
