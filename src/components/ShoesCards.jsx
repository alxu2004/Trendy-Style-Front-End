import { useEffect, useState } from "react"
import { ShoesCard } from "./ShoesCard";
import '../assets/Styles.css'


export const ShoesCards = () => {
    const [products,setProducts] = useState([])

    useEffect(()=>{
        fetch('src/api/products.json')
        .then(response => response.json())
        .then(data => setProducts(data))
        .catch(error  => console.error('Error', error));
    },[])


  return (
        <section className="products">
            {
                products.map((product)=>{
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
