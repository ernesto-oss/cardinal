import { mysqlTable, varchar, tinyint, serial } from "drizzle-orm/mysql-core"

export const authKey = mysqlTable("auth_key", {
	id: varchar("id", { length: 255 }).primaryKey().notNull(),
	userId: varchar("user_id", { length: 15 }).notNull(),
	primaryKey: tinyint("primary_key").notNull(),
	hashedPassword: varchar("hashed_password", { length: 255 }),
	expires: serial("expires"),
});

export const authSession = mysqlTable("auth_session", {
	id: varchar("id", { length: 127 }).primaryKey().notNull(),
	userId: varchar("user_id", { length: 15 }).notNull(),
	activeExpires: serial("active_expires").notNull(),
	idleExpires: serial("idle_expires").notNull(),
});

export const authUser = mysqlTable("auth_user", {
	id: varchar("id", { length: 15 }).primaryKey().notNull(),
	email: varchar("email", { length: 191 }),
});
