import { env } from '@acme/config/env';
import { connect } from '@planetscale/database';
import { drizzle } from 'drizzle-orm/planetscale-serverless';

import * as schema from './schema';

export const connection = connect({
  host: 'aws.connect.psdb.cloud',
  username: env.DATABASE_USERNAME,
  password: env.DATABASE_PASSWORD,
});

export const database = drizzle(connection, { schema });
