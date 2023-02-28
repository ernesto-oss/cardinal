import { spinner as spinnerPrompt } from "@clack/prompts";
import { prismaInstaller } from "@/installers/prisma.js";
import { nextAuthInstaller } from "@/installers/nextAuth.js";
import { AvailablePackages } from "@/installers/index.js";
import { PackageManager } from "@/utils/getUserPackageManager.js";

interface CreateProjectOptions {
  projectName: string;
  projectDir: string;
  packages: AvailablePackages[];
  pkgManager: PackageManager;
}

export const createProject = async ({ projectName, projectDir, packages, pkgManager }: CreateProjectOptions) => {
  const spinner = spinnerPrompt();
  spinner.start("Scaffolding your project with selected options");

  const installerOptions = {
    projectName,
    packages,
    pkgManager,
    projectDir,
  };

  packages.includes("prisma") ? prismaInstaller(installerOptions) : null;
  packages.includes("next-auth") ? nextAuthInstaller(installerOptions) : null;

  spinner.stop("Finished scaffolding monorepo");
};
