import { useContext } from "react"
import { NavLink } from "react-router-dom"
import { UserContext } from "../context/UserContext"

export const SideBarProfile = () => {

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
                <li><NavLink to="/profile/my-acount" >Mi Cuenta</NavLink></li>
                <li><NavLink to="/profile/add-acount">Agregar Datos Personales</NavLink></li>
                <li><NavLink to="/profile/edit-Acount" >Editar contraseña</NavLink></li>
                <li><NavLink to="/" >Volver</NavLink></li>
            </ul>
        </div>
    </aside>
  )
}
