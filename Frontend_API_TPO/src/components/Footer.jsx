import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/footer.css';
import logo from '../assets/logo.svg';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-row">
                <img src={logo} alt="Logo" className="footer-logo" />
                <div className="footer-links">
                    <Link to="/terminos-y-condiciones">Términos y Condiciones</Link>
                    <Link to="/politicas-de-privacidad">Políticas de Privacidad</Link>
                    <Link to="/FAQ">Preguntas Frecuentes</Link>
                    <Link to="/size-guide">Guía de talles</Link>
                </div>
            </div>
            <div className="footer-divider"/>
            <p className="footer-text">© 2024 Naikii S.R.L. Todos los derechos reservados.</p>
        </footer>
    );
};

export default Footer;
