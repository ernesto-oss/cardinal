import { select, multiselect, text } from "@clack/prompts";
import colors from "picocolors";

import {
  validateAppDirectory,
  checkValidAddons,
  checkValidDeployProviders
} from "@/utils/checks.js";
import type { FrontendFramework } from "@/utils/checks.js";

export const promptAppDirectory = async () => {
  const name = await text({
    message: "Where should we create your project?",
    initialValue: "./my-cardinal-app",
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
    initialValue: "next",
    message: "What is your frontend framework of choice?",
    options: [
      { value: "next", label: "Next.js", hint: "Recommended" },
      { value: "react", label: "React w/Vite" }
    ],
  });
  return frontendFramework;
};

export const promptDeployProvider = async () => {
  const validFrontendDeploys = await checkValidDeployProviders();
  const deployProvider = await select({
    initialValue: "vercel",
    message: "Where do you want to deploy your application?",
    options: validFrontendDeploys,
  });
  return deployProvider;
};

export const promptAdditionalPackages = async (frontendFramework: FrontendFramework) => {
  const validAddons = await checkValidAddons(frontendFramework);
  const addons = await multiselect({
    message: `Which additions would you like to enable? (Press ${colors.cyan("<space>")} to select and ${colors.cyan(
      "<enter>",
    )} to proceed)`,
    options: validAddons,
    required: false,
  });
  return addons;
};
