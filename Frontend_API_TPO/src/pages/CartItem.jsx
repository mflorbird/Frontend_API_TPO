import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CartItem from './CartItem';
import DiscountForm from './DiscountForm';
import "../styles/cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);

  useEffect(() => {
    
    axios.get("/api/cart") 
      .then(response => {
        setCartItems(response.data.items);
        setTotalAmount(response.data.totalAmount);
        setShippingCost(response.data.shippingCost);
      })
      .catch(error => {
        console.error("Error fetching cart data", error);
      });
  }, []);

  return (
    <div className="cart-container">
      <h1>Hola [Nombre]</h1>
      <p>Visualizá los productos que tienes en tu carrito</p>
      <div className="cart-content">
        <div className="cart-items">
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
        <div className="cart-summary">
          <h3>Resumen del pedido</h3>
          {cartItems.map((item) => (
            <div key={item.id}>
              <p>{item.name}</p>
              <p>Cantidad: {item.quantity}</p>
              <p>Precio: ${item.price}</p>
            </div>
          ))}
          <p>Envío: {shippingCost === 0 ? "Gratis" : `$${shippingCost}`}</p>
          <p>Total (IVA incluido): ${totalAmount}</p>
          <button>Ir a pagar</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;


