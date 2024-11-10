import React, { useContext, useRef, useEffect, useState } from "react";
import '../styles/navbar.css';
import logo from '../assets/logo.svg';
import cartIcon from '../assets/cart.svg';
import userPhoto from '../assets/UserPhoto.jpeg';
import closeProduct from '../assets/x.svg';
import { AppContext } from '../context/AppContext.jsx';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { getCategorias } from "../services/catalogService.js";

const Navbar = () => {
  const { cartItems, user, logout } = useContext(AppContext);
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const navigate = useNavigate();
  const location = useLocation();
  const [categories, setCategories] = useState([]);

  const btnCartRef = useRef(null);
  const containerCartProductsRef = useRef(null);

  useEffect(() => {
    const btnCart = btnCartRef.current;
    const containerCartProducts = containerCartProductsRef.current;

    const toggleCart = () => {
      containerCartProducts.classList.toggle('hidden-cart');
    };

    if (btnCart) {
      btnCart.addEventListener('click', toggleCart);
    }

    return () => {
      if (btnCart) {
        btnCart.removeEventListener('click', toggleCart);
      }
    };
  }, []);

  useEffect(() => {
    // Cargar categorías desde el servicio
    const loadCategories = async () => {
      const categorias = await getCategorias();
      setCategories(categorias);
    };
    loadCategories();
  }, []);

  const isAdmin = user && user.role === 'admin';

  return (
      <nav className="custom-navbar">
        <img src={logo} alt="Logo" className="navbar-logo" />
        {!isAdmin && (
            <ul className="navbar-links">
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/about">Sobre nosotros</Link></li>
              <li><Link to="/contacto">Contacto</Link></li>
              <li>
                <Dropdown>
                  <Dropdown.Toggle>
                    Categorías
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {categories.map((category, index) => (
                        <Dropdown.Item
                            key={index}
                            onClick={() => navigate(`/categoria/${category}`)}
                        >
                          {category}
                        </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </li>
            </ul>
        )}

        <div className="navbar-user">
          {!isAdmin && (
              <div className="container-icon">
              <div ref={btnCartRef} className="cart-container">
                  <img src={cartIcon} alt="Carrito" className="navbar-cart"/>
                  <span className="cart-badge">{cartItemCount}</span>
                </div>
                {location.pathname !== '/cart' && location.pathname !== '/checkout' && (
                    <div ref={containerCartProductsRef} className="container-cart-products hidden-cart">
                      {cartItems.map((item, index) => (
                          <div key={index} className="cart-product">
                            <div className="info-cart-product">
                              <span className="cantidad-producto-carrito">{item.quantity}</span>
                              <p className="titulo-producto-carrito">{item.name}</p>
                              <span className="precio-producto-carrito">${item.price}</span>
                              <img src={closeProduct} alt="Eliminar producto" className="close-product" />
                            </div>
                          </div>
                      ))}
                      <div className="cart-total-hidden">
                        <h3>Total:</h3>
                        <span className="total-pagar-hidden">${cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}</span>
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
                  <Dropdown.Item onClick={() => { navigate("/profile"); }}>
                    Mi Perfil
                  </Dropdown.Item>
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
