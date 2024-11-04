import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CartEmpty.css';

const CartEmpty = () => {
  const navigate = useNavigate();

  return (
    <div className="cart-empty-container">
      <h1 className="cart-empty-title">EL CARRITO ESTÁ VACÍO</h1>
      <p className="cart-empty-message">
        Una vez que añadas algo a tu carrito, aparecerá acá. ¿Listo para empezar?
      </p>
      <button 
        className="cart-empty-button" 
        onClick={() => navigate('/')}
      >
        EMPEZAR
      </button>
    </div>
  );
};

export default CartEmpty;
