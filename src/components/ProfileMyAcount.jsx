import { useContext } from 'react'
import { SideBarProfile } from './SideBarProfile'
import { UserContext } from '../context/UserContext'
import { Box, Typography } from '@mui/material'

export const ProfileMyAcount = () => {
  const { user } = useContext(UserContext)
  console.log(user.user)

  return (
    <div className='user-profile'>
      <SideBarProfile />
      <Box
        width={600}
        my={0}
        mx={'auto'}
        p={2}
        sx={{ border: '2px solid grey' }}
      >
        <Typography style={{ textAlign: 'center' }}>
          <h1>Mis Datos</h1>
        </Typography>
        <Typography>
          <h3> Nombre : {user.user.name}</h3>
        </Typography>
        <Typography>
          <h3> Correo : {user.user.email}</h3>
        </Typography>
        <Typography>
          <h3> Numero de Contacto : {user.user.num_cel}</h3>
        </Typography>
        <Typography>
          <h3> Ciudad de Residencia : {user.user.city}</h3>
        </Typography>
        <Typography>
          <h3> Direccion : {user.user.address}</h3>
        </Typography>
      </Box>
    </div>
  )
}
