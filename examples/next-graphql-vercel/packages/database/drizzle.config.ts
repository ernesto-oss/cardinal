import { env } from '@acme/config/env';
import type { Config } from 'drizzle-kit';

export default {
  schema: './src/schema.ts',
  out: './drizzle',
  connectionString: env.DATABASE_STRING,
  // user: env.DATABASE_USERNAME,
  // password: env.DATABASE_PASSWORD,
  // host: env.DATABASE_PASSWORD,
  // database: env.DATABASE_NAME,
  // port: 3306,
} satisfies Config;
