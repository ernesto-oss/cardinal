"use client";

import React from "react";
import { clsx } from "clsx";

export const LogoutButton = () => {
  const [loggingOut, setLoggingOut] = React.useState(false);

  async function onLogout() {
    setLoggingOut(true);
  }

  return (
    <a
      href="/api/auth/logout"
      onClick={() => onLogout()}
      className={clsx({
        "inline-flex h-10 items-center justify-center rounded-md bg-gradient-to-b from-slate-300 to-slate-300/80 px-10 py-2 text-sm font-bold text-slate-900 hover:border-gray-300/90 disabled:opacity-75":
          true,
        "opacity-75": loggingOut,
      })}
    >
      Logout
    </a>
  );
};
