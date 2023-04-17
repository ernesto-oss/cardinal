import { Link } from "lucide-react";

export const LinkHeading: React.FC<{
  id: string;
  className?: string;
  children: React.ReactNode;
}> = ({ id, className, children }) => {
  return (
    <div className={className}>
      <a className="inline-flex justify-center items-center text-inherit gap-2 no-underline" href={`#${id}`}>
        {children}
        <Link size={18} />
      </a>
    </div>
  );
};
