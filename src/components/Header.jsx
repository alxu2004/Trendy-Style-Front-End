/* eslint-disable react/prop-types */
import '../assets/Styles.css'
import logo from '../assets/Trendy.png'
import bag from '../assets/Cesta.png'
import loup from '../assets/search.png'
import { NavLink, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'


export const Header = ({ searchTerm, onSearchChange, onSearch,scroll }) => {

  const {user,logout} = useContext(UserContext)

  const { isLoggedIn , setIsLoggedIn} = useAuth()


  
  const handleIsLoggedIn=()=>{
    setIsLoggedIn(!isLoggedIn)
  }

  const loginOut = () =>{
    handleIsLoggedIn()
    logout()
    
  }
  const buttonSearch = ()=>{
    onSearch();
    scroll();
  }

  return (
    <header className='headerNav'>
      <nav className='navBar'>
        <NavLink className='logoHeader' to="/"><img className='headerLogo' src={logo} alt="" /> </NavLink>
        <ul className='navBtn'>
          <li><NavLink className='navMenu' href="" to="/men" >Hombre</NavLink></li>
          <li><NavLink className='navMenu' href="" to="/women" >Mujer</NavLink></li>
          <li><NavLink className='navMenu' href="" to="/child" >Niños</NavLink></li>
        </ul>
        <div className='searchContainer'>
          <input className="searchBar" type="text" placeholder='¿Que Buscas?' value={searchTerm} onChange={onSearchChange}/>
          <button className='btnSearch' type='submit' onClick={buttonSearch}><img src={loup} alt="" width='26px' height='auto' /></button>
        </div>
        <NavLink className='navCarro' href="" to='/listar'><img className='navCarrito' src={bag} alt="" /></NavLink>
        {
          isLoggedIn ?
          <div className="user-dropdown">
            <span className="user-dropdown-btn">usuario</span>
            <div className="user-dropdown-content">
              <ol className='navUserList'>
                <li><NavLink to="/profile">Perfil</NavLink></li>
                <li><NavLink to="/user-list" >Lista de Usuarios</NavLink></li>
                {
                  user?.user?.role === 'ADMIN' ?<li><NavLink to="/admin" >Herramientas de administrador</NavLink></li> : null
                }
                <li><NavLink to="/" onClick={loginOut}>Cerrar sesión</NavLink></li>
              </ol>
            </div>
        </div>
          :  <NavLink className='access' href="" to="/Access" >Acceder</NavLink> 
        }
      </nav>
      <Outlet />
    </header>
  )
}