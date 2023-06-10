export const removeArtifacts = (src: string, _dest: string) => {
  if (src.includes("node_modules")) {
    return false;
  } else if (src.includes("pnpm-lock.yaml")) {
    return false;
  } else {
    return true;
  }
};
