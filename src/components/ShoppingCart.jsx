import React, { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material'
import { Header } from '../components/Header'
import { AuthContext } from '../context/AuthContext'
import { NavLink } from 'react-router-dom'

export const ShoppingCart = () => {
  const { cart } = useContext(CartContext)
  const isLoggedIn = useContext(AuthContext)
  // const quantity = cart.reduce((accumulated, curr) => {
  //   return accumulated + curr.quantity
  // }, 0)
  let toPath
  if (isLoggedIn.isLoggedIn === true) {
    toPath = '/payment/transfer'
  } else {
    toPath = '/payment/cash'
  }
  const totalPrice = cart.reduce((accumulated, curr) => {
    return accumulated + curr.quantity * curr.price
  }, 0)
  return (
    <>
      <Header />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '20px',
        }}
      >
        {cart.map((car, index) => (
          <Card
            key={index}
            sx={{ display: 'flex', width: '60%', marginBottom: '20px' }}
          >
            <CardMedia
              component='img'
              sx={{ width: 151 }}
              image={car.img}
              alt='Live from space album cover'
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: '1 0' }}>
                <Typography component='div' variant='h5'>
                  {car.name}
                </Typography>
                <Typography
                  variant='subtitle1'
                  color='text.secondary'
                  component='div'
                >
                  cantidad : {car.quantity}
                </Typography>
              </CardContent>
            </Box>
            <Box>
              <CardContent sx={{ flex: '1 0' }}>
                <Typography
                  component='div'
                  variant='subtitle1'
                  color='text.secondary'
                >
                  Precio : {car.price}
                </Typography>
                <Typography
                  component='div'
                  variant='subtitle1'
                  color='text.secondary'
                >
                  Total : {car.total}
                </Typography>
              </CardContent>
            </Box>
          </Card>
        ))}
        <Typography component='div' variant='h5'>
          TOTAL : {totalPrice}
        </Typography>
        <Button
          variant='contained'
          color='success'
          style={{ marginTop: '10px' }}
          component={NavLink}
          to={toPath}
        >
          Validar Carrito
        </Button>
      </div>
    </>
  )
}
