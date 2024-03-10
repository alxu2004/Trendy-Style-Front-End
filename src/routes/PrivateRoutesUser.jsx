import { Navigate, Outlet } from "react-router-dom"
import useAuth from "../hooks/useAuth"


export const PrivateRoutesUser = () => {
    const isLoggedIn = useAuth()
    console.log(isLoggedIn)
  return (

        isLoggedIn ? <Outlet/> : <Navigate to="/"/>
  )
}
