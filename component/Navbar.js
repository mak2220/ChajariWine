// components/Navbar.js

import Link from 'next/link';
import styles from "./Navbar.module.css";
import DropdownMenu from "./Dropdownmenu";
import SearchComponent from "./searchComponent"

const myNavbar = () => {
    return (
    
    <nav className={styles.container} >
            <section className={styles.myNav}>
                <div className={styles.myMenu}>
                    <DropdownMenu></DropdownMenu>
                </div>
                <SearchComponent></SearchComponent>
                <ul className={styles.myUl}>
                    <li className={styles.myLi}>
                        <Link href="/">
                            Inicio
                        </Link>
                    </li>
                    <li className={styles.myLi}>
                        <Link href="/about">
                            Que es ChajaríWine?
                        </Link>
                    </li>
                    <li className={styles.myLi}>
                        <Link href="/contact">
                            Contacto
                        </Link>
                    </li>
                </ul>
            </section>
            <section className={styles.responsive}>
                <DropdownMenu></DropdownMenu>     
            </section>
    </nav>
    
    );
};

export default myNavbar;
