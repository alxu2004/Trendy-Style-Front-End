import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Unstable_Grid2'
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  TextField,
  Typography,
} from '@mui/material'
import { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import { Header } from '../components/Header'
import { NavLink } from 'react-router-dom'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))
export const CashPayment = () => {
  const { cart } = useContext(CartContext)
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
      ></div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0}>
          <Grid xs={5} md={7}>
            <Item>
              <div
                style={{
                  marginLeft: '20px',
                  border: '2px solid black',
                  padding: '30px',
                  borderRadius: '20px',
                }}
              >
                <Typography variant='h4' style={{ textAlign: 'center' }}>
                  Datos personales
                </Typography>
                <form>
                  <div>
                    <TextField
                      id='Nombre'
                      name='Nombre'
                      label='Nombre'
                      variant='outlined'
                      required
                    />
                  </div>
                  <div>
                    <TextField
                      id='Email'
                      name='Email'
                      label='Correo Electronico'
                      variant='outlined'
                      required
                    />
                  </div>
                  <div>
                    <TextField
                      id='Ciudad'
                      name='Ciudad'
                      label='Ciudad'
                      variant='outlined'
                      required
                    />
                  </div>
                  <div>
                    <TextField
                      id='Direccion'
                      name='Direccion'
                      label='Direccion'
                      variant='outlined'
                      required
                    />
                  </div>
                  <div>
                    <TextField
                      id='Numero De Telefono'
                      name='Numero De Telefono'
                      label='Numero De Telefono'
                      variant='outlined'
                      required
                    />
                  </div>
                </form>
              </div>
            </Item>
          </Grid>
          <Grid xs={7} md={5}>
            <Item>Detalles de la compra</Item>
            {cart.map((car, index) => (
              <Card
                key={index}
                sx={{ display: 'flex', width: '100%', marginBottom: '20px' }}
              >
                <CardMedia
                  component='img'
                  sx={{ width: 'auto', height: 80 }}
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
              to='/payment/transfer'
            >
              Siguiente
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}
