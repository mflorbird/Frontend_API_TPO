import axios from 'axios';
import {v4 as uuidv4} from "uuid";
import {getProductById} from "./catalogService";

const BASE_URL = 'http://localhost:8080/api/v1/carritos';

// Recuperar el token cuando lo tengamos 
const getAuthToken = () => localStorage.getItem('authToken');

export const calculateTotal = (items, discount=0) => {
    return Object.values(items).reduce((total, item) => total + item.subtotal, 0) * (1 - discount);
};

export const getCartByUserId = async (userId) => {
    try {
        // const response = await axios.get(`${BASE_URL}`, { params: { userId } });
        // return response.data[0];
        const token = getAuthToken();
        const response = await axios.get(`${BASE_URL}/obtenerCarrito`, { 
            headers: { 'Authorization': `Bearer ${token}` } 
        }); 
        return response.data;
    } catch (error) {
        console.error('Error al buscar el carrito:', error);
        throw error;
    }
};

export const getCartById = async (cartId) => {
    try {
        const token = getAuthToken();
        const response = await axios.get(`${BASE_URL}/${cartId}`, {
            headers: {'Authorization': 'Bearer ${token}'}
        });
        return response.data;
    } catch (error) {
        console.error('Error al obtener el carrito:', error);
        throw error;
    }
};

export const createCart = async (userId) => {
    try {
        // const newCart = {
        //     userId,
        //     items: [],
        //     estado: 'activo',
        //     precioTotal: 0,
        //     precioDiscount: 0,
        //     discount: 0,
        //     createdAt: new Date().toISOString()
        // };
        const token = getAuthToken();
        const response = await axios.post(`${BASE_URL}/create`, null,{
            headers: {'Authorization': 'Bearer ${token}'}
        });
        return response.data;
    } catch (error) {
        console.error('Error al crear el carrito:', error);
        throw error;
    }
};

export const addUpdateItem = async (cartId, productId, size, quantity, price, model, img) => {
    try {
        const cart = await getCartById(cartId);
        const itemId = `${productId}---${size}`;
        const updatedItems = { ...cart.items };

        if (itemId in updatedItems) {
            updatedItems[itemId] = {
                ...updatedItems[itemId],
                model: model,
                quantity: quantity,
                price: price,
                size: size,
                subtotal: quantity * price,
                img: img
            };
        } else {
            updatedItems[itemId] = {
                cartId: uuidv4(),
                model: model,
                quantity: quantity,
                price: price,
                size: size,
                subtotal: quantity * price,
                img: img
            };
        }

        const precioTotal = calculateTotal(updatedItems)
        const precioDiscount = precioTotal * (1 - cart.discount);

        const response = await axios.patch(`${BASE_URL}/${cartId}`, {
            items: updatedItems,
            precioTotal,
            precioDiscount
        });
        return response.data;
    } catch (error) {
        console.error('Error al agregar/actualizar item:', error);
        throw error;
    }
};

export const updateItemQuantity = async (cartId, itemId, newQuantity) => {
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

        const precioTotal = calculateTotal(updatedItems)
        const precioDiscount = precioTotal * (1 - cart.discount);

        const response = await axios.patch(`${BASE_URL}/${cartId}`, {
            items: updatedItems,
            precioTotal,
            precioDiscount
        });
        return response.data;
    } catch (error) {
        console.error('Error al actualizar cantidad:', error);
        throw error;
    }
};

export const removeItem = async (cartId, itemId) => {
    try {
        const cart = await getCartById(cartId);
        const updatedItems = { ...cart.items };
        delete updatedItems[itemId];

        const precioTotal = calculateTotal(updatedItems)
        const precioDiscount = precioTotal * (1 - cart.discount);

        const response = await axios.patch(`${BASE_URL}/${cartId}`, {
            items: updatedItems,
            precioTotal,
            precioDiscount
        });
        return response.data;
    } catch (error) {
        console.error('Error al eliminar item:', error);
        throw error;
    }
};

export const closeCart = async (cartId) => {
    try {
        console.log('Cerrando carrito:', cartId);
        const response = await axios.patch(`${BASE_URL}/${cartId}`, {
            estado: 'cerrado',
            closedAt: new Date().toISOString()
        });
        console.log('Carrito cerrado:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error al cerrar el carrito:', error);
        throw error;
    }
};

export const setDiscountAPI = async (cartId, discount) => {
    try {
        const cart = await getCartById(cartId);
        const precioTotal = calculateTotal(cart.items, discount);
        const precioDiscount = precioTotal * (1 - discount);
        const response = await axios.patch(`${BASE_URL}/${cartId}`, {
            discount,
            precioTotal,
            precioDiscount
        }
        );
        return response.data;
        }
    catch (error) {
        console.error('Error al aplicar descuento:', error);
        throw error;
    }
};


export const validateStock = async (cart) => {
    try {
        const items = Object.entries(cart.items);
        const promises = items.map(async ([itemId, cartItem]) => {
            try {
                const [productId, size] = itemId.split('---');
                console.log('Validating item:', itemId, cartItem);
                console.log('Product:', productId, 'Size:', size);
                const product = await  getProductById(productId);
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
                const product = await getProductById(productId);
                const updatedStockTotal = product.stockTotal.map((stockItem) => {
                    const itemInCart = groupedItems[productId].find(({ size }) => size === stockItem.size);

                    if (itemInCart) {
                        const availableStock = parseInt(stockItem.stock);
                        const newStock = availableStock - itemInCart.quantity;
                        return { ...stockItem, stock: newStock.toString() };
                    }
                    return stockItem;
                });

                const response = await axios.patch(`http://localhost:3000/products/${productId}`, {
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

        const stockDeduction = await deductStock(cart);
        console.log('Stock deduction:', stockDeduction);

        const responseCart = await closeCart(cart.id);
        console.log('Cart closed:', responseCart);

        return {
            isValid: true,
            invalidItems: [],
            message: 'Compra realizada exitosamente',
            cart: responseCart
        }
    } catch (error) {
        console.error('Error al realizar el checkout:', error);
        throw error;
    }
};


export const emptyCart = async (cartId) => {
    try {
        const response = await axios.patch(`${BASE_URL}/${cartId}`,
            { items: {},
                precioTotal: 0,
                precioDiscount: 0,
                discount: 0
            });
        return response.data;
    } catch (error) {
        console.error('Error al vaciar el carrito:', error);
        throw error;
    }
};


export const getCartItemsByUserId = async (userId) => {
    try {
        const response = await axios.get(`${BASE_URL}`, { params: { userId } });
        const cart = response.data[0];
        if (!cart) {
            throw new Error('Carrito no encontrado');
        }

        const items = Object.entries(cart.items).map(([itemId, item]) => {
            const [productId, size] = itemId.split('---');
            return {
                productId,
                size,
                quantity: item.quantity,
                price: item.price,
                subtotal: item.subtotal
            };
        });

        return items;
    } catch (error) {
        console.error('Error al obtener los productos del carrito:', error);
        throw error;
    }
};

export const getClosedCartsByUserId = async (userId) => {
    try {
        const response = await axios.get(`${BASE_URL}`, { params: { userId, estado: 'cerrado' } });
        return response.data;
    } catch (error) {
        console.error('Error al obtener los carritos cerrados:', error);
        throw error;
    }
};