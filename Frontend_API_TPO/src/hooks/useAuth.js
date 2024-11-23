import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { loginUser } from '../services/authService';

const useAuth = () => {
  const [error, setError] = useState(null);
  const { login } = useContext(AppContext); 
  const navigate = useNavigate();

  const authenticate = async (usuarioOEmail, contraseña) => {
    setError(null); 

    try {
      const user = await loginUser(usuarioOEmail, contraseña);
      if (user) {
        login(user);
        console.log(user)
        if (user.role === 'admin' || user.role === 'ADMIN' ) {
          navigate('/product-management');
        } else {
          navigate('/');
        }
      } else {
        setError('Credenciales incorrectas');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return { authenticate, error };
};

export default useAuth;
