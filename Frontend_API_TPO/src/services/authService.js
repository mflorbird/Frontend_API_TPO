import axios from 'axios';
import { jwtDecode } from "jwt-decode";

const API_URL = 'http://localhost:8080/api/v1/authenticate/';

export const loginUser = async (usuarioOEmail, contraseña) => {
  const params = {
    [usuarioOEmail.includes('@') ? 'email' : 'username']: usuarioOEmail,
    password: contraseña,
  };

  try {
    const response = await axios.post(API_URL + 'auth',  params );
    const token = response.data.access_token;

    if (token) {

        localStorage.setItem('token', token);
        console.log(localStorage.getItem('token'));
        const user = jwtDecode(token);
        user.email = user.sub; // renombrar sub a email
        delete user.sub;
        console.log(user);

      // const usersWithId1 = await axios.get(`${API_URL}?idUsuario=1`);
      // const userWithId1 = usersWithId1.data[0];
      //
      // if (userWithId1 && userWithId1.id !== user.id) {
      //   await axios.patch(`${API_URL}/${userWithId1.id}`, { idUsuario: '' });
      // }
      //
      // await axios.patch(`${API_URL}/${user.id}`, { idUsuario: 1 });

      return user;
    } else {
      return null;
    }

  } catch (error) {
    console.log('Error al realizar la solicitud de inicio de sesión: ', error);
    throw new Error('Error al realizar la solicitud de inicio de sesión');
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(API_URL + 'register', userData);
    return response.data;
  } catch (error) {
    throw new Error('Error al realizar la solicitud de registro');
  }
};
