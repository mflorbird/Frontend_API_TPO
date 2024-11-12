import React, { useEffect, useState, useContext } from 'react';
import "../styles/cart.css";
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import OrderSummary from '../components/OrderSummary';
import { Button } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';

const Cart = () => {
    const navigate = useNavigate();
    const { user, cart, setDiscount, clearCart, updateCartItemQuantity, removeItemFromCart } = useContext(AppContext);
    const [discountCode, setDiscountCode] = useState('');

    useEffect(() => {
        if (!user || !cart) {
            navigate('/error');
        }
    }, [user, cart, navigate]);

    const applyDiscount = () => {
        if (discountCode === 'NAIKI10') {
            setDiscount(0.1); // 10% de descuento
        } else {
            alert("Código de descuento inválido");
        }
    };

    const handleQuantityChange = (itemId, newQuantity) => {
        updateCartItemQuantity(itemId, newQuantity);
    };

    const handleDeleteItem = (itemId) => {
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
                                    <img src={item.img} alt={item.model} width="50" height="50" />
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
                        <OrderSummary subtotal={cart.precioTotal} discountAmount={cart.discount} totalAmount={cart.precioDiscount} />
                        <div className="summary-item">
                            <input
                                type="text"
                                placeholder="Código de descuento"
                                value={discountCode}
                                onChange={(e) => setDiscountCode(e.target.value)}
                            />
                            <button onClick={applyDiscount}>Aplicar Descuento</button>
                        </div>
                        <button
                            onClick={() => navigate("/cartEnvio")}
                            disabled={cartItems.length === 0}
                        >
                            Siguiente
                        </button>
                        <button
                            onClick={clearCart}
                            className="clear-cart-button"
                            style={{ marginLeft: '15px', marginTop: '15px' }}
                            disabled={cartItems.length === 0}
                        >
                            Vaciar Carrito
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
