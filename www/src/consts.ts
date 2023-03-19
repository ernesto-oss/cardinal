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

export const GITHUB_EDIT_URL = `https://github.com/ernesto-oss/cardinal/tree/main/www/src/content/docs`;

// See "Algolia" section of the README for more information.
export const ALGOLIA = {
  indexName: "XXXXXXXXXX",
  appId: "XXXXXXXXXX",
  apiKey: "XXXXXXXXXX",
};

export const KNOWN_LANGUAGES = {
  en: "English",
} as const;
export const KNOWN_LANGUAGE_CODES = Object.values(KNOWN_LANGUAGES);
export type KnownLanguageCode = keyof typeof KNOWN_LANGUAGES;

export type OuterHeaders = "Overview";

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
      // { text: "Installation", link: "docs/installation" },
      // { text: "Directory Structure", link: "docs/directory-structure" },
    ],
    // Usage: [{ text: "First Steps", link: "docs/en/first-steps" }],
  },
};
