import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { UserProvider } from './context/UserContext'
import { AuthProvider } from './context/AuthContext'

const root = document.getElementById("root");

ReactDOM.render(
  <AuthProvider>
    <UserProvider>
      <App />
    </UserProvider>
  </AuthProvider>, root
)
