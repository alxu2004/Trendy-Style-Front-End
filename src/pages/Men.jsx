import {useState, useEffect} from "react"
import { Header } from "../components/Header";
import { ShoesCard } from "../components/ShoesCard";


export const Men = () => {

    const [productsMen, setProductsMen] = useState([])

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
            setProductsMen(productsWithImages);
          } else {
            console.error('Error fetching products:', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };
    
    console.log(productsMen);
    const menFilter = productsMen.filter((product) => product.category.name === "hombre")
    
  return (
    <>
        <Header/>
        <section className="products">
            {
                menFilter.map((product) => {
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