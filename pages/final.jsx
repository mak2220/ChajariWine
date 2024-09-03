import clientPromise from "../lib/mongodb";
import styles from '../styles/final.module.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import { jsPDF } from "jspdf";

const Final = ({ compras, orderNumber }) => {

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("ChajaríWine", 105, 20, null, null, 'center');
    doc.setFontSize(12);
    doc.text(`Número de Pedido: ${orderNumber}`, 105, 30, null, null, 'center');
    doc.text("Detalle de la compra:", 10, 40);

    let y = 50;
    compras.forEach((data, index) => {
      doc.text(`Cliente: ${data.name}`, 10, y);
      doc.text(`Teléfono: ${data.phone}`, 10, y + 10);
      if (data.direction) doc.text(`Dirección: ${data.direction}`, 10, y + 20);
      doc.text(`Forma de pago: ${data.payment}`, 10, y + 30);

      y += 40;
      data.cart.forEach((producto, prodIndex) => {
        doc.text(`${prodIndex + 1}. Producto: ${producto.name} - Cantidad: ${producto.quantity} - Precio:$ ${producto.price * producto.quantity},00`, 10, y);
        y += 10;
      });

      y += 10;
    });

    doc.save(`comprobante_compra_${orderNumber}.pdf`);
  };

  return (
    <main>
      <Navbar />
      <section className={styles.section}>
        <h1>Confirmación de compra</h1>
        <div className={styles.content}>
          <h2>Gracias por tu compra</h2>
          {compras.map((data) => (
            <ul className={styles.ul} key={data._id}>
              <li>
                <p>Nombre: {data.name}</p>
                <p>Teléfono: {data.phone}</p>
                <p>Dirección: {data.direction}</p>
                <ul className={styles.ulProduct}>
                  {data.cart.map((producto, index) => (
                    <li key={`${data._id}-${index}`}>
                      <p>Producto: {producto.name}</p>
                      <p>Cantidad: {producto.quantity}</p>
                      <p>Precio: ${producto.price * producto.quantity},00</p>
                    </li>
                  ))}
                </ul>
                <p>Forma de pago: {data.payment}</p>
              </li>
            </ul>
          ))}
          <div className={styles.btn}>
            <p>Número de Pedido: {orderNumber}</p>
            <button onClick={generatePDF} className="btn btn-primary">Descargar Comprobante</button>
            <Link href={'/'}>
              <h3>Finalizar Compra</h3>
            </Link>
          </div>
        </div>
        <div className={styles.footer}>
          <Footer />
        </div>
      </section>
    </main>
  );
};

export default Final;

export async function getServerSideProps(context) {
  try {
    const { orderNumber } = context.query;
    const client = await clientPromise;
    const db = client.db("datosDeOperaciones");

    const compras = await db
      .collection("compras")
      .find({ "orderNumber": orderNumber })
      .limit(20)
      .toArray();

    return {
      props: { compras: JSON.parse(JSON.stringify(compras)), orderNumber },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { compras: [], orderNumber: '' },
    };
  }
}
