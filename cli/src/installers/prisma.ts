import path from "path";
import fs from "fs-extra";
import { ADDON_DIR } from "@/consts.js";

import { type Installer } from "@/installers/index.js";

export const prismaInstaller: Installer = ({ projectDir, packages }) => {
  const prismaTemplate = path.join(ADDON_DIR, "database");
  const projectWorkspaceDir = path.join(projectDir, "packages/database");

  const prismaDestination = path.join(projectWorkspaceDir);
  const prismaSchemaDestination = path.join(projectWorkspaceDir, "prisma");

  /* Copy everything from the Prisma template to the project directory */
  fs.copySync(prismaTemplate, prismaDestination);

  /* Remove the `prisma` directory that contains the schema, since it will be set conditionally based on the presence of `next-auth` */
  fs.removeSync(prismaSchemaDestination);

  /* Copy the adequate Prisma schema to the project directory */
  const schemaTemplateSrc = path.join(
    ADDON_DIR,
    "database/prisma",
    packages?.includes("next-auth") ? "with-auth.prisma" : "base.prisma"
  );
  const schemaDestination = path.join(
    projectDir,
    "packages/database/prisma/schema.prisma"
  );
  fs.copySync(schemaTemplateSrc, schemaDestination);
};
