
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
        if (error.code === 'ERR_NETWORK') {
            window.location.href = '/no-connection';
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

