import Image from 'next/image';
import CardinalIcon from '@/assets/brand/cardinal-icon.svg';
import CardinalLogoGradient from '@/assets/brand/cardinal-logo-gradient.svg';
import { clsx } from 'clsx';

import styles from '@/components/hero/hero.module.css';

export const Hero: React.FC<{ protectedRoute?: boolean }> = ({
  protectedRoute,
}) => {
  return (
    <main className="flex justify-center">
      <div className="flex w-full max-w-4xl flex-col items-center px-8 py-10">
        <div
          className={clsx(
            styles.center,
            'center relative flex flex-col items-center justify-center gap-8 pb-8',
          )}
        >
          <div className={clsx(styles.cardinal, 'p-6')}>
            <Image className="w-16" alt="" src={CardinalIcon} />
          </div>
          <Image className="z-10 w-44" alt="" src={CardinalLogoGradient} />
        </div>
        <p className="max-w-[600px] text-center text-base leading-relaxed text-slate-300">
          {protectedRoute && (
            <>
              If you&apos;re seeing this page, it means you&apos;re{' '}
              <b>authenticated</b>. Logging out will redirect you back to the
              login page.
            </>
          )}

          {!protectedRoute && (
            <>
              Your next fullstack application begins here. Browser the code and
              documentation to take a look at how we&apos;ve scaffolded things
              for you.
            </>
          )}
        </p>
      </div>
    </main>
  );
};
