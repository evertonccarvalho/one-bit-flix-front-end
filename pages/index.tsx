import Head from "next/head";
import styles from "../styles/HomeNoAuth.module.scss";
import HeaderNoAuth from "@/src/components/homeNoAuth/headerNoAuth";

const HomeNoAuth = () => {
  return (
    <>
      <Head>
        <title>OneBtiFlix</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
        <meta property="og:title" content="OneBitFlix" key="title" />
        <meta
          name="descritpion"
          content="Tenha acesso aso melhores conteúdos de promgração de uma forma simples e fácil"
        />
      </Head>
      <main>
        <HeaderNoAuth />
      </main>
    </>
  );
};

export default HomeNoAuth;
