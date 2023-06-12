'use client';

import { GrGraphQl } from 'react-icons/gr';

export const QueryBox = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mb-8 w-fit rounded-md border-2 border-slate-200/5 bg-slate-400/10 px-10 py-2 text-center">
      <pre className="semibold flex items-center justify-center gap-4 font-mono text-slate-300">
        <GrGraphQl className="h-5 w-5 text-pink-500" />
        {children}
      </pre>
    </div>
  );
};
