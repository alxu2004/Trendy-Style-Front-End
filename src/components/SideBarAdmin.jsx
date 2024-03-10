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
            <li><NavLink to="/admin/add-branch" >agregar marca</NavLink></li>
            <li><NavLink to="/admin/add-product">agregar producto</NavLink></li>
            <li><NavLink to="/" >volver</NavLink></li>
        </ul>
    </div>
</aside>
  )
}
