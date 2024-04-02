/* eslint-disable react/prop-types */
import { NavLink } from 'react-router-dom'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { ButtonGroup, Divider, IconButton } from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import { useContext } from 'react'
import { CartContext } from '../context/CartContext'

export const ShoesCard = (props) => {
  const img = props.img
  const name = props.name
  const price = props.price
  const id = props.id
  const { cart, setCart } = useContext(CartContext)

  const addToCart = () => {
    setCart((currItems) => {
      const isItemFound = currItems.find((item) => item.id === id);
      if (isItemFound) {
        return currItems.map((item) => {
          if (item.id === id) {
            const updatedQuantity = item.quantity + 1;
            const totalPrice = updatedQuantity * item.price;
            return { ...item, quantity: updatedQuantity, total: totalPrice };
          } else {
            return item;
          }
        });
      } else {
        const totalPrice = price * 1; 
        return [...currItems, { id, name, img, quantity: 1, price, total: totalPrice }];
      }
    });
  };
  
  const removeItem = (id) => {
    setCart((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id)
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, name, img, quantity: item.quantity - 1 }
          } else {
            return item
          }
        })
      }
    })
  }

  const getQuantityById = () => {
    return cart.find((item) => item.id === id)?.quantity || 0
  }
  const quantityPerId = getQuantityById(id)
  return (
    <>
      <Card sx={{ maxWidth: 300 }}>
        <CardMedia
          sx={{ height: 150, textDecoration: 'none' }}
          image={img}
          title={name}
          component={NavLink}
          to={`/detail/${id}`}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant='h7'
            component='div'
            textAlign='center'
          >
            {name}
          </Typography>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            style={{ fontWeight: '1000', fontSize: '18px', color: 'black' }}
            size='large'
            disabled
          >
            {price} COP
          </Button>
          {quantityPerId === 0 ? (
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
              <Button>{quantityPerId}</Button>
              <Button onClick={addToCart}>+</Button>
            </ButtonGroup>
          )}
        </CardActions>
      </Card>
    </>
  )
}
