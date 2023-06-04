import { type PackageJson } from "type-fest";

export const graphqlDependencyMap = {
  "@acme/auth": "workspace:*",
  "@acme/database": "workspace:*",
  "@pothos/core": "^3.30.0",
  "@pothos/plugin-scope-auth": "^3.19.2",
  graphql: "^16.6.0",
  "graphql-yoga": "^3.9.1",

  /* Code generation */
  "@genql/cli": "3.x",
  "@graphql-codegen/cli": "^3.3.1",
  "@graphql-codegen/schema-ast": "^3.0.1",

  /* Dev dependencies */
  "@types/node": "^20.2.5",
  "chokidar-cli": "^3.0.0",
  next: "13.4.4",
};

export const databaseDependencyMap = {
  "@acme/config": "workspace:*",
  "drizzle-orm": "^0.26.3",
  "drizzle-kit": "^0.18.1",

  /* Adapters */
  "@planetscale/database": "~1.7.0",
  "better-sqlite3": "~8.4.0",

  /* Dev dependencies */
  "@types/better-sqlite3": "~7.6.4",
};

export const authDependencyMap = {
  "@acme/config": "workspace:*",
  "@acme/database": "workspace:*",
  zod: "^3.21.0",
  "lucia-auth": "^1.7.0",

  /* Adapters */
  "@lucia-auth/adapter-mysql": "^1.1.1",
  "@lucia-auth/adapter-sqlite": "^1.1.1",

  /* Dev dependencies */
  next: "13.4.4",
};

export const nextjsDependencyMap = {
  "@acme/api": "workspace:*",
  "@acme/auth": "workspace:*",
  "@acme/config": "workspace:*",
  "@hookform/resolvers": "^3.1.0",
  "@radix-ui/react-label": "^2.0.2",
  autoprefixer: "^10.4.14",
  clsx: "^1.2.1",
  graphql: "^16.6.0",
  next: "13.4.4",
  postcss: "^8.4.23",
  react: "^18.2.0",
  "react-dom": "^18.2.0",
  "react-hook-form": "^7.44.1",
  "react-icons": "^4.8.0",
  tailwindcss: "^3.3.2",
  zod: "^3.21.4",

  // Dev dependencies
  "@types/node": "^20.2.5",
  "@types/react": "^18.2.7",
  "@types/react-dom": "^18.2.4",
  "dotenv-cli": "^7.2.1",
  eslint: "8.41.0",
  "eslint-config-next": "13.4.4",
};

type DependencyMap = {
  [key: string]: string;
};

export type AvailableDatabaseDependenciesKeys = keyof typeof databaseDependencyMap;
export type AvailableAuthDependenciesKeys = keyof typeof authDependencyMap;
export type AvailableNextjsDependenciesKeys = keyof typeof nextjsDependencyMap;
export type AvailableGraphqlDependenciesKeys = keyof typeof graphqlDependencyMap;
export type AvailableDependenciesType = Readonly<
  | AvailableDatabaseDependenciesKeys
  | AvailableAuthDependenciesKeys
  | AvailableNextjsDependenciesKeys
  | AvailableGraphqlDependenciesKeys
>;

export type AvailableDependencies<T extends AvailableDependenciesType> = T[];

/**
 * Inserts the dependencies from a given set of `dependencyMap`
 * into a given `package.json`
 */
export function addPackageDependency<T extends AvailableDependenciesType>(opts: {
  dependencyMap: DependencyMap;
  dependencies: AvailableDependencies<T>;
  devDependency: boolean;
  packageJson: PackageJson;
}) {
  const { dependencyMap, dependencies, devDependency, packageJson } = opts;

  dependencies.forEach((packageName) => {
    const version = dependencyMap[packageName];

    if (devDependency && packageJson.devDependencies) {
      packageJson.devDependencies[packageName] = version;
    } else if (packageJson.dependencies) {
      packageJson.dependencies[packageName] = version;
    }
  });

  return packageJson;
}
