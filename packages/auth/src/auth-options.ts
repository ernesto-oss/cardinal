import { type NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";

import { prisma } from "@acme/database";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "auth/signin",
    verifyRequest: "/auth/verify-request",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    EmailProvider({
      from: process.env.EMAIL_FROM as string,
      server: {
        host: process.env.EMAIL_SMTP_HOST as string,
        port: process.env.EMAIL_SMTP_PORT as string,
        auth: {
          user: process.env.EMAIL_SMTP_USER as string,
          pass: process.env.EMAIL_SMTP_PASSWORD as string,
        },
      },
    }),
    // ...add more providers here
  ],
};
