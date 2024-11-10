import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import '../styles/cartEnvio.css';
import { useNavigate } from 'react-router-dom';
import useUserData from '../hooks/useUserData';
import axios from 'axios'; 

const API_USERS_URL = 'http://localhost:3000/users';

const CartEnvio = () => {
  const navigate = useNavigate(); 
  const { userData, loading, error } = useUserData();
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    direccionCalle: '',
    direccionNumero: '',
    direccionPisoDepto: '',
    localidad: '',
    provincia: '',
    codigoPostal: '',
    telefono: '',
    notaPedido: '',
  });

  const [errors, setErrors] = useState({});
  const [userWithId1, setUserWithId1] = useState(null);

  // Fetch user with idUsuario=1
  const fetchUserWithId1 = async () => {
    try {
      const response = await axios.get(`${API_USERS_URL}?idUsuario=1`);
      setUserWithId1(response.data[0]);
    } catch (error) {
      console.error("Error al obtener el usuario con idUsuario = 1:", error);
    }
  };

  useEffect(() => {
    fetchUserWithId1();
  }, []);
    
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Eliminar errores en tiempo real si el campo es válido
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
      if (field !== 'direccionPisoDepto' && field !== 'notaPedido' && field !== 'nombre' && field !== 'apellido' && !formData[field]) {
        newErrors[field] = '*Obligatorio';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; 
  };

  const saveShippingData = async () => {
    try {
      if (!userData || !userData.id) throw new Error("Falta el ID de usuario.");
      const response = await fetch(`http://localhost:3000/envio/${userData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error('Error al guardar los datos de envío');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCartEnvio = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      await saveShippingData(); // Guarda los datos antes de navegar
      navigate('/Checkout');
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
    <Container fluid className="cartEnvio-container">
      <ul className="progress-steps">
        <li className="step completed">Paso 1: Completa tu carrito</li>
        <li className="step current">Paso 2: Datos de Envío</li>
        <li className="step pending">Paso 3: Detalle de Facturación</li>
        <li className="step pending">Paso 4: Realizar Pago</li>
      </ul>

      <div className="CartEnvio-body">
        <Button variant="secondary" className="mt-4" onClick={() => navigate('/Cart')}>
          Modificar Pedido
        </Button>

        <div className='FormDatos'>
          <h2>Datos de Envío</h2>
          <Form onSubmit={handleCartEnvio}> 
            <Row>
              <Col md={6}>
                <Form.Group controlId="nombre">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    name="nombre"
                    value={userWithId1 ? userWithId1.nombre : formData.nombre}
                    onChange={handleChange}
                    className={errors.nombre ? 'input-error' : ''}
                    readOnly
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
                    value={userWithId1 ? userWithId1.apellido : formData.apellido}
                    onChange={handleChange}
                    className={errors.apellido ? 'input-error' : ''}
                    readOnly
                  />
                  {errors.apellido && <div className="error-text">{errors.apellido}</div>}
                </Form.Group>
              </Col>
            </Row>

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

            <Button variant="primary" type="submit" className="mt-3">
              Continuar
            </Button>
          </Form>
        </div>
      </div>
    </Container>
  );
}

export default CartEnvio;
``
