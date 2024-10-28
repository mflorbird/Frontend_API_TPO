import React, { useEffect, useState } from 'react';
import zapatillas1 from '../assets/01ZAPATILLAS.png';
import zapatillas2 from '../assets/05ZAPATILLAS.png';
import zapatillas3 from '../assets/08ZAPATILLAS.png';
import "../styles/cart.css";
import { useNavigate } from 'react-router-dom';
const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Zapatillas deportivas",
      size: "37",
      color: "Rojo",
      quantity: 1,
      price: 120,
      image: zapatillas1,
    },
    {
      id: 2,
      name: "Zapatillas urbanas",
      size: "42",
      color: "Azul",
      quantity: 2,
      price: 35,
      image: zapatillas2,
    },
  ]);

  const [totalAmount, setTotalAmount] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const [totalItems, setTotalItems] = useState(0); // Estado para la cantidad de productos

  const calculateTotal = () => {
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const total = subtotal + shippingCost;
    setTotalAmount(total);

    // Calcular el número total de artículos
    const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    setTotalItems(totalItemsCount);  // Establecer la cantidad total de artículos
  };

  useEffect(() => {
    calculateTotal();
  }, [cartItems]);

  return (
    <div className="cart-container">
      <div className="cart-container-body">
        <h1>Hola [Nombre]</h1>
        <p>Visualizá los productos que tienes en tu carrito</p>

        <button onClick={() => {
          // Función para agregar un artículo de prueba
          const newItem = {
            id: 3,
            name: "Zapatillas Urbanas",
            size: "38",
            color: "Negro",
            quantity: 1,
            price: 50,
            image: zapatillas3,
          };
          setCartItems([...cartItems, newItem]);
        }}>
          Agregar un producto de prueba
        </button>

        <div className="cart-content">
          <div className="cart-items">
            {cartItems.length === 0 ? (
              <p>No hay productos en el carrito.</p>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} />
                  <div className="item-details">
                    <p><strong>{item.name}</strong></p>
                    <p>Talle: {item.size}, Color: {item.color}</p>
                  </div>
                  <div className="item-quantity">
                    <label htmlFor={`quantity-${item.id}`}>Cantidad</label>
                    <select
                      id={`quantity-${item.id}`}
                      value={item.quantity}
                      onChange={(e) => {
                        // Actualizar la cantidad de productos
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
                    // Eliminar el producto del carrito
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
                <p>{item.name}</p>
                <p>Cantidad: {item.quantity}</p>
                <p>${item.price}</p>
              </div>
            ))}
            <p>Envío: {shippingCost === 0 ? "Gratis" : `$${shippingCost}`}</p>
            <p>Total (IVA incluido): ${totalAmount}</p>
            <input type="text" placeholder="Ingresá tu cupón" className="coupon-input" />
            <button className="apply-discount-btn">Aplicar descuento</button>
            <button className="checkout-btn" onClick={() => navigate('/Checkout')} >Ir a pagar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
