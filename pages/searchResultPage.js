// SearchResultsPage.js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const SearchResultsPage = () => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [wines, setWine] = useState([]);

useEffect(() => {
    const fetchData = async () => {
      try {
        const { query } = router.query;
        setSearchTerm(query);
        const res = await fetch(`/api/serch?search=${query}`);
        const data = await res.json();
        setWine(data);
      } catch (error) {
        console.error(error);
      }
    };
    
    fetchData();
  }, [router.query]);

  return (
    <div>
      <h1>Search Results for: {searchTerm}</h1>
      <ul>
        {wines.map(wine => (
          <li key={wine._id}>{wine.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResultsPage;
