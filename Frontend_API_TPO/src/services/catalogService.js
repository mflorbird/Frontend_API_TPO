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
    if (error.code === 'ERR_NETWORK') {
        window.location.href = '/no-connection';
      return Promise.reject(error);
    }
    // timeout error
    if (error.code === 'ECONNABORTED') {
        window.location.href = '/error';
        return Promise.reject(error);
    }

    if (error.response) {
      switch (error.response.status) {
        case 400:
          console.error('Error de solicitud:', error.response.data);
          break;
        case 401:
          this.handleUnauthorizedError();
          break;
        case 403:
          console.error('Acceso denegado');
          break;
        case 404:
          console.error('Recurso no encontrado');
          break;
        case 500:
          console.error('Error interno del servidor');
          break;
        default:
          console.error('Error desconocido');
      }
    } else if (error.request) {
      console.error('No se recibió respuesta del servidor');
    } else {
      console.error('Error al configurar la solicitud', error.message);
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