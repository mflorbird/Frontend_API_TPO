import axios from 'axios';
import {catalogService} from "./catalogService";


class CartService {
    constructor(cartUrl = 'http://localhost:8080/api/v1/carritos') {
        this.axiosInstance = axios.create({
            baseURL: cartUrl,
            timeout: 10000, // Timeout de 10 segundos
            headers: {
                'Content-Type': 'application/json',
            },
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
    };

    handleUnauthorizedError() {
        localStorage.removeItem('token');
        window.location.href = '/login';
    }

    calculateTotal(items, discount = 0) {
        return Object.values(items).reduce((total, item) => total + item.subtotal, 0) * (1 - discount);
    }

    async getCartByUserId() {
        try {
            const response = await this.axiosInstance.get('/');
            return response.data;
        } catch (error) {
            console.error('Error al obtener el carrito:', error);
            throw error;
        }
    }

    async createCart() {
        try {
            const response = await this.axiosInstance.post('/create');
            return response.data;
        } catch (error) {
            console.error('Error al crear el carrito:', error);
            throw error;
        }
    }

    async getCartById(cartId) {
        try {
            const response = await this.axiosInstance.get(`/${cartId}`);
            return response.data;
        } catch (error) {
            console.error('Error al obtener el carrito:', error);
            throw error;
        }
    }

    async addUpdateItem(cartId, productId, size, quantity, price, model, img) {
        try {
            const cart = await this.getCartById(cartId);
            const itemId = `${productId}---${size}`;
            const updatedItems = { ...cart.items };

            updatedItems[itemId] = {
                model,
                quantity,
                price,
                size,
                subtotal: quantity * price,
                img,
                cart: cartId,
            };

            const precioTotal = this.calculateTotal(updatedItems);
            const precioDiscount = precioTotal * (1 - cart.discount);

            const params = {
                items: updatedItems,
                precioTotal,
                precioDiscount,
            };

            const response = await this.axiosInstance.patch(`/${cartId}`, params);
            return response.data;
        } catch (error) {
            console.error('Error al agregar/actualizar item:', error);
            throw error;
        }
    }

    async updateItemQuantity(cartId, itemId, newQuantity) {
        try {
            const cart = await this.getCartById(cartId);
            if (!cart.items[itemId]) {
                throw new Error('Item no encontrado en el carrito');
            }

            const updatedItems = { ...cart.items };
            updatedItems[itemId] = {
                ...updatedItems[itemId],
                quantity: newQuantity,
                subtotal: newQuantity * updatedItems[itemId].price,
            };

            const precioTotal = this.calculateTotal(updatedItems);
            const precioDiscount = precioTotal * (1 - cart.discount);

            const response = await this.axiosInstance.patch(`/${cartId}`, {
                items: updatedItems,
                precioTotal,
                precioDiscount,
            });
            return response.data;
        } catch (error) {
            console.error('Error al actualizar cantidad:', error);
            throw error;
        }
    }

    async removeItem(cartId, itemId) {
        try {
            const cart = await this.getCartById(cartId);
            const updatedItems = { ...cart.items };
            console.log('Item a eliminar:', itemId);
            console.log('Items anteriores:', updatedItems);
            delete updatedItems[itemId];
            console.log('Items nuevos:', updatedItems);

            const precioTotal = this.calculateTotal(updatedItems);
            const precioDiscount = precioTotal * (1 - cart.discount);
            console.log('Precio total:', precioTotal, 'Precio con descuento:', precioDiscount, 'Descuento:', cart.discount);
            console.log('Items actualizados:', updatedItems);

            const responseDelete = await this.axiosInstance.delete(`/item/${itemId}`);
            console.log('Nuevo carrito con item borrado:', responseDelete.data);

            const responsePatch = await this.axiosInstance.patch(`/${cartId}`, {
                precioTotal,
                precioDiscount,
            });
            console.log('Nuevo carrito:', responsePatch.data);
            return responsePatch.data;
        } catch (error) {
            console.error('Error al eliminar item:', error);
            throw error;
        }
    }

    async closeCart(cartId) {
        try {
            const response = await this.axiosInstance.patch(`/${cartId}`, {
                estado: 'cerrado',
                closedAt: new Date().toISOString(),
            });
            return response.data;
        } catch (error) {
            console.error('Error al cerrar el carrito:', error);
            throw error;
        }
    }

    async setDiscount(cartId, discount) {
        try {
            const cart = await this.getCartById(cartId);
            const precioTotal = this.calculateTotal(cart.items, discount);
            const precioDiscount = precioTotal * (1 - discount);

            const response = await this.axiosInstance.patch(`/${cartId}`, {
                discount,
                precioTotal,
                precioDiscount,
            });
            return response.data;
        } catch (error) {
            console.error('Error al aplicar descuento:', error);
            throw error;
        }
    }

    async emptyCart(cartId) {
        try {
            const response = await this.axiosInstance.delete(`/cart/${cartId}`);
            return response.data;
        } catch (error) {
            console.error('Error al vaciar el carrito:', error);
            throw error;
        }
    }

    async getClosedCartsByUserId() {
        try {
            const response = await axiosWithInterceptor.get(`${BASE_URL}/closed`);
            return response.data;
        } catch (error) {
            console.error('Error al obtener los carritos cerrados:', error);
            throw error;
        }
    };

    async checkout(cartId) {
        try {
            const response = await this.axiosInstance.post(`/checkout`);
            console.log('Carrito cerrado:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error al vaciar el carrito:', error);
            throw error;
        }
    }



}

export const cartService = new CartService();



const BASE_URL = 'http://localhost:8080/api/v1/carritos';

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

export const calculateTotal = (items, discount=0) => {
    return Object.values(items).reduce((total, item) => total + item.subtotal, 0) * (1 - discount);
};




/// validarStock y deducir stock. entiendo que ya no son necesarios porque los traemos con el checkout. pero los dejo para revisar juntos. 
export const validateStock = async (cart) => {
    try {
        const items = Object.entries(cart.items);
        const promises = items.map(async ([itemId, cartItem]) => {
            try {
                const [productId, size] = itemId.split('---');
                console.log('Validating item:', itemId, cartItem);
                console.log('Product:', productId, 'Size:', size);
                const product = await  catalogService.getProductById(productId);
                console.log('Product:', product);

                if (!product) {
                    return {
                        isValid: false,
                        itemId,
                        message: `El producto ${productId} ya no está disponible`
                    };
                }
                console.log('Validating stock for product:', product.model, size, cartItem.quantity);
                const sizeStock = product.stockTotal.find(s => s.size === size);
                console.log('Prducto:', product, 'SizeStock:', sizeStock, 'Size:', size);

                if (!sizeStock) {
                    return {
                        isValid: false,
                        itemId,
                        model: product.model,
                        size,
                        message: `El talle ${size} del modelo ${product.model} ya no está disponible`
                    };
                }

                const availableStock = parseInt(sizeStock.stock);

                if (availableStock < cartItem.quantity) {
                    return {
                        isValid: false,
                        itemId,
                        model: product.model,
                        size,
                        message: `Stock insuficiente para ${product.model} talle ${size}. Stock disponible: ${availableStock}`
                    };
                }

                return {
                    isValid: true,
                    itemId,
                    availableStock,
                    message: 'Stock disponible'
                };

            } catch (error) {
                console.error(`Error validando producto ${itemId}:`, error);
                return {
                    isValid: false,
                    itemId,
                    message: `Error al validar el producto ${itemId}`
                };
            }
        });

        const results = await Promise.all(promises);

        const invalidItems = results.filter(result => !result.isValid);

        return {
            isValid: invalidItems.length === 0,
            invalidItems,
            messages: invalidItems.map(item => item.message),
            validations: results
        };

    } catch (error) {
        console.error('Error en la validación de stock:', error);
        throw new Error('Error al validar el stock del carrito');
    }
};

const deductStock = async (cart) => {
    const items = Object.entries(cart.items);

    const groupedItems = items.reduce((acc, [itemId, cartItem]) => {
        const [productId, size] = itemId.split('---');
        if (!acc[productId]) acc[productId] = [];
        acc[productId].push({ size, quantity: cartItem.quantity });
        return acc;
    }, {});

    try {
        const promises = Object.keys(groupedItems).map(async (productId) => {
            try {
                const product = await catalogService.getProductById(productId);
                const updatedStockTotal = product.stockTotal.map((stockItem) => {
                    const itemInCart = groupedItems[productId].find(({ size }) => size === stockItem.size);

                    if (itemInCart) {
                        const availableStock = parseInt(stockItem.stock);
                        const newStock = availableStock - itemInCart.quantity;
                        return { ...stockItem, stock: newStock.toString() };
                    }
                    return stockItem;
                });

                const response = await axios.patch(`http://localhost:8080/api/v1/productos/${productId}/stock`, {
                    stockTotal: updatedStockTotal
                });

                return response.data;
            } catch (error) {
                console.error(`Error descontando stock para producto ${productId}:`, error);
                throw new Error(`Error al descontar stock para producto ${productId}`);
            }
        });

        await Promise.all(promises);
        return true;
    } catch (error) {
        console.error('Error al descontar stock:', error);
        throw new Error('Error al descontar stock');
    }
};


export const checkout = async (cartId) => {
    try {
        const token = localStorage.getItem('authToken'); 
        const response = await axios.post(`${BASE_URL}/checkout`, null, {
            headers: { 'Authorization': `Bearer ${token}` } 
        });
        console.log('Carrito cerrado:', response.data); 
        return { 
            isValid: true, 
            message: 'Compra realizada exitosamente', 
            cart: response.data 
        }; 
    } catch (error) { 
        console.error('Error al realizar el checkout:', error); 
        return { 
            isValid: false, 
            message: 'Error al realizar el checkout', 
            error: error.response ? error.response.data : error.message 
        }; 
    } 
};
//         const validation = await validateStock(cart);

//         if (!validation.isValid) {
//             return {
//                 isValid: false,
//                 invalidItems: validation.invalidItems,
//                 message: 'No se puede realizar el checkout, hay productos sin stock suficiente',
//                 validations: validation.validations
//             };
//         }

//         const stockDeduction = await deductStock(cart);
//         console.log('Stock deduction:', stockDeduction);

//         const responseCart = await closeCart(cart.id);
//         console.log('Cart closed:', responseCart);

//         return {
//             isValid: true,
//             invalidItems: [],
//             message: 'Compra realizada exitosamente',
//             cart: responseCart
//         }
//     } catch (error) {
//         console.error('Error al realizar el checkout:', error);
//         throw error;
//     }
// };

