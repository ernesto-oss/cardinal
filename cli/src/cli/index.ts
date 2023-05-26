import { select, text, cancel, isCancel } from "@clack/prompts";

import { validateAppDirectory } from "@/utils/checks.js";
import type {
  SelectOptions,
  Option,
  FrontendFramework,
  BackendType,
  DeploymentProvider,
  DatabaseProvider,
} from "@/types/index.js";

const cancellationMessage = "Installation stopped. Come back when you're ready to try again.";

function handlePromptCancellation(target: unknown) {
  if (isCancel(target)) {
    cancel(cancellationMessage);
    process.exit(0);
  }
}

/**
 * Prompts and validates the directory where the
 * projet is going to be installed
 */
export async function promptAppDirectory() {
  const name = await text({
    message: "Where should we create your project?",
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

/**
 * Prompts and returns the user selected frontend framework
 */
export async function promptFrontendFramework() {
  const frontendFramework = await select({
    initialValue: "next",
    message: "What is your frontend framework of choice?",
    options: [
      { value: "next", label: "Next.js", hint: "Next.js 13 with React Server Components" },
      { value: "react", label: "React w/Vite", hint: "Client-side React with Vite" },
    ],
  } as SelectOptions<Option<FrontendFramework>[], FrontendFramework>);

  handlePromptCancellation(frontendFramework);
  return frontendFramework;
}

/**
 * Prompts and returns the user selected backend type validated agains the previously choosen frameworks
 */
export async function promptBackendType(frontendFramework: FrontendFramework) {
  const options: Option<BackendType>[] = [
    {
      value: "rest",
      label: "REST",
      hint: `${frontendFramework === "next" ? "REST endpoints from Next.js Route Handlers" : undefined}`,
    },
    {
      value: "graphql",
      label: "GraphQL",
      hint: `${frontendFramework === "next" ? "GraphQL endpoint served from a Next.js Route Handler" : undefined}`,
    },
    {
      value: "trpc",
      label: "tRPC",
      hint: `${frontendFramework === "next" ? "tRPC server from a Next.js Route Handler" : undefined}`,
    },
  ];

  if (frontendFramework === "next") {
    options.push({
      value: "rsc",
      label: "React Server Components",
      hint: "Perform server tasks from within React Server Components without a separate backend",
    });
  }

  const backendType = await select({
    initialValue: "rest",
    message: "What is your backend type of choice?",
    options,
  } as SelectOptions<Option<BackendType>[], BackendType>);

  handlePromptCancellation(backendType);
  return backendType;
}

export const promptDeployProvider = async () => {
  const options: Option<DeploymentProvider>[] = [
    { value: "vercel", label: "Vercel", hint: "Deploy your application stack on Vercel" },
    { value: "aws", label: "AWS", hint: "Deploy your application stack to AWS with SST" },
  ];

  const deployProvider = await select({
    initialValue: "vercel",
    message: "Where do you want to deploy your application?",
    options,
  } as SelectOptions<Option<DeploymentProvider>[], DeploymentProvider>);

  handlePromptCancellation(deployProvider);
  return deployProvider;
};

export async function promptDatabaseProvider(deployProvider: DeploymentProvider) {
  const options: Option<DatabaseProvider>[] = [
    { value: "planetscale", label: "Planetscale", hint: "Drizzle ORM connected to Planetscale's Serverless Driver" },
    { value: "sqlite", label: "SQLite", hint: "Dizzle ORM connected to a local SQLite file" },
  ];

  if (deployProvider === "aws") {
    options.push(
      {
        value: "mysql",
        label: "MySQL",
        hint: `${deployProvider === "aws" ? "Drizzle ORM connected to a MySQL database on Amazon RDS" : undefined}`,
      },
      {
        value: "postgres",
        label: "Postgres",
        hint: `${deployProvider === "aws" ? "Drizzle ORM connected to a Postgres database on AWS RDS" : undefined}`,
      },
    );
  }

  options.push({
    value: "none",
    label: "No database",
    hint: "None of the provided database options will be setup. You can setup your own database configuration later.",
  });

  const databaseProvider = await select({
    initialValue: "planetscale",
    message: "What kind of database do you want?",
    options,
  } as SelectOptions<Option<DatabaseProvider>[], DatabaseProvider>);

  handlePromptCancellation(databaseProvider);
  return databaseProvider;
}

export async function promptAuthentication() {
  const authentication = await select({
    initialValue: true,
    message: "Would you like to enable authentication features for your app?",
    options: [
      { value: true, label: "Yes" },
      { value: false, label: "No" },
    ],
  });

  handlePromptCancellation(authentication);
  return authentication;
}
