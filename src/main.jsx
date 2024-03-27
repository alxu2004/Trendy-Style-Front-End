import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { UserProvider } from './context/UserContext'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'

const root = document.getElementById('root')

ReactDOM.render(
  <AuthProvider>
    <UserProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </UserProvider>
  </AuthProvider>,
  root,
)
