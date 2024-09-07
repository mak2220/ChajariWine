import Head from "next/head";
import clientPromise from "../lib/mongodb";
import { useEffect } from "react";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import styles from "../styles/index.module.css";
import Link from "next/link";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    await clientPromise;

    return {
      props: {
        isConnected: true
      }
    };
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    return {
      props: {
        isConnected: false
      }
    };
  }
};


export default function Home({
  isConnected,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {

  // Mueve el hook dentro del componente funcional
  useEffect(() => {
    // Cargar Bootstrap en el cliente
    if (typeof window !== "undefined") {
      require('bootstrap/dist/css/bootstrap.min.css');
      alert('Bienvenido a Chajari Wine. Esta aplicación es solo con fines de propaganda y divulgación, no expresa ningún tipo de compromiso comercial o promesa de servicios de ningún tipo');
    }
  }, []);
    
  return (
    <div className={styles.container}>
      <Head>
        <title>ChajaríWine</title>
        <link rel="icon" href="favicon/favicon.ico" />
        <meta name="theme-color" content="#ffffff"></meta>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
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
          <img
            src="/wineLogo.png"
            alt="ChajaríWine"
            className={styles.img}
            loading="lazy"  // Carga diferida de la imagen
          />
        </section>
        
        <section className={styles.subtitle}>
          <Link href="/vinos" className={styles.link}>
            <h3>Conoce nuestros vinos</h3>
          </Link>
        </section>
        
        <Footer />
      </main>
    </div>
  );
}
