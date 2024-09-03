import { useState } from 'react';
import axios from 'axios';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import styles from '../styles/contact.module.css';
import "bootstrap/dist/css/bootstrap.min.css";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone:'',
        message: ''
    });
    const [responseMessage, setResponseMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        // Expresión regular para validar números de teléfono (ajusta según sea necesario)
        const phonePattern = /^[1-9][0-9]*$/;
    
        // Validar solo el campo de teléfono
        if (name === 'phone') {
            if (value === '' || phonePattern.test(value)) {
                // Actualizar el estado con el nuevo valor del campo
                setFormData({ ...formData, [name]: value });
                setError('');
            } else {
                // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje de error
                setError('Número de teléfono inválido. No debe comenzar con 0.');
            }
            } else {
              // Actualizar el estado con el nuevo valor del campo para otros campos
            setFormData({ ...formData, [name]: value });
        }
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
    try {
        const response = await axios.post('/api/contact', formData);
        if (response.status === 200) {
            setResponseMessage('Mensaje enviado correctamente.');
            setFormData({ name: '', email: '', phone:'', message: '' });
        }
    } catch (error) {
            setResponseMessage('Hubo un error al enviar el mensaje.');
            console.error(error);
        }
    };
    

    return (
        <main>
            <Navbar/>
            <section className={styles.section}>
                <div className={styles.text}>
                    <h1>Contacto</h1>
                </div>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="name">Nombre</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="form-control"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="email">Correo Electrónico</label>
                        <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    </div>
                    <div className={styles.formGroup}>
                    <label htmlFor="phone">Teléfono</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="form-control"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        pattern="^[1-9][0-9]*$"
                        title="Ingrese un número de teléfono válido"
                        placeholder="Ej: 3456 407808"
                    />
                    {error && <div style={{ color: 'red', marginTop: '5px' }}>{error}</div>}
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="message">Mensaje</label>
                        <textarea
                            id="message"
                            name="message"
                            className="form-control"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.divBtn}>
                        <button type="submit" className={styles.btn}>Enviar</button>
                        {responseMessage && <p>{responseMessage}</p>}
                    </div>
                </form>
                <div className={styles.text}>
                <h3>💼 ¿Quieres Vender en Nuestra App?</h3>
                    <p>Si tienes productos que merecen ser descubiertos y comprados, ¡hablemos! Estamos buscando socios apasionados y creativos que quieran exhibir sus productos en nuestra plataforma. ¡Tu próximo gran éxito está a solo un clic de distancia!</p>
                    <h3>🌐 ¿Necesitas una Página Personal Atractiva?</h3>
                    <p>Dale vida a tu presencia online con una página personal hecha a medida. Desde diseño elegante hasta funcionalidad avanzada, transformamos tus ideas en una realidad digital que destaca.</p>
                    <h3>🚀 ¿Tienes un Proyecto de Desarrollo en Mente?</h3>
                    <p>Desde soluciones web innovadoras hasta aplicaciones personalizadas, estamos listos para afrontar cualquier desafío. Comparte tu visión con nosotros y trabajemos juntos para crear algo espectacular.</p>
                    <h3>¡No esperes más! Ponte en contacto con nosotros hoy mismo y hagamos realidad tus ideas más ambiciosas.</h3>
                </div>
                </section>
            <Footer/> 
        </main>
    )
}

export default Contact;