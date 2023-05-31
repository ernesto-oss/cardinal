import { connection } from '@acme/database';
import { planetscale } from '@lucia-auth/adapter-mysql';
import lucia from 'lucia-auth';
import { nextjs } from 'lucia-auth/middleware';

/**
 * This is the Lucia Auth initializer. From here, you can define
 * how Lucia connects with your database, session expiry and
 * other attributes.
 *
 * @see https://lucia-auth.com/start-here/getting-started
 */
export const auth = lucia({
  adapter: planetscale(connection),
  env: process.env.NODE_ENV === 'development' ? 'DEV' : 'PROD',
  middleware: nextjs(),
  transformDatabaseUser: (userData) => {
    return {
      userId: userData.id,
      email: userData.email,
    };
  },
  sessionExpiresIn: {
    activePeriod: 1000 * 60 * 60 * 24 * 7, // 1 week
    idlePeriod: 0, // disable session renewal
  },
});

export type ErrorMessage =
  | 'AUTH_INVALID_SESSION_ID'
  | 'AUTH_INVALID_PASSWORD'
  | 'AUTH_DUPLICATE_SESSION_ID'
  | 'AUTH_DUPLICATE_KEY_ID'
  | 'AUTH_INVALID_KEY_ID'
  | 'AUTH_INVALID_USER_ID'
  | 'AUTH_INVALID_REQUEST'
  | 'AUTH_NOT_AUTHENTICATED'
  | 'REQUEST_UNAUTHORIZED'
  | 'UNKNOWN_ERROR'
  | 'AUTH_OUTDATED_PASSWORD'
  | 'AUTO_USER_ID_GENERATION_NOT_SUPPORTED'
  | 'AUTH_EXPIRED_KEY';

export type Auth = typeof auth;
export type { Session } from 'lucia-auth';
export { LuciaError, SESSION_COOKIE_NAME } from 'lucia-auth';

/* Export providers */
export {
  credentialsHandler,
  credentialsAuthSchema,
} from './providers/credentials';
