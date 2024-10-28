import React, { useContext, useRef, useEffect } from "react";
import '../styles/navbar.css';
import logo from '../assets/logo.svg';
import cartIcon from '../assets/cart.svg';
import userPhoto from '../assets/user-photo.jpeg';
import closeProduct from '../assets/x.svg'; // Asegúrate de que esta línea esté presente
import { AppContext } from '../context/AppContext.jsx';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';

const Navbar = () => {
  const { cartItems } = useContext(AppContext);
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const navigate = useNavigate();
  const location = useLocation();

  // Referencias para los elementos
  const btnCartRef = useRef(null);
  const containerCartProductsRef = useRef(null);

  // Añadir el evento de click para mostrar/ocultar el carrito
  useEffect(() => {
    const btnCart = btnCartRef.current;
    const containerCartProducts = containerCartProductsRef.current;

    const toggleCart = () => {
      containerCartProducts.classList.toggle('hidden-cart');
    };

    if (btnCart) {
      btnCart.addEventListener('click', toggleCart);
    }

    // Limpiar el evento al desmontar el componente
    return () => {
      if (btnCart) {
        btnCart.removeEventListener('click', toggleCart);
      }
    };
  }, []);

  return (
    <nav className="custom-navbar">
      <img src={logo} alt="Logo" className="navbar-logo" />
      <ul className="navbar-links">
        <li><a href="/">Inicio</a></li>
        <li><a href="/oportunidades">Oportunidades</a></li>
        <li><a href="/sobre-nosotros">Sobre Nosotros</a></li>
        <li><a href="/contacto">Contacto</a></li>
      </ul>
      <div className="navbar-user">
        <div className="container-icon">
          <div ref={btnCartRef} className="cart-container">
            <img src={cartIcon} alt="Carrito" className="navbar-cart" />
            <span className="cart-badge">{cartItemCount}</span>
          </div>

          {/* Menú emergente del carrito, solo se muestra si no estás en /cart */}
          {location.pathname !== '/cart' && location.pathname !== '/checkout' && (
            <div ref={containerCartProductsRef} className="container-cart-products hidden-cart">

              {/* Productos en el carrito (ejemplo) */}
              <div className="cart-product">
                <div className="info-cart-product">
                  <span className="cantidad-producto-carrito">1</span>
                  <p className="titulo-producto-carrito">Zapatos Nike</p>
                  <span className="precio-producto-carrito">$80</span>
                </div>
                <img src={closeProduct} alt="Eliminar producto" className="close-product" />
              </div>
              <div className="cart-total-hidden">
                <h3>Total:</h3>
                <span className="total-pagar-hidden">$150</span>
              </div>

              {/* Botones de navegación */}
              <div className="cart-buttons">
                <button onClick={() => navigate("/cart")} className="cart-button-ver">Ver Carrito</button>
                <button onClick={() => navigate("/checkout")} className="cart-button-checkout">Pagar</button>
              </div>
            </div>
          )}
        </div>
        <Dropdown>
          <Dropdown.Toggle className="navbar-profile dropdown-toggle-white" id="dropdown-basic">
            <img src={userPhoto} alt="Usuario" className="navbar-user-photo" />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => navigate("/login")}>Cerrar Sesión</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </nav>
  );
};

export default Navbar;
