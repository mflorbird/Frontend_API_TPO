import React, { useState, useEffect  } from 'react';
import { Container, Row, Col, Button, Form, Image, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import qr from '../assets/QRNAIKI.png';
import '../styles/finalizarCompra.css';
import axios from 'axios'; 

const API_USERS_URL = 'http://localhost:3000/users';



const FinalizarCompra = ({ formData }) => {
  const navigate = useNavigate();
  const [metodoPago, setMetodoPago] = useState('');
  const [subtotal] = useState(0); // Asumiendo que el subtotal es 0 o se pasa de alguna manera
  const [discount] = useState(0); // Asumiendo que el descuento es 0 o se pasa de alguna manera
  const [userWithId1, setUserWithId1] = useState(null);
  const { userData, loading, error } = useUserData();
  const [errors, setErrors] = useState('');


  // Fetch user with idUsuario=1
  const fetchUserWithId1 = async () => {
    try {
      const response = await axios.get(`${API_USERS_URL}?idUsuario=1`);
      if (response.data && response.data.length > 0) {
        setUserWithId1(response.data[0]);
      } else {
        console.error('No se encontró un usuario con idUsuario = 1');
      }
    } catch (error) {
      console.error("Error al obtener el usuario con idUsuario = 1:", error);
    }
  };

  useEffect(() => {
    fetchUserWithId1();
  }, []);
  

  const handleConfirmPurchase = () => {
    alert('¡Gracias por comprar en NAIKII!');
    navigate('/');
  };

  const handleMetodoPagoChange = (e) => {
    setMetodoPago(e.target.value);
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
            <p><strong>Nombre:</strong> {userWithId1 ? userWithId1.nombre : formData.nombre}</p>
            <p><strong>Apellido:</strong> {userWithId1 ? userWithId1.apellido : formData.apellido}</p>
            <p><strong>Email:</strong> {userWithId1 ? userWithId1.email : formData.email}</p>
            
            <div className="mt-4">
              <h4>Selecciona el Método de Pago</h4>
              <select value={metodoPago} onChange={handleMetodoPagoChange}>
                <option value="">Selecciona un método</option>
                <option value="tarjetaCredito">Tarjeta de Crédito</option>
                <option value="billeteraDigital">Billetera Digital</option>
                <option value="transferenciaBancaria">Transferencia Bancaria</option>
              </select>

              <div className="mt-4">
                {metodoPago === 'tarjetaCredito' && <TarjetaCreditoForm onConfirm={handleConfirmPurchase} />}
                {metodoPago === 'billeteraDigital' && <BilleteraDigitalForm onConfirm={handleConfirmPurchase} />}
                {metodoPago === 'transferenciaBancaria' && <TransferenciaBancariaForm onConfirm={handleConfirmPurchase} />}
              </div>
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

export default FinalizarCompra;
