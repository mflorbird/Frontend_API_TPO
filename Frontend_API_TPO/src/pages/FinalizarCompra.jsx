import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import MetodosDePago from '../components/MetodosDePago';
import '../styles/finalizarCompra.css';

const FinalizarCompra = ({ formData }) => {
  const navigate = useNavigate();
  const [metodoPago, setMetodoPago] = useState('');
  const [subtotal] = useState(0); // Asumiendo que el subtotal es 0 o se pasa de alguna manera
  const [discount] = useState(0); // Asumiendo que el descuento es 0 o se pasa de alguna manera

  const handleConfirmPurchase = () => {
    // Lógica para realizar la compra (ej. enviar los datos al backend)
    alert('¡Compra realizada con éxito!');
    navigate('/');
  };

  const handleMetodoPagoChange = (e) => {
    setMetodoPago(e.target.value);
  };

  return (
    <Container fluid className="finalizar-compra-container">
      <ul className="progress-steps">
        <li className="step completed">Paso 1: Completa tu carrito</li>
        <li className="step completed">Paso 2: Datos de Envío</li>
        <li className="step completed">Paso 3: Detalle de Facturación</li>
        <li className="step current">Paso 4: Realizar Pago</li>
      </ul>

      <div className="confirmacion-body">
        <Row>
          <Col md={8}>
            <h2>Confirmación del Pedido</h2>
            <p><strong>Nombre:</strong> {formData?.nombre || 'No disponible'} {formData?.apellido || 'No disponible'}</p>
            <p><strong>Email:</strong> {formData?.email || 'No disponible'}</p>
            <p><strong>Dirección:</strong> {formData?.direccionCalle || ''} {formData?.direccionNumero || ''}</p>
            <p><strong>Provincia:</strong> {formData?.provincia || 'No disponible'}</p>

            <div className="mt-4">
              <h4>Selecciona el Método de Pago</h4>
              <select value={metodoPago} onChange={handleMetodoPagoChange}>
                <option value="">Selecciona un método</option>
                <option value="tarjetaCredito">Tarjeta de Crédito</option>
                <option value="billeteraDigital">Billetera Digital</option>
                <option value="transferenciaBancaria">Transferencia Bancaria</option>
              </select>
              
              {metodoPago && <MetodosDePago metodoPagoSeleccionado={metodoPago} />}
            </div>
          </Col>
          <Col md={4} className="bg-light p-3">
            <h3>Resumen del Pedido</h3>
            <p><strong>Subtotal:</strong> ${subtotal}</p>
            <p><strong>Descuento:</strong> ${discount}</p>
            <p><strong>Total:</strong> ${subtotal - discount}</p>
            <p><strong>Envío:</strong> Gratis</p>
            <Button variant="primary" onClick={handleConfirmPurchase}>Confirmar Compra</Button>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default FinalizarCompra;
