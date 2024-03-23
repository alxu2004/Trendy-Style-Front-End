import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Unstable_Grid2'
import { Button, TextField, Typography } from '@mui/material'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))
export const CashPayment = () => {
  return (
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
                Edit Profile
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
                    id='Departamento'
                    name='Departamento'
                    label='Departamento'
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
                    id='Barrio'
                    name='Barrio'
                    label='Barrio'
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
                    id='Email'
                    name='Email'
                    label='Email'
                    variant='outlined'
                    required
                  />
                </div>
                <div>
                  <TextField
                    id='Numero'
                    name='Numero'
                    label='Numero'
                    variant='outlined'
                    required
                  />
                </div>
                <div>
                  <TextField
                    id='Producto'
                    name='Producto'
                    label='Producto'
                    variant='outlined'
                    required
                  />
                </div>
                <div>
                  <TextField
                    id='Cantidad'
                    name='Cantidad'
                    label='Cantidad'
                    variant='outlined'
                    required
                  />
                </div>
                <input type='hidden' name='user_id' id='user_id' />
                <Button type='submit' variant='contained' color='primary'>
                  Enviar
                </Button>
              </form>
            </div>
          </Item>
        </Grid>
        <Grid xs={7} md={5}>
          <Item>Detalles de la compra</Item>
        </Grid>
      </Grid>
    </Box>
  )
}
