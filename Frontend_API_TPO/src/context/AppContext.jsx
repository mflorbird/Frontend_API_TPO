import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { catalogService } from '../services/catalogService';
import { cartService } from '../services/cartService';
import {checkout} from '../services/cartService';


export const AppContext = createContext();


export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [error, setError] = useState({
    type: null,
    message: null
  });
  const [cart, setCart] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleError = (errorType, errorMessage) => {
    setError({ type: errorType, message: errorMessage });
    console.error(`${errorType}: ${errorMessage}`);
  };


  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (savedToken && savedUser) {
      if (isTokenValid()) {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } else {
        handleError('TOKEN_EXPIRED', 'Token de sesión expirado');
        logout();
      }
    }
    }, []);

  useEffect(() => {
    const initializeCart = async () => {
      if (!user) {
        setCart(null);
        return;
      }

      try {
        setLoading(true);
        let userCart = await cartService.getCartByUserId();

        if (!userCart || userCart.estado === 'cerrado') {
          userCart = await cartService.createCart();
        }

        userCart.items = userCart.items || {};

        saveCartToLocalStorage(userCart);
      } catch (error) {
        console.error("Cart Initialization Error:", error);

        setError({
          type: 'CART_INIT_ERROR',
          message: error.message
        });
      } finally {
        setLoading(false);
      }
    };

    initializeCart();
  }, [user]);

  const isTokenValid = () => {
    const token = localStorage.getItem('token');
    const tokenExpiry = localStorage.getItem('tokenExpiry');

    if (!token || !tokenExpiry) return false;

    const now = Date.now().toString().slice(0, 10);
    console.log('Token exp', tokenExpiry);
    console.log('Token now:', now);
    return parseInt(now, 10) <= parseInt(tokenExpiry, 10);
  };

  const login = (userData) => {
    try {
      if (!userData || !userData.token) {
        throw new Error('Credenciales inválidas');
      }
      setUser(userData);
      setToken(userData.token);
      localStorage.setItem('token', userData.token);
      localStorage.setItem('tokenExpiry', userData.exp);
      localStorage.setItem('user', JSON.stringify(userData));
      setError(null);
    } catch (err) {
      handleError('LOGIN_ERROR', err.message);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setCart(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    localStorage.removeItem('tokenExpiry');
    navigate('/');
  };

  const saveCartToLocalStorage = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Guardar carrito en localStorage
  };


  const addItemToCart = async (item) => {
    if (!user || !cart) {
      handleError('CART_ERROR', "Carrito no encontrado");
      return;
    }

    try {
      setLoading(true);
      const itemId = `${item.id}---${item.size}`;
      const currentItem = cart.items[itemId];

      if (item.quantity <= 0) {
        handleError('ADD_TO_CART_ERROR', "La cantidad debe ser mayor a 0");
      }

      const newQuantity = currentItem
          ? currentItem.quantity + item.quantity
          : item.quantity;

      const updatedCart = await cartService.addUpdateItem(
          cart.id,
          item.id,
          item.size,
          newQuantity,
          item.price,
          item.model,
          item.image
      );

      saveCartToLocalStorage(updatedCart);
    } catch (error) {
      handleError('ADD_TO_CART_ERROR', error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateCartItemQuantity = async (itemId, newQuantity) => {
    if (!user || !cart) return;

    try {
      setLoading(true);
      const updatedCart = await cartService.updateItemQuantity(cart.id, itemId, newQuantity);
      saveCartToLocalStorage(updatedCart);
    } catch (error) {
      handleError('UPDATE_CART_ITEM_ERROR', error.message);
    } finally {
      setLoading(false);
    }
  };

  const removeItemFromCart = async (itemId) => {
    if (!user || !cart) return;

    try {
      setLoading(true);
      const updatedCart = await cartService.removeItem(cart.id, itemId);
      saveCartToLocalStorage(updatedCart);
    } catch (error) {
        handleError('REMOVE_CART_ITEM_ERROR', error.message);
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    if (!user || !cart) return;

    try {
      setLoading(true);
     await cartService.emptyCart(cart.id);
     cart.items = {};
        cart.precioTotal = 0;
        cart.discount = 0;
        cart.precioDiscount = 0;
        // setCart(cart);
      saveCartToLocalStorage(cart);
    }
    catch (error) {
        handleError('CLEAR_CART_ERROR', error.message);
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
      const updatedCart = await cartService.setDiscountAPI(cart.id, floatDiscount);
        saveCartToLocalStorage(updatedCart);
    } catch (error) {
        handleError('SET_DISCOUNT_ERROR', error.message);
    } finally {
      setLoading(false);
    }
  }

  const trackUserAction = (action, details) => {
    console.log(`User Action: ${action}`, details);
  };

  const checkoutCart = async () => {
    try {
      const result = await checkout(cart.id);
      trackUserAction('CHECKOUT', {
        cartId: cart.id,
        total: cart.precioTotal,
        success: result.isValid
      });
      return result;
    } catch (error) {
      trackUserAction('CHECKOUT_FAILED', {
        error: error.message
      });
      throw error;
    }
  };


  const getProductList = async () => {
    try {
      const products = await catalogService.listProducts();
      console.log('Lista de productos obtenida exitosamente', products);
      return products;
    } catch (err) {
      handleError('GET_PRODUCTS_ERROR', err.message);
      return []; 
    }
  };

  const actualizarFavoritos = async (user, nuevosFavoritos) => {
    try
    {
      if (JSON.stringify(user.favoritos) !== JSON.stringify(nuevosFavoritos))
      {
      const updatedUser = await catalogService.updateFavorites(nuevosFavoritos)
      setUser(updatedUser);
    }
    }
    catch (error)
    {
      handleError('UPDATE_FAVORITES_ERROR', error.message);
    }
    };

  const actualizarVisitados = async (user, nuevosVisitados) => {
    try {
      if (JSON.stringify(user.visitados) !== JSON.stringify(nuevosVisitados)) {
        const updatedUser = await catalogService.updateVisitedProducts(nuevosVisitados);
        setUser(updatedUser);
      }
    } catch (error) {
        handleError('UPDATE_VISITADOS_ERROR', error.message);
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
