import { useState } from "react";
import { Copy, Check } from "lucide-react";

export const CLIInstallButton: React.FC = () => {
  const [copied, setCopied] = useState(false);

  return (
    <button
      onClick={() => setCopied(!copied)}
      className="flex cursor-pointer items-center gap-3 rounded-md border-2 border-slate-200/5 bg-slate-400/10 px-4 py-2 backdrop-blur-lg transition duration-150 hover:bg-slate-300/10"
    >
      <span className="font-mono font-semibold text-slate-300">npm create cardinal-app@latest</span>
      {!copied && <Copy className="text-slate-300" size={20} />}
      {copied && <Check className="text-slate-300" size={20} />}
    </button>
  );
};
