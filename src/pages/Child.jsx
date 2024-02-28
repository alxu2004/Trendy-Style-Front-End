import { useState,useEffect } from "react"
import { ShoesCard } from "../components/ShoesCard";
import { Header } from "../components/Header";
import { Ad } from "../components/Ad";


export const Child = () => {

    const [productsChild, setProductsChild] = useState([])

    useEffect(()=>{
        fetch('src/api/products.json')
        .then(response => response.json())
        .then(data => setProductsChild(data))
        .catch(error  => console.error('Error', error));
    },[])

    const childFilter = productsChild.filter((product) => product.category === "children")

  return (
    <>
        <Header/>
        <Ad/>
        <section className="products">
            {
                childFilter.map((product) => {
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
