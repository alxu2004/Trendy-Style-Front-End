import { useEffect, useState } from "react"
import { ShoesCard } from "./ShoesCard";
import '../assets/Styles.css'
import PropTypes from 'prop-types';


export const ShoesCards = ({ searchResults }) => {
    const [products,setProducts] = useState([])

    useEffect(()=>{
        fetch('src/api/products.json')
        .then(response => response.json())
        .then(data => setProducts(data))
        .catch(error  => console.error('Error', error));
    },[])

    const productsToDisplay = searchResults.length > 0 ? searchResults : products;
  return (
        <section className="products">
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
  )
}
ShoesCards.propTypes = {
    searchResults: PropTypes.array.isRequired 
  };