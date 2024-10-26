import React, { useContext } from "react"; // Importar useContext desde React
import '../styles/navbar.css';
import logo from '../assets/logo.svg';
import cartIcon from '../assets/cart.svg';
import userPhoto from '../assets/user-photo.jpeg';
import arrowIcon from '../assets/arrow.svg';
import { AppContext } from '../context/AppContext.jsx'; // Importar el contexto

const Navbar = () => {
    const { cartItems } = useContext(AppContext); // Obtener los ítems del carrito desde el contexto
    const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);


    return (
      <nav className="navbar">
        <img src={logo} alt="Logo" className="navbar-logo" />
        <ul className="navbar-links">
          <li><a href="/">Inicio</a></li>
          <li><a href="/oportunidades">Oportunidades</a></li>
          <li><a href="/sobre-nosotros">Sobre Nosotros</a></li>
          <li><a href="/contacto">Contacto</a></li>
        </ul>
        <div className="navbar-user">
          <div class="container-icon"> 
            <a href="/cart" className="cart-container">
              <img src={cartIcon} alt="Carrito" className="navbar-cart" />
              <span className="cart-badge">{cartItemCount}</span>  
            </a>
          </div>
          <div className="navbar-profile">
            <img src={userPhoto} alt="Usuario" className="navbar-user-photo" />
            <img src={arrowIcon} alt="Opciones" className="navbar-arrow" />
          </div>
        </div>
      </nav>
    );
};

export default Navbar;
