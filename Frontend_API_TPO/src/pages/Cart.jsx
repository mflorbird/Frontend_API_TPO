import React, { useEffect, useState } from 'react';
import "../styles/cart.css";
import { useNavigate } from 'react-router-dom';
import useUserData from '../hooks/useUserData';
import axios from 'axios';


const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
 
  const fetchCartItems = async () => {
    try {
      const response = await axios.get('http://localhost:3000/cart'); 
      setCartItems(response.data);
    } catch (error) {
      console.error("Error al obtener los productos del carrito:", error);
    }
  };

  const calculateTotal = () => {
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const total = subtotal + shippingCost;
    setTotalAmount(total);

    const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    setTotalItems(totalItemsCount);
  };

  useEffect(() => {
    fetchCartItems(); // Llamar a la función de productos
  }, []);

  useEffect(() => {
    calculateTotal();
  }, [cartItems]);

  
    const { userData, loading, error } = useUserData();
  
    if (loading) return <p>Cargando datos...</p>;
    if (error) return <p>Error al obtener los datos: {error}</p>;
    if (!userData) return <p>No se encontró el usuario.</p>;

  return (
    <div className="cart-container">
      <div className="cart-container-body">
        <h1>Hola {userData.nombre}</h1>
        
        <ul className="progress-steps">
          <li className="step current">Paso 1: Completa tu carrito</li>
          <li className="step pending">Paso 2: Datos de Envío</li>
          <li className="step pending">Paso 3: Detalle de Facturación</li>
          <li className="step pending">Paso 4: Realizar Pago</li>
        </ul>
      

        <p>Visualizá los productos que tenes en tu carrito</p>
        <div className="cart-content">
          <div className="cart-items">
            {cartItems.length === 0 ? (
              <p>No hay productos en el carrito.</p>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.image || '/path/to/default-image.jpg'} alt={item.category} />
                  <div className="item-details">
                    <p><strong>{item.model}</strong></p>
                    <p>Talle: {item.size || 'N/A'}</p>
                    <p>Precio: ${item.price}</p>
                  </div>
                  <div className="item-quantity">
                    <label htmlFor={`quantity-${item.id}`}>Cantidad</label>
                    <select
                      id={`quantity-${item.id}`}
                      value={item.quantity || 1}
                      onChange={(e) => {
                        const newQuantity = parseInt(e.target.value);
                        setCartItems(cartItems.map((cartItem) =>
                          cartItem.id === item.id ? { ...cartItem, quantity: newQuantity } : cartItem
                        ));
                      }}
                    >
                      {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button className="delete-item-btn" onClick={() => {
                    setCartItems(cartItems.filter(cartItem => cartItem.id !== item.id));
                  }}>
                    🗑️
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="cart-summary">
            <h3>Resumen del pedido</h3>
            {cartItems.map((item) => (
              <div key={item.id} className="summary-item">
                <p>{item.model}</p>
                <p>Cantidad: {item.quantity}</p>
                <p>${item.price}</p>
              </div>
            ))}
            <p>Envío: {shippingCost === 0 ? "Gratis" : `$${shippingCost}`}</p>
            <p>Total (IVA incluido): ${totalAmount}</p>
            <input type="text" placeholder="Ingresá tu cupón" className="coupon-input" />
            <button className="apply-discount-btn">Aplicar descuento</button>
            <button className="datosEnvio-btn" onClick={() => navigate('/CartEnvio')} >Siguiente</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;