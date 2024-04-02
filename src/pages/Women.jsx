import { useState, useEffect } from 'react'
import { ShoesCard } from '../components/ShoesCard'
import { Header } from '../components/Header'
import { Box, Grid } from '@mui/material'
import { Footer } from '../components/Footer'

export const Women = () => {
  const [productsWomen, setProductsWomen] = useState([])

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/products/all')
      if (response.ok) {
        const data = await response.json()
        const productsWithImages = data.map((product) => ({
          ...product,
          img: `data:image/jpeg;base64,${product.img}`,
        }))
        setProductsWomen(productsWithImages)
      } else {
        console.error('Error fetching products:', response.statusText)
      }
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  const womenFilter = productsWomen.filter(
    (product) => product.category.name === 'Mujer',
  )

  return (
    <>
      <Header />
      <Box sx={{ flexGrow: 0 }} style={{ padding: '20px' }}>
        <Grid
          container
          spacing={{ xs: 1, md: 1 }}
          columns={{ xs: 1, sm: 10, md: 16 }}
        >
          {womenFilter.map((product, index) => (
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
      <Footer />
    </>
  )
}
