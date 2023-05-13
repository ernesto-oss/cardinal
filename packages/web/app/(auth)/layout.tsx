import Image from "next/image";
import BackgroundGradient from "@/assets/home/background-gradient.png";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Image
        src={BackgroundGradient}
        quality={10}
        className="absolute -z-10 h-full w-full select-none opacity-70"
        alt=""
      />
      <div className="flex flex-auto flex-col justify-center">{children}</div>
    </div>
  );
}
