import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  /*
   * Specify what prefix the client-side variables must have.
   * This is enforced both on type-level and at runtime.
   */
  clientPrefix: "NEXT_",
  client: {},
  server: {
    SITE_URL: z.string().url(),
  },
  runtimeEnv: {
    SITE_URL: process.env.SITE_URL,
  },
});
