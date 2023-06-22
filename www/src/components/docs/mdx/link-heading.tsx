import { Link } from "lucide-react";

export const LinkHeading: React.FC<{
  id: string;
  className?: string;
  children: React.ReactNode;
}> = ({ id, className, children }) => {
  return (
    <div className={className}>
      <a
        className="inline-flex items-center justify-center gap-2 text-inherit no-underline"
        href={`#${id}`}
      >
        {children}
        <Link size={18} />
      </a>
    </div>
  );
};
