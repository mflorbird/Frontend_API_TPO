import React, { useEffect, useState, useContext } from 'react';
import "../styles/cart.css";
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext'; 
import axios from 'axios';

const API_CART_URL = 'http://localhost:3000/cart';
const API_CHECKOUT_URL = 'http://localhost:3000/checkout';

const Cart = () => {
  const navigate = useNavigate();
  const { user, cartItems, setCartItems } = useContext(AppContext); 
  const [totalAmount, setTotalAmount] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [discountCode, setDiscountCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [subtotal, setSubtotal] = useState(0);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(`${API_CART_URL}?userId=${user.id}`); // Usar el userId desde el contexto
      setCartItems(response.data);  // Asumir que el contexto maneja el estado de cartItems
    } catch (error) {
      console.error("Error al obtener los productos del carrito:", error);
    }
  };

  const calculateTotal = () => {
    const calculatedSubtotal = cartItems.reduce((acc, item) => acc + (Number(item.price) * Number(item.quantity)), 0);
    setSubtotal(calculatedSubtotal);

    const total = calculatedSubtotal + shippingCost - discountAmount;
    setTotalAmount(total);

    const totalItemsCount = cartItems.reduce((acc, item) => acc + Number(item.quantity), 0);
    setTotalItems(totalItemsCount);
  };

  useEffect(() => {
    if (user) { // Solo cargar los datos si el usuario está disponible
      fetchCartItems();
    }
  }, [user]);

  useEffect(() => {
    calculateTotal();
  }, [cartItems, discountAmount]);

  const applyDiscount = () => {
    if (discountCode === 'NAIKI10') {
      const discount = subtotal * 0.10; // 10% del subtotal
      setDiscountAmount(discount);
    } else {
      setDiscountAmount(0);
      alert("Código de descuento inválido");
    }
  };

  const handleQuantityChange = async (itemId, newQuantity) => {
    try {
      await axios.patch(`${API_CART_URL}/${itemId}`, { quantity: newQuantity });

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
        const newQuantity = quantity - 1;
        await axios.patch(`${API_CART_URL}/${itemId}`, { quantity: newQuantity });

        setCartItems(cartItems.map((item) =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        ));
      } else {
        await axios.delete(`${API_CART_URL}/${itemId}`);
        setCartItems(cartItems.filter((item) => item.id !== itemId));

        await eliminarProductoDelCheckout(itemId);
      }
    } catch (error) {
      console.error("Error al eliminar el producto del carrito:", error);
    }
  };

  const eliminarProductoDelCheckout = async (itemId) => {
    try {
      const response = await axios.get(`${API_CHECKOUT_URL}?userId=${user.id}`);
      let compraExistente = response.data[0];

      if (compraExistente) {
        const nuevosModelos = compraExistente.models.filter((modelo) => modelo.id !== itemId);

        const nuevoSubtotal = nuevosModelos.reduce((acc, item) => acc + (item.quantity * item.price), 0);
        const nuevoTotal = nuevoSubtotal - compraExistente.descuento;

        await axios.put(`${API_CHECKOUT_URL}/${compraExistente.id}`, {
          ...compraExistente,
          models: nuevosModelos,
          subtotal: nuevoSubtotal.toFixed(2),
          total: nuevoTotal.toFixed(2),
        });
      }
    } catch (error) {
      console.error("Error al eliminar el producto del checkout:", error);
    }
  };

  const guardarCompra = async () => {
    if (!user) return;

    try {
      const response = await axios.get(`${API_CHECKOUT_URL}?userId=${user.id}`);
      let compraExistente = response.data[0];

      const nuevosItems = cartItems.map((item) => ({
        model: item.model,
        quantity: item.quantity,
        price: parseFloat(item.price),
      }));

      let nuevoSubtotal = 0;
      let nuevoDescuento = 0;
      let nuevoTotal = 0;

      if (compraExistente) {
        const modelosExistentes = compraExistente.models;

        nuevosItems.forEach((nuevoItem) => {
          const modeloExistente = modelosExistentes.find((modelo) => modelo.model === nuevoItem.model);
          if (modeloExistente) {
            modeloExistente.quantity = nuevoItem.quantity;
          } else {
            modelosExistentes.push(nuevoItem);
          }
        });

        nuevoSubtotal = modelosExistentes.reduce((acc, item) => acc + (item.quantity * item.price), 0);
        nuevoDescuento = parseFloat(discountAmount);
        nuevoTotal = nuevoSubtotal - nuevoDescuento;

        await axios.put(`${API_CHECKOUT_URL}/${compraExistente.id}`, {
          ...compraExistente,
          models: modelosExistentes,
          subtotal: nuevoSubtotal.toFixed(2),
          descuento: nuevoDescuento.toFixed(2),
          total: nuevoTotal.toFixed(2),
        });
      } else {
        const nuevaCompra = {
          idUsuario: user.id,
          mail: user.mail,
          idCompra: Math.floor(Math.random() * 100000),
          models: nuevosItems,
          fechaDeCompra: new Date().toISOString(),
          subtotal: nuevoSubtotal.toFixed(2),
          descuento: nuevoDescuento.toFixed(2),
          total: nuevoTotal.toFixed(2),
        };

        await axios.post(API_CHECKOUT_URL, nuevaCompra);
      }

      navigate('/CartEnvio');
    } catch (error) {
      console.error("Error al guardar o actualizar la compra:", error);
    }
  };

  if (!user) return <p>Cargando datos del usuario...</p>;

  return (
    <div className="cart-container">
      <div className="cart-container-body">
        <h1>Hola {user.nombre}</h1>
        
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
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>
                  <button onClick={() => handleDeleteItem(item.id, item.quantity)}>Eliminar</button>
                </div>
              ))
            )}
          </div>
          <div className="cart-summary">
            <h3>Resumen de compra</h3>
            <div className="summary-item">
              <p>Subtotal: ${subtotal}</p>
            </div>
            <div className="summary-item">
              <p>Descuento: ${discountAmount}</p>
            </div>
            <div className="summary-item">
              <p>Total: ${totalAmount}</p>
            </div>
            <div className="summary-item">
              <input
                type="text"
                placeholder="Código de descuento"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
              />
              <button onClick={applyDiscount}>Aplicar Descuento</button>
            </div>
            <button onClick={() => { navigate("/cartEnvio"); }}>Siguiente</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
