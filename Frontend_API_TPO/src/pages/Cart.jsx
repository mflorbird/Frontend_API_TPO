import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import CartItem from './CartItem';
import DiscountForm from './DiscountForm';
import "../styles/cart.css";

const Cart = () => {
  const { cartItems, totalAmount, shippingCost } = useContext(AppContext);

  if (!cartItems || cartItems.length === 0) {
    return <p>No hay productos en el carrito.</p>;
  }

  return (
    <div className="cart-container">
      <h1>Hola [Nombre]</h1>
      <p>Visualizá los productos que tienes en tu carrito</p>

      <div className="cart-content">
        {/* Columna de items del carrito */}
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="item-details">
                <p><strong>{item.name}</strong></p>
                <p>Talle: {item.size}, Color: {item.color}</p>
              </div>
              <div className="item-quantity">
                <label htmlFor={`quantity-${item.id}`}>Cantidad</label>
                <select id={`quantity-${item.id}`} value={item.quantity}>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>
              <button className="delete-item-btn">🗑️</button>
            </div>
          ))}
        </div>

        {/* Columna de resumen del pedido */}
        <div className="cart-summary">
          <h3>Resumen del pedido</h3>
          {cartItems.map((item) => (
            <div key={item.id} className="summary-item">
              <p>{item.name}</p>
              <p>Cantidad: {item.quantity}</p>
              <p>${item.price}</p>
            </div>
          ))}
          <p>Envío: {shippingCost === 0 ? "Gratis" : `$${shippingCost}`}</p>
          <p>Total (IVA incluido): ${totalAmount}</p>
          <input type="text" placeholder="Ingresá tu cupón" className="coupon-input" />
          <button className="apply-discount-btn">Aplicar descuento</button>
          <button className="checkout-btn">Ir a pagar</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
