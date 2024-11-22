import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

// const API_URL = 'http://localhost:3000/products';

const API_URL = 'http://localhost:8080/api/v1';

const axiosWithInterceptor = axios.create();

// axiosWithInterceptor.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// }, (error) => {
//   return Promise.reject(error);
// });

axiosWithInterceptor.interceptors.request.use((config) => { 
  const token = localStorage.getItem('token'); 
  if (token) { 
    config.headers.Authorization = `Bearer ${token}`; 
  } 
  return config; 
}, (error) => { 
  return Promise.reject(error); 
});


export const addProductToDb = async ({productData, productId}) => {
  try {
    console.log(productId)
    if (!productId) {
      const productWithId = { ...productData, id: uuidv4() };
      // const response = await axios.post(API_URL, productWithId);
      const response = await axios.post(`${API_URL}/gestionProductos/productos`, productData);
      return response.data;
    } else {
      // const response = await axios.patch(`${API_URL}/${productId}`, productData);
      const response = await axios.patch(`${API_URL}/gestionProductos/productos/${productId}`, productData);
      return response.data;
    }
  } catch (error) {
    console.error('Detalles del error:', error.response ? error.response.data : error.message);
    throw new Error('Error al agregar o actualizar producto');
  }
};

// destacados - get: '/productos/destacados' OK
export const getDestacados = async () => {
  try {
    // const response = await axios.get(`${API_URL}/productos/destacados`);
    const response = await axios.get(`${API_URL}/gestionCatalogo/productos/destacados`);
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener los productos destacados', error);
  }
};

// favoritos - get: "/productos/favoritos") OK
export const getFavoritos = async (user) => {
  let productosFavoritos= [];
  try {
    for (const productoId of user.favoritos) {
      // const producto = await getProductById(productoId);
        // productosFavoritos.push(producto);
        const producto = await axiosWithInterceptor.get(`${API_URL}/gestionCatalogo/productos/favoritos/${user.id}`); 
        productosFavoritos.push(producto);
    }
    return productosFavoritos;
    } catch (error) {
        throw new Error('Error al obtener los productos favoritos', error);
  }
};

// export const getFavoritos = async () => {
//   try {
//     const response = await axiosWithInterceptor.get(`${API_URL}/productos/favoritos`);
//     return response.data;
//   } catch (error) {
//     throw new Error('Error al obtener los productos favoritos', error);
//   }
// };

// categoria - get ruta: "/productos/categoria/{categoria}" OK
export const getProductoCategoria = async (categoria) => {
  try {
    // const response = await fetchProductsFromDb()
    // return response.filter(product => product.category === categoria);
    const response = await axios.get(`${API_URL}/gestionCatalogo/productos/categoria/${categoria}`); 
    return response.data;
    } catch (error) {
        throw new Error('Error al obtener los productos por categoria', error);
  }
};

export const getCategorias = async () => {
  let categorias = [];
    try {
        const response = await fetchProductsFromDb();
        response.forEach(product => {
            if (!categorias.includes(product.category)) {
                categorias.push(product.category);
            }
        });
        return categorias;
    } catch (error) {
        throw new Error('Error al obtener las categorias', error);
    }
};


export const getCategoria = async (categoria) => {
  try {
    const response = await axios.get(`${API_URL}/productos/categoria/${categoria}`);
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener los productos por categoria', error);
  }
};

// todos los productos - get ruta: "/productos" OK
export const getTodos = async () => {
  try {
    // const response = await axios.get(`${API_URL}/productos`);
    const response = await axios.get(`${API_URL}/gestionCatalogo/productos`);
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener todos los productos', error);
  }
};

// detalle producto login - get ruta: "/productos/{productoId}" OK
export const getDetalle = async (productoId) => {
  try {
    // const response = await axiosWithInterceptor.get(`${API_URL}/productos/${productoId}`);
    const response = await axiosWithInterceptor.get(`${API_URL}/gestionCatalogo/productos/${productoId}`);
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener el detalle del producto', error);
  }
};

// detalle producto sin login - get ruta: "/productos/{productoId}" OK
// no debería ser necesario
export const getDetalleSinLogin = async (productoId) => {
  try {
    // const response = await axios.get(`${API_URL}/productos/${productoId}`);
    const response = await axios.get(`${API_URL}/gestionCatalogo/productos/${productoId}`);
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener el detalle del producto', error);
  }
};

// agregar a favoritos - put ruta: "/productos/favoritos/{productoId}" OK

export const agregarFavorito = async (productoId) => {
  try {
    const response = await axiosWithInterceptor.put(`${API_URL}/productos/favoritos/${productoId}`);
    return response.data;
  } catch (error) {
    throw new Error('Error al agregar producto a favoritos', error);
  }
}

// eliminar de favoritos - delete ruta: "/productos/favoritos/{productoId}" OK
export const eliminiarFavorito = async (productoId) => {
  try {
    const response = await axiosWithInterceptor.delete(`${API_URL}/productos/favoritos/${productoId}`);
    return response.data;
  } catch (error) {
    throw new Error('Error al quitar producto de favoritos', error);
  }
}

// productos recientes - get ruta: "/productos/recientes" OK
export const getVisitados = async (user) => {
  let productosVisitados= [];
  try {
    for (const productoId of user.visitados) {
      const producto = await getProductById(productoId);
        productosVisitados.push(producto);
    }
    return productosVisitados;
    } catch (error) {
        throw new Error('Error al obtener los productos visitados', error);
  }
}

// export const getRecientes = async () => {
//   try {
//     const response = await axios.get(`${API_URL}/productos/recientes`);
//     return response.data;
//   } catch (error) {
//     throw new Error('Error al obtener los productos recientes', error);
//   }
// };

// export const addProductToDB = async (productData) => {
//   try {
//     const response = awaitaxiosWithInterceptor.put(API_URL, productData);
//     return response.data; 
//   } catch (error) {
//     console.error('Error al agregar el producto a la tienda', error);
//     throw error;
//   }
// };

export const fetchProductsFromDb = async () => {
  try {
    const response = await axiosWithInterceptor.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener la lista de productos:', error);
    throw new Error('Error al obtener la lista de productos');
  }
};

export const deleteProductById = async (id) => {
  try {
    // const response = await axiosWithInterceptor.delete(`${API_URL}/${id}`);
    const response = await axiosWithInterceptor.delete(`${API_URL}/gestionProductos/productos/${id}`);
    return response.data; 
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
    throw new Error('Error al eliminar el producto');
  }
};

export const getProductById = async (id) => {
  try {
    // const response = await axiosWithInterceptor.get(`${API_URL}/${id}`);
    const response = await axiosWithInterceptor.get(`${API_URL}/gestionCatalogo/productos/${id}`);
    return response.data; 
  } catch (error) {
    console.error('Error al obtener el producto:', error);
    throw new Error('Error al obtener el producto');
  }
};
export const getFeaturedProducts = async () => {
  try {
    // const response = await axios.get(API_URL, { params: { featured: true } });
    const response = await axios.get(`${API_URL}/gestionCatalogo/productos/destacados`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los productos destacados:', error);
    throw new Error('Error al obtener los productos destacados');
  }
};

