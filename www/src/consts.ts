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

/* FIXME: Remove this when the search component has been refactored to something other
then Algolia */
export const ALGOLIA = {
  indexName: "cardinal-docs",
  appId: "ESHYC2PSBV",
  apiKey: "efb9b3623dd00e90072a861f27f58357",
};

export const KNOWN_LANGUAGES = {
  en: "English",
} as const;
export const KNOWN_LANGUAGE_CODES = Object.values(KNOWN_LANGUAGES);
export type KnownLanguageCode = keyof typeof KNOWN_LANGUAGES;

export type OuterHeaders = "Overview" | "Usage" | "Development Workflow";

export type SidebarItem<TCode extends KnownLanguageCode = KnownLanguageCode> = {
  text: string;
  link: `docs/${TCode}/${string}`;
};

export type SidebarItemLink = SidebarItem["link"];

export type Sidebar = {
  [TCode in KnownLanguageCode]: {
    [THeader in OuterHeaders]?: SidebarItem<TCode>[];
  };
};

export const SIDEBAR: Sidebar = {
  en: {
    Overview: [
      { text: "Introduction", link: "docs/en/introduction" },
      { text: "Why Cardinal?", link: "docs/en/why-cardinal" },
      { text: "Recommendations", link: "docs/en/recommendations" },
    ],
    Usage: [
      { text: "New Project", link: "docs/en/new-project" },
      { text: "First Steps", link: "docs/en/first-steps" },
    ],
    "Development Workflow": [
      { text: "Project Structure", link: "docs/en/project-structure" },
      {
        text: "Start the frontend",
        link: "docs/en/start-the-frontend",
      },
    ],
  },
};
