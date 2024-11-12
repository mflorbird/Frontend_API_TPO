import React from 'react';

const OrderSummary = ({ subtotal, discountAmount, totalAmount }) => {
  return (
    <div className="cart-summary">
      <h3>Resumen de compra</h3>
      <div className="summary-item">
        <p className='mt-3'>Subtotal: ${subtotal}</p>
      </div>
      <div className="summary-item mt-2">
        <p>Descuento: ${discountAmount}</p>
      </div>
      <div className="summary-item mt-2">
        <p>Total: ${totalAmount}</p>
      </div>
    </div>
  );
};

export default OrderSummary;
