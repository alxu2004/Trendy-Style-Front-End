import { Ad } from '../components/Ad';
import { ShoesCards } from '../components/ShoesCards';
import { Header } from './../components/Header';
import { useState, useEffect, useRef } from 'react';

export const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const sectionRef = useRef(null);

  const scrollToSection = () => {
    sectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/producto/listar');
      if (response.ok) {
        const data = await response.json();
        // Convertir imágenes de bytes a URLs
        const productsWithImages = data.map(product => ({
          ...product,
          img: `data:image/jpeg;base64,${product.img}`
        }));
        setProducts(productsWithImages);
      } else {
        console.error('Error fetching products:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

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
        scroll={scrollToSection}
      />
      <Ad />
      <ShoesCards searchResults={searchResults.length > 0 ? searchResults : products} section={sectionRef} />
    </>
  );
};
