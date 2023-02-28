#!/usr/bin/env node
import { intro, outro, group, cancel } from "@clack/prompts";
import { setTimeout as sleep } from "node:timers/promises";
import color from "picocolors";
import { getUserPkgManager } from "@/utils/getUserPackageManager.js";
import { parseNameAndPath } from "@/utils/parseNameAndPath.js";
import {
  promptAppDirectory,
  promptFrontendFramework,
  promptDeployProvider,
  promptGraphqlHostingAgent,
  promptAdditionalPackages,
} from "@/cli/index.js";
import { type AvailablePackages } from "@/installers/index.js";
import { createProject } from "@/helpers/createProject.js";

export const runCli = async () => {
  const corePromptGroup = await group(
    {
      appDir: () => promptAppDirectory(),
      frontendFramework: () => promptFrontendFramework(),
    },
    {
      onCancel: () => {
        cancel("Installation stopped. Come back when you're ready to try again.");
        process.exit(0);
      },
    },
  );

  const frontendFramework = corePromptGroup.frontendFramework;

  const conditionalPromptGroup = await group(
    {
      deployProvider: () => promptDeployProvider(frontendFramework),
      graphqlHostingAgent: () => promptGraphqlHostingAgent(frontendFramework),
      additionalPackages: () => promptAdditionalPackages(frontendFramework),
    },
    {
      onCancel: () => {
        cancel("Installation stopped. Come back when you're ready to try again");
        process.exit(0);
      },
    },
  );

  const { deployProvider, graphqlHostingAgent, additionalPackages } = conditionalPromptGroup;

  const addons = additionalPackages as AvailablePackages[];

  return {
    appDir: corePromptGroup.appDir,
    frontendFramework: frontendFramework,
    deployProvider: deployProvider,
    graphQLHostingAgent: graphqlHostingAgent,
    additionalPackages: addons,
  };
};

async function main() {
  intro(`Let's create your new monorepo project with ${color.bold(color.magenta("Cardinal"))} ✨`);

  /* Get user package manager */
  const pkgManager = getUserPkgManager();

  /* Run CLI prompts and get information about what packages will be included on the scaffolded project */
  const { appDir, additionalPackages, deployProvider, frontendFramework, graphQLHostingAgent } = await runCli();

  /* Parses the app name and directory from the user input */
  const [scopedAppName, appPath] = parseNameAndPath(appDir);

  /* Bootstraps all the template files into the project directory */
  await createProject({
    packages: additionalPackages,
    pkgManager,
    projectDir: appPath,
    projectName: scopedAppName,
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
