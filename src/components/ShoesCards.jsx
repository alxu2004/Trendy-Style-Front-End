/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { ShoesCard } from "./ShoesCard";
import '../assets/Styles.css'
import PropTypes from 'prop-types';


export const ShoesCards = ({ searchResults,section }) => {
    const [products,setProducts] = useState([])

    useEffect(()=>{
        fetch('src/api/products.json')
        .then(response => response.json())
        .then(data => setProducts(data))
        .catch(error  => console.error('Error', error));
    },[])

    const productsToDisplay = searchResults.length > 0 ? searchResults : products;
  return (
        <article className="shoes">
            <section className="products" ref={section}>
            {
                productsToDisplay.map((product)=>{
                    return <ShoesCard 
                    key={product.id}
                    name={product.name}
                    img={product.img}
                    price={product.price}
                    detail={product.detail}
                    />
                })
            }
            </section>
        </article>
        
  )
}
ShoesCards.propTypes = {
    searchResults: PropTypes.array.isRequired 
  };