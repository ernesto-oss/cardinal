export type PackageManager = "npm" | "pnpm" | "yarn";

export const getUserPkgManager: () => PackageManager = () => {
  // This environment variable is set by npm and yarn but pnpm seems less consistent
  const userAgent = process.env.npm_config_user_agent;

  const isDevelopment = process.env.NODE_ENV === "development";
  const packageManagerOverrideFlag = process.env
    .PACKAGE_MANAGER_OVERRIDE as PackageManager;

  if (isDevelopment && packageManagerOverrideFlag) {
    return packageManagerOverrideFlag;
  } else if (userAgent) {
    if (userAgent.startsWith("yarn")) {
      return "yarn";
    } else if (userAgent.startsWith("pnpm")) {
      return "pnpm";
    } else {
      return "npm";
    }
  } else {
    // If no user agent is set, assume npm
    return "npm";
  }
};
