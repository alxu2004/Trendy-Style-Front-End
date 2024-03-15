import { useState,useEffect } from "react"
import { ShoesCard } from "../components/ShoesCard";
import { Header } from "../components/Header";


export const Women = () => {

    const [productsWomen, setProductsWomen] = useState([])

    useEffect(() => {
        fetchProducts();
      }, []);
    
      const fetchProducts = async () => {
        try {
          const response = await fetch('http://localhost:8080/api/products/all');
          if (response.ok) {
            const data = await response.json();
            const productsWithImages = data.map(product => ({
              ...product,
              img: `data:image/jpeg;base64,${product.img}`
            }));
            setProductsWomen(productsWithImages);
          } else {
            console.error('Error fetching products:', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };
    

    const womenFilter = productsWomen.filter((product) => product.category.name === "mujer")

  return (
    <>
        <Header/>
        <section className="products">
            {
                womenFilter.map((product) => {
                    return <ShoesCard
                    key={product.id}
                    name={product.name}
                    img={product.img}
                    price={product.price}
                    id={product.id}
                    />
                })

            }

        </section>
    </>

        
  )
}
