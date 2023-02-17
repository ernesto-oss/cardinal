type FrontendFramework = symbol | "next" | "react" | "astro";

export async function checkValidFrontendDeployProviders(
  frontendFramework: FrontendFramework
) {
  /* Core options that will work for any framework */
  let options = [
    { value: "vercel", label: "Vercel", hint: "Recommended for most apps" },
    {
      value: "aws",
      label: "AWS",
      hint: "Uses SST to deploy your app to AWS",
    },
  ];

  /* Only push Google Cloud Functions and Docker container if Next.js or React where chosen */
  if (frontendFramework === "next" || frontendFramework === "react") {
    options.push(
      {
        value: "gcp",
        label: "Google Cloud",
        hint: "Uses Google Cloud Run to run your app on a serverless container",
      },
      {
        value: "docker",
        label: "Docker Container",
        hint: "For local development",
      }
    );
  }

  return options;
}
