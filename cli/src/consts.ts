import path from "path";
import color from "picocolors";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const distPath = path.dirname(__filename);

// Path is in relation to a single index.js file inside ./dist on the compiled output
export const PKG_ROOT = path.join(distPath, "../");
export const ADDON_DIR = path.join(PKG_ROOT, "template/addons");
