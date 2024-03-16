import { useState,useEffect } from "react"
import { ShoesCard } from "../components/ShoesCard";
import { Header } from "../components/Header";
import { Box, Grid } from "@mui/material";


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
    

    const childFilter = productsChild.filter((product) => product.category.name === "Niño")

  return (
    <>
        <Header/>
        <Box sx={{ flexGrow: 0 }} style={{padding:'20px'}} >
        <Grid container spacing={{ xs: 1, md: 1 }} columns={{ xs: 1, sm: 10, md: 16 }}>
        {childFilter.map((product, index) => (
          <Grid xs={1} sm={4} md={4} key={index}>
            <ShoesCard
                key={product.id}
                name={product.name}
                img={product.img}
                price={product.price}
                detail={product.detail}
                id={product.id}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
    </>

        
  )
}
