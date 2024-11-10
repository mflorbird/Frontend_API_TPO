import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import '../styles/checkout.css';
import { useNavigate } from 'react-router-dom';
import useUserData from '../hooks/useUserData';

const Checkout = ({ cartItems, subtotal, discount }) => {
  const navigate = useNavigate(); 
  const [metodoPago, setMetodoPago] = useState('');
  const { userData, loading, error } = useUserData();
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    cuitDni: '',
    provincia: '',
    codigoPostal: '',
    email: '',
  });

  const [errors, setErrors] = useState('');

  useEffect(() => {
    if (userData) {
      setFormData((prevData) => ({
        ...prevData,
        nombre: userData.nombre || '',
        apellido: userData.apellido || '',
        email: userData.email || '',
      }));
    }
  }, [userData]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  
    if (value && errors[name]) {
      setErrors((prevErrors) => {
        const updatedErrors = { ...prevErrors };
        delete updatedErrors[name];
        return updatedErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      if (field !== 'direccionPisoDepto' && field !== 'notaPedido' && !formData[field]) {
        newErrors[field] = '*Obligatorio';
      }
    });

    if (!metodoPago) {
      newErrors.metodoPago = '*Selecciona un método de pago';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; 
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Obtener datos de "cart"
        const cartResponse = await fetch('http://localhost:3000/cart');
        const cartData = await cartResponse.json();

        // Calcular subtotal, descuento y otros valores que quieres pasar a `FinalizarCompra`
        const subtotal = cartData.reduce((acc, item) => acc + item.price * item.quantity, 0);
        const discount = subtotal * 0.1; // Ejemplo: 10% de descuento
        const metodoPago = 'tarjetaCredito'; // Reemplaza con el valor correcto
        const formData = {
          nombre: 'Juan',
          apellido: 'Pérez',
          email: 'juan@example.com',
          direccionCalle: 'Calle Falsa',
          direccionNumero: '123',
          provincia: 'Buenos Aires'
        };
        // Mover datos a "checkout"
        for (const item of cartData) {
          await fetch('http://localhost:3000/checkout', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
          });
        }

        // Navegar a la página de FinalizarCompra
        navigate('/FinalizarCompra', {
          state: {
            metodoPago,
            formData,
            subtotal,
            discount,
          },
        });
      } catch (error) {
        console.error('Error al mover datos de "cart" a "checkout":', error);
      }
    }
  };

  if (loading) {
    return <p>Cargando datos...</p>;
  }

  if (error) {
    return <p>Error al obtener los datos: {error}</p>;
  }

  if (!userData) {
    return <p>No se encontró el usuario.</p>;
  }

  return (
    <Container fluid className="checkout-container">
        <ul className="progress-steps">
          <li className="step completed">Paso 1: Completa tu carrito</li>
          <li className="step completed">Paso 2: Datos de Envío</li>
          <li className="step current">Paso 3: Detalle de Facturación</li>
          <li className="step pending">Paso 4: Realizar Pago</li>
        </ul>

      <div className="Checkout-body">
        <Form onSubmit={handleCheckout}>
          <Row>
            {/* Columna izquierda: Detalles de Facturación */}
            <Col md={8} className="p-5">
              <h2>Detalles de Facturación</h2>
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
            </Col>

            {/* Columna derecha: Tu Pedido */}
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

              <h5 className="mt-4">Seleccione Método de Pago</h5>
              <Form.Check
                type="radio"
                label="Transferencia Bancaria"
                name="metodoPago"
                value="transferenciaBancaria"
                onChange={(e) => setMetodoPago(e.target.value)}
                checked={metodoPago === 'transferenciaBancaria'}
                className={errors.metodoPago ? 'input-error' : ''}
              />
              <Form.Check
                type="radio"
                label="Tarjeta de Crédito"
                name="metodoPago"
                value="tarjetaCredito"
                onChange={(e) => setMetodoPago(e.target.value)}
                checked={metodoPago === 'tarjetaCredito'}
                className={errors.metodoPago ? 'input-error' : ''}
              />
              <Form.Check
                type="radio"
                label="Billetera Digital"
                name="metodoPago"
                value="billeteraDigital"
                onChange={(e) => setMetodoPago(e.target.value)}
                checked={metodoPago === 'billeteraDigital'}
                className={errors.metodoPago ? 'input-error' : ''}
              />
              {errors.metodoPago && <div className="error-text">{errors.metodoPago}</div>}

              <p className="mt-3 text-muted">
                Tus datos personales se utilizarán para procesar tu pedido y mejorar tu experiencia en esta web.
              </p>
              
              <Button variant="primary" type="submit" onClick={handleCheckout} className="mt-3">
                Continuar a Finalizar Compra
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </Container>
  );
};

export default Checkout;
