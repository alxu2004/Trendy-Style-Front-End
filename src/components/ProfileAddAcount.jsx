import { useContext, useState } from 'react'
import { SideBarProfile } from './SideBarProfile'
import { TextField, Button, Typography } from '@mui/material'
import { UserContext } from './../context/UserContext'

export const ProfileAddAcount = () => {
  const { user } = useContext(UserContext)

  const [formData, setFormData] = useState({
    lastname: '',
    cc: '',
    num_cel: '',
    city_of_residence: '',
    address: '',
    user_id: user.user.id,
  })

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const response = await fetch(
        'http://localhost:8080/api/infoUsers/registrar',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        },
      )
      if (response.ok) {
        alert('Producto agregado exitosamente')
        console.log('Producto agregado exitosamente')
      } else {
        alert('Error al agregar producto:')
        console.error('Error al agregar producto:', response.statusText)
      }
    } catch (error) {
      console.error('Error al agregar producto:', error)
    }
  }

  return (
    <>
      <SideBarProfile />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div
          style={{
            marginLeft: '20px',
            border: '2px solid black',
            padding: '30px',
            borderRadius: '20px',
          }}
        >
          <Typography variant='h4' style={{ textAlign: 'center' }}>
            Editar Perfil
          </Typography>
          <form onSubmit={handleSubmit}>
            <div>
              <TextField
                id='lastname'
                name='lastname'
                label='Segundo nombre'
                variant='outlined'
                value={formData.lastname}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <TextField
                id='cc'
                name='cc'
                label='Documento de identidad'
                variant='outlined'
                value={formData.cc}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <TextField
                id='num_cel'
                name='num_cel'
                label='Numero de celular'
                variant='outlined'
                value={formData.num_cel}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <TextField
                id='city_of_residence'
                name='city_of_residence'
                label='Ciudad de residencia'
                variant='outlined'
                value={formData.city_of_residence}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <TextField
                id='address'
                name='address'
                label='Direccion'
                variant='outlined'
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>
            <input
              type='hidden'
              name='user_id'
              id='user_id'
              value={formData.user_id}
            />
            <Button type='submit' variant='contained' color='primary'>
              Enviar
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
