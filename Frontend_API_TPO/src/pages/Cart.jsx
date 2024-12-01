import React, { useEffect, useState, useContext } from 'react';
import "../styles/cart.css";
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { catalogService } from "../services/catalogService.js";
import OrderSummary from '../components/OrderSummary';
import { Button } from 'react-bootstrap';
import { FaTrash, FaExclamationCircle } from 'react-icons/fa';

const Cart = () => {
    const navigate = useNavigate();
    const { user, cart, setDiscount, clearCart, updateCartItemQuantity, removeItemFromCart } = useContext(AppContext);
    const [discountCode, setDiscountCode] = useState('');
    const [availableProducts, setAvailableProducts] = useState([]);
    const [cartItemsWithAvailability, setCartItemsWithAvailability] = useState([]);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        if (!user || !cart) {
            navigate('/error');
            return;
        }

        const fetchAvailableProducts = async () => {
            try {
                const availableProds = await catalogService.listAvailableProducts();
                setAvailableProducts(availableProds);
            } catch (error) {
                console.error("Error fetching available products:", error);
            }
        };

        fetchAvailableProducts();
    }, [user, cart, navigate]);

    useEffect(() => {
        if (cart && availableProducts.length > 0) {
            const processedCartItems = Object.entries(cart.items || {}).map(([key, item]) => {
                const availableProduct = availableProducts.find((p) => p.itemId === key);

                return {
                    ...item,
                    key,
                    isAvailable: availableProduct ? availableProduct.disponible : false,
                    maxStock: availableProduct ? availableProduct.cantidadMaxima : 0,
                    exceedsStock: availableProduct
                        ? item.quantity > availableProduct.cantidadMaxima
                        : true
                };
            });

            setCartItemsWithAvailability(processedCartItems);
        }
    }, [cart, availableProducts]);

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

    const hasUnavailableItems = cartItemsWithAvailability.some(
        item => !item.isAvailable || (item.maxStock === 0 && item.exceedsStock)
    );

    const handleClearCart = () => {
        clearCart();
        setRefresh(prev => !prev);
    };

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
                        {cartItemsWithAvailability.length === 0 ? (
                            <p>No hay productos en el carrito.</p>
                        ) : (
                            cartItemsWithAvailability.map((item) => (
                                <div
                                    key={item.key}
                                    className={`cart-item ${
                                        !item.isAvailable
                                            ? 'item-unavailable'
                                            : item.exceedsStock && item.maxStock === 0
                                                ? 'item-out-of-stock'
                                                : ''
                                    }`}
                                >
                                    <img src={item.img} alt={item.model} width="50" height="50" />
                                    <div className="item-details">
                                        <p><strong>{item.model}</strong></p>
                                        <p>Talle: {item.size || 'N/A'}</p>
                                        <p>Precio: ${item.price}</p>
                                        <p>Total: ${item.price * item.quantity}</p>
                                        {(!item.isAvailable || (item.exceedsStock && item.maxStock === 0)) && (
                                            <div className="availability-warning">
                                                <FaExclamationCircle className="warning-icon" />
                                                {!item.isAvailable
                                                    ? "Producto no disponible"
                                                    : "Sin stock disponible"}
                                            </div>
                                        )}
                                        {(item.exceedsStock && item.maxStock > 0) && (
                                            <div className="stock-warning">
                                                <FaExclamationCircle className="warning-icon" />
                                                {`Solo quedan ${item.maxStock} unidades en stock`}
                                            </div>
                                        )}
                                    </div>
                                    <div className="quantity mb-3">
                                        <h5>Cantidad</h5>
                                        <div className="d-flex align-items-center">
                                            <Button
                                                variant="outline-secondary"
                                                onClick={() => handleQuantityChange(item.key, Math.max(1, item.quantity - 1))}
                                                disabled={!item.isAvailable || (item.maxStock === 0 && item.exceedsStock)}
                                            >
                                                -
                                            </Button>
                                            <span className="mx-3">{item.quantity}</span>
                                            <Button
                                                variant="outline-secondary"
                                                onClick={() => handleQuantityChange(item.key, item.quantity + 1)}
                                                disabled={!item.isAvailable || (item.maxStock === 0 && item.exceedsStock)}
                                            >
                                                +
                                            </Button>
                                        </div>
                                    </div>
                                    <Button
                                        variant="outline-danger"
                                        onClick={() => handleDeleteItem(item.key)}
                                        style={{ marginLeft: '15px', marginTop: '15px' }}
                                    >
                                        <FaTrash />
                                    </Button>
                                </div>
                            ))
                        )}
                    </div>
                    <div className="cart-summary">
                        <OrderSummary
                            subtotal={cart.precioTotal}
                            discountAmount={cart.discount}
                            totalAmount={cart.precioDiscount}
                        />
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
                            disabled={
                                cartItemsWithAvailability.length === 0 ||
                                cartItemsWithAvailability.some(item =>
                                    !item.isAvailable ||
                                    (item.maxStock === 0 && item.exceedsStock) ||
                                    (item.quantity > item.maxStock && item.maxStock > 0)
                                )
                            }
                        >
                            Siguiente
                        </button>
                        <button
                            onClick={handleClearCart}
                            className="clear-cart-button"
                            style={{marginLeft: '15px', marginTop: '15px'}}
                            disabled={cartItemsWithAvailability.length === 0}
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