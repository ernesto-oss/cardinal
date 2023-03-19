import { File } from "lucide-react";

const NoteDetail: React.FC<{
  title?: string;
  children: React.ReactNode;
}> = ({ title, children, ...props }) => {
  return (
    <div {...props} className="rounded-lg bg-teal-700/20 py-6 px-8 dark:bg-teal-700/30">
      {title && (
        <div className="flex items-center gap-2">
          <File size={24} strokeWidth={3} className="text-teal-600" />
          <h3 className="text-xl font-bold text-teal-600 dark:text-teal-400">{title}</h3>
        </div>
      )}
      <p>{children}</p>
    </div>
  );
};

export default NoteDetail;
