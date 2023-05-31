-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migraitons
/*
CREATE TABLE `_038c6900_7274_5c6b_b1ab_d1f2bfa28911_20230524045718_vrepl` (
	`id` varchar(255) PRIMARY KEY NOT NULL,
	`hashed_password` varchar(255),
	`user_id` varchar(15) NOT NULL,
	`primary_key` tinyint NOT NULL,
	`expires` bigint);

CREATE TABLE `_22529a3b_0db1_5623_afd4_20a4c2a37774_20230524045728_vrepl` (
	`id` varchar(15) PRIMARY KEY NOT NULL,
	`email` varchar(191));

CREATE TABLE `_5df7653d_e4dd_5d57_b7dd_cb8f4b7a6e3c_20230524045723_vrepl` (
	`id` varchar(128) PRIMARY KEY NOT NULL,
	`user_id` varchar(15) NOT NULL,
	`active_expires` bigint NOT NULL,
	`idle_expires` bigint NOT NULL);

CREATE TABLE `auth_key` (
	`id` varchar(255) PRIMARY KEY NOT NULL,
	`user_id` varchar(15) NOT NULL,
	`primary_key` tinyint NOT NULL,
	`hashed_password` varchar(255),
	`expires` serial);

CREATE TABLE `auth_session` (
	`id` varchar(127) PRIMARY KEY NOT NULL,
	`user_id` varchar(15) NOT NULL,
	`active_expires` serial NOT NULL,
	`idle_expires` serial NOT NULL);

CREATE TABLE `auth_user` (
	`id` varchar(15) PRIMARY KEY NOT NULL,
	`email` varchar(191));

*/