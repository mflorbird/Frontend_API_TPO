import React, { useState } from 'react';
import { Button, Form, Image, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Asegúrate de que esto esté bien importado
import qr from '../assets/QRNAIKI.png'; 

const MetodosDePago = ({ metodoPagoSeleccionado, setMetodoPagoSeleccionado }) => {
  const navigate = useNavigate(); // Llama a useNavigate() correctamente aquí
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const validateFields = () => {
    const newErrors = {};
  
    if (!values.numeroTarjeta) newErrors.numeroTarjeta = "Número de tarjeta es obligatorio";
    if (!values.fechaVencimiento) newErrors.fechaVencimiento = "Fecha de vencimiento es obligatoria";
    if (!values.codigoSeguridad) newErrors.codigoSeguridad = "Código de seguridad es obligatorio";
    if (!values.nombreApellido) newErrors.nombreApellido = "Nombre y apellido son obligatorios";
  
    setErrors(newErrors);
  
    if (Object.keys(newErrors).length === 0) {
      handleConfirmPurchase(navigate);
    }
  };

  const handleConfirmPurchase = (navigate) => {
    // Aquí va la lógica para realizar la compra
    alert('¡Compra realizada con éxito!');
    navigate('/'); // Redirige a la página principal (o la página deseada)
  };

  // Componente FormField reutilizable
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
  const BilleteraDigitalForm = ({ handleFileUpload = () => {}, navigate }) => (
    <div>
      <h3>Último Paso: Realizar el Pago con tu Billetera Digital</h3>
      <h5>Escanea el código QR y selecciona el método de pago de tu billetera</h5>
      <Image src={qr} alt="Código QR" fluid /> 
      <Form.Group className="mt-3">
        <Form.Label>Adjunta el comprobante de pago</Form.Label>
        <Form.Control type="file" onChange={handleFileUpload} />
      </Form.Group>
      <Button variant="success" onClick={() => handleConfirmPurchase(navigate)}>
        Confirmar Compra
      </Button>
    </div>
  );

  // Formulario de Tarjeta de Crédito
  const TarjetaCreditoForm = ({
    values,
    handleChange,
    errors,
    validateFields 
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
      <Button variant="success" onClick={validateFields}>
        Confirmar Compra
      </Button>
    </div>
  );

  // Formulario de Transferencia Bancaria
  const TransferenciaBancariaForm = ({ handleFileUpload = () => {}, navigate }) => (
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
        <Form.Control type="file" onChange={handleFileUpload} />
      </Form.Group>
      <Button variant="success" onClick={() => handleConfirmPurchase(navigate)}>
        Confirmar Compra
      </Button>
    </div>
  );

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
          <TarjetaCreditoForm 
            values={values} 
            handleChange={handleChange} 
            errors={errors}
            validateFields={validateFields} 
          />
        )}
        {metodoPagoSeleccionado === 'billeteraDigital' && (
          <BilleteraDigitalForm navigate={navigate} />
        )}
        {metodoPagoSeleccionado === 'transferenciaBancaria' && (
          <TransferenciaBancariaForm navigate={navigate}/>
        )}
      </div>
    </div>
  );
};

export default MetodosDePago;
