import axios from 'axios';


class CatalogService {
  constructor(
      catalogUrl = 'http://localhost:8080/api/v1/gestionCatalogo'
  ) {
    this.axiosInstance = axios.create({
      baseURL: catalogUrl,
      timeout: 10000, // Timeout de 10 segundos
      headers: {
        'Content-Type': 'application/json',
      }
    });

    this.axiosInstance.interceptors.request.use(
        (config) => {
          const token = this.getAuthToken();
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
          return config;
        },
        (error) => Promise.reject(error)
    );

    this.axiosInstance.interceptors.response.use(
        (response) => response,
        this.handleError
    );
  }

  getAuthToken() {
    return localStorage.getItem('token');
  }

  

  handleError = (error) => {
    
    const errorMessages = {
      404: {
        title: '404',
        message: 'Lo sentimos, no encontramos lo que estabas buscando'
      },
      401: {
        title: '401',
        message: 'Lo sentimos, pero no tienes acceso a esta página sin iniciar sesión'
      },
      403: {
        title: '403',
        message: 'No tienes autorización para acceder a esta página'
      },
      500: {
        title: '500',
        message: 'Lo sentimos, algo salió mal'
      },
      ECONNABORTED: {
        title: 'Tiempo de espera agotado',
        message: 'Esto podría deberse a un problema en tu conexión'
      },
      ERR_NETWORK: {
        title: 'No hay conexión',
        message: 'Por favor, revisa tu conexión a Internet'
      },
      UNKNOWN: {
        title: 'Error',
        message: 'Ocurrió un error inesperado al procesar tu solicitud'
      }
    };
  
    
    if (error.code === 'ERR_NETWORK') {
      window.location.href = `/error/${error.code}?title=${encodeURIComponent(errorMessages.ERR_NETWORK.title)}&message=${encodeURIComponent(errorMessages.ERR_NETWORK.message)}`;
      return Promise.reject(error);
    }
  
    if (error.code === 'ECONNABORTED') {
      window.location.href = `/error/${error.code}?title=${encodeURIComponent(errorMessages.ECONNABORTED.title)}&message=${encodeURIComponent(errorMessages.ECONNABORTED.message)}`;
      return Promise.reject(error);
    }
  
    if (error.response) {
      const { status, data } = error.response;
      const errorMessage = data ? data.message : 'Error desconocido';
      const { title, message } = errorMessages[status] || errorMessages.UNKNOWN;
      window.location.href = `/error/${status}?title=${encodeURIComponent(title)}&message=${encodeURIComponent(message)}`;
    } else if (error.request) {
      console.error('No se recibió respuesta del servidor');
      window.location.href = `/error/no-response?title=No se recibió respuesta&message=El servidor no respondió a la solicitud`;
    } else {
      console.error('Error al configurar la solicitud', error.message);
      window.location.href = `/error/unknown?title=${encodeURIComponent(errorMessages.UNKNOWN.title)}&message=${encodeURIComponent(error.message)}`;
    }
  
    return Promise.reject(error);
  }
  
  
  
  handleUnauthorizedError() {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }


  async getRecentProducts() {
    try {
      const response = await this.axiosInstance.get('/productos/recientes');
      return response.data;
    } catch (error) {
      console.error('Error al obtener productos recientes:', error);
      throw new Error('No se pudieron obtener los productos visitados');
    }
  }

  async getFeaturedProducts() {
    try {
      const response = await this.axiosInstance.get('/productos/destacados');
      return response.data;
    } catch (error) {
      console.error('Error al obtener productos destacados:', error);
      throw new Error('No se pudieron obtener los productos destacados');
    }
  }

  async getFavoriteProducts() {
    try {
      const response = await this.axiosInstance.get('/productos/favoritos');
      return response.data;
    } catch (error) {
      console.error('Error al obtener productos favoritos:', error);
      throw new Error('No se pudieron obtener los productos favoritos');
    }
  }

  async updateFavorites(favoriteProductIds) {
    try {
      console.log("Actualizando favoritos:", favoriteProductIds);
      const response = await this.axiosInstance.patch('/favoritos', {
        favoritos: favoriteProductIds
      });
      return response.data;
    } catch (error) {
      console.error('Error al actualizar favoritos:', error);
      throw error;
    }
  }

  async updateVisitedProducts(visitedProductIds) {
    try {
      const response = await this.axiosInstance.patch('/visitados', {
        visitados: visitedProductIds
      });
      return response.data;
    } catch (error) {
      console.error('Error al actualizar productos visitados:', error);
      throw error;
    }
  }

  async getProductById(id) {
    try {
      const response = await this.axiosInstance.get(`/productos/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener producto:', error);
      throw error;
    }
  }

  async listProducts() {
    try {
      const response = await this.axiosInstance.get('/');
      return response.data;
    } catch (error) {
      console.error('Error al listar productos:', error);
      throw error;
    }
  }

  async listAvailableProducts() {
    try {
      const response = await this.axiosInstance.get('/disponibles');
      return response.data;
    } catch (error) {
      console.error('Error al listar productos disponibles:', error);
      throw error;
    }
  }



}

export const catalogService = new CatalogService();