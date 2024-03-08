/* eslint-disable react/prop-types */
import '../assets/Styles.css'
import logo from '../assets/Trendy.png'
import bag from '../assets/Cesta.png'
import loup from '../assets/search.png'
import { NavLink, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'


export const Header = ({ searchTerm, onSearchChange, onSearch,scroll }) => {

  const { isLoggedIn , setIsLoggedIn} = useAuth()
  
  const handleIsLoggedIn=()=>{
    setIsLoggedIn(!isLoggedIn)
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
          <button className='btnSearch' onClick={buttonSearch}><img src={loup} alt="" width='26px' height='auto' /></button>
        </div>
        <NavLink className='navCarro' href="" to='/listar'><img className='navCarrito' src={bag} alt="" /></NavLink>
        {
          isLoggedIn ?<NavLink className='access' href="" to="/Access" >Acceder</NavLink> 
          : <>
            <div className="user-dropdown">
              <span className="user-dropdown-btn">Usuario</span>
              <div className="user-dropdown-content">
                <ol className='navUserList'>
                  <li><NavLink to="/profile">Perfil</NavLink></li>
                  <li><NavLink to="/user-list" >Lista de Usuarios</NavLink></li>
                  <li><NavLink to="/" onClick={handleIsLoggedIn}>Cerrar sesión</NavLink></li>
                </ol>
              </div>
          </div>
          </>
        }
      </nav>
      <Outlet />
    </header>
  )
}