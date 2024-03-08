import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App';
import { UserProvider } from './context/UserContext';
import { AuthProvider } from './context/AuthContext';



ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <UserProvider>
      <App/>
    </UserProvider>
  </AuthProvider>
)
