import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import MetodosDePago from '../components/MetodosDePago';
import '../styles/finalizarCompra.css';

const FinalizarCompra = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { metodoPago, formData = {}, subtotal=0, discount = 0 } = location.state || {};
  
    const total = subtotal - discount;
  
    const handleConfirmPurchase = () => {
      // aca la logica pra fazer a compra (ex:, enviar los datos al backend)
      alert('¡Compra realizada con éxito!');
      navigate('/');
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
                {metodoPago === 'tarjetaCredito' && <MetodosDePago metodoPagoSeleccionado="tarjetaCredito" />}
                {metodoPago === 'billeteraDigital' && <MetodosDePago metodoPagoSeleccionado="billeteraDigital" />}
                {metodoPago === 'transferenciaBancaria' && <MetodosDePago metodoPagoSeleccionado="transferenciaBancaria" />}
            </div>
          </Col>
          <Col md={4} className="bg-light p-3">
            <h3>Resumen del Pedido</h3>
            <p><strong>Subtotal:</strong> ${subtotal}</p>
            <p><strong>Descuento:</strong> ${discount}</p>
            <p><strong>Total:</strong> ${total}</p>
            <p><strong>Envío:</strong> Gratis</p>
          </Col>
        </Row>
        </div>
      </Container>
    );
  };
  
  export default FinalizarCompra;