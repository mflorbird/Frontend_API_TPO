import React, { useContext, useRef, useEffect } from "react";
import '../styles/navbar.css';
import logo from '../assets/logo.svg';
import cartIcon from '../assets/cart.svg';
import userPhoto from '../assets/UserPhoto.jpeg';
import closeProduct from '../assets/x.svg'; 
import { AppContext } from '../context/AppContext.jsx';
import { useNavigate, useLocation } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';

const Navbar = () => {
  const { cartItems, user, logout } = useContext(AppContext);
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const navigate = useNavigate();
  const location = useLocation();

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

  
  const isAdmin = user && user.role === 'admin';

  return (
    <nav className="custom-navbar">
      <img src={logo} alt="Logo" className="navbar-logo" />
      {!isAdmin && (
        // <ul className="navbar-links">
        //   <li><button onClick={() => navigate("/")} className="nav-button-cabecera">Inicio</button></li>
        //   <li><button onClick={() => navigate("/about")} className="nav-button-cabecera">Sobre Nosotros</button></li>
        //   <li><button onClick={() => navigate("/contacto")} className="nav-button-cabecera">Contacto</button></li>
        // </ul>

        <ul className="navbar-links">
          <li> <a href="/" >Inicio</a></li>
          <li> <a href="/about">Sobre nosotros</a></li>
          <li> <a href="/contacto">Contacto</a></li>
        </ul>
      )}

  

      <div className="navbar-user">
        {/* Mostrar el carrito solo si el usuario no es admin */}
        {!isAdmin && (
          <div className="container-icon">
            <div ref={btnCartRef} className="cart-container">
              <img src={cartIcon} alt="Carrito" className="navbar-cart" />
              <span className="cart-badge">{cartItemCount}</span>
            </div>

            {/* Contenedor oculto que se muestra al hacer clic en el ícono del carrito */}
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

        {/* Menú del usuario */}
        {user ? (
          <Dropdown>
            <Dropdown.Toggle className="navbar-profile dropdown-toggle-white" id="dropdown-basic">
              <img src={userPhoto} alt="Usuario" className="navbar-user-photo" />
            </Dropdown.Toggle>

            <Dropdown.Menu>
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



