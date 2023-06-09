import { type PackageJson } from "type-fest";

import authDependencyMapJson from "./dependencyMaps/authDependencyMap.json" assert { type: "json" };
import coreDependencyMapJson from "./dependencyMaps/coreDependencyMap.json" assert { type: "json" };
import databaseDependencyMapJson from "./dependencyMaps/databaseDependencyMaps.json" assert { type: "json" };
import graphqlDependencyMapJson from "./dependencyMaps/graphqlDependencyMap.json" assert { type: "json" };
import nextDependencyMapJson from "./dependencyMaps/nextDependencyMap.json" assert { type: "json" };
import { type DependencyMap } from "@/types/index.js";

export const coreDependencyMap = coreDependencyMapJson;
export const graphqlDependencyMap = graphqlDependencyMapJson;
export const databaseDependencyMap = databaseDependencyMapJson;
export const authDependencyMap = authDependencyMapJson;
export const nextjsDependencyMap = nextDependencyMapJson;

export type AvailableDatabaseDependenciesKeys =
  keyof typeof databaseDependencyMap;
export type AvailableAuthDependenciesKeys = keyof typeof authDependencyMap;
export type AvailableNextjsDependenciesKeys = keyof typeof nextjsDependencyMap;
export type AvailableGraphqlDependenciesKeys =
  keyof typeof graphqlDependencyMap;
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
export function addPackageDependency<
  T extends AvailableDependenciesType,
>(opts: {
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
