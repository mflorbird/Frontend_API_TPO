import React, { useState } from 'react';
import { Button, Form, Image, Alert, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import qr from '../assets/QRNAIKI.png';

// Componente principal de métodos de pago
const MetodosDePago = () => {
  const navigate = useNavigate();
  const [metodoPagoSeleccionado, setMetodoPagoSeleccionado] = useState('transferenciaBancaria'); // Por defecto seleccionamos una opción

  // Función para confirmar la compra y redirigir
  const handleConfirmPurchase = () => {
    alert('¡Compra realizada con éxito!');
    navigate('/'); // Redirige a la página principal
  };

  return (
    <div>
      <h5>Método de Pago</h5>
      <Form.Group>
        <Form.Label>Selecciona tu Método de Pago</Form.Label>
        <Form.Control
          as="select"
          value={metodoPagoSeleccionado}
          onChange={(e) => setMetodoPagoSeleccionado(e.target.value)}
        >
          <option value="transferenciaBancaria">Transferencia Bancaria</option>
          <option value="tarjetaCredito">Tarjeta de Crédito</option>
          <option value="billeteraDigital">Billetera Digital</option>
        </Form.Control>
      </Form.Group>

      <div className="mt-4">
        {metodoPagoSeleccionado === 'tarjetaCredito' && (
          <TarjetaCreditoForm onConfirm={handleConfirmPurchase} />
        )}
        {metodoPagoSeleccionado === 'billeteraDigital' && (
          <BilleteraDigitalForm onConfirm={handleConfirmPurchase} />
        )}
        {metodoPagoSeleccionado === 'transferenciaBancaria' && (
          <TransferenciaBancariaForm onConfirm={handleConfirmPurchase} />
        )}
      </div>
    </div>
  );
};

// Formulario de Tarjeta de Crédito
const TarjetaCreditoForm = ({ onConfirm }) => {
  const [formData, setFormData] = useState({
    numeroTarjeta: '',
    fechaVencimiento: '',
    codigoSeguridad: '',
    nombreApellido: '',
  });
  const [errors, setErrors] = useState({});

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

  const validateFields = () => {
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = '*Obligatorio';
      }
    });

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      onConfirm();
    }
  };

  return (
    <div className="FormTarjetaCredito">
      <h2>Último Paso: Realizar el Pago con Tarjeta de Crédito</h2>
      <Form onSubmit={(e) => { e.preventDefault(); validateFields(); }}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="numeroTarjeta">
              <Form.Label>Número de Tarjeta</Form.Label>
              <Form.Control
                type="text"
                name="numeroTarjeta"
                value={formData.numeroTarjeta}
                onChange={handleChange}
                placeholder="Ej. 1234 5678 9012 3456"
                isInvalid={!!errors.numeroTarjeta}
              />
              <Form.Control.Feedback type="invalid">
                {errors.numeroTarjeta}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="fechaVencimiento">
              <Form.Label>Fecha de Vencimiento</Form.Label>
              <Form.Control
                type="text"
                name="fechaVencimiento"
                value={formData.fechaVencimiento}
                onChange={handleChange}
                placeholder="MM/AA"
                isInvalid={!!errors.fechaVencimiento}
              />
              <Form.Control.Feedback type="invalid">
                {errors.fechaVencimiento}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="codigoSeguridad">
              <Form.Label>Código de Seguridad</Form.Label>
              <Form.Control
                type="text"
                name="codigoSeguridad"
                value={formData.codigoSeguridad}
                onChange={handleChange}
                placeholder="Ej. 123"
                isInvalid={!!errors.codigoSeguridad}
              />
              <Form.Control.Feedback type="invalid">
                {errors.codigoSeguridad}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="nombreApellido">
              <Form.Label>Nombre y Apellido</Form.Label>
              <Form.Control
                type="text"
                name="nombreApellido"
                value={formData.nombreApellido}
                onChange={handleChange}
                placeholder="Ej. Juan Pérez"
                isInvalid={!!errors.nombreApellido}
              />
              <Form.Control.Feedback type="invalid">
                {errors.nombreApellido}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Button variant="success" type="submit" className="mt-3">
          Confirmar Compra
        </Button>
      </Form>
    </div>
  );
};

// Formulario de Billetera Digital
const BilleteraDigitalForm = ({ onConfirm }) => (
  <div>
    <h3>Último Paso: Realizar el Pago con tu Billetera Digital</h3>
    <h5>Escanea el código QR y selecciona el método de pago de tu billetera</h5>
    <Image src={qr} alt="Código QR" fluid />
    <Form.Group className="mt-3">
      <Form.Label>Adjunta el comprobante de pago</Form.Label>
      <Form.Control type="file" />
    </Form.Group>
    <Button variant="success" onClick={onConfirm}>
      Confirmar Compra
    </Button>
  </div>
);

// Formulario de Transferencia Bancaria
const TransferenciaBancariaForm = ({ onConfirm }) => (
  <div>
    <h3>Último Paso: Realizar el Pago con Transferencia Bancaria</h3>
    <Alert variant="secondary">
      <p><strong>CBU:</strong> 2541002333058810</p>
      <p><strong>Usuario:</strong> NaikiiZapas </p>
      <p><strong>Empresa:</strong> Naikii </p>
      <p><strong>Alias:</strong> naikii.ok </p>
      <p><strong>Banco:</strong> Banco de la Nacion Argentina </p>
    </Alert>
    <Form.Group className="mt-3">
      <Form.Label>Adjunta el comprobante de pago</Form.Label>
      <Form.Control type="file" />
    </Form.Group>
    <Button variant="success" onClick={onConfirm}>
      Confirmar Compra
    </Button>
  </div>
);

export default MetodosDePago;
