import React from 'react';

const OrderSummary = ({ subtotal, discountAmount, totalAmount }) => {
  return (
    <div className="cart-summary">
      <h3>Resumen de compra</h3>
      <div className="summary-item">
        <p>Subtotal: ${subtotal}</p>
      </div>
      <div className="summary-item">
        <p>Descuento: ${discountAmount}</p>
      </div>
      <div className="summary-item">
        <p>Total: ${totalAmount}</p>
      </div>
    </div>
  );
};

export default OrderSummary;
