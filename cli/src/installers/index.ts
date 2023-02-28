import type { PackageManager } from "@/utils/getUserPackageManager.js";

export const availablePackages = [
  "prisma",
  "next-auth",
  "tailwind",
] as const;

export type AvailablePackages = (typeof availablePackages)[number];

// export type PkgInstallerMap = {
//   [pkg in AvailablePackages]: {
//     inUse: boolean;
//   };
// };

export interface InstallerOptions {
  projectDir: string;
  pkgManager: PackageManager;
  packages?: AvailablePackages[];
  projectName?: string;
}

export type Installer = (opts: InstallerOptions) => void;
