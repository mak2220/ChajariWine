import { useEffect, useState } from 'react';
import Link from "next/link";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import styles from "../styles/preCartIndex.module.css";

const PreCartIndex = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Cargar el carrito desde localStorage cuando el componente se monte
    const storedCart = localStorage.getItem('cart');
    const parsedCart = storedCart ? JSON.parse(storedCart) : [];
    // Inicializar las cantidades con el valor de 1 para cada elemento del carrito si no existe
    const initializedCart = parsedCart.map(item => ({
      ...item,
      quantity: item.quantity ?? 1
    }));
    setCart(initializedCart);
  }, []);

  useEffect(() => {
    // Guardar el carrito en localStorage cuando el estado del carrito cambie
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const removeFromCart = (indexToRemove) => {
    const updatedCart = cart.filter((_, index) => index !== indexToRemove);
    setCart(updatedCart);
  };

  const updateQuantity = (index, newQuantity) => {
    // Validar que la nueva cantidad no sea menor a 1
    if (newQuantity < 1) {
      newQuantity = 1; // Si es menor a 1, se ajusta a 1
    }

    const updatedCart = [...cart];
    updatedCart[index].quantity = newQuantity;
    setCart(updatedCart);
  };

  const handleBlur = (index, value) => {
    // Si el campo queda vacío, establece la cantidad a 1
    if (!value) {
      updateQuantity(index, 1);
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <main className={styles.main}>
      <div>
        <Navbar />
      </div>
      <div className={styles.title}>
        <h1 className={`${cart.length === 0 ? styles.cartEmpty : ''}`}>Estos son los productos de tu carro de compras:</h1>
        <hr className={styles.linea} />
        {cart.length > 0 ? (
          <article>
          <ul className={styles.ul}>
            {cart.map((item, index) => (
              <li key={index}>
                <section className={styles.data}>
                  <div className={styles.subtitle}>
                    <h3>Nombre: {item.name}</h3>
                    <h3>Precio: ${item.price},00</h3>
                    <div className={styles.inputMobile}>
                      <label htmlFor={`quantityM-${index}`}><h3>Cantidad:</h3></label>
                      <button onClick={() => updateQuantity(index, item.quantity > 1 ? item.quantity - 1 : 1)} className={styles.buttonMobile}>-</button>
                      <input
                        id={`quantityM-${index}`}
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(index, parseInt(e.target.value))}
                        min="1"
                        max="50"
                        className={styles.quantityInputMobile}
                        onKeyDown={(e) => e.preventDefault()} // Prevenir el uso del teclado
                        />
                      <button onClick={() => updateQuantity(index, item.quantity + 1)} className={styles.buttonMobile}>+</button>
                      </div>
                      <div className={styles.inputXL}>
                      <label htmlFor={`quantity-${index}`}><h3>Cantidad:</h3></label>
                      <input
                        id={`quantity-${index}`}
                        type="number"
                        value= {item.quantity}
                        onChange={(e) => updateQuantity(index, parseInt(e.target.value))}
                        onBlur={(e) => handleBlur(index, e.target.value)}
                        onKeyDown={(e) => e.preventDefault()}
                        min="1"
                        max='50'
                        className={styles.quantityInput}
                        />
                      </div>
                      <h3 className={styles.subtitle}>Total: ${item.price * item.quantity}.00</h3>
                  </div>
                  <div className={styles.dataImg}>
                    <img src={item.imageitem} alt={item.name} className={styles.img} />
                  </div>
                </section>
                <Button onClick={() => removeFromCart(index)}>Eliminar este artículo</Button>
                <hr className={styles.linea} />
              </li>
            ))}
          </ul>
          <div className={styles.pages}>
        <Link href={'/cartIndex'} className={styles.link}>
          <h4>Pagar</h4>
        </Link>
        <Link href={'/vinos'} className={styles.link}>
          <h4>Seguir Comprando</h4>
        </Link>
      </div>
      </article>
      ) : (
          <div>
            <h2>No hay nada en tu carro de compras</h2>
            <Link href={'/vinos'} className={styles.link}>Ver Productos</Link>
          </div>
        )}
      </div>
      <div className={styles.footer}>
        <Footer/>      
      </div>
    </main>
  );
};

export default PreCartIndex;




