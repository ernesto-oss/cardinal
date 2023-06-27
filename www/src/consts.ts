export const SITE = {
  title: "Cardinal",
  description: "The monorepo starter for full-stack applications.",
  defaultLanguage: "en-us",
} as const;

export const OPEN_GRAPH = {
  image: {
    src: "https://raw.githubusercontent.com/ernesto-oss/cardinal/main/www/public/open-graph-banner.jpg",
    alt: "cardinal logo in a subtle grid-like pattern background",
  },
};

export const GITHUB_EDIT_URL = `https://github.com/ernesto-oss/cardinal/tree/main/www`;

export const ALGOLIA = {
  indexName: "cardinal-docs",
  appId: "ESHYC2PSBV",
  apiKey: "efb9b3623dd00e90072a861f27f58357",
};
