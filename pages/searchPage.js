// pages/search.js

import clientPromise from "../lib/mongodb";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import styles from "../styles/searchPage.module.css";

export async function getServerSideProps(context) {
  const client = await clientPromise;
  const db = client.db("vinos");

  // Obtener el término de búsqueda desde la URL
  const searchQuery = context.query.search || "";
  
  // Construir la consulta de búsqueda
  const query = searchQuery ? { title: { $regex: searchQuery, $options: 'i' } } : {};
  const wines = await db.collection("lista_de_vinos").find(query).sort({ price: -1 }).toArray();

  return {
    props: {
      wines: JSON.parse(JSON.stringify(wines)), // Serialización de los datos para pasarlos como props
    },
  };
}

const SearchPage = ({ wines }) => {
  const resultCount = wines.length;

  return (
    <main>
      <Navbar/>
      <h1>Resultados de búsqueda</h1>
      <h3 className={styles.resultCount}>Mostrando {resultCount} resultados</h3>
      <div id="results" className={styles.results}>
        {wines.map(wine => (
          <div key={wine._id} className={styles.wineId}>
            <img src={wine.imageitem} alt={wine.name} style={{ width: '100%' }} />
            <h2>{wine.name}</h2>
            <p>Precio: ${wine.price}</p>
            <a href={`../items/${encodeURIComponent(wine._id)}`}>Ver este producto</a>
          </div>
        ))}
      </div>
      <div className={styles.footer}>
        <Footer/>
      </div>
    </main>
  );
};

export default SearchPage;

