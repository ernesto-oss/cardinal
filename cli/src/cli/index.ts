import { select, multiselect, text } from "@clack/prompts";
import colors from "picocolors";

import {
  validateAppDirectory,
  checkValidAddons,
  checkValidFrontendDeployProviders,
  checkValidGraphqlAgents,
} from "@/utils/checks";
import type { FrontendFramework } from "@/utils/checks";

export const promptAppDirectory = async () => {
  const name = await text({
    message: "Where should we create your project?",
    placeholder: "./my-cardinal-app",
    defaultValue: "./my-cardinal-app",
    validate(value) {
      return validateAppDirectory(value);
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

export const promptDeployProvider = async (frontendFramework: FrontendFramework) => {
  const validFrontendDeploys = await checkValidFrontendDeployProviders(frontendFramework);
  const deployProvider = await select({
    message: "Where do you want to deploy the front-end application?",
    options: validFrontendDeploys,
  });
  return deployProvider;
};

export const promptGraphqlHostingAgent = async (frontendFramework: FrontendFramework) => {
  const validGraphQlAgents = await checkValidGraphqlAgents(frontendFramework);
  const graphQLHostingAgent = await select({
    message: "How do you want to host your GraphQL API?",
    options: validGraphQlAgents,
  });
  return graphQLHostingAgent;
};

export const promptAdditionalPackages = async (frontendFrameword: FrontendFramework) => {
  const validAddons = await checkValidAddons(frontendFrameword);
  const addons = await multiselect({
    message: `Which additions would you like to enable? (Press ${colors.cyan("<space>")} to select and ${colors.cyan(
      "<enter>",
    )} to proceed)`,
    options: validAddons,
    required: false,
  });
  return addons;
};
