
import { Ad } from '../components/Ad';
import { ShoesCards } from '../components/ShoesCards';
import { Header } from './../components/Header';
import { useState,useEffect } from 'react';

export const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetch('src/api/products.json')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error', error));
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredProducts);
  };
  return (
    <>
        <Header
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onSearch={handleSearch}
      />
      <Ad />
      <ShoesCards searchResults={searchResults.length > 0 ? searchResults : products} />
    </>
  )
}
