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


  //actualizar bd.json
  const handleQuantityChange = async (itemId, newQuantity) => {
    try {
      // Actualiza la cantidad en el servidor
      await axios.patch(`http://localhost:3000/cart/${itemId}`, { quantity: newQuantity });

      // Actualiza el estado local
      setCartItems(cartItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      ));
    } catch (error) {
      console.error("Error al actualizar la cantidad:", error);
    }
  };

  const handleDeleteItem = async (itemId, quantity) => {
    try {
      if (quantity > 1) {
        // Si la cantidad es mayor que 1, disminuye en 1
        const newQuantity = quantity - 1;
        await axios.patch(`http://localhost:3000/cart/${itemId}`, { quantity: newQuantity });

        // Actualiza el estado local
        setCartItems(cartItems.map((item) =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        ));
      } else {
        // Si la cantidad es 1, elimina el producto del carrito
        await axios.delete(`http://localhost:3000/cart/${itemId}`);

        // Actualiza el estado local
        setCartItems(cartItems.filter((item) => item.id !== itemId));
      }
    } catch (error) {
      console.error("Error al eliminar el producto del carrito:", error);
    }
  };
  
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
                      onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                      >
                        {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button className="delete-item-btn" onClick={() => handleDeleteItem(item.id, item.quantity)}
                  >
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