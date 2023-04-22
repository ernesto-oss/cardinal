/*
 * This maps the necessary packages to a version.
 * This improves performance significantly over fetching it from the npm registry.
 */
export const dependencyVersionMap = {
  // Internal packages, used on the monorepo workspace
  "@acme/auth": "workspace:*",
  "@acme/database": "workspace:*",
  "@acme/api": "workspace:*",

  // NextAuth.js
  "next-auth": "^4.19.0",
  "@next-auth/prisma-adapter": "^1.0.5",

  // Prisma
  prisma: "^4.10.0",
  "@prisma/client": "^4.10.0",
} as const;
export type AvailableDependencies = keyof typeof dependencyVersionMap;
