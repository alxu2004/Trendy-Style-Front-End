import '../assets/Styles.css'
import logo from '../assets/BackAccess.jpg'
import carro from '../assets/Cesta.png'
import { NavLink, Outlet } from 'react-router-dom'

export const Header = () => {
  return (
    <header className='headerNav'>
      <nav className='navBar'>
        <img className='headerLogo' src={logo} alt="" />
        <ul>
          <li><a className='navMenu' href="">Hombre</a></li>
          <li><a className='navMenu' href="">Mujer</a></li>
          <li><a className='navMenu' href="">Niños</a></li>
        </ul>
        <input type="text" placeholder='¿Que Buscas?'/>
        <NavLink className='navCarro' href="" to='/listar'><img className='navCarrito' src={carro} alt="" /></NavLink>
        <NavLink className='access' href=""to="/Access" >Acceder</NavLink>
      </nav>
      <Outlet/>
    </header>
  )
}
