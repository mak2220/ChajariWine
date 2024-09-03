import Link from 'next/link';
import styles from './DropdownMenu.module.css'; 

const DropdownMenu = () => {
  return (
    <div className={styles.dropdown}>
      <button className={styles.dropbtn}>
        <a className={styles.dropdownMenu}>Menú</a><img src="/icons8-menú.svg"></img>
      </button>
      <div className={styles.dropdownContent}>
        <Link href="/vinos">
              Lista de vinos
        </Link>
        <Link href="/">
          Inicio
        </Link>
        <Link href="/about">
          Quienes somos
        </Link>
        <Link href="/contact">
          Contacto
        </Link>
      </div>
    </div>
  );
};

export default DropdownMenu;
