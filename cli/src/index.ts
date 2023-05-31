#!/usr/bin/env node
import { setTimeout as sleep } from "node:timers/promises";
import { group, intro, outro } from "@clack/prompts";
import color from "picocolors";

import {
  promptAppDirectory,
  promptAuthentication,
  promptBackendType,
  promptDatabaseProvider,
  promptDeployProvider,
  promptFrontendFramework,
} from "@/cli/index.js";
import { createProject } from "@/helpers/createProject.js";
import { getUserPkgManager } from "@/utils/getUserPackageManager.js";
import { parseNameAndPath } from "@/utils/parseNameAndPath.js";

export const runCli = async () => {
  const corePromptGroup = await group({
    appDir: async () => await promptAppDirectory(),
    frontendFramework: async () => await promptFrontendFramework(),
  });

  const infraPromptGroup = await group({
    backendType: async () => await promptBackendType(corePromptGroup.frontendFramework),
    deployProvider: async () => await promptDeployProvider(),
  });

  const databaseProvider = await promptDatabaseProvider(infraPromptGroup.deployProvider);

  let authentication;
  if (databaseProvider !== "none") {
    authentication = await promptAuthentication();
  }

  return {
    appDir: corePromptGroup.appDir,
    frontendFramework: corePromptGroup.frontendFramework,
    backendType: infraPromptGroup.backendType,
    deployProvider: infraPromptGroup.deployProvider,
    databaseProvider,
    authentication,
  };
};

export type ProjectOptions = Awaited<ReturnType<typeof runCli>>;

async function main() {
  intro(`Let's create your new monorepo project with ${color.bold(color.magenta("Cardinal"))} ✨`);

  /* Get user package manager */
  const pkgManager = getUserPkgManager();

  /* Run CLI prompts and get information about what packages will be included on the scaffolded project */
  const projectOptions = await runCli();

  /* Parses the app name and directory from the user input */
  const [scopedAppName, appPath] = parseNameAndPath(projectOptions.appDir);

  console.log(projectOptions, scopedAppName, appPath);

  /* Bootstraps all the template files into the project directory */
  await createProject({
    pkgManager,
    projectName: scopedAppName,
    projectDir: appPath,
    projectOptions,
  });

  outro(`
    ${color.bold(color.green("✅Success!"))} Project created in ${color.magenta(appPath)}
    Next steps:
    ${color.dim(`
    cd ${appPath}
    ${pkgManager} start
    `)}
  `);

  /* Small time-gap after showing the final success message so the return to regular terminal control doesn't look too jarring */
  await sleep(1000);
}

main().catch((err) => {
  color.red(color.bold("The installation ran into an error:"));
  if (err instanceof Error) {
    console.error(err);
  } else {
    color.red(color.bold("An unknown error has ocurred. Please open an issue on GitHub with the issue bellow:"));
    console.log(err);
  }
  process.exit(1);
});
