import { env } from '@acme/config/env';

export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
};

export const siteConfig: SiteConfig = {
  name: 'Create Cardinal App',
  description: 'The monorepo starter for full-stack applications',
  url: env.SITE_URL,
  ogImage:
    'https://raw.githubusercontent.com/ernesto-oss/cardinal/main/www/public/open-graph-banner.jpg',
};
