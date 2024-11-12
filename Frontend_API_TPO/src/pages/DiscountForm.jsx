import React, { useState } from 'react';
import axios from 'axios';

const DiscountForm = () => {
  const [discountCode, setDiscountCode] = useState('');
  const [message, setMessage] = useState('');

  const handleApplyDiscount = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/v1/carritos/aplicarDescuento', {
        codigoDescuento: discountCode
      }, {
        headers: { Authorization: token }
      });
      setMessage(response.data);
    } catch (error) {
      setMessage(error.response.data || 'Error al aplicar descuento');
    }
  };

  return (
    <div>
      <form onSubmit={handleApplyDiscount}>
        <input
          type="text"
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
          placeholder="Código de descuento"
        />
        <button type="submit">Aplicar Descuento</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default DiscountForm;
