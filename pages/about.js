import Head from 'next/head';
import styles from "../styles/about.module.css"
import ModalAbout from "./modalAbout"
import Navbar from "../component/Navbar"
import Footer from "../component/Footer";

const About = () => {
    return (
        <main>
            <Head>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,500;9..40,800&family=Protest+Riot&family=Space+Grotesk:wght@300;500&display=swap" />
            </Head>
            <Navbar></Navbar>
            <section className={styles.main}>
                <div className={styles.parrafos}>
                    <h1 className={styles.title}>ChajaríWine:<br/> el lugar del buen vino</h1>
                    <h4 className={styles.subtitle}>Innovación Regional</h4>
                    <p className={styles.text}>
                    ChajaríStore se enorgullece de ser el primer e-commerce dedicado exclusivamente a la venta de vinos en la región. Más que un simple sitio de compras en línea, ChajaríStore se ha consolidado como un pionero en el comercio digital local, introduciendo nuevas tendencias que enriquecen la cultura y la economía de la comunidad. Nuestro enfoque único no solo satisface a los amantes del vino, sino que también aporta un valor significativo al desarrollo económico regional. ChajaríStore es un destino esencial para quienes buscan disfrutar de la riqueza de la viticultura, todo desde la comodidad de su hogar.
                    </p>
                    {/* <ModalAbout></ModalAbout> */}
                </div>
            </section>
            <Footer></Footer>
        </main>
    )
}

export default About