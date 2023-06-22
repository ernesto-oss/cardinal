export type SidebarItem = {
  label: string;
  link: string;
  items?: Array<SidebarItem>;
};

export type Sidebar = { label: string; items: SidebarItem[] }[];

export const sidebar: Sidebar = [
  {
    label: "Overview",
    items: [
      { label: "Introduction", link: "docs/introduction" },
      { label: "Why Cardinal", link: "docs/why-cardinal" },
      { label: "Recommendations", link: "docs/recommendations" },
    ],
  },
  {
    label: "Usage",
    items: [
      { label: "New Project", link: "docs/new-project" },
      { label: "First Steps", link: "docs/first-steps" },
      {
        label: "Frameworks",
        link: "",
        items: [{ label: "Next.js", link: "docs/nextjs" }],
      },
      {
        label: "Backend",
        link: "",
        items: [
          { label: "REST", link: "docs/backend/rest" },
          { label: "GraphQL", link: "docs/backend/graphql" },
          { label: "tRPC", link: "docs/backend/trpc" },
        ],
      },
      {
        label: "Authentication",
        link: "",
        items: [
          {
            label: "Security considerations",
            link: "docs/auth/security-considerations",
          },
          {
            label: "Adding new authentication methods",
            link: "docs/auth/authentication-methods",
          },
          { label: "Session handling", link: "docs/auth/session-handling" },
        ],
      },
      {
        label: "Database",
        link: "",
        items: [
          {
            label: "Database connection",
            link: "docs/database/database-connection",
          },
          {
            label: "Prototyping and migrations",
            link: "docs/database/prototyping-and-migrations",
          },
        ],
      },
    ],
  },
];
