import { useState,useEffect } from "react"
import { ShoesCard } from "../components/ShoesCard";
import { Header } from "../components/Header";
import { Ad } from "../components/Ad";


export const Women = () => {

    const [productsWomen, setProductsWomen] = useState([])

    useEffect(()=>{
        fetch('src/api/products.json')
        .then(response => response.json())
        .then(data => setProductsWomen(data))
        .catch(error  => console.error('Error', error));
    },[])

    const womenFilter = productsWomen.filter((product) => product.category === "women")

  return (
    <>
        <Header/>
        <Ad/>
        <section className="products">
            {
                womenFilter.map((product) => {
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
    </>

        
  )
}
