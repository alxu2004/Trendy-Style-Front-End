/* eslint-disable react/prop-types */
import '../assets/Styles.css'
import logo from '../assets/Trendy.png'
import bag from '../assets/Cesta.png'
import loup from '../assets/search.png'
import { NavLink, Outlet } from 'react-router-dom'
import { useState } from 'react'


export const Header = ({ searchTerm, onSearchChange, onSearch }) => {

  const [loggedIn, setLoggedIn] = useState(false);
  
  const handleLogin =() =>{
      setLoggedIn(!loggedIn)
  }
  console.log(loggedIn)
  return (
    <header className='headerNav'>
      <nav className='navBar'>
        <img className='headerLogo' src={logo} alt="" />
        <ul className='navBtn'>
          <li><a className='navMenu' href="">Hombre</a></li>
          <li><a className='navMenu' href="">Mujer</a></li>
          <li><a className='navMenu' href="">Niños</a></li>
        </ul>
        <div className='searchContainer'>
          <input className="searchBar" type="text" placeholder='¿Que Buscas?' value={searchTerm} onChange={onSearchChange}/>
          <button className='btnSearch' onClick={onSearch}><img src={loup} alt="" width='20px' height='auto' /></button>
        </div>
        <NavLink className='navCarro' href="" to='/listar'><img className='navCarrito' src={bag} alt="" /></NavLink>
        {
          loggedIn ?(<NavLink className='access' href="" to="/Access" >Acceder</NavLink>) : (<>
          <div className="user-dropdown">
            <span className="user-dropdown-btn">Usuario</span>
              <div className="user-dropdown-content">
                <ol className='navUserList'>
                  <li><a href="/perfil">Perfil</a></li>
                  <li><a href="/cerrar-sesion">Cerrar sesión</a></li>
                </ol>
              </div>
          </div>
          </>)
        }
        <button onClick={handleLogin} >...</button>
      </nav>
      <Outlet />
    </header>
  )
}