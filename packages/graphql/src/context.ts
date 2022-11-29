import { prisma } from "@acme/database";
import { PrismaClient } from "@acme/database";

export type Context = {
  prisma: PrismaClient;
};

export const context = {
  prisma,
};
