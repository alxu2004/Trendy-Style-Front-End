import { Navigate, Outlet } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import { useContext } from "react"
import { UserContext } from './../context/UserContext';


export const PrivateRoutesUser = () => {
    const isLoggedIn = useAuth()
    const {user} = useContext(UserContext)
    if(isLoggedIn === false && user.user.role === 'user' ){
      return <Navigate to='/'  />
    }

  return <Outlet/>
}
