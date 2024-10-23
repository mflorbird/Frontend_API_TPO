// src/components/CartItem.js
import React from 'react';
import axios from 'axios';

const CartItem = ({ item }) => {
  const token = 'Bearer tu_token_aqui'; // Reemplaza con el token real

  const handleRemove = async () => {
    try {
      await axios.delete('/api/v1/carritos/eliminarProducto', {
        headers: { Authorization: token },
        data: {
          carritoId: item.carritoId,
          productoId: item.productoId,
          cantidad: item.cantidad
        }
      });
      // Aquí puedes agregar lógica para actualizar el carrito en el estado del componente padre
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };

  return (
    <li>
      {item.nombre} - ${item.precio} x {item.cantidad}
      <button onClick={handleRemove}>Eliminar</button>
    </li>
  );
};

export default CartItem;
