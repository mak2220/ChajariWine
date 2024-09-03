import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import styles from "../styles/about.module.css";

const ModalAbout = () => {
    const [show, setShow] = useState(false);    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true); 
    
    const [show2, setShow2] = useState(false);    
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true); 
    return (
        <>
            <Button variant="primary" onClick={handleShow} className={styles.modal}>
            <h4 className={styles.subtitle}>Gastronomía a Tu Puerta</h4>
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton className={styles.backgroundModal}>
                {/* <Modal.Title>Título del Modal</Modal.Title> */}
                </Modal.Header>
                <Modal.Body className={styles.backgroundModal}>
                    <p>
                        ChajaríStore es mucho más que un simple punto de venta en línea; es una puerta de entrada a un festín de sabores. Con su servicio de delivery de comidas y bebidas, este ecommerce satisface los paladares más exigentes, ofreciendo una amplia gama de opciones gastronómicas que van desde platos locales hasta delicias internacionales. La frescura y la calidad de los productos son la prioridad, brindando a los clientes la confianza de disfrutar de una experiencia culinaria excepcional en la comodidad de sus hogares.
                    </p>
                </Modal.Body>
                {/* <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                <p className={styles.backgroundModal}>
                    Volver
                </p>
                </Button>
                </Modal.Footer> */}
            </Modal>
            <Button variant="primary" onClick={handleShow2}>
            <h4 className={styles.subtitle}>Estilo que Define</h4>
            </Button>
            <Modal show={show2} onHide={handleClose2}>
                <Modal.Header closeButton className={styles.backgroundModal}>
                {/* <Modal.Title>Título del Modal</Modal.Title> */}
                </Modal.Header>
                <Modal.Body className={styles.backgroundModal}>
                    <p>
                    Más allá de la cocina, ChajaríStore se sumerge en el mundo de la moda, ofreciendo una cuidadosa selección de indumentaria que refleja las últimas tendencias. Desde elegantes atuendos para ocasiones especiales hasta opciones casuales para el día a día, este ecommerce satisface las necesidades de moda de sus clientes con prendas de calidad y estilo. La diversidad de marcas y estilos garantiza que todos encuentren algo que se adapte a su gusto único.
                    Artículos Deportivos para el Espíritu Competitivo: Para aquellos que abrazan un estilo de vida activo, ChajaríStore ofrece una sección dedicada a artículos deportivos. Desde ropa y calzado especializado hasta equipos para diversas disciplinas, este rincón virtual es el paraíso para los amantes del deporte. Ya sea que busques equipamiento para el gimnasio, la cancha o simplemente para mantenerte activo al aire libre, ChajaríStore tiene todo lo necesario para alimentar tu espíritu competitivo.
                    </p>
                </Modal.Body>
                {/* <Modal.Footer className={styles.backgroundModal}>
                <Button variant="secondary" onClick={handleClose2}>
                Volver
                </Button>
                </Modal.Footer> */}
            </Modal>
        </>
    );
};

export default ModalAbout;
