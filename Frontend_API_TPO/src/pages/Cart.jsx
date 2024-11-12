import React, { useEffect, useState, useContext } from 'react';
import "../styles/cart.css";
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import OrderSummary from '../components/OrderSummary';
import { Button } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';

const Cart = () => {
  const navigate = useNavigate();
  const { user, cart, updateCartItemQuantity, removeItemFromCart, clearCart } = useContext(AppContext);
  const [totalAmount, setTotalAmount] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [discountCode, setDiscountCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [subtotal, setSubtotal] = useState(0);

  // Redirecciona si user o cart son nulos o indefinidos
  useEffect(() => {
    if (!user || !cart) {
      navigate('/error');
    } else {
      const items = Object.values(cart.items || {});
      const calculatedSubtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      setSubtotal(calculatedSubtotal);
      setTotalItems(items.reduce((sum, item) => sum + item.quantity, 0));
      setTotalAmount(calculatedSubtotal + shippingCost - discountAmount);
    }
  }, [user, cart, navigate, discountAmount, shippingCost]);

  const applyDiscount = () => {
    if (discountCode === 'NAIKI10') {
      const discount = subtotal * 0.10;
      setDiscountAmount(discount);
    } else {
      setDiscountAmount(0);
      alert("Código de descuento inválido");
    }
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    console.log("Actualizando cantidad del item:", itemId, "Nueva cantidad:", newQuantity);
    updateCartItemQuantity(itemId, newQuantity);
  };

  const handleDeleteItem = (itemId) => {
    console.log("Eliminando item del carrito:", itemId);
    removeItemFromCart(itemId);
  };

  const cartItems = Object.entries(cart?.items || {});

  return (
      <div className="cart-container">
        <div className="cart-container-body">
          <h1>Hola {user?.nombre}</h1>
          <ul className="progress-steps">
            <li className="step current">Paso 1: Completa tu carrito</li>
            <li className="step pending">Paso 2: Datos de Envío</li>
            <li className="step pending">Paso 3: Detalle de Facturación</li>
            <li className="step pending">Paso 4: Realizar Pago</li>
          </ul>
          <p>Visualizá los productos que tienes en tu carrito</p>
          <div className="cart-content">
            <div className="cart-items">
              {cartItems.length === 0 ? (
                  <p>No hay productos en el carrito.</p>
              ) : (
                  cartItems.map(([key, item]) => (
                      <div key={key} className="cart-item">
                        <img src={item.img} alt={item.model} width="50" height="50"/>
                        <div className="item-details">
                          <p><strong>{item.model}</strong></p>
                          <p>Talle: {item.size || 'N/A'}</p>
                          <p>Precio: ${item.price}</p>
                          <p>Total: ${item.price * item.quantity}</p>
                        </div>
                        <div className="quantity mb-3">
                          <h5>Cantidad</h5>
                          <div className="d-flex align-items-center">
                            <Button
                                variant="outline-secondary"
                                onClick={() => handleQuantityChange(key, Math.max(1, item.quantity - 1))}
                            >
                              -
                            </Button>
                            <span className="mx-3">{item.quantity}</span>
                            <Button
                                variant="outline-secondary"
                                onClick={() => handleQuantityChange(key, item.quantity + 1)}
                            >
                              +
                            </Button>
                          </div>
                        </div>
                        <Button
                            variant="outline-danger"
                            onClick={() => handleDeleteItem(key)}
                            style={{ marginLeft: '15px', marginTop: '15px' }}
                        >
                          <FaTrash />
                        </Button>
                      </div>
                  ))
              )}
            </div>
            <div className="cart-summary">
              <OrderSummary subtotal={subtotal} discountAmount={discountAmount} totalAmount={totalAmount} />
              <div className="summary-item">
                <input
                    type="text"
                    placeholder="Código de descuento"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                />
                <button onClick={applyDiscount}>Aplicar Descuento</button>
              </div>
              <button onClick={() => navigate("/cartEnvio")}>Siguiente</button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Cart;
