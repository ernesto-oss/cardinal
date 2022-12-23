import { prisma } from "@acme/database";
import { PrismaClient } from "@acme/database";
import { type Session } from '@acme/auth';

export type Context = {
  prisma: PrismaClient;
  session: Session | null;
};

export const context = {
  prisma,
};
