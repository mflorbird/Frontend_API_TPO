import axios from 'axios';
// import { v4 as uuidv4 } from 'uuid';

// const API_URL = 'http://localhost:3000/products';

const API_URL_PRODUCTO = 'http://localhost:8080/api/v1/gestionProductos';
const API_URL_CATALOGO = 'http://localhost:8080/api/v1/gestionCatalogo';

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

//// GESTION DE PRODUCTOS ////
// EN USO
export const addProductToDb = async ({productData, productId}) => {
  try {
    console.log(productId)
    if (!productId) {
      // const productWithId = { ...productData, id: uuidv4() };
      // const response = await axios.post(API_URL, productWithId);
      const response = await axiosWithInterceptor.post(`${API_URL_PRODUCTO}/productos`, productData);
      return response.data;
    } else {
      // const response = await axios.patch(`${API_URL}/${productId}`, productData);
      const response = await axiosWithInterceptor.patch(`${API_URL_PRODUCTO}/productos/${productId}`, productData);
      return response.data;
    }
  } catch (error) {
    console.error('Detalles del error:', error.response ? error.response.data : error.message);
    throw new Error('Error al agregar o actualizar producto');
  }
};

export const deleteProductById = async (id) => {
  try {
    // const response = await axiosWithInterceptor.delete(`${API_URL}/${id}`);
    const response = await axiosWithInterceptor.delete(`${API_URL_PRODUCTO}/productos/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
    throw new Error('Error al eliminar el producto');
  }
};

//// FIN GESTION DE PRODUCTOS ////

//// GESTION DE CATALOGO ////

export const fetchProductsFromDb = async () => {
  try {
    const response = await axios.get(`${API_URL_CATALOGO}/`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener la lista de productos:', error);
    throw new Error('Error al obtener la lista de productos');
  }
};

export const getProductById = async (id) => {
  try {
    if (localStorage.getItem('token') === null) {
        const response = await axios.get(`${API_URL_CATALOGO}/gestionCatalogo/productos/${id}`);
        return response.data;
    }
    else {
        const response = await axiosWithInterceptor.get(`${API_URL_CATALOGO}/gestionCatalogo/productos/${id}`);
        return response.data;
    }
    } catch (error) {
        console.error('Error al obtener el producto:', error);
        throw new Error('Error al obtener el producto');
    }
};

export const getVisitados = async () => {
    try {
        const response = await axiosWithInterceptor.get(`${API_URL_CATALOGO}/productos/recientes`);
        return response.data;
    }
    catch (error) {
        throw new Error('Error al obtener los productos visitados', error);
    }
};

export const getFeaturedProducts = async () => {
  try {
    // const response = await axios.get(API_URL, { params: { featured: true } });
    const response = await axios.get(`${API_URL_CATALOGO}/productos/destacados`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los productos destacados:', error);
    throw new Error('Error al obtener los productos destacados');
  }
};

export const getFavoritos = async () => {
  try {
    const response = await axiosWithInterceptor.get(`${API_URL_CATALOGO}/productos/favoritos`);
    return response.data;
  }
  catch (error) {
    throw new Error('Error al obtener los productos favoritos', error);
  }
};

export const agregarFavorito = async (id) => {
  try {
    const response = await axiosWithInterceptor.put(`${API_URL_CATALOGO}/productos/favoritos/${id}`);
    return response.data;
  }
  catch (error) {
    throw new Error('Error al agregar el producto a favoritos', error);
  }
};

export const eliminarFavorito = async (id) => {
  try {
    const response = await axiosWithInterceptor.delete(`${API_URL_CATALOGO}/productos/favoritos/${id}`);
    return response.data;
  }
  catch (error) {
    throw new Error('Error al eliminar el producto de favoritos', error);
  }
};






//// FIN GESTION DE CATALOGO ////

//// EXTRA ////

export const getProductoCategoria = async (categoria) => {
  try {
    // const response = await fetchProductsFromDb()
    // return response.filter(product => product.category === categoria);
    const response = await axios.get(`${API_URL_CATALOGO}/gestionCatalogo/productos/categoria/${categoria}`); 
    return response.data;
    } catch (error) {
        throw new Error('Error al obtener los productos por categoria', error);
  }
};
