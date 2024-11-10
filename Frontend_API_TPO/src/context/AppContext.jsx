//cargo data para manejar el estado del carrito 

import React, { createContext, useState } from 'react';
// import { addProduct } from '../services/catalogService';
import { addProductToDb, fetchProductsFromDb } from '../services/catalogService'; 
import { useNavigate } from 'react-router-dom';
import {updateFavorites, updateVisitados} from '../services/userService';

// Crear el contexto
export const AppContext = createContext();

// Proveedor del contexto
export const AppProvider = ({ children }) => {
  const navigate = useNavigate(); 
  //aca agrego lo de la 29/10 y el AppProvider al AppRoutes
  const [token, setToken] = useState(null);

  //agrego lo de la clase 5/11
  const [error, setError] = useState(false);

  //estado de carrito para que se pueda usar globalmente
  const [cartItems, setCartItems] = useState([]);

  const [user, setUser] = useState(null);

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

  const addProduct = async (productData) => {
    try {
      const product = await addProductToDb(productData); 
      setError(false);
      navigate("/product-management")
      console.log('Producto agregado exitosamente', product);
    } catch (err) {
      setError(true);
      console.error('Error al agregar el producto:', err);
    }
  };

  const getProductList = async () => {
    try {
      const products = await fetchProductsFromDb(); 
      console.log('Lista de productos obtenida exitosamente', products);
      return products;
    } catch (err) {
      console.error('Error al obtener la lista de productos:', err);
      return []; 
    }
  };

  const removeItemFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  //Calcular la cantidad total de items en el carrito
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    clearCart();
  };


  const actualizarFavoritos = async (user, nuevosFavoritos) => {
    try
    {
      const updatedUser = await updateFavorites(user.id, nuevosFavoritos);
      setUser(updatedUser);
    }
    catch (error)
    {
      console.error("Error al actualizar favoritos:", error);
      throw error;
    }
    };

  const actualizarVisitados = async (user, nuevosVisitados) => {
    try
    {
      const updatedUser = await updateVisitados(user.id, nuevosVisitados);
      setUser(updatedUser);
    }
    catch (error)
    {
      console.error("Error al actualizar visitados:", error);
      throw error;
    }
  }


  return (
    <AppContext.Provider value={{
      cartItems,
      addItemToCart,
      removeItemFromCart,
      clearCart,
      addProduct,
      getProductList,
      totalItems,
      user,
      login,
      logout,
      token,
      setToken,
      actualizarFavoritos,
      actualizarVisitados
    }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
