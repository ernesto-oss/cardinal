import * as React from "react";
import { BookOpen, ChevronDown, ChevronUp } from "lucide-react";

const DeepDive: React.FC<{
  title: string;
  children: React.ReactNode;
}> = ({ title, children, ...props }) => {
  const [open, setOpen] = React.useState<boolean>(false);

  return (
    <details open={open} {...props} className="pointer-events-none rounded-lg bg-indigo-700/20 py-6 px-8">
      <summary className="flex flex-col">
        <div className="flex gap-2 pb-4">
          <BookOpen size={24} strokeWidth={3} className="text-indigo-600 dark:text-indigo-400" />
          <h5 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">Deep dive</h5>
        </div>
        <h4 className="pb-6 text-base font-bold">{title}</h4>
        <div className="pb-4">
          <button
            onClick={() => setOpen(!open)}
            className="pointer-events-auto flex cursor-pointer items-center justify-center gap-1 rounded-full bg-indigo-300 px-4 py-1 font-semibold transition duration-100 hover:bg-indigo-400/60 dark:bg-indigo-600 dark:hover:bg-indigo-500/60"
          >
            {open && <ChevronUp size={20} strokeWidth={3} />}
            {!open && <ChevronDown size={20} strokeWidth={3} />}
            {open ? "Hide Details" : "Show Details"}
          </button>
        </div>
      </summary>
      <div className="pointer-events-auto">{children}</div>
    </details>
  );
};

export default DeepDive;
