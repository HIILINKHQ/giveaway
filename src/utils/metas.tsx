import Head from "next/head";

export const Metas = () => {
  return (
    <Head>
      <title>{process.env.NEXT_PUBLIC_PROJECT_NAME}</title>
      <meta
        name="title"
        content={process.env.NEXT_PUBLIC_PROJECT_NAME ?? "Frostbyte"}
      />
      <meta
        name="description"
        content={process.env.NEXT_PUBLIC_PROJECT_DESCRIPTION}
      />
      <meta
        name="keywords"
        content="Frostbyte NFTs"
      />
      <meta name="robots" content="index, follow" />
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
      <meta name="author" content="nooobmaster19" />
      <meta property="og:image" content="/assets/og.png" />
    </Head>
  );
};
