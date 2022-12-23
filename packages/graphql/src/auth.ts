import { type Session } from "@acme/auth";

export const authorized = (session?: Session | null | undefined) => {
  if (session) {
    return true;
  }
  return false;
};
