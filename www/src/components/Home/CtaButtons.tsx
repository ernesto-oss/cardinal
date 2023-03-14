import { Github } from "lucide-react";

export const CtaButtons = () => {
  return (
    <>
      <a
        href="/docs/en/introduction"
        className="flex cursor-pointer items-center rounded-md bg-slate-50 px-4 py-2 text-sm font-semibold text-chinese-black transition duration-150 hover:bg-slate-200"
      >
        Get Started
      </a>
      <a
        className="flex cursor-pointer items-center justify-center gap-3 rounded-md bg-slate-400/10 px-4 py-2 text-sm font-semibold text-slate-50 backdrop-blur-lg transition duration-150"
        href="https://github.com/ernesto-oss/cardinal"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Github size={20} />
        <span>GitHub</span>
      </a>
    </>
  );
};
