import { Inter as FontSans } from "next/font/google";
import { clsx } from "clsx";
import Providers from "@/utils/providers";
import { siteConfig } from "@/config/site";

import "@/styles/globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-default",
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    title: siteConfig.name,
    siteName: siteConfig.name,
    description: siteConfig.description,
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={clsx("font-default text-slate-200", fontSans.variable)}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
