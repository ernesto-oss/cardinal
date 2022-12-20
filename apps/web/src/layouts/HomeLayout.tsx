import Image from 'next/image';
import { NavHeader } from "@acme/ui";
import BackgroundGradient from '@/assets/images/BackgroundGradient.png';

type HomeLayoutProps = {
  children: React.ReactNode;
};

export const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
  return (
    <>
      <NavHeader />
      <Image
        className="absolute top-0 -z-10"
        src={BackgroundGradient}
        fill
        quality={50}
        alt=""
      />
      <div className="pt-36">{children}</div>
    </>
  );
};
