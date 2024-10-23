import React from "react";
import '../styles/navbar.css';
import logo from '../assets/logo.svg';
import cartIcon from '../assets/cart.svg';
import userPhoto from '../assets/user-photo.jpeg';
import arrowIcon from '../assets/arrow.svg';

const Navbar = () => {
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
          <a href="/cart">
            <img src={cartIcon} alt="Carrito" className="navbar-cart" />
          </a>
          <div className="navbar-profile">
            <img src={userPhoto} alt="Usuario" className="navbar-user-photo" />
            <img src={arrowIcon} alt="Opciones" className="navbar-arrow" />
          </div>
        </div>
      </nav>
    );
  };
  
  export default Navbar;