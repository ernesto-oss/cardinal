'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export const LogoutButton = () => {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = React.useState(false);

  async function onLogout() {
    setLoggingOut(true);
    const logoutRequest = await fetch('/api/auth/logout');

    if (logoutRequest.status === 302) {
      router.push('/login');
    }
  }

  return (
    <button
      disabled={loggingOut}
      onClick={() => onLogout()}
      className="inline-flex h-10 items-center justify-center rounded-md bg-gradient-to-b from-slate-300 to-slate-300/80 px-10 py-2 text-sm font-bold text-slate-900 hover:border-gray-300/90 disabled:opacity-75"
    >
      Logout
    </button>
  );
};
