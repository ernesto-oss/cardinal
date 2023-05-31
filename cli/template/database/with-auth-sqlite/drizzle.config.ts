import type { Config } from 'drizzle-kit'
import { env } from '@acme/config/env'

export default {
  schema: './src/schema.ts',
  out: './drizzle',
  connectionString: env.DATABASE_STRING,
} satisfies Config;
