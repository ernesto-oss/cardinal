import Image from "next/image";

import ErLogo from "@/assets/brand/er-logo.svg";

interface HomeLayoutProps {
  children: React.ReactNode;
}

export default async function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-auto flex-col justify-center">{children}</div>
      <footer className="flex w-full items-center justify-center py-8">
        <div className="flex gap-2">
          <span className="text-slate-300">by</span>
          <Image className="w-6" src={ErLogo} alt="" />
        </div>
      </footer>
    </div>
  );
}
