import { useState,useEffect } from "react"
import { ShoesCard } from "../components/ShoesCard";
import { Header } from "../components/Header";


export const Child = () => {

    const [productsChild, setProductsChild] = useState([])

    useEffect(() => {
        fetchProducts();
      }, []);
    
      const fetchProducts = async () => {
        try {
          const response = await fetch('http://localhost:8080/api/products/all');
          if (response.ok) {
            const data = await response.json();
            // Convertir imágenes de bytes a URLs
            const productsWithImages = data.map(product => ({
              ...product,
              img: `data:image/jpeg;base64,${product.img}`
            }));
            setProductsChild(productsWithImages);
          } else {
            console.error('Error fetching products:', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };
    

    const childFilter = productsChild.filter((product) => product.category.name === "niño")

  return (
    <>
        <Header/>
        <section className="products">
            {
                childFilter.map((product) => {
                    return <ShoesCard
                    key={product.id}
                    name={product.name}
                    img={product.img}
                    price={product.price}
                    />
                })
            }
        </section>
    </>

        
  )
}
