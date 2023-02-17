type FrontendFramework = symbol | "next" | "react" | "astro";

export async function checkValidGraphqlAgents(
  frontendFramework: FrontendFramework
) {
  let options = [
    {
      value: "gcp",
      label: "Google Cloud Functions(serverless)",
      hint: "GraphQL endpoint will be served from a Google Cloud Function",
    },
    {
      value: "lambda",
      label: "Amazon AWS Lambda(serverless)",
      hint: "GraphQL endpoint will be served from Lambda or Lambda@Edge",
    },
    {
      value: "vercel",
      label: "Vercel(serverless)",
      hint: "GraphQL endpoint will be server from a Vercel Serverless Function",
    },
  ];

  if (frontendFramework === "next") {
    options.unshift({
      value: "next",
      label: "Directly from Next.js app (serverless)",
      hint: "GraphQL endpoint will be served from within your Next.js application, wherever you deploy it",
    });
  }

  return options;
}
