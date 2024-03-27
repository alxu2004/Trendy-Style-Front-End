import { useContext, useEffect, useState } from 'react'
import { useLocation} from 'react-router-dom'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Unstable_Grid2'
import Card from '@mui/material/Card'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { ButtonGroup, IconButton } from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import { CartContext } from '../context/CartContext'

export const ProductDetailId = () => {
  const location = useLocation()
  const [idToSearch, setIdToSearch] = useState('')
  const [productDetail, setProductDetail] = useState({})
  const { cart, setCart } = useContext(CartContext)
  const price = productDetail.price
  const id = productDetail.id

  

  useEffect(() => {
    if (location) {
      const idUrl = location.pathname.slice(
        location.pathname.lastIndexOf('/'),
        location.pathname.length,
      )
      setIdToSearch(idUrl.replace('/', ''))
    }
  }, [location])

  useEffect(() => {
    const searchDetailId = async () => {
      const detailId = await fetch(
        `http://localhost:8080/api/products/${idToSearch}`,
      )
      const data = await detailId.json()
      return data
      
    }

    if (idToSearch !== '') {
      searchDetailId().then((response) => {
        setProductDetail(response)
      })
    }
  }, [idToSearch])
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }))
  
  

  const quantity = cart.reduce((accumulated, curr) => {
    return accumulated + curr.quantity
  }, 0)

  const addToCart = () => {
    setCart((currItems) => {
      const isItemFound = currItems.find((items) => items.id === id)
      if (isItemFound) {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 }
          } else {
            return item
          }
        })
      } else {
        return [...currItems, { idToSearch, quantity: 1, price }]
      }
    })
  }
  const removeItem = (id) => {
    setCart((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id)
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 }
          } else {
            return item
          }
        })
      }
    })
  }

  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={0}>
        <Grid xs={6} md={7}>
          <Item style={{ height: '95vh' }}>
            <img
              style={{ width: '90vh' }}
              src={`data: image/jpeg;base64,${productDetail.img} `}
              alt=''
            />
          </Item>
        </Grid>
        <Grid xs={6} md={5}>
          <Card
            variant='outlined'
            sx={{ maxWidth: 600, padding: 2, height: '91.5vh' }}
          >
            <Box sx={{ py: 5, px: 4 }}>
              <Stack
                direction='row'
                justifyContent='center'
                alignItems='center'
                marginBottom={2}
              >
                <Typography gutterBottom variant='h3' component='div'>
                  {productDetail.name}
                </Typography>
              </Stack>
              <Typography
                color='text.primary'
                variant='h6'
                textAlign={'justify'}
                marginBottom={2}
              >
                {productDetail.detail}
              </Typography>
            </Box>
            <Divider />
            <Box sx={{ p: 2 }}>
              <Typography gutterBottom variant='body2'>
                <Stack
                  direction='row'
                  spacing={2}
                  justifyContent={'space-around'}
                  marginBottom={2}
                  marginTop={2}
                >
                  {quantity === 0 ? (
            <IconButton
              color='primary'
              aria-label='add to shopping cart'
              onClick={addToCart}
            >
              <AddShoppingCartIcon />
            </IconButton>
          ) : (
            <ButtonGroup variant='contained' aria-label='Basic button group'>
              <Button onClick={() => removeItem(id)}>-</Button>
              <Button>{quantity}</Button>
              <Button onClick={addToCart}>+</Button>
            </ButtonGroup>
          )}
                  <Typography gutterBottom variant='h4' component='div'>
                    {productDetail.price}
                  </Typography>
                </Stack>
              </Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>
      
    </Box>
  )
}
