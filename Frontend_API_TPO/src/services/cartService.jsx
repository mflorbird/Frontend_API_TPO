import axios from 'axios';
import {v4 as uuidv4} from "uuid";

const BASE_URL = 'http://localhost:3000/carts';

export const calculateTotal = (items) => {
    return Object.values(items).reduce((total, item) => total + item.subtotal, 0);
};

export const getCartByUserId = async (userId) => {
    try {
        const response = await axios.get(`${BASE_URL}`, { params: { userId } });
        return response.data[0];
    } catch (error) {
        console.error('Error al buscar el carrito:', error);
        throw error;
    }
};

export const getCartById = async (cartId) => {
    try {
        const response = await axios.get(`${BASE_URL}/${cartId}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener el carrito:', error);
        throw error;
    }
};

export const createCart = async (userId) => {
    try {
        const newCart = {
            cartId: uuidv4(),
            userId,
            items: [],
            estado: 'activo',
            precioTotal: 0,
            createdAt: new Date().toISOString()
        };
        const response = await axios.post(`${BASE_URL}`, newCart);
        return response.data;
    } catch (error) {
        console.error('Error al crear el carrito:', error);
        throw error;
    }
};

export const addUpdateItem = async (cartId, productId, size, quantity, price) => {
    try {
        const cart = await getCartById(cartId);
        const itemId = `${productId}---${size}`;
        const updatedItems = { ...cart.items };

        if (itemId in updatedItems) {
            updatedItems[itemId] = {
                ...updatedItems[itemId],
                quantity: quantity,
                price: price,
                size: size,
                subtotal: quantity * price
            };
        } else {
            updatedItems[itemId] = {
                quantity: quantity,
                price: price,
                size: size,
                subtotal: quantity * price
            };
        }

        const precioTotal = calculateTotal(updatedItems);

        const response = await axios.patch(`${BASE_URL}/${cartId}`, {
            items: updatedItems,
            precioTotal
        });
        return response.data;
    } catch (error) {
        console.error('Error al agregar/actualizar item:', error);
        throw error;
    }
};

export const updateItemQuantity = async (cartId, item, newQuantity) => {
    const itemId = `${item.id}---${item.size}`;
    try {
        const cart = await getCartById(cartId);
        if (!cart.items[itemId]) {
            throw new Error('Item no encontrado en el carrito');
        }

        const updatedItems = { ...cart.items };
        updatedItems[itemId] = {
            ...updatedItems[itemId],
            quantity: newQuantity,
            subtotal: newQuantity * updatedItems[itemId].price
        };

        const precioTotal = calculateTotal(updatedItems);

        const response = await axios.patch(`${BASE_URL}/${cartId}`, {
            items: updatedItems,
            precioTotal
        });
        return response.data;
    } catch (error) {
        console.error('Error al actualizar cantidad:', error);
        throw error;
    }
};

export const removeItem = async (cartId, item) => {
    const itemId = `${item.id}---${item.size}`;
    try {
        const cart = await getCartById(cartId);
        const updatedItems = { ...cart.items };
        delete updatedItems[itemId];

        const precioTotal = calculateTotal(updatedItems);

        const response = await axios.patch(`${BASE_URL}/${cartId}`, {
            items: updatedItems,
            precioTotal
        });
        return response.data;
    } catch (error) {
        console.error('Error al eliminar item:', error);
        throw error;
    }
};

export const closeCart = async (cartId) => {
    try {
        const response = await axios.patch(`${BASE_URL}/${cartId}`, {
            estado: 'cerrado',
            closedAt: new Date().toISOString()
        });
        return response.data;
    } catch (error) {
        console.error('Error al cerrar el carrito:', error);
        throw error;
    }
};


export const validateStock = async (cart) => {
    try {
        const items = Object.entries(cart.items);
        const promises = items.map(async ([itemId, cartItem]) => {
            try {
                const [productId, size] = itemId.split('---');
                const response = await axios.get(`http://localhost:3000/products/${productId}`);
                const product = response.data;

                if (!product) {
                    return {
                        isValid: false,
                        itemId,
                        message: `El producto ${productId} ya no está disponible`
                    };
                }

                const sizeStock = product.stockTotal.find(s => s.size === size);

                if (!sizeStock) {
                    return {
                        isValid: false,
                        itemId,
                        message: `El talle ${size} del modelo ${product.model} ya no está disponible`
                    };
                }

                const availableStock = parseInt(sizeStock.stock);

                if (availableStock < cartItem.quantity) {
                    return {
                        isValid: false,
                        itemId,
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

export const checkout = async (cart) => {
    try {
        const validation = await validateStock(cart);

        if (!validation.isValid) {
            return {
                isValid: false,
                invalidItems: validation.invalidItems,
                message: 'No se puede realizar el checkout, hay productos sin stock suficiente',
                validations: validation.validations
            };
        }

        const deductStock = async (cart) => {
            const promises = cart.items.map(async (item) => {
                const { productId, size, quantity } = item;
                await axios.patch(`http://localhost:3000/products/${productId}/deductStock`, {
                    size,
                    quantity,
                });
            });
            await Promise.all(promises);
        };

        await deductStock(cart);

        const response = await closeCart(cart.cartId);
        return {
            isValid: true,
            invalidItems: [],
            message: 'Compra realizada exitosamente',
            cart: response
        }
    } catch (error) {
        console.error('Error al realizar el checkout:', error);
        throw error;
    }
};


export const emptyCart = async (cartId) => {
    try {
        const response = await axios.patch(`${BASE_URL}/${cartId}`, { items: {}, precioTotal: 0 });
        return response.data;
    } catch (error) {
        console.error('Error al vaciar el carrito:', error);
        throw error;
    }
};
