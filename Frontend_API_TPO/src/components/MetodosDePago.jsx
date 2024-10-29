import React from 'react';
import { Form } from 'react-bootstrap';

const MetodosDePago = ({ metodoPagoSeleccionado, setMetodoPagoSeleccionado }) => {
  const handleMetodoPagoChange = (e) => {
    setMetodoPagoSeleccionado(e.target.value);
  };

  return (
    <div>
      <h5>Método de Pago</h5>
      <Form.Check
        type="radio"
        label="Transferencia bancaria directa"
        name="metodoPago"
        value="transferenciaBancaria"
        onChange={() => setMetodoPagoSeleccionado('transferenciaBancaria')}
        checked={metodoPagoSeleccionado === 'transferenciaBancaria'}
      />
      <Form.Check
        type="radio"
        label="Tarjeta de crédito"
        name="metodoPago"
        value="tarjetaCredito"
        onChange={() => setMetodoPagoSeleccionado('tarjetaCredito')}
        checked={metodoPagoSeleccionado === 'tarjetaCredito'}
      />
      <Form.Check
        type="radio"
        label="Billetera digital"
        name="metodoPago"
        value="billeteraDigital"
        onChange={() => setMetodoPagoSeleccionado('billeteraDigital')}
        checked={metodoPagoSeleccionado === 'billeteraDigital'}
      />
    </div>
  );
};

export default MetodosDePago;
