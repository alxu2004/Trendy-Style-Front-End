import {useState, useEffect} from "react"
import { Header } from "../components/Header";
import { Ad } from "../components/Ad";
import { ShoesCard } from "../components/ShoesCard";


export const Men = () => {

    const [productsMen, setProductsMen] = useState([])

    useEffect(()=>{
        fetch('src/api/products.json')
        .then(response => response.json())
        .then(data => setProductsMen(data))
        .catch(error  => console.error('Error', error));
    },[])

    const menFilter = productsMen.filter((product) => product.category === "man")
    
  return (
    <>
        <Header/>
        <Ad/>
        <section className="products">
            {
                menFilter.map((product) => {
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