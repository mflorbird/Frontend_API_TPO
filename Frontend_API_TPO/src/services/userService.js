import axios from 'axios';

const API_URL = 'http://localhost:3000/users';

// Instancia para hacer peticiones con interceptor
const axiosWithInterceptor = axios.create();

axiosWithInterceptor.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}
    , (error) => {
        return Promise.reject(error);
    }
);

export const updateFavorites = async (id, nuevosFavoritos) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const response = await axios.patch(`${API_URL}/${id}`, {
            favoritos: nuevosFavoritos
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateVisitados = async (id, nuevosVisitados) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const response = await axios.patch(`${API_URL}/${id}`, {
            visitados: nuevosVisitados
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}




// export const loginUser = async (usuarioOEmail, contraseña) => {
//   const params = {
//     [usuarioOEmail.includes('@') ? 'email' : 'username']: usuarioOEmail,
//     password: contraseña,
//   };
//
//   try {
//     const response = await axios.get(API_URL, { params });
//     const user = response.data[0];
//     return user ? user : null;
//   } catch (error) {
//     throw new Error('Error al realizar la solicitud de inicio de sesión');
//   }
// };
//
// export const registerUser = async (userData) => {
//   try {
//     const response = await axios.post(API_URL, userData);
//     return response.data;
//   } catch (error) {
//     throw new Error('Error al realizar la solicitud de registro');
//   }
// };
