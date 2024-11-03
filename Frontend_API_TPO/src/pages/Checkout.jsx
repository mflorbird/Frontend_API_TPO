import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import '../styles/checkout.css';
import { useNavigate } from 'react-router-dom';
import MetodosDePago from '../components/MetodosDePago.jsx';

const Checkout = ({ cartItems, subtotal, discount }) => {
  const navigate = useNavigate(); 
  const [metodoPago, setMetodoPago] = useState('');
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    cuitDni: '',
    direccionCalle: '',
    direccionNumero: '',
    direccionPisoDepto: '',
    localidad: '',
    provincia: '',
    codigoPostal: '',
    telefono: '',
    email: '',
    notaPedido: '',
  });

  const [errors, setErrors] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      if (field !== 'direccionPisoDepto' && field !== 'notaPedido' && !formData[field]) {
        newErrors[field] = true;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    if (validateForm()) {
      navigate('/FinalizarCompra', { state: { metodoPago, formData, subtotal, discount } });
    }
  };

  return (
    <Container fluid className="checkout-container">
      <Row>
        {/* Columna izquierda: Detalles de Facturación */}
        <Col md={8} className="p-5">
          <h2>Detalles de Facturación</h2>
          <Form onSubmit={handleCheckout}>
            <Row>
              <Col md={6}>
                <Form.Group controlId="nombre">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    className={errors.nombre ? 'input-error' : ''}
                    required
                  />
                  {errors.nombre && <div className="error-text">{errors.nombre}</div>}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="apellido">
                  <Form.Label>Apellido</Form.Label>
                  <Form.Control
                    type="text"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleChange}
                    className={errors.apellido ? 'input-error' : ''}
                    required
                  />
                  {errors.apellido && <div className="error-text">{errors.apellido}</div>}
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId="cuitDni">
              <Form.Label>CUIT/DNI</Form.Label>
              <Form.Control
                type="text"
                name="cuitDni"
                value={formData.cuitDni}
                onChange={handleChange}
                className={errors.cuitDni ? 'input-error' : ''}
                required
              />
              {errors.cuitDni && <div className="error-text">{errors.cuitDni}</div>}
            </Form.Group>

            <Form.Group controlId="direccionCalle">
              <Form.Label>Dirección - Calle</Form.Label>
              <Form.Control
                type="text"
                name="direccionCalle"
                value={formData.direccionCalle}
                onChange={handleChange}
                className={errors.direccionCalle ? 'input-error' : ''}
                required
              />
              {errors.direccionCalle && <div className="error-text">{errors.direccionCalle}</div>}
            </Form.Group>

            <Row>
              <Col md={4}>
                <Form.Group controlId="direccionNumero">
                  <Form.Label>Número</Form.Label>
                  <Form.Control
                    type="text"
                    name="direccionNumero"
                    value={formData.direccionNumero}
                    onChange={handleChange}
                    className={errors.direccionNumero ? 'input-error' : ''}
                    required
                  />
                  {errors.direccionNumero && <div className="error-text">{errors.direccionNumero}</div>}
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="direccionPisoDepto">
                  <Form.Label>Piso/Depto</Form.Label>
                  <Form.Control
                    type="text"
                    name="direccionPisoDepto"
                    value={formData.direccionPisoDepto}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId="localidad">
              <Form.Label>Localidad</Form.Label>
              <Form.Control
                type="text"
                name="localidad"
                value={formData.localidad}
                onChange={handleChange}
                className={errors.localidad ? 'input-error' : ''}
                required
              />
              {errors.localidad && <div className="error-text">{errors.localidad}</div>}
            </Form.Group>

            <Form.Group controlId="provincia">
              <Form.Label>Provincia</Form.Label>
              <Form.Control
                type="text"
                name="provincia"
                value={formData.provincia}
                onChange={handleChange}
                className={errors.provincia ? 'input-error' : ''}
                required
              />
              {errors.provincia && <div className="error-text">{errors.provincia}</div>}
            </Form.Group>

            <Form.Group controlId="codigoPostal">
              <Form.Label>Código Postal</Form.Label>
              <Form.Control
                type="text"
                name="codigoPostal"
                value={formData.codigoPostal}
                onChange={handleChange}
                className={errors.codigoPostal ? 'input-error' : ''}
                required
              />
              {errors.codigoPostal && <div className="error-text">{errors.codigoPostal}</div>}
            </Form.Group>

            <Form.Group controlId="telefono">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="text"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                className={errors.telefono ? 'input-error' : ''}
                required
              />
              {errors.telefono && <div className="error-text">{errors.telefono}</div>}
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'input-error' : ''}
                required
              />
              {errors.email && <div className="error-text">{errors.email}</div>}
            </Form.Group>

            <Form.Group controlId="notaPedido">
              <Form.Label>Nota de Pedido</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="notaPedido"
                value={formData.notaPedido}
                onChange={handleChange}
              />
              
            </Form.Group>
          </Form>
        </Col>

        {/* Columna derecha: Detalle del Pedido */}
        <Col md={4} className="p-5 bg-light">
          <h3>Tu Pedido</h3>
          <div className="order-summary">
            <ul>
              {(cartItems || []).map((item, index) => (
                <li key={index} className="d-flex justify-content-between">
                  <span>{item.producto}</span>
                  <span>${item.subtotal}</span>
                </li>
              ))}
            </ul>
            <hr />
            <div className="d-flex justify-content-between">
              <span>Subtotal</span>
              <span>${subtotal}</span>
            </div>
            <div className="d-flex justify-content-between">
              <span>Envío</span>
              <span>Gratis</span>
            </div>
            <div className="d-flex justify-content-between">
              <span>Descuento</span>
              <span>${discount}</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
              <strong>Total</strong>
              <strong>${subtotal - discount}</strong>
            </div>
          </div>
          <Button variant="secondary" className="mt-3" onClick={() => navigate('/Cart')}>
            Modificar Pedido
          </Button>
          <p></p>
          <h5>Seleccione Método de Pago</h5>
            <Form.Check
              type="radio"
              label="Transferencia Bancaria"
              name="metodoPago"
              value="transferenciaBancaria"
              onChange={(e) => setMetodoPago(e.target.value)}
              checked={metodoPago === 'transferenciaBancaria'}
            />
            <Form.Check
              type="radio"
              label="Tarjeta de Crédito"
              name="metodoPago"
              value="tarjetaCredito"
              onChange={(e) => setMetodoPago(e.target.value)}
              checked={metodoPago === 'tarjetaCredito'}
            />
            <Form.Check
              type="radio"
              label="Billetera Digital"
              name="metodoPago"
              value="billeteraDigital"
              onChange={(e) => setMetodoPago(e.target.value)}
              checked={metodoPago === 'billeteraDigital'}
            />
          <p className="mt-3 text-muted">
            Tus datos personales se utilizarán para procesar tu pedido y mejorar tu experiencia en esta web.
          </p>
            <Button variant="primary" type="submit" className="mt-3" onClick={handleCheckout}>
            Continuar a Finalizar Compra
            </Button>
         </Col>
      </Row>
    </Container>
  );
};

export default Checkout;
