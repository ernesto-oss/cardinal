import path from "path";
import fs from "fs-extra";
import { ADDON_DIR } from "@/consts.js";

import { type Installer } from "@/installers/index.js";

export const nextAuthInstaller: Installer = ({ projectDir }) => {
  const authTemplate = path.join(ADDON_DIR, "auth");
  const projectWorkspaceDir = path.join(projectDir, "packages/auth");

  fs.copySync(authTemplate, projectWorkspaceDir);
};
