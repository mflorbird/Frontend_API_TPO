import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import MetodosDePago from '../components/MetodosDePago';
import '../styles/finalizarCompra.css';

const FinalizarCompra = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { metodoPago, formData, subtotal, discount } = location.state || {};
  
    const total = subtotal - discount;
  
    const handleConfirmPurchase = () => {
      // aca la logica pra fazer a compra (ex:, enviar los datos al backend)
      alert('¡Compra realizada con éxito!');
      navigate('/');
    };
  
    return (
    
      <Container className="finalizar-compra-container">
        <div class="progress-steps">
          <span class="step completed">Paso 1: Completa tu carrito</span>
          <span class="step completed">Paso 2: Verifica tus datos</span>
          <span class="step current">Paso 3: Pagar Compra</span>
        </div>

        <Row>
          <Col md={8}>
            <h2>Confirmación del Pedido</h2>
            <p><strong>Nombre:</strong> {formData.nombre} {formData.apellido}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Dirección:</strong> {formData.direccionCalle} {formData.direccionNumero}</p>
            <p><strong>Provincia:</strong> {formData.provincia}</p>
           
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
          </Col>
        </Row>
      </Container>
    );
  };
  
  export default FinalizarCompra;