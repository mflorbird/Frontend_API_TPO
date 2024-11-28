import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {fetchProductsFromDb, updateFavorites, updateVisitados} from '../services/catalogService';
import {
  getCartByUserId,
  createCart,
  addUpdateItem,
  removeItem,
  updateItemQuantity,
  closeCart,
  checkout,
  emptyCart,
  setDiscountAPI
} from '../services/cartService';


export const AppContext = createContext();


export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [error, setError] = useState(false);
  const [cart, setCart] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Cargar usuario y token desde localStorage cuando se monta el proveedor
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    const savedCart = localStorage.getItem('cart');

    if (savedToken) setToken(savedToken);
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedCart) setCart(JSON.parse(savedCart)); // Cargar el carrito si existe en localStorage
  }, []);

  // Guardar token y usuario en localStorage al iniciar sesión
  const login = (userData) => {
    setUser(userData);
    setToken(userData.token);
    localStorage.setItem('token', userData.token);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const saveCartToLocalStorage = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Guardar carrito en localStorage
  };

  // Limpiar sesión y carrito en localStorage al cerrar sesión
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  useEffect(() => {
    const initializeCart = async () => {
      if (!user) return;
        try {
          setLoading(true);
          let userCart = await getCartByUserId(user.id);
          if (!userCart || userCart.estado === 'cerrado') {
            userCart = await createCart(user.id);
          }
          setCart(userCart);
        } catch (error) {
          console.error('Error al inicializar el carrito:', error);
        } finally {
          setLoading(false);
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
          item.price,
          item.model,
          item.image
      );

      setCart(updatedCart);
    } catch (error) {
      console.error('Error al agregar item al carrito:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateCartItemQuantity = async (itemId, newQuantity) => {
    if (!user || !cart) return;

    try {
      setLoading(true);
      const updatedCart = await updateItemQuantity(cart.id, itemId, newQuantity);
      setCart(updatedCart);
    } catch (error) {
      console.error('Error al actualizar cantidad:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const removeItemFromCart = async (itemId) => {
    if (!user || !cart) return;

    try {
      setLoading(true);
      const updatedCart = await removeItem(cart.id, itemId);
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
     await emptyCart(cart.id);
     cart.items = {};
        cart.precioTotal = 0;
        cart.discount = 0;
        cart.precioDiscount = 0;
        setCart(cart);
    }
    catch (error) {
        console.error('Error al vaciar el carrito:', error);
        throw error;
    }
    finally {
        setLoading(false);
    }
    };

  const setDiscount = async (discount) => {
    if (!user || !cart) return;

    try {
      setLoading(true);
      const floatDiscount = parseFloat(discount);
      const updatedCart = await setDiscountAPI(cart.id, floatDiscount);
      setCart(updatedCart);
    } catch (error) {
      console.error('Error al aplicar el código de descuento:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  const checkoutCart = async () => {
    if (!user || !cart) return;

    try {
      setLoading(true);
      const cartStatus = await checkout(cart);
      console.log('Estado del carrito:', cartStatus);
      if (cartStatus.isValid) {
        const newCart = await createCart(user.id);
        setCart(newCart);
        return cartStatus;
        } else {
        return cartStatus;
      }
    } catch (error) {
        console.error('Error al finalizar la compra 2:', error);
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
      addItemToCart,
      removeItemFromCart,
      updateCartItemQuantity,
      clearCart,
      checkoutCart,
      cartItems,
      setCartItems,
      setDiscount,
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
