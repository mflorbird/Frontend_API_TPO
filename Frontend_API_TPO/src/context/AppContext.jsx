import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addProductToDb, fetchProductsFromDb } from '../services/catalogService';
import { updateFavorites, updateVisitados } from '../services/userService';
import {
  getCartByUserId,
  createCart,
  addUpdateItem,
  removeItem,
  updateItemQuantity,
  closeCart,
  checkout
} from '../services/cartService';


export const AppContext = createContext();


export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [error, setError] = useState(false);
  const [cart, setCart] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const initializeCart = async () => {
      if (user && !cart) {
        try {
          setLoading(true);
          let userCart = await getCartByUserId(user.id);

          if (!userCart) {
            userCart = await createCart(user.id);
          }

          setCart(userCart);
        } catch (error) {
          console.error('Error al inicializar el carrito:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    initializeCart();
  }, [user]);



  const addItemToCart = async (item) => {
    if (!user || !cart) return;

    try {
      setLoading(true);
      const itemId = `${item.id}---${item.size}`;
      const currentItem = cart.items[itemId];

      console.log('Item actual:', currentItem);
      console.log('Item nuevo:', item);

      const newQuantity = currentItem ? currentItem.quantity + item.quantity : item.quantity;

      console.log('Cantidad de items:', newQuantity);
      const updatedCart = await addUpdateItem(
          cart.id,
          item.id,
          item.size,
          newQuantity,
          item.price
      );

      setCart(updatedCart);
    } catch (error) {
      console.error('Error al agregar item al carrito:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateCartItemQuantity = async (item, newQuantity) => {
    if (!user || !cart) return;

    try {
      setLoading(true);
      const updatedCart = await updateItemQuantity(cart.id, item, newQuantity);
      setCart(updatedCart);
    } catch (error) {
      console.error('Error al actualizar cantidad:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const removeItemFromCart = async (item) => {
    if (!user || !cart) return;

    try {
      setLoading(true);
      const updatedCart = await removeItem(cart.id, item);
      setCart(updatedCart);
    } catch (error) {
      console.error('Error al eliminar item del carrito:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    if (!user || !cart) return;

    try {
      setLoading(true);
      await closeCart(cart.id);
      const newCart = await createCart(user.id);
      setCart(newCart);
    } catch (error) {
      console.error('Error al limpiar el carrito:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const cartTotals = {
    items: cart?.items ? Object.values(cart.items).reduce((total, item) => total + item.quantity, 0) : 0,
    amount: cart?.precioTotal || 0
  };

  const checkoutCart = async () => {
    if (!user || !cart) return;

    try {
      setLoading(true);
      const cartStatus = await checkout(cart);
      if (cartStatus.isValid) {
        const newCart = await createCart(user.id);
        setCart(newCart);
        } else {
        console.error('Error al finalizar la compra:', cartStatus.message);
      }
    } catch (error) {
        console.error('Error al finalizar la compra:', error);
        throw error;
    }
    finally {
        setLoading(false);
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

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    clearCart();
    navigate('/');
    };


  const actualizarFavoritos = async (user, nuevosFavoritos) => {
    try
    {
      if (JSON.stringify(user.favoritos) !== JSON.stringify(nuevosFavoritos))
      {
      const updatedUser = await updateFavorites(user.id, nuevosFavoritos);
      setUser(updatedUser);
    }
    }
    catch (error)
    {
      console.error("Error al actualizar favoritos:", error);
      throw error;
    }
    };

  const actualizarVisitados = async (user, nuevosVisitados) => {
    try {
      if (JSON.stringify(user.visitados) !== JSON.stringify(nuevosVisitados)) {
        const updatedUser = await updateVisitados(user.id, nuevosVisitados);
        setUser(updatedUser);
      }
    } catch (error) {
      console.error("Error al actualizar visitados:", error);
      throw error;
    }
  };

  const [cartItems, setCartItems] = useState([]); 

  return (
    <AppContext.Provider value={{
      cart,
      cartTotals,
      addItemToCart,
      removeItemFromCart,
      updateCartItemQuantity,
      clearCart,
      checkoutCart,
      cartItems,
      setCartItems,
      setUser,
      loading,
      getProductList,
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
