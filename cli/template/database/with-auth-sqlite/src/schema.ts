import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const authKey = sqliteTable('auth_key', {
  id: text('id').primaryKey().notNull(),
  userId: text('user_id').notNull(),
  primaryKey: integer('primary_key').notNull(),
  hashedPassword: text('hashed_password'),
  expires: integer('expires', { mode: 'timestamp' }),
});

export const authSession = sqliteTable('auth_session', {
  id: text('id').primaryKey().notNull(),
  userId: text('user_id').notNull(),
  activeExpires: integer('active_expires', { mode: 'timestamp' }).notNull(),
  idleExpires: integer('idle_expires', { mode: 'timestamp' }).notNull(),
});

export const authUser = sqliteTable('auth_user', {
  id: text('id').primaryKey().notNull(),
  email: text('email'),
});
