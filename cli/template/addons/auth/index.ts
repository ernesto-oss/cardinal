export { authOptions } from "./src/auth-options";
export { getServerAuthSession } from "./src/get-session";

import type { Session as NextAuthSession } from "next-auth";

type SessionWithId = { user?: { id?: string | null } };
export type Session = NextAuthSession & SessionWithId;
