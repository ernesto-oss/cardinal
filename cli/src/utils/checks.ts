export type FrontendFramework = symbol | "next" | "react" | "astro";

const validationRegExp =
  /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/;

//Validate a string against allowed package.json names
export const validateAppDirectory = (input: string) => {
  const paths = input.split("/");

  // If the first part is a @, it's a scoped package
  const indexOfDelimiter = paths.findIndex((p) => p.startsWith("@"));

  let appName = paths[paths.length - 1];
  if (paths.findIndex((p) => p.startsWith("@")) !== -1) {
    appName = paths.slice(indexOfDelimiter).join("/");
  }

  if (input === "." || validationRegExp.test(appName ?? "")) {
    return;
  } else {
    return "App name must consist of only lowercase alphanumeric characters, '-', and '_'";
  }
};

export async function checkValidAddons(frontendFramework: FrontendFramework) {
  let options = [
    { value: "prisma", label: "prisma" },
    { value: "tailwind", label: "tailwind" },
  ];

  if (frontendFramework === "next") {
    options.push({ value: "next-auth", label: "next-auth" });
  }

  return options;
}

export async function checkValidFrontendDeployProviders(
  frontendFramework: FrontendFramework
) {
  /* Core options that will work for any framework */
  let options = [
    { value: "vercel", label: "Vercel", hint: "Recommended for most apps" },
    {
      value: "aws",
      label: "AWS",
      hint: "Deploy to AWS with SST",
    },
  ];

  /* Only push Google Cloud Functions and Docker container if Next.js or React where chosen */
  if (frontendFramework === "next" || frontendFramework === "react") {
    options.push(
      {
        value: "gcp",
        label: "Google Cloud",
        hint: "Deploy on Google Cloud Run",
      },
      {
        value: "docker",
        label: "Docker Container",
        hint: "Deploy with traditional Docker container",
      }
    );
  }

  return options;
}

export async function checkValidGraphqlAgents(
  frontendFramework: FrontendFramework
) {
  let options = [
    {
      value: "gcp",
      label: "Google Cloud Functions",
    },
    {
      value: "lambda",
      label: "Amazon AWS Lambda",
    },
    {
      value: "vercel",
      label: "Vercel",
    },
  ];

  if (frontendFramework === "next") {
    options.unshift({
      value: "next",
      label: "Directly from the Next.js app",
    });
  }

  return options;
}
