//cargo data para manejar el estado del carrito 

import React, { createContext, useState } from 'react';

// Crear el contexto
export const AppContext = createContext();

// Proveedor del contexto
const AppProvider = ({ children }) => { 
    const [cartItems, setCartItems] = useState([]); // Estado del carrito . es el que me va a dar las funciones de agregar, eliminar y impiar elementos del carrito

    const addItemToCart = (item) => {
        setCartItems((prevItems) => {
            const itemExists = prevItems.find((prevItem) => prevItem.id === item.id);
            if (itemExists) {
                return prevItems.map((prevItem) =>
                    prevItem.id === item.id
                        ? { ...prevItem, quantity: prevItem.quantity + 1 }
                        : prevItem
                );
            }
            return [...prevItems, { ...item, quantity: 1 }];
        });
    };

    const removeItemFromCart = (itemId) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <AppContext.Provider value={{ cartItems, addItemToCart, removeItemFromCart, clearCart }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;
