import ErLogo from "@/assets/brand/er-logo.svg";
import BackgroundGradient from "@/assets/home/background-gradient.png";
import Grid from "@/assets/home/grid-pattern.svg";

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <img
        src={BackgroundGradient}
        className="absolute -z-10 h-full w-full select-none opacity-70"
        alt=""
      />
      <img src={Grid} className="absolute -z-20 h-full w-full select-none" alt="" />
      <div className="flex flex-auto flex-col justify-center">{children}</div>
      <footer className="flex w-full items-center justify-center py-8">
        <div className="flex gap-2">
          <span className="text-slate-300">by</span>
          <img src={ErLogo} className="w-6" alt="" />
        </div>
      </footer>
    </div>
  );
};
