import { IoArrowForward } from "react-icons/io5";

type DocsCardProps = {
  title: string;
  description: string;
  href: string;
};

export const DocsCard: React.FC<DocsCardProps> = ({ title, description, href }) => {
  return (
    <a
      className="block w-full rounded-md border-2 border-slate-200/5 bg-slate-400/10 px-6 py-6 backdrop-blur transition duration-150 hover:bg-slate-300/10"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="flex items-center gap-2 pb-4 font-sans text-slate-50">
        <h2 className="text-2xl font-bold">{title}</h2>
        <IoArrowForward className="relative top-1 h-5 w-5" />
      </div>
      <p className="font-sans text-slate-300">{description}</p>
    </a>
  );
};
