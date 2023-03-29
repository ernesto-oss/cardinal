import { File, AlertTriangle } from "lucide-react";
import { clsx } from "clsx";

const Detail: React.FC<{
  type: "note" | "warning";
  children: React.ReactNode;
}> = ({ type, children, ...props }) => {
  return (
    <div
      {...props}
      className={clsx({
        "rounded-lg py-6 px-8": true,
        "bg-teal-700/20 dark:bg-teal-700/30": type === "note",
        "bg-orange-400/20 dark:bg-orange-400/30": type === "warning",
      })}
    >
      {type === "note" && (
        <div className="flex items-center gap-2">
          <File size={24} strokeWidth={3} className="text-teal-600" />
          <h3 className="text-xl font-bold text-teal-600 dark:text-teal-400">Note</h3>
        </div>
      )}
      {type === "warning" && (
        <div className="flex items-center gap-2">
          <AlertTriangle size={24} strokeWidth={3} className="text-orange-600 dark:text-orange-400" />
          <h3 className="text-xl font-bold text-orange-600 dark:text-orange-400">Warning</h3>
        </div>
      )}
      <p>{children}</p>
    </div>
  );
};

export default Detail;
