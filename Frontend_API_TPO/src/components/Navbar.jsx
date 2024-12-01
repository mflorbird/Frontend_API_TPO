import React, { useContext, useState, useEffect } from "react";
import '../styles/navbar.css';
import logo from '../assets/logo.svg';
import cartIcon from '../assets/cart.svg';
import userPhoto from '../assets/UserPhoto.jpeg';
import { AppContext } from '../context/AppContext.jsx';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';

const Navbar = () => {
    const { cart, user, logout, cartItems ,cartItemCount } = useContext(AppContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [isCartVisible, setCartVisible] = useState(false);


    const toggleCart = () => {
        setCartVisible(!isCartVisible);
    };

    const isAdmin = user && user.role === 'ADMIN';

    return (
        <nav className="custom-navbar">
            <img src={logo} alt="Logo" className="navbar-logo" />
            {!isAdmin && (
                <ul className="navbar-links">
                    <li><Link to="/">Inicio</Link></li>
                    <li><Link to="/about">Sobre nosotros</Link></li>
                    <li><Link to="/contacto">Contacto</Link></li>
                </ul>
            )}

            <div className="navbar-user">
                {!isAdmin && user && cart && (
                    <div className="container-icon">
                        <div onClick={toggleCart} className="cart-container">
                            <img src={cartIcon} alt="Carrito" className="navbar-cart"/>
                            <span className="cart-badge">{cartItemCount}</span>
                        </div>
                        {location.pathname !== '/cart' &&
                            location.pathname !== '/Checkout' &&
                            location.pathname !== '/cartEnvio' &&
                            location.pathname !== '/finalizarCompra' && (
                                <div className={`container-cart-products ${isCartVisible ? '' : 'hidden-cart'}`}>
                                    {Object.entries(cartItems).map(([itemId, item]) => (
                                        <div key={itemId} className="cart-product">
                                            <div className="info-cart-product">
                                                <span className="cantidad-producto-carrito">{item.quantity}</span>
                                                <p className="titulo-producto-carrito">{item.model}</p>
                                                <span className="talle-producto-carrito">{item.size}</span>
                                                <span className="precio-producto-carrito">${item.price}</span>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="cart-total-hidden">
                                        <h3>Total:</h3>
                                        <span className="total-pagar-hidden">${Object.values(cartItems).reduce((total, item) => total + item.price * item.quantity, 0)}</span>
                                    </div>
                                    <div className="cart-buttons">
                                        <button onClick={() => navigate("/cart")} className="cart-button-ver">Ver Carrito</button>
                                        <button onClick={() => navigate("/checkout")} className="cart-button-checkout">Pagar</button>
                                    </div>
                                </div>
                            )}
                    </div>
                )}
                {user ? (
                    <Dropdown>
                        <Dropdown.Toggle className="navbar-profile dropdown-toggle-white" id="dropdown-basic">
                            <img src={userPhoto} alt="Usuario" className="navbar-user-photo" />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {!isAdmin && (
                                <Dropdown.Item onClick={() => { navigate("/profile"); }} >
                                    Mi Perfil
                                </Dropdown.Item>
                            )}
                            <Dropdown.Item onClick={() => { logout(); navigate("/login"); }} >
                                Cerrar Sesión
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                ) : (
                    <button onClick={() => navigate("/login")} className="login-button">
                        Iniciar Sesión
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
