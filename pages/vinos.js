import clientPromise from "../lib/mongodb";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "../styles/vinos.module.css"
import Navbar from "../component/Navbar";
import Link from "next/link";
import Footer from "../component/Footer";

export default function Wine({ lista_de_vinos }) {

    return (
        <main className={styles.main} >
        <div>
            <Navbar></Navbar>
                        
            <h1 className={styles.title}>Los mejores vinos para todos los paladares.....</h1>
            
            <ul className={styles.list}>
                {lista_de_vinos.map((wine) => (
                    <li key={wine._id}>
                        <div className={styles.imagen}>
                            <img src={wine.image} alt={wine.name}></img>
                        </div>
                        <div className={styles.info}>
                            <h4>{wine.name}</h4>
                            <h5>{wine.variety}</h5>
                            <h6>Precio: $ {wine.price},00</h6>
                            <section className={styles.link}>
                                <Link   href={`/items/${encodeURIComponent(wine._id.toString())}`}>
                                    <p className={styles.btn}>Ver este artículo</p>
                                </Link>    
                            </section>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
        <Footer/>
    </main>
    );
}

export async function getServerSideProps() {
    try {
        const client = await clientPromise;
        const db = client.db("vinos");

        const lista_de_vinos = await db
            .collection("lista_de_vinos")
            .find({})
            .sort({ price: -1 })
            .limit(20)
            .toArray();

        return {
            props: { lista_de_vinos: JSON.parse(JSON.stringify(lista_de_vinos)) },
            
        };
    } catch (e) {
        console.error(e);
    }
}