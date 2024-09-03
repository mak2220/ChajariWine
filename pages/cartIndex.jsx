import clientPromise from "../lib/mongodb";
import axios from "axios";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../styles/cartIndex.module.css";

const CartIndex = ({ comercio_01 }) => {
  const router = useRouter();
  const [cart, setCart] = useState([]);
  const [selectedPay, setSelectedPay] = useState('');
  const [errors, setErrors] = useState({});
  const [orderNumber, setOrderNumber] = useState('');

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) ?? [];
    setCart(storedCart);
    setOrderNumber(Date.now().toString());
  }, []);

  const handlePay = (event) => {
    setSelectedPay(event.target.value);
  };

  const validateForm = (data) => {
    const errors = {};
    if (!data.payment) errors.payment = 'Seleccione un método de pago';
    if (!data.name) errors.name = 'Nombre es requerido';
    if (!data.phone) errors.phone = 'Teléfono es requerido';
    if (data.payment === 'Envio a mi domiclio' && !data.direction) errors.direction = 'Dirección es requerida';
    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const form = document.getElementById('paymentForm');
    const formData = new FormData(form);
  
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    data.cart = cart.map(({ name, price, quantity }) => ({ name, price, quantity }));
    data.orderNumber = orderNumber; // Añadir el número de orden al formulario
  
    // Validar el formulario
    const validationErrors = validateForm(data);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    console.log('Data to be sent:', data); // <-- Aquí

    try {
      const response = await axios.post('/api/finalData', data);

      if (response.status === 200) {
        localStorage.removeItem('cart');
        router.push(`/final?orderNumber=${orderNumber}`);
      }
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  const calculateTotal = (selectedPay, envio) => {
    let total = cart.reduce((total, product) => total + product.price * product.quantity, 0);
    if (selectedPay === 'Envio a mi domiclio') {
      total += envio;
    }
    return total;
  };

  return (
    <main className={styles.main}>
      <div>
        <Navbar />
      </div>
      <div className={styles.content}>
      
        {cart.length > 0 ? (
          <section className={styles.section}>
            <div className={styles.compra}>
              <ul className={styles.ul}>
                <h1 className={styles.title}>Detalle de tu compra:</h1>
                {cart.map((product, index) => (
                  <li key={index}>
                    <h3>{product.name}</h3>
                    <article className={styles.li}>
                      <div className={styles.data}>
                        <h3>Precio: {product.price},00</h3>
                        <h3>Cantidad: {product.quantity}</h3>
                      </div>
                      <div className={styles.divImg}>
                        <img className={styles.img} src={product.imageitem} alt={product.name}></img>
                      </div>
                    </article>
                  </li>
                ))}
                  <h3>Número de compra: {orderNumber}</h3> {/* Mostrar el número de compra */}
              </ul>
            </div>
            <div className={styles.payment}>
              <h1 className={styles.title}>Elige tu forma de pago:</h1>
              {comercio_01.map((item) => (
                <h2 key={item._id} className={styles.title}>Total a Pagar: ${calculateTotal(selectedPay, item.envio)},00</h2>
              ))}
              <form className={styles.form} id="paymentForm" onSubmit={handleSubmit}>
                <section className={styles.radios}>
                  <div>
                    <input
                      type="radio"
                      id="pay1"
                      name="payment"
                      value="Retiro en el local"
                      checked={selectedPay === 'Retiro en el local'}
                      onChange={handlePay}
                    />
                    {comercio_01.map((item) => (
                      <label htmlFor="pay1" key={item._id} className={styles.subtitle}><h4>Retiro y pago en el local {item.direccion}</h4></label>
                    ))}
                    {errors.payment && <p className={styles.error}>{errors.payment}</p>}
                  </div>
                  {selectedPay === 'Retiro en el local' && (
                    <div className={styles.dataDomicilio}>
                      <label htmlFor="name"><h4>Escribe tu nombre</h4></label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Escribe tu nombre"
                      />
                      {errors.name && <p className={styles.error}>{errors.name}</p>}
                      <label htmlFor="phone"><h4>Escribe tu teléfono</h4></label>
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        placeholder="Escribe tu teléfono"
                      />
                      {errors.phone && <p className={styles.error}>{errors.phone}</p>}
                    </div>
                  )}
                  <div>
                    <input
                      type="radio"
                      id="pay2"
                      name="payment"
                      value="Envio a mi domiclio"
                      checked={selectedPay === 'Envio a mi domiclio'}
                      onChange={handlePay}             
                    />
                    {comercio_01.map((item) => (
                      <label htmlFor="pay2" key={item._id} className={styles.subtitle}><h4>Envio y pago en mi domiclio, costo adicional ${item.envio}</h4></label>
                    ))}
                    {errors.payment && <p className={styles.error}>{errors.payment}</p>}
                  </div>
                  {selectedPay === 'Envio a mi domiclio' && (
                    <div className={styles.dataDomicilio}>
                      <label htmlFor="name"><h4>Escribe tu nombre</h4></label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Escribe tu nombre"
                      />
                      {errors.name && <p className={styles.error}>{errors.name}</p>}
                      <label htmlFor="direction"><h4>Escribe tu dirección</h4></label>
                      <input
                        type="text"
                        id="direction"
                        name="direction"
                        placeholder="Escribe tu dirección"
                      />
                      {errors.direction && <p className={styles.error}>{errors.direction}</p>}
                      <label htmlFor="phone"><h4>Escribe tu teléfono</h4></label>
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        placeholder="Escribe tu teléfono"
                      />
                      {errors.phone && <p className={styles.error}>{errors.phone}</p>}
                    </div>
                  )}
                </section>
              </form>
              <div>
                <section className={styles.pagesMobile}>
                  <button type="submit" className={styles.btn} onClick={handleSubmit}><h4>Confirmar</h4></button>
                  <button type="button" onClick={clearCart} className={styles.btn}><h4>Cancelar</h4></button>
                </section>
              </div>
            </div>
          </section>
        ) : (
          <h1 className={styles.title}>El carrito está vacío.</h1>
        )}
        {cart.length > 0 ? (
          <section className={styles.pages}>
            <button type="submit" onClick={handleSubmit} className={styles.btn}>Confirmar</button>
            <button type="button" onClick={clearCart} className={styles.btn}>Cancelar compra</button>
          </section>
        ) : (
          <h2>Todavía no has comprado nada</h2>
        )}
      </div>
      <div className={styles.footer}>
        <Footer/>
      </div>        
    </main>
  );
};

export default CartIndex;

export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db("direcciones");

    const comercio_01 = await db
      .collection("comercio_01")
      .find({})
      .toArray();

    return {
      props: { comercio_01: JSON.parse(JSON.stringify(comercio_01)) },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { comercio_01: [] },
    };
  }
}

