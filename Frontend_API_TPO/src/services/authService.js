import axios from 'axios';

const API_URL = 'http://localhost:3000/users';

export const loginUser = async (usuarioOEmail, contraseña) => {
  const params = {
    [usuarioOEmail.includes('@') ? 'email' : 'username']: usuarioOEmail,
    password: contraseña,
  };

  try {
    const response = await axios.get(API_URL, { params });
    const user = response.data[0];


    
    if (user) {
      const usersWithId1 = await axios.get(`${API_URL}?idUsuario=1`);
      const userWithId1 = usersWithId1.data[0];

      if (userWithId1 && userWithId1.id !== user.id) {
        await axios.patch(`${API_URL}/${userWithId1.id}`, { idUsuario: '' });
      }

      await axios.patch(`${API_URL}/${user.id}`, { idUsuario: 1 });

      return user;
    } else {
      return null;
    }

  } catch (error) {
    throw new Error('Error al realizar la solicitud de inicio de sesión');
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(API_URL, userData);
    return response.data;
  } catch (error) {
    throw new Error('Error al realizar la solicitud de registro');
  }
};
