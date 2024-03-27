import '../assets/Styles.css'
import { loginF, registerF } from '../functions/login'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from './../hooks/useAuth'
import { UserContext } from '../context/UserContext'
import Swal from 'sweetalert2'

export const Access = () => {
  const showAlertError = () => {
    Swal.fire({
      icon: 'error',
      title: '¡Ups, Algo paso!',
      text: 'su correo o contraseña no coinsiden',
    })
  }
  const showAlertSuccessCreate = () => {
    Swal.fire({
      icon: 'succes',
      title: '¡Cuenta creada!',
      text: '¡Su cruenta se ha creado correctamente!',
    })
  }

  const { saveUser } = useContext(UserContext)

  const { isLoggedIn, setIsLoggedIn } = useAuth()

  const handleIsLoggedIn = () => {
    setIsLoggedIn(!isLoggedIn)
  }

  const navigate = useNavigate()

  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: '',
  })

  const handleLoginChange = (e) => {
    const { name, value } = e.target
    setLoginFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }
  const handleLoginSubmit = (e) => {
    e.preventDefault()
    fetch('http://localhost:8080/api/v1/auth/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginFormData),
    })
      .then((response) => {
        if (!response.ok) {
          showAlertError()
          throw new Error('Network response was not ok')
        } else {
          navigate('/')
          handleIsLoggedIn()

          return response.json()
        }
      })
      .then((dataUser) => {
        saveUser(dataUser)
      })
      .catch((error) => {
        console.error('Fetch error:', error)
      })
  }

  const [registerFormData, setRegisterFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    city: '',
    num_cel: '',
  })
  const handleRegisterChange = (e) => {
    const { name, value } = e.target
    setRegisterFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }
  const handleRegisterSubmit = (e) => {
    e.preventDefault()
    fetch('http://localhost:8080/api/v1/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerFormData),
    })
      .then((response) => {
        if (!response.ok) {
          alert('Error en el registro')
          throw new Error('Network response was not ok')
        } else {
          showAlertSuccessCreate()
          setRegisterFormData({
            name: '',
            email: '',
            password: '',
            address: '',
            city: '',
            num_cel: '',
          })
        }
      })
      .catch((error) => {
        console.error('Fetch error:', error)
        alert('Error en el registro')
      })
  }

  return (
    <main className='m-container'>
      <div className='container'>
        <section className='back-box'>
          <div className='back-box-login'>
            <h3>¿Ya tienes cuenta?</h3>
            <p>Iniciar sesión para entrar en la página</p>
            <button className='btn-login' onClick={loginF}>
              Iniciar sesión
            </button>
          </div>
          <div className='back-box-register'>
            <h3>¿Aun no tienes cuenta?</h3>
            <p>Registrate para que puedas iniciar sesión</p>
            <button className='btn-register' onClick={registerF}>
              Registrarse
            </button>
          </div>
        </section>
        <section className='front-box'>
          <form onSubmit={handleLoginSubmit} className='login'>
            <h2>Iniciar sesión</h2>
            <input
              type='email'
              name='email'
              value={loginFormData.email}
              onChange={handleLoginChange}
              placeholder='Correo electrónico'
              required
            />
            <input
              type='password'
              name='password'
              value={loginFormData.password}
              onChange={handleLoginChange}
              placeholder='Contraseña'
              required
            />
            <button type='submit'>ingresar</button>
          </form>
          <form onSubmit={handleRegisterSubmit} className='register'>
            <h2>registrarse</h2>
            <input
              type='name'
              name='name'
              value={registerFormData.name}
              onChange={handleRegisterChange}
              placeholder='nombre completo'
              required
            />
            <input
              type='email'
              name='email'
              value={registerFormData.email}
              onChange={handleRegisterChange}
              placeholder='correo electronico'
              required
            />
            <input
              type='password'
              name='password'
              value={registerFormData.password}
              onChange={handleRegisterChange}
              placeholder='contraseña'
              required
              minLength={4}
            />
            <input
              type='text'
              name='address'
              value={registerFormData.address}
              onChange={handleRegisterChange}
              placeholder='Direccion'
              required
            />
            <input
              type='text'
              name='city'
              value={registerFormData.city}
              onChange={handleRegisterChange}
              placeholder='Ciudad'
              required
            />
            <input
              type='text'
              name='num_cel'
              value={registerFormData.num_cel}
              onChange={handleRegisterChange}
              placeholder='Celular'
              required
            />
            <button type='submit'>registrarse</button>
          </form>
        </section>
      </div>
    </main>
  )
}
