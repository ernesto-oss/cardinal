import { type PackageJson } from "type-fest";

export const databaseDependencyMap = {
  "@acme/config": "workspace:*",

  "drizzle-orm": "^0.26.3",
  "drizzle-kit": "^0.18.1",

  "@planetscale/database": "~1.7.0",

  "better-sqlite3": "~8.4.0",
  "@types/better-sqlite3": "~7.6.4",
};

export const authDependencyMap = {
  "@acme/config": "workspace:*",
  "@acme/database": "workspace:*",

  zod: "^3.21.0",
  "lucia-auth": "^1.7.0",

  "@lucia-auth/adapter-mysql": "^1.1.1",
  "@lucia-auth/adapter-sqlite": "^1.1.1",
  
  "next": "13.4.4",
};

type DependencyMap = {
  [key: string]: string;
};

export type AvailableDatabaseDependenciesKeys = keyof typeof databaseDependencyMap;
export type AvailableAuthDependenciesKeys = keyof typeof authDependencyMap;
export type AvailableDependenciesType = Readonly<AvailableDatabaseDependenciesKeys | AvailableAuthDependenciesKeys>;

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
