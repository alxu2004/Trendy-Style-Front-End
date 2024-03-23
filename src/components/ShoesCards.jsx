/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { ShoesCard } from './ShoesCard'
import '../assets/Styles.css'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Unstable_Grid2'

export const ShoesCards = ({ searchResults, section }) => {
  const [products, setProducts] = useState([])

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
        setProducts(productsWithImages)
      } else {
        console.error('Error fetching products:', response.statusText)
      }
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  const productsToDisplay = searchResults.length > 0 ? searchResults : products

  return (
    <Box sx={{ flexGrow: 0 }} style={{ padding: '20px' }}>
      <Grid
        container
        spacing={{ xs: 1, md: 1.5 }}
        columns={{ xs: 1, sm: 10, md: 16 }}
        ref={section}
      >
        {productsToDisplay.map((product, index) => (
          <Grid xs={1} sm={4} md={4} key={index}>
            <ShoesCard
              key={product.id}
              name={product.name}
              img={product.img}
              price={product.price}
              detail={product.detail}
              marca={product.marca.name}
              category={product.category.name}
              id={product.id}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

ShoesCards.propTypes = {
  searchResults: PropTypes.array.isRequired,
}
