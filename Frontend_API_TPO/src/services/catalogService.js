import axios from 'axios';

// URL base de la API
const API_URL = 'http://localhost:3000/api/v1/gestionCatalogo';

// Instancia para hacer peticiones con interceptor
const axiosWithInterceptor = axios.create();

axiosWithInterceptor.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});


// destacados - get: '/productos/destacados' OK
export const getDestacados = async () => {
  try {
    const response = await axios.get(`${API_URL}/productos/destacados`);
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener los productos destacados');
  }
};

// favoritos - get: "/productos/favoritos") OK
export const getFavoritos = async () => {
  try {
    const response = await axiosWithInterceptor.get(`${API_URL}/productos/favoritos`);
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener los productos favoritos');
  }
};

// categoria - get ruta: "/productos/categoria/{categoria}" OK
export const getCategoria = async (categoria) => {
  try {
    const response = await axios.get(`${API_URL}/productos/categoria/${categoria}`);
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener los productos por categoria');
  }
};

// todos los productos - get ruta: "/productos" OK
export const getTodos = async () => {
  try {
    const response = await axios.get(`${API_URL}/productos`);
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener todos los productos');
  }
};

// detalle producto login - get ruta: "/productos/{productoId}" OK
export const getDetalle = async (productoId) => {
  try {
    const response = await axiosWithInterceptor.get(`${API_URL}/productos/${productoId}`);
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener el detalle del producto');
  }
};

// detalle producto sin login - get ruta: "/productos/{productoId}" OK
// no debería ser necesario
export const getDetalleSinLogin = async (productoId) => {
  try {
    const response = await axios.get(`${API_URL}/productos/${productoId}`);
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener el detalle del producto');
  }
};

// agregar a favoritos - put ruta: "/productos/favoritos/{productoId}" OK

export const agregarFavorito = async (productoId) => {
  try {
    const response = await axiosWithInterceptor.put(`${API_URL}/productos/favoritos/${productoId}`);
    return response.data;
  } catch (error) {
    throw new Error('Error al agregar producto a favoritos');
  }
}

// eliminar de favoritos - delete ruta: "/productos/favoritos/{productoId}" OK
export const eliminiarFavorito = async (productoId) => {
  try {
    const response = await axiosWithInterceptor.delete(`${API_URL}/productos/favoritos/${productoId}`);
    return response.data;
  } catch (error) {
    throw new Error('Error al quitar producto de favoritos');
  }
}

// productos recientes - get ruta: "/productos/recientes" OK
export const getRecientes = async () => {
  try {
    const response = await axios.get(`${API_URL}/productos/recientes`);
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener los productos recientes');
  }
};