import { select, multiselect, spinner, text } from "@clack/prompts";
import { setTimeout as sleep } from "node:timers/promises";

import {
  validateAppName,
  checkValidAddons,
  checkValidFrontendDeployProviders,
  checkValidGraphqlAgents,
} from "@/utils/checks";
import type { FrontendFramework } from "@/utils/checks";

export const promptAppName = async () => {
  const name = await text({
    message: "What should we name your new project?",
    placeholder: "my-cardinal-app",
    validate(value) {
      return validateAppName(value);
    },
  });
  return name;
};

export const promptFrontendFramework = async () => {
  const frontendFramework = await select({
    message: "What is your frontend framework of choice?",
    options: [
      { value: "next", label: "Next.js", hint: "Recommended" },
      { value: "react", label: "React w/Vite", hint: "For CSR apps" },
      { value: "astro", label: "Astro", hint: "For SSG sites" },
    ],
  });
  return frontendFramework;
};

export const promptDeployProvider = async (
  frontendFramework: FrontendFramework
) => {
  const validFrontendDeploys = await checkValidFrontendDeployProviders(
    frontendFramework
  );
  const deployProvider = await select({
    message: "Where do you want to deploy the front-end application?",
    options: validFrontendDeploys,
  });
  return deployProvider;
};

export const promptGraphqlHostingAgent = async (
  frontendFramework: FrontendFramework
) => {
  const validGraphQlAgents = await checkValidGraphqlAgents(frontendFramework);
  const graphQLHostingAgent = await select({
    message: "How do you want to host your GraphQL API?",
    options: validGraphQlAgents,
  });
  return graphQLHostingAgent;
};

export const promptAdditionalPackages = async (
  frontendFrameword: FrontendFramework
) => {
  const validAddons = await checkValidAddons(frontendFrameword);
  const addons = await multiselect({
    message: "Which additions would you like to enable?",
    options: validAddons,
  });
  return addons;
};

export const scaffoldProject = async () => {
  const s = spinner();
  s.start("Scaffolding your project");
  await sleep(3000);
  s.stop("✅ Success!") 
};
