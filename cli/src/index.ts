#!/usr/bin/env node

import { intro, outro } from "@clack/prompts";
import { setTimeout as sleep } from "node:timers/promises";
import color from "picocolors";

import {
  promptAppName,
  promptFrontendFramework,
  promptDeployProvider,
  promptGraphqlHostingAgent,
  promptAdditionalPackages,
  scaffoldProject,
} from "@/cli";

async function main() {
  console.log();
  intro(color.inverse("create cardinal-app"));

  const appName = await promptAppName();
  const frontendFramework = await promptFrontendFramework();
  const deployProvider = await promptDeployProvider(frontendFramework);
  const graphQLHostingAgent = await promptGraphqlHostingAgent(
    frontendFramework
  );
  const additionalPackages = await promptAdditionalPackages(frontendFramework);
  const scaffold = await scaffoldProject();

  outro("You're all set!");
  await sleep(1000);
}

main().catch(console.error);
