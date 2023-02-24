import { useState } from "react";
import { Copy, Check } from "lucide-react";

export const CLIInstallButton = () => {
  const [copied, setCopied] = useState(false);

  return (
    <button
      onClick={() => setCopied(!copied)}
      className="flex cursor-pointer items-center gap-3 rounded-md border-2 border-slate-200/5 bg-slate-400/10 px-4 py-2 transition duration-150 hover:bg-slate-300/10 "
    >
      <span className="font-mono font-semibold text-slate-300">pnpm create cardinal-app@latest</span>
      {!copied && <Copy size={20} />}
      {copied && <Check size={20} />}
    </button>
  );
};
