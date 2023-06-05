import { cancel, isCancel, select, text } from "@clack/prompts";
import color from "picocolors";

import type {
  BackendType,
  DatabaseProvider,
  DeploymentProvider,
  FrontendFramework,
  Option,
  SelectOptions,
} from "@/types/index.js";
import { validateAppDirectory } from "@/utils/checks.js";

const cancellationMessage = "Installation stopped. Come back when you're ready to try again.";
const promptHelper = (message: string) =>
  `${color.hidden("###")}${color.bold(color.bgCyan(" HINT "))} ${color.dim(message)}`;

function handlePromptCancellation(target: unknown) {
  if (isCancel(target)) {
    cancel(cancellationMessage);
    process.exit(0);
  }
}

export async function promptAppDirectory() {
  const name = await text({
    message: `Where should we create your project?
    ${promptHelper(`This is where your monorepo will be scaffolded relative to your current working directory`)}
    `,
    initialValue: "./my-cardinal-app",
    placeholder: "./my-cardinal-app",
    defaultValue: "./my-cardinal-app",
    validate(value) {
      return validateAppDirectory(value);
    },
  });

  handlePromptCancellation(name);
  return name;
}

export async function promptFrontendFramework() {
  const frontendFramework = await select({
    message: `What is your frontend framework of choice?
    ${promptHelper(`This is the framework you'll use to author your web application`)}
    `,
    initialValue: "next",
    options: [
      { value: "next", label: "Next.js", hint: "Next.js 13 with React Server Components" },
      { value: "react", label: "React w/Vite", hint: "Client-side React with Vite" },
    ],
  } as SelectOptions<Option<FrontendFramework>[], FrontendFramework>);

  handlePromptCancellation(frontendFramework);
  return frontendFramework;
}

export async function promptBackendType(frontendFramework: FrontendFramework) {
  const options: Option<BackendType>[] = [
    { value: "rest", label: "REST" },
    { value: "graphql", label: "GraphQL" },
    // { value: "trpc", label: "tRPC" },
  ];

  if (frontendFramework === "next") {
    options.push({
      value: "rsc",
      label: "React Server Components",
      hint: "Perform server tasks from within React Server Components without a separate backend",
    });
  }

  const backendType = await select({
    message: `What is your backend type of choice?
    ${promptHelper(`The architectural style you'll be using to build your backend service`)}
    `,
    initialValue: "rest",
    options,
  } as SelectOptions<Option<BackendType>[], BackendType>);

  handlePromptCancellation(backendType);
  return backendType;
}

export const promptDeployProvider = async () => {
  const options: Option<DeploymentProvider>[] = [
    { value: "vercel", label: "Vercel", hint: "Deploy your application stack on Vercel" },
    // { value: "aws", label: "AWS", hint: "Deploy your application stack to AWS with SST" },
  ];

  // const deployProvider = await select({
  //   message: `Where do you want to deploy your application?
  //   ${promptHelper(
  //     `Choose a cloud service provider where your stack is gonna be deployed. We will configure IaaC and/or provide you with key documentation when needed`,
  //   )}
  //   `,
  //   initialValue: "vercel",
  //   options,
  // } as SelectOptions<Option<DeploymentProvider>[], DeploymentProvider>);

  // handlePromptCancellation(deployProvider);
  // return deployProvider;

  return "vercel"
};

export async function promptDatabaseProvider() {
  const options: Option<DatabaseProvider>[] = [
    { value: "planetscale", label: "Planetscale", hint: "Drizzle ORM with Planetscale's Serverless Driver" },
    {
      value: "none",
      label: "No database",
      hint: "No database will be setup. You can setup your own database configuration later.",
    },
  ];

  const databaseProvider = await select({
    message: `What kind of database do you want?
    ${promptHelper(`This will setup the proper tools for you to communicate with a database of your choice`)}
    `,
    initialValue: "planetscale",
    options,
  } as SelectOptions<Option<DatabaseProvider>[], DatabaseProvider>);

  handlePromptCancellation(databaseProvider);
  return databaseProvider;
}

export async function promptAuthentication() {
  const authentication = await select({
    message: `Would you like to enable authentication features for your app?
    ${promptHelper(`This will setup a basic auth system that can be extended with the OAuth providers of your choice`)}
    `,
    initialValue: true,
    options: [
      { value: true, label: "Yes" },
      { value: false, label: "No" },
    ],
  });

  handlePromptCancellation(authentication);
  return authentication;
}
