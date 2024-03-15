import { useContext } from "react"
import { NavLink } from "react-router-dom"
import { UserContext } from "../context/UserContext"


export const SideBarAdmin = () => {

    const {user} = useContext(UserContext)

  return (
    <aside className="sidebar-profile">
    <div className="profile-info">
        <h2>{user.user.name}</h2>
        <p>{user.user.email}</p>
        <p>{user.user.role}</p>
    </div>
    <div className="profile-links">
        <ul>
            <h1>Marcas</h1>
            <ul>
              <li><NavLink to="/admin/add-branch" >Crear Marca</NavLink></li>
              <li><NavLink to="/admin/drop-branch" >Editar Marca</NavLink></li>
            </ul>
            <h1>Categoria</h1>
            <ul>
              <li><NavLink to="/admin/add-category">Crear Categoria</NavLink></li>
              <li><NavLink to="/admin/drop-category" >Editar Marca</NavLink></li>
            </ul>
            <h1>Producto</h1>
            <ul>
              <li><NavLink to="/admin/add-product">Crear Producto</NavLink></li>
              <li><NavLink to="/admin/drop-product" >Editar Marca</NavLink></li>
            </ul>
            
         
            <button><NavLink to="/" >volver</NavLink></button>
        </ul>
    </div>
</aside>
  )
}
