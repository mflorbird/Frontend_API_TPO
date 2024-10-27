//cargo data para manejar el estado del carrito 

import React, { createContext, useState } from 'react';

// Crear el contexto
export const AppContext = createContext();

// Proveedor del contexto
export const AppProvider = ({ children }) => { 
    //estado de carrito para que se pueda usar globalmente
    const [cartItems, setCartItems] = useState([]); 

    const addItemToCart = (item) => {
        setCartItems((prevItems) => {
            const itemExists = prevItems.find((prevItem) => prevItem.id === item.id);
            if (itemExists) {
                /*const newQuantity = prevItem.quantity + 1;*/
                return prevItems.map((prevItem) =>
                    prevItem.id === item.id
                        ? { ...prevItem, quantity: Math.min(prevItem.quantity + 1, item.stock) }
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

    //Calcular la cantidad total de items en el carrito
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <AppContext.Provider value={{ cartItems, addItemToCart, removeItemFromCart, clearCart, totalItems }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;
