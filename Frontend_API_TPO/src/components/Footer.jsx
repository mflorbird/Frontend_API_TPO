import React from 'react';
import '../styles/footer.css';
import logo from '../assets/logo.svg'; 

const Footer = () => {
  return (
    <footer className="footer">
      <img src={logo} alt="Logo" className="footer-logo" />
      <div className="footer-links">
        <a href="/terminos-y-condiciones">Términos y Condiciones</a>
        <a href="/politicas-de-privacidad">Políticas de Privacidad</a>
      </div>
      <hr className="footer-divider" />
      <p className="footer-text">© 2024 Naikii S.R.L. Todos los derechos reservados.</p>
    </footer>
  );
};

export default Footer;
