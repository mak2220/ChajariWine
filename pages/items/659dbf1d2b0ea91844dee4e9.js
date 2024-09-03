import clientPromise from "../../lib/mongodb";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import Head from "next/head";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import styles from "../../styles/items.module.css";
import Navbar from "../../component/Navbar";
import Footer from "../../component/Footer";

export default function Wine({ lista_de_vinos }) {
    const router = useRouter();
    const [cart, setCart] = useState([]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedCart = localStorage.getItem('cart');
            setCart(storedCart ? JSON.parse(storedCart) : []);
        }
    }, []);

    const handleAddToCart = (product) => {
        const updatedCart = [...cart, product];
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        router.push('/preCartIndex');
    };

        
    return (
        <main className={styles.main} >
            <Head>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,500;9..40,800&family=Protest+Riot&family=Space+Grotesk:wght@300;500&display=swap" />
            </Head>
        
            <Navbar></Navbar>
        
        <div>                
            <ul className={styles.list}>
                {lista_de_vinos.map((wine) => (
                    <li key={wine._id}>
                        <article className={styles.items}>
                        <section>
                            <img src={wine.imageitem} className={styles.img}></img>
                        </section>
                        <section>
                            <h5 className={styles.name}>{wine.name}</h5>
                            <h6 className={styles.subtitle}>{wine.variety}</h6>
                            <h5 className={styles.subtitle}>Precio:$ {wine.price},00</h5>
                        </section>
                        </article>
                        <div className={styles.btnHidden}>
                        <Button variant="primary" 
                                className={styles.btn}
                                onClick={() => handleAddToCart(wine)}
                                >
                                Comprar</Button>
                        </div>
                        <h5 className={styles.subtitle}>Descripción</h5>
                            <p className={styles.text}>
                                {wine.description}
                            </p>
                        <h5 className={styles.subtitle}>Maridaje</h5>
                            <p className={styles.text}>
                                {wine.wine_pairing}
                            </p>
                        <div className={styles.btnPrincipal}>
                            <Button variant="primary" 
                                className={styles.btn}
                                onClick={() => handleAddToCart(wine)}
                                >
                                Comprar</Button>
                        </div>
                        
                    </li>
                    ))}
                </ul>
            </div>
            <div className={styles.footer}>
                <Footer/>
            </div>
        </main>
    );
}
export async function getServerSideProps(){
    try {
        const client = await clientPromise;
        const db = client.db("vinos");

        const lista_de_vinos = await db
            .collection("lista_de_vinos")
            .find({"name":"Trumpeter"})
            .toArray();

        return {
            props: { lista_de_vinos: JSON.parse(JSON.stringify(lista_de_vinos)) },
            
        };
    } catch (e) {
        console.error(e);
    }
}
