import React from 'react';

const OrderSummary = ({ subtotal, discountAmount, totalAmount }) => {
<<<<<<< Updated upstream
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
=======
    return (
        <div className="cart-summary">
            <h3>Resumen de compra</h3>
            <div className="summary-item">
                <p>Subtotal: ${subtotal.toFixed(2)}</p>
            </div>
            <div className="summary-item">
                <p>Descuento: %{(discountAmount * 100).toFixed(0)}</p>
            </div>
            <div className="summary-item">
                <p>Total: ${totalAmount.toFixed(2)}</p>
            </div>
        </div>
    );
>>>>>>> Stashed changes
};

export default OrderSummary;
