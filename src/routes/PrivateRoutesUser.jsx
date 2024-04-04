import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

export const PrivateRoutesUser = () => {
  const isLoggedIn = useAuth()
  if (isLoggedIn === false) {
    return <Navigate to='/' />
  }

  return <Outlet />
}
