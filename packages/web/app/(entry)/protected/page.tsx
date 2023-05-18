import Link from "next/link";
import { Hero } from "@/components/hero";
import { DocsCard } from "@/components/docs-card";

import { client } from "@/utils/genql";
import { redirect } from "next/navigation";
import { getUser } from "@/utils/user";

export const metadata = {
  title: "Protected",
};

async function getGreetingMessage() {
  const greetingsQuery = await client.query({
    greeting: true,
  });

  if (!greetingsQuery) {
    return null;
  }

  return greetingsQuery.greeting;
}

export default async function IndexPage() {
  const { user, idleSession } = await getUser();
  const greeting = await getGreetingMessage();

  if (!user && idleSession) redirect("/api/auth/renew");

  if (!user && !idleSession) redirect("/login");

  return (
    <>
      <Hero protectedRoute />
      <div className="flex w-full flex-col items-center justify-between">
        <div className="flex max-w-5xl flex-col items-center justify-center px-6">
          <div className="mb-8 w-fit rounded-md border-2 border-slate-200/5 bg-slate-400/10 px-10 py-2 text-center">
            {greeting && <p className="font-mono font-semibold text-slate-300">{greeting}</p>}
          </div>
          <div className="mb-8 flex w-full items-center justify-center gap-2">
            <Link
              href="/api/auth/logout"
              className="inline-flex h-10 items-center justify-center rounded-md bg-gradient-to-b from-slate-300 to-slate-300/80 px-10 py-2 text-sm font-bold text-slate-900 hover:border-gray-300/90"
            >
              Logout
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
