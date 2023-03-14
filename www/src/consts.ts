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
  twitter: "astrodotbuild",
};

export const KNOWN_LANGUAGES = {
  English: "en",
} as const;
export const KNOWN_LANGUAGE_CODES = Object.values(KNOWN_LANGUAGES);

export const GITHUB_EDIT_URL = `https://github.com/withastro/astro/tree/main/examples/docs`;

export const COMMUNITY_INVITE_URL = `https://astro.build/chat`;

// See "Algolia" section of the README for more information.
export const ALGOLIA = {
  indexName: "XXXXXXXXXX",
  appId: "XXXXXXXXXX",
  apiKey: "XXXXXXXXXX",
};

export type Sidebar = Record<(typeof KNOWN_LANGUAGE_CODES)[number], Record<string, { text: string; link: string }[]>>;
export const SIDEBAR: Sidebar = {
  en: {
    Overview: [
      { text: "Introduction", link: "docs/en/introduction" },
      { text: "Why Cardinal?", link: "docs/en/why-cardinal" },
      { text: "Installation", link: "en/installation" },
      { text: "Directory Structure", link: "docs/en/directory-structure" },
    ],
  },
};
