import * as Database from 'better-sqlite3';
import { drizzle, type BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';

export const sqlite = new Database('sqlite.db')

export const database: BetterSQLite3Database = drizzle(sqlite);
