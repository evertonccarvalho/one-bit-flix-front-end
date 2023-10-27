import FeaturedSection from "@/src/components/homeAuth/featuredSection";
import Head from "next/head";

export default function HomeAuth() {
  return (
    <>
      <Head>
        <title>OneBitFlix - Home</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      <main>
        <FeaturedSection />
      </main>
    </>
  );
}
