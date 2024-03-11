/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { ShoesCard } from "./ShoesCard";
import '../assets/Styles.css';
import PropTypes from 'prop-types';

export const ShoesCards = ({ searchResults, section }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/v1/producto/listar');
            if (response.ok) {
                const data = await response.json();
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

    const productsToDisplay = searchResults.length > 0 ? searchResults : products;

    return (
        <article className="shoes">
            <section className="products" ref={section}>
                {productsToDisplay.map(product => (
                    <ShoesCard
                        key={product.id}
                        name={product.name}
                        img={product.img}
                        price={product.price}
                        id={product.id}
                    />
                ))}
            </section>
        </article>
    );
};

ShoesCards.propTypes = {
    searchResults: PropTypes.array.isRequired
};
