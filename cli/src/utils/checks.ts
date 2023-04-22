export type FrontendFramework = string | symbol;

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

export async function checkValidDeployProviders() {
  let options = [
    { value: "vercel", label: "Vercel", hint: "Recommended for most apps" },
    {
      value: "aws",
      label: "AWS",
      hint: "Deploy to AWS with SST",
    },
  ];

  /* TODO: When more deployment paths start being supported, we can start adding then here on a
* per frontend framework basis */
  // if (frontendFramework === "next" || frontendFramework === "react") {
  //   options.push(
  //   );
  // }

  return options;
}
