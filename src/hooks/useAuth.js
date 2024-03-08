import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';


const useAuth = () => {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error('useAuth must be use inside of the authContext');
  }
  return auth;
};

export default useAuth;