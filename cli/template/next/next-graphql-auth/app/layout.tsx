import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import { clsx } from 'clsx';

import { siteConfig } from '@/config/site';

import '@/styles/globals.css';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-default',
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={clsx('font-default text-slate-200 bg-gray-950', fontSans.variable)}>
        {children}
      </body>
    </html>
  );
}
