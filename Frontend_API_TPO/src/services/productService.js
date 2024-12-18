
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';


class ProductService {
    constructor(
        productUrl = 'http://localhost:8080/api/v1/gestionProductos',
    ) {
        this.API_URL_PRODUCTO = productUrl;

        this.axiosInstance = axios.create({
            baseURL: this.API_URL_PRODUCTO,
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

    async saveProduct(productData) {
        try {
            const productToSave = {
                ...productData,
                id: productData.id || uuidv4()
            };

            const isUpdate = !!productData.id;
            const url = isUpdate
                ? `/productos/${productData.id}`
                : '/productos';

            const method = isUpdate ? 'patch' : 'post';

            const response = await this.axiosInstance[method](
                url,
                productToSave
            );

            return response.data;
        } catch (error) {
            console.error('Error al guardar producto:', error);
            throw error;
        }
    }

    async deleteProduct(id) {
        try {
            await this.axiosInstance.delete(`/productos/${id}`);
        } catch (error) {
            console.error('Error al eliminar producto:', error);
            throw error;
        }
    }
}

export const productService = new ProductService();

