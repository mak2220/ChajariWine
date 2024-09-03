import Head from "next/head";
import clientPromise from "../lib/mongodb";
import { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import styles from "../styles/index.module.css";
import Navbar from "../component/Navbar";
import Link from "next/link";
import Footer from "../component/Footer";
require('../eventsConfig');

type ConnectionStatus = {
  isConnected: boolean;
};

export const getServerSideProps: GetServerSideProps<
  ConnectionStatus
> = async () => {
  try {
    await clientPromise;
    
    return {
      props: { isConnected: true },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
};

export default function Home({
  isConnected,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  useEffect(() => {
    alert(' Bienvenido a Chajari Wine. Esta aplicación es solo con fines de propaganda y divulgación, no expresa ningún tipo de compromiso comercial o promesa de prestación de servicos de ningún tipo');
  }, []);
    
  return (
    <div className={styles.container}>
      <Head>
        <title>ChajaríWine</title>
        <link rel="icon" href="favicon/favicon.ico" />
        <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png"/>
        <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png"/>
        <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png"/>
        <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png"/>
        <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png"/>
        <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png"/>
        <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png"/>
        <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png"/>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png"/>
        <link rel="icon" type="image/png" sizes="192x192"  href="/android-icon-192x192.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
        <link rel="manifest" href="/manifest.json"/>
        <meta name="msapplication-TileColor" content="#ffffff"/>
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png"/>
        <meta name="theme-color" content="#ffffff"></meta>
      </Head>
      <main className={styles.main}>
        <Navbar />

        {isConnected ? (
          <section className={styles.title}>
            <h1>Bienvenidos a ChajaríWine!</h1>
          </section>
        ) : (
          <section>
            <h2 className={styles.title}>
              Estamos con dificultades técnicas.
            </h2>
          </section>
        )}
        <section className={styles.containerImg}>
          <img src="/wineLogo.png" alt="ChajaríWine" className={styles.img}></img>
      </section>
      <section className={styles.subtitle}>
        <Link href={'/vinos'} className={styles.link}>
          <h3>Conoce nuestros vinos</h3>
        </Link>
      </section>
    <Footer />
    </main>
    </div>
  );
}
