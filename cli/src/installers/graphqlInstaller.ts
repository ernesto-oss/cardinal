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
import { coreScriptsMap, createPackageScripts, graphQLScriptsMap } from "@/helpers/createPackageScripts.js";
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
  const { frontendFramework, databaseProvider, deployProvider, authentication } = projectOptions;
  const graphqlTemplateRoot = path.join(TEMPLATE_DIR, "api/graphql");
  const graphQLDestination = path.join(projectDir, "packages/api");

  const copyFile = (fileName: string) =>
    fs.copySync(path.join(graphqlTemplateRoot, fileName), path.join(graphQLDestination, fileName));

  const copyAndRename = (origin: string, destinationFile: string) =>
    fs.copySync(path.join(graphqlTemplateRoot, origin), path.join(graphQLDestination, destinationFile));

  /* Copy root config files */
  copyFile("codegen.ts");

  /* Greeting query is present on every instance */
  copyFile("src/types/greeting.ts");

  if (frontendFramework === "next") {
    if (authentication) {
      copyAndRename("src/index-with-next-auth.ts", "src/index.ts");
      copyAndRename("src/builder-with-auth.ts", "src/builder.ts");
      copyAndRename("src/schema-with-auth.ts", "src/schema.ts");
      copyFile("src/types/protected.ts");
    } else {
      // copyAndRename("src/builder.ts", "src/builder.ts");
      copyAndRename("src/index-with-next.ts", "src/index.ts");
      copyFile("src/builder.ts");
      copyFile("src/schema.ts");
    }
  }

  /* Write `tsconfig.json` */
  const templateDatabaseTsConfig = fs.readJsonSync(path.join(graphqlTemplateRoot, "tsconfig.json")) as TsConfigJson;
  templateDatabaseTsConfig.extends = "../../tsconfig.json";
  templateDatabaseTsConfig.include = ["src/index.ts"];
  fs.outputJsonSync(path.join(graphQLDestination, "tsconfig.json"), templateDatabaseTsConfig, { spaces: 2 });

  /* Set correct dependencies on `package.json` */
  const templateGraphQLPackageJson = fs.readJsonSync(path.join(graphqlTemplateRoot, "package.json")) as PackageJson;
  const graphqlDependencies = ["@pothos/core", "graphql"] as AvailableGraphqlDependenciesKeys[];
  const graphqlDevDependencies = ["@types/node"] as AvailableGraphqlDependenciesKeys[];

  if (frontendFramework === "next") {
    graphqlDevDependencies.push("next");
    graphqlDependencies.push("graphql-yoga");
  }

  if (authentication) graphqlDependencies.push("@acme/auth", "@pothos/plugin-scope-auth");

  if (databaseProvider !== "none") graphqlDependencies.push("@acme/database");

  if (deployProvider !== "aws") {
    graphqlDependencies.push("react")
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
  templateGraphQLPackageJson.dependencies = {};
  templateGraphQLPackageJson.devDependencies = {};

  const withAddedDependencies = addPackageDependency<AvailableGraphqlDependenciesKeys>({
    dependencyMap: graphqlDependencyMap,
    packageJson: templateGraphQLPackageJson,
    dependencies: graphqlDependencies,
    devDependency: false,
  });

  const withAddedDevDependencies = addPackageDependency<AvailableGraphqlDependenciesKeys>({
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
    scripts: ["with-env", "dev", "typecheck", "codegen:client", "codegen:schema", "codegen"],
  });

  const sortedPackageJson = sortPackageJson(withAddedScripts);

  fs.outputJsonSync(path.join(graphQLDestination, "package.json"), sortedPackageJson, {
    spaces: 2,
  });
};
