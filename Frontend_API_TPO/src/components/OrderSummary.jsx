import React from 'react';

const OrderSummary = ({ subtotal, discountAmount, totalAmount }) => {
    return (
        <div>
            <h3 >Resumen de compra</h3>
            <div className="summary-item">
                <p>Subtotal: ${subtotal.toFixed(2)}</p>
            </div>
            <div className="summary-item">
                <p>Descuento: %{(discountAmount * 100).toFixed(2)}</p>
            </div>
            <div className="summary-item">
                <p>Total: ${totalAmount.toFixed(2)}</p>
            </div>
        </div>
    );
};

export default OrderSummary;
