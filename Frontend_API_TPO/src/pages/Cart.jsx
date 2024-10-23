// src/components/Cart.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CartItem from './CartItem';
import DiscountForm from './DiscountForm';

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Token simulado para la autenticación, reemplaza esto por el token real
  const token = 'Bearer tu_token_aqui';

  // Obtener el carrito al cargar el componente
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get('/api/v1/carritos/obtenerCarrito', {
          headers: { Authorization: token }
        });
        setCart(response.data);
      } catch (error) {
        setErrorMessage(error.response.data || 'Error al obtener el carrito');
      }
    };

    fetchCart();
  }, []);

  return (
    <div>
      <h1>Carrito de Compras</h1>
      {errorMessage && <p>{errorMessage}</p>}
      {cart ? (
        <>
          {cart.items && cart.items.length > 0 ? (
            <ul>
              {cart.items.map(item => (
                <CartItem key={item.productoId} item={item} />
              ))}
            </ul>
          ) : (
            <p>No hay productos en el carrito.</p>
          )}
          <DiscountForm />
        </>
      ) : (
        <p>Cargando carrito...</p>
      )}
    </div>
  );
};

export default Cart;
