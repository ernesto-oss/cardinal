import { type PackageJson } from "type-fest";

import { type DependencyMap } from "@/types/index.js";

import authDependencyMapJson from "./dependencyMaps/authDependencyMap.json";
import configDependencyMapJson from "./dependencyMaps/configDependencyMap.json";
import coreDependencyMapJson from "./dependencyMaps/coreDependencyMap.json";
import databaseDependencyMapJson from "./dependencyMaps/databaseDependencyMap.json";
import graphqlDependencyMapJson from "./dependencyMaps/graphqlDependencyMap.json";
import nextDependencyMapJson from "./dependencyMaps/nextDependencyMap.json";

export const coreDependencyMap = coreDependencyMapJson;
export const configDependencyMap = configDependencyMapJson;
export const authDependencyMap = authDependencyMapJson;
export const graphqlDependencyMap = graphqlDependencyMapJson;
export const databaseDependencyMap = databaseDependencyMapJson;
export const nextjsDependencyMap = nextDependencyMapJson;

export type AvailableCoreDependenciesKeys = keyof typeof coreDependencyMap;
export type AvailableConfigDependenciesKeys = keyof typeof configDependencyMap;

export type AvailableAuthDependenciesKeys = keyof typeof authDependencyMap;
export type AvailableDatabaseDependenciesKeys =
  keyof typeof databaseDependencyMap;

export type AvailableGraphqlDependenciesKeys =
  keyof typeof graphqlDependencyMap;

export type AvailableNextjsDependenciesKeys = keyof typeof nextjsDependencyMap;

export type AvailableDependenciesType = Readonly<
  | AvailableCoreDependenciesKeys
  | AvailableDatabaseDependenciesKeys
  | AvailableAuthDependenciesKeys
  | AvailableNextjsDependenciesKeys
  | AvailableGraphqlDependenciesKeys
  | AvailableConfigDependenciesKeys
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
