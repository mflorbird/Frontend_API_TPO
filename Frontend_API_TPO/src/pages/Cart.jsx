import React, { useEffect, useState, useContext } from 'react';
import "../styles/cart.css";
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { getCartItemsByUserId, getCartByUserId, updateItemQuantity, removeItem, emptyCart } from '../services/cartService'; // Importar los servicios adecuados
import OrderSummary from '../components/OrderSummary';

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
      const items = await getCartItemsByUserId(user.id); // nuevo servicio de obtener los productos del carrito
      setCartItems(items);
    } catch (error) {
      console.error("Error al obtener los productos del carrito:", error);
      setCartItems([]);
    }
  };


  // Calculate total amount, shipping cost, etc.
  const calculateTotal = () => {
    const calculatedSubtotal = cartItems.reduce((acc, item) => acc + (Number(item.price) * Number(item.quantity)), 0);
    setSubtotal(calculatedSubtotal);

    const total = calculatedSubtotal + shippingCost - discountAmount;
    setTotalAmount(total);

    const totalItemsCount = cartItems.reduce((acc, item) => acc + Number(item.quantity), 0);
    setTotalItems(totalItemsCount);
  };

  // Fetch cart items when user changes
  useEffect(() => {
    if (user) {
      fetchCartItems();
    }
  }, [user]);

  // Recalculate total whenever cart items or discount changes
  useEffect(() => {
    calculateTotal();
  }, [cartItems, discountAmount]);

  // Apply discount code logic
  const applyDiscount = () => {
    if (discountCode === 'NAIKI10') {
      const discount = subtotal * 0.10;
      setDiscountAmount(discount);
    } else {
      setDiscountAmount(0);
      alert("Código de descuento inválido");
    }
  };

  // Update quantity of a cart item
  const handleQuantityChange = async (item, newQuantity) => {
    console.log("Changing quantity for item:", item, "to:", newQuantity);
    try {
      await updateItemQuantity(user.id, item, newQuantity); // Llamada al servicio de actualizar cantidad
      setCartItems(cartItems.map((cartItem) =>
        cartItem.productId === item.productId && cartItem.size === item.size ? { ...cartItem, quantity: newQuantity } : cartItem
      ));
    } catch (error) {
      console.error("Error al actualizar la cantidad:", error);
    }
  };

  // Remove an item from the cart
  const handleDeleteItem = async (item) => {
    try {
      await removeItem(user.id, item); // Llamada al servicio de eliminar item
      setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id));
    } catch (error) {
      console.error("Error al eliminar el producto del carrito:", error);
    }
  };

  // Empty the entire cart
  const handleEmptyCart = async () => {
    const confirmEmpty = window.confirm("¿Estás seguro de que queres vaciar el carrito?");
    if (confirmEmpty) {
      try {
        await emptyCart(user.id); // Llamada al servicio para vaciar el carrito
        setCartItems([]);
        setTotalAmount(0);
      } catch (error) {
        console.error("Error al vaciar el carrito:", error);
      }
    }
  };

  if (!user) {
    return (
      <div className="cart-container">
        <p>Por favor, inicia sesión para ver tu carrito.</p>
        <button onClick={() => navigate('/login')}>Iniciar Sesión</button>
      </div>
    );
  }


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
                  <div key={`${item.productId}-${item.size}`} className="cart-item">
                    <img src={item.image || '/path/to/default-image.jpg'} alt={item.category} />
                    <div className="item-details">
                      <p><strong>{item.model}</strong></p>
                      <p>Talle: {item.size || 'N/A'}</p>
                      <p>Precio: ${item.price}</p>
                      <p>Total: ${item.price * item.quantity}</p>
                    </div>
                    <div className="item-quantity">
                      <label htmlFor={`quantity-${item.productId}-${item.size}`}>Cantidad</label>
                      <select
                        id={`quantity-${item.productId}-${item.size}`}
                        value={item.quantity || 1}
                        onChange={(e) => handleQuantityChange(item, parseInt(e.target.value))}
                      >
                        {[1, 2, 3, 4, 5].map((num) => (
                          <option key={num} value={num}>{num}</option>
                        ))}
                      </select>
                    </div>
                    <button onClick={() => handleDeleteItem(item)}>Eliminar</button>
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
