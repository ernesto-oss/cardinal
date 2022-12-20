import Head from "next/head";
import { useRouter } from "next/router";

export type TitleAndMetaTagProps = {
  title?: string;
  description?: string;
  image?: string;
  pathName?: string;
};

export function TitleAndMetaTags({
  title = "Cardinal | Open-source template for Next.js + GraphQL",
  description = "",
  pathName,
}: TitleAndMetaTagProps) {
  const router = useRouter();
  const originLocation = "https://cardinal.ernestoresende.com";
  const imageUrl = `${originLocation}/api/og`;
  const path = pathName || router.pathname;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:url" content={`${originLocation}${path}`} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
}
