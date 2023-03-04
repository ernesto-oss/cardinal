import styles from "@/components/hero/hero.module.css";
import Image from "next/image";
import { clsx } from "clsx";

import CardinalIcon from "@/assets/brand/cardinal-icon.svg";
import CardinalLogoGradient from "@/assets/brand/cardinal-logo-gradient.svg";

export const Hero: React.FC = () => {
  return (
    <main className="flex justify-center">
      <div className="flex w-full max-w-4xl flex-col items-center px-8 py-10">
        <div
          className={clsx(
            styles.center,
            "center relative flex flex-col items-center justify-center gap-8 pb-8",
          )}
        >
          <div className={clsx(styles.cardinal, "p-6")}>
            <Image alt="" src={CardinalIcon} />
          </div>
          <Image className="z-10" alt="" src={CardinalLogoGradient} />
        </div>
      </div>
    </main>
  );
};
