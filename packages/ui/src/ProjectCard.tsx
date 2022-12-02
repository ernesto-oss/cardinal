import * as React from "react";

export const ProjectCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => {
  return (
    <div className="p-5 border border-gray-300 flex flex-col items-center justify-center gap-5 rounded-lg shadow-lg shadow-slate-200/50">
      <div className="h-11 w-11">{icon}</div>
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-center text-base leading-7 text-gray-600">
        {description}
      </p>
    </div>
  );
};
