import path from "path";
import fs from "fs-extra";
import { sortPackageJson } from "sort-package-json";
import { type PackageJson, type TsConfigJson } from "type-fest";

import { TEMPLATE_DIR } from "@/consts.js";
import {
  addPackageDependency,
  graphqlDependencyMap,
  type AvailableGraphqlDependenciesKeys,
} from "@/helpers/addPackageDependency.js";
import {
  coreScriptsMap,
  createPackageScripts,
  graphQLScriptsMap,
} from "@/helpers/createPackageScripts.js";
import { removeArtifacts } from "@/helpers/removeArtifacts.js";
import { type ProjectOptions } from "@/index.js";
import { type PackageManager } from "@/utils/getUserPackageManager.js";

export const graphQLInstaller = ({
  projectDir,
  projectOptions,
  pkgManager,
}: {
  projectDir: string;
  projectOptions: ProjectOptions;
  pkgManager: PackageManager;
}) => {
  const {
    frontendFramework,
    databaseProvider,
    deployProvider,
    authentication,
  } = projectOptions;
  const graphqlTemplateRoot = path.join(TEMPLATE_DIR, "graphql");
  const graphQLDestination = path.join(projectDir, "packages/api");

  const copyDir = (fileName: string) =>
    fs.copySync(path.join(graphqlTemplateRoot, fileName), graphQLDestination, {
      filter: removeArtifacts,
    });

  if (frontendFramework === "next") {
    databaseProvider === "planetscale" && authentication
      ? copyDir("graphql-next-planetscale-auth")
      : null;
    databaseProvider === "planetscale" && !authentication
      ? copyDir("graphql-next-planetscale")
      : null;
  }

  /* Write `tsconfig.json` */
  const templateGraphqlTsConfig = fs.readJsonSync(
    path.join(graphqlTemplateRoot, "tsconfig.json"),
  ) as TsConfigJson;
  templateGraphqlTsConfig.compilerOptions = {};
  templateGraphqlTsConfig.extends = "../../tsconfig.json";
  templateGraphqlTsConfig.include = ["index.ts"];
  fs.outputJsonSync(
    path.join(graphQLDestination, "tsconfig.json"),
    templateGraphqlTsConfig,
    { spaces: 2 },
  );

  /* Set correct dependencies on `package.json` */
  const templateGraphQLPackageJson = fs.readJsonSync(
    path.join(graphqlTemplateRoot, "package.json"),
  ) as PackageJson;
  const graphqlDependencies = [
    "@pothos/core",
    "graphql",
  ] as AvailableGraphqlDependenciesKeys[];
  const graphqlDevDependencies = [] as AvailableGraphqlDependenciesKeys[];

  if (frontendFramework === "next") {
    graphqlDevDependencies.push("next");
    graphqlDependencies.push("graphql-yoga");
  }

  if (authentication)
    graphqlDependencies.push("@acme/auth", "@pothos/plugin-scope-auth");

  if (databaseProvider !== "none") graphqlDependencies.push("@acme/database");

  if (deployProvider !== "aws") {
    graphqlDependencies.push("react");
    graphqlDevDependencies.push(
      "@types/react",
      "@genql/cli",
      "@graphql-codegen/cli",
      "@graphql-codegen/schema-ast",
      "chokidar-cli",
    );
  }

  /* Wipe "dependencies" field from `package.json` in order to replace with the
  correct dependency map */
  templateGraphQLPackageJson.name = "@acme/api"
  templateGraphQLPackageJson.dependencies = {};
  templateGraphQLPackageJson.devDependencies = {};

  const withAddedDependencies =
    addPackageDependency<AvailableGraphqlDependenciesKeys>({
      dependencyMap: graphqlDependencyMap,
      packageJson: templateGraphQLPackageJson,
      dependencies: graphqlDependencies,
      devDependency: false,
    });

  const withAddedDevDependencies =
    addPackageDependency<AvailableGraphqlDependenciesKeys>({
      dependencyMap: graphqlDependencyMap,
      packageJson: withAddedDependencies,
      dependencies: graphqlDevDependencies,
      devDependency: true,
    });

  /* Set `package.json` scripts */
  const scriptsMap = { ...graphQLScriptsMap, ...coreScriptsMap };
  const withAddedScripts = createPackageScripts<keyof typeof scriptsMap>({
    packageJson: withAddedDevDependencies,
    scriptsMap: scriptsMap,
    packageManager: pkgManager,
    scripts: [
      "with-env",
      "dev",
      "typecheck",
      "codegen:client",
      "codegen:schema",
      "codegen",
    ],
  });

  const sortedPackageJson = sortPackageJson(withAddedScripts);

  fs.outputJsonSync(
    path.join(graphQLDestination, "package.json"),
    sortedPackageJson,
    {
      spaces: 2,
    },
  );
};
