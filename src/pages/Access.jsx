import "../assets/Styles.css"
import { loginF } from "../functions/login";
import { registerF } from './../functions/login';
import { useState } from 'react';


export const Access = () => {

    const [registerFormData, setRegisterFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });
    const handleRegisterChange = (e) => {
        const { name, value } = e.target;
        setRegisterFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        
        fetch('http://localhost:8080/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(registerFormData)
        })
        .then(response => {
            if (!response.ok) {

                alert('Error en el registro')

                throw new Error('Network response was not ok');

            }else{

                alert('Se ha registrado correctamente')
                
                setRegisterFormData({
                    name: '',
                    email: '',
                    password: '',
                    password2: ''
                });
                
            }
            

            
        })
        .catch(error => {
            console.error('Fetch error:', error);
            alert('Error en el registro')
        });
    };


  return (
    <main className="m-container">
        <div className="container">
            {/* info about access */}
            <section className="back-box">
                <div className="back-box-login">
                    <h3>¿Ya tienes cuenta?</h3>
                    <p>Iniciar sesión para entrar en la página</p>
                    <button className="btn-login" onClick={loginF}>Iniciar sesión</button>
                </div>
                <div className="back-box-register">
                    <h3>¿Aun no tienes cuenta?</h3>
                    <p>Registrate para que puedas iniciar sesión</p>
                    <button className="btn-register" onClick={registerF}>Registrarse</button>
                </div>
            </section>
            {/* Login and register form */}
            <section className="front-box">
                {/* Login form */}
                <form action="" className="login">
                    <h2>Iniciar sesión</h2>
                    <input type="email" placeholder="Correo electronico" required />
                    <input type="password"  placeholder="contraseña" required/>
                    <button type="submit">ingresar</button>
                </form>
                {/* Register form */}
                <form onSubmit={handleRegisterSubmit} className="register">
                    <h2>registrarse</h2>
                    <input  type="name"
                            name="name"
                            value={registerFormData.name}
                            onChange={handleRegisterChange}
                            placeholder="nombre completo" required />
                    <input type="email"
                            name="email"
                            value={registerFormData.email}
                            onChange={handleRegisterChange}
                            placeholder="correo electronico" required />
                    <input type="password"
                            name="password"
                            value={registerFormData.password}
                            onChange={handleRegisterChange}
                            placeholder="contraseña" required 
                            minLength={8}
                            />
                    <input type="password"
                            name="password2"
                            value={registerFormData.password2}
                            onChange={handleRegisterChange}
                            placeholder="confirmar contraseña" required/>
                    <button type="submit">registrarse</button>

                </form>

            </section>
        </div>
    </main>
  )
}
