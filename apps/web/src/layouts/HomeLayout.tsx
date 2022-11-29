import { NavHeader } from "@acme/ui";

type HomeLayoutProps = {
  children: React.ReactNode;
};

export const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
  return (
    <>
      <NavHeader />
      <img
        className="absolute top-0 -z-10"
        src="assets/BackgroundGradient.svg"
        alt=""
      />
      <div className="pt-36">{children}</div>
    </>
  );
};
