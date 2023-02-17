// Run `npm start` to start the demo
import {
  intro,
  outro,
  confirm,
  select,
  spinner,
  isCancel,
  cancel,
  text,
} from "@clack/prompts";
import { setTimeout as sleep } from "node:timers/promises";
import color from "picocolors";

import { checkValidFrontendDeployProviders } from "@/helpers/checkValidFrontendDeployProviders";
import { checkValidGraphqlAgents } from "@/helpers/checkValidGraphqlAgents";

async function main() {
  console.log();
  intro(color.inverse(" create cardinal-app "));

  /* TODO: Validate app name before proceeding */
  const name = await text({
    message: "What should we name your new project?",
    placeholder: "my-cardinal-app",
  });

  const frontendFramework = await select({
    message: "What is your frontend framework of choice?",
    options: [
      { value: "next", label: "Next.js", hint: "Recommended" },
      { value: "react", label: "React w/Vite", hint: "For CSR apps" },
      { value: "astro", label: "Astro", hint: "For SSG sites" },
    ],
  });

  const validFrontendDeploys = await checkValidFrontendDeployProviders(
    frontendFramework
  );
  const validGraphQlAgents = await checkValidGraphqlAgents(frontendFramework);

  const deployProvider = await select({
    message: "Where do you want to deploy the front-end application?",
    options: validFrontendDeploys,
  });

  const graphQLHostingAgent = await select({
    message: "How do you want to host your GraphQL API?",
    options: validGraphQlAgents,
  });

  const s = spinner();
  s.start("Scaffolding your project");

  await sleep(3000);

  s.stop("Scaffolding your project");

  outro("You're all set!");

  await sleep(1000);
}

main().catch(console.error);
