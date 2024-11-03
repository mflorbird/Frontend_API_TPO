import React, { useState } from 'react';
import { Button, Form, Image, Alert } from 'react-bootstrap';
import qr from '../assets/QRNAIKI.png'; // Código QR de ejemplo

const handleConfirmPurchase = () => {
  // aca la logica pra fazer a compra (ex:, enviar los datos al backend)
  alert('¡Compra realizada con éxito!');
  navigate('/');
};
// Componente formField reutilizable
const FormField = ({ label, type, name, value, onChange, placeholder, error }) => (
  <Form.Group className="mb-3">
    <Form.Label>{label}</Form.Label>
    <Form.Control
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      isInvalid={!!error}
    />
    <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
  </Form.Group>
);

// Formulario de Billetera Digital
const BilleteraDigitalForm = ({ handleFileUpload = () => {} }) => (
  <div>
    <h3>Último Paso: Realizar el Pago con tu Billetera Digital</h3>
    <h5>Escanea el código QR y selecciona el método de pago de tu billetera</h5>
    <Image src={qr} alt="Código QR" fluid />
    <Form.Group className="mt-3">
      <Form.Label>Adjunta el comprobante de pago</Form.Label>
      <Form.Control type="file" onChange={handleFileUpload} />
    </Form.Group>
    <Button variant="success" onClick={handleConfirmPurchase}>
              Confirmar Compra
    </Button>
  </div>
);

// Formulario de Tarjeta de Crédito
const TarjetaCreditoForm = ({
  values = {},
  handleChange = () => {},
  errors = {}
}) => (
  <div>
    <h3>Último Paso: Realizar el Pago con Tarjeta de Crédito</h3>
    <FormField
      label="Número de Tarjeta"
      type="text"
      name="numeroTarjeta"
      value={values.numeroTarjeta || ''}
      onChange={handleChange}
      placeholder="Ej. 1234 5678 9012 3456"
      error={errors.numeroTarjeta}
    />
    <FormField
      label="Fecha de Vencimiento"
      type="text"
      name="fechaVencimiento"
      value={values.fechaVencimiento || ''}
      onChange={handleChange}
      placeholder="MM/AA"
      error={errors.fechaVencimiento}
    />
    <FormField
      label="Código de Seguridad"
      type="text"
      name="codigoSeguridad"
      value={values.codigoSeguridad || ''}
      onChange={handleChange}
      placeholder="Ej. 123"
      error={errors.codigoSeguridad}
    />
    <FormField
      label="Nombre y Apellido"
      type="text"
      name="nombreApellido"
      value={values.nombreApellido || ''}
      onChange={handleChange}
      placeholder="Ej. Juan Pérez"
      error={errors.nombreApellido}
    />
    <Button variant="success" onClick={handleConfirmPurchase}>
              Confirmar Compra
    </Button>
  </div>
);

// Formulario de Transferencia Bancaria
const TransferenciaBancariaForm = ({ handleFileUpload = () => {} }) => (
  <div>
    <h3>Último Paso: Realizar el Pago con Transferencia Bancaria</h3>
    <Alert variant="secondary">
      <p><strong>CBU:</strong> XXXXXXXXXXXXXXXXXX</p>
      <p><strong>Usuario:</strong> xxxxxxxxxxxxx</p>
      <p><strong>Empresa:</strong> xxxxxxxxxxxx</p>
      <p><strong>Alias:</strong> xxxxxxx</p>
      <p><strong>Banco:</strong> xxxxxxxxxxx</p>
    </Alert>
    <Form.Group className="mt-3">
      <Form.Label>Adjunta el comprobante de pago</Form.Label>
      <Form.Control type="file" onChange={handleFileUpload} />
    </Form.Group>
    <Button variant="success" onClick={handleConfirmPurchase}>
              Confirmar Compra
    </Button>
  </div>
);

// Componente principal de Métodos de Pago
const MetodosDePago = ({ metodoPagoSeleccionado, setMetodoPagoSeleccionado }) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <div>
      <h5>Método de Pago</h5>
      <Form.Check
        type="radio"
        label="Transferencia Bancaria"
        name="metodoPago"
        value="transferenciaBancaria"
        onChange={() => setMetodoPagoSeleccionado('transferenciaBancaria')}
        checked={metodoPagoSeleccionado === 'transferenciaBancaria'}
      />
      <Form.Check
        type="radio"
        label="Tarjeta de Crédito"
        name="metodoPago"
        value="tarjetaCredito"
        onChange={() => setMetodoPagoSeleccionado('tarjetaCredito')}
        checked={metodoPagoSeleccionado === 'tarjetaCredito'}
      />
      <Form.Check
        type="radio"
        label="Billetera Digital"
        name="metodoPago"
        value="billeteraDigital"
        onChange={() => setMetodoPagoSeleccionado('billeteraDigital')}
        checked={metodoPagoSeleccionado === 'billeteraDigital'}
      />
      <div className="mt-4">
        {metodoPagoSeleccionado === 'tarjetaCredito' && (
          <TarjetaCreditoForm values={values} handleChange={handleChange} errors={errors} />
        )}
        {metodoPagoSeleccionado === 'billeteraDigital' && <BilleteraDigitalForm />}
        {metodoPagoSeleccionado === 'transferenciaBancaria' && <TransferenciaBancariaForm />}
      </div>
    </div>
  );
};

export default MetodosDePago;
