import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from "./Navbar.module.css";


const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  // const handleSearch = async () => {
  //   try {
  //     router.push(`/api/search?search=${searchTerm}`);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  const handleSearch = async () => {
    try {
      // Redirigir a la página de búsqueda
      router.push(`/searchPage?search=${searchTerm}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className='search-container'>
      <input 
        className={styles.myInput}
        type="text" 
        id='sercher'
        placeholder="Search Wine" 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSearch}
              className={styles.myBtn}
              type="button">
              <img className={styles.dropdownImg} src='/icons8-lupa.svg' alt='Buscar'></img>
              </button>
    </div>
  );
};

export default SearchComponent;
