import { useState, useEffect } from 'react';

const useUserData = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);  // Para manejar el estado de carga
  const [error, setError] = useState(null); // Para manejar posibles errores

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:3000/users');
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
        const data = await response.json();
        const user = data.find(user => user.role === 'user');
        
        if (user) {
          setUserData(user);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); // cuando finaliza el estado de carga se establece como false
      }
    };

    fetchUserData();
  }, []);

  return { userData, loading, error };
};

export default useUserData;
