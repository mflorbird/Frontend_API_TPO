import React, { useContext, useEffect, useState } from "react";
import '../styles/navbar.css';
import logo from '../assets/logo.svg';
import cartIcon from '../assets/cart.svg';
import userPhoto from '../assets/UserPhoto.jpeg';
import closeProduct from '../assets/x.svg';
import { AppContext } from '../context/AppContext.jsx';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';

const Navbar = () => {
  const { cart, user, logout } = useContext(AppContext);
  const cartItemCount = cart?.items ? Object.values(cart.items).reduce((acc, item) => acc + item.quantity, 0) : 0;

  const navigate = useNavigate();
  const location = useLocation();
  const [isCartVisible, setCartVisible] = useState(false); // Estado para controlar visibilidad del carrito


  const toggleCart = () => {
    setCartVisible(!isCartVisible); // Alterna la visibilidad del carrito
  };

  const isAdmin = user && user.role === 'admin';

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
          {!isAdmin && user && cart && (  // Verifica si el usuario está logueado
              <div className="container-icon">
                <div onClick={toggleCart} className="cart-container"> {/* Cambiado a onClick */}
                  <img src={cartIcon} alt="Carrito" className="navbar-cart"/>
                  <span className="cart-badge">{cartItemCount}</span>
                </div>
                {location.pathname !== '/cart' && location.pathname !== '/checkout' && (
                    <div className={`container-cart-products ${isCartVisible ? '' : 'hidden-cart'}`}> {/* Visibilidad controlada */}
                      {Object.entries(cart.items).map(([itemId, item]) => (
                          <div key={itemId} className="cart-product">
                            <div className="info-cart-product">
                              <span className="cantidad-producto-carrito">{item.quantity}</span>
                              <p className="titulo-producto-carrito">{itemId}</p>
                              <span className="precio-producto-carrito">${item.price}</span>
                              <img src={closeProduct} alt="Eliminar producto" className="close-product" />
                            </div>
                          </div>
                      ))}
                      <div className="cart-total-hidden">
                        <h3>Total:</h3>
                        <span className="total-pagar-hidden">${Object.values(cart.items).reduce((total, item) => total + item.price * item.quantity, 0)}</span>
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
                  {!isAdmin && ( // Solo muestra "Mi Perfil" si el usuario no es admin
                    <Dropdown.Item onClick={() => { navigate("/profile"); }}>
                      Mi Perfil
                    </Dropdown.Item>
                  )}
                  <Dropdown.Item onClick={() => { logout(); navigate("/login"); }}>
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
