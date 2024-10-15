import React, { useState } from 'react';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import './Registro.css';
import { FaArrowLeft } from 'react-icons/fa';

const Registro = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    fechaNacimiento: '',
    usuario: '',
    contraseña: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email.includes('@')) {
      newErrors.email = 'El correo electrónico no es válido';
    }
    if (formData.contraseña.length < 8) {
      newErrors.contraseña = 'La contraseña debe tener al menos 8 caracteres';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitted(true);
    }
  };

  return (
    <Container fluid className="mt-5">
      <Row>
      <Col md={6} className="p-5 bg-light shadow-sm rounded">
          
          <Button variant="link" className="text-decoration-none text-dark d-flex align-items-center mb-3">
            <FaArrowLeft className="me-2" /> 
            Atrás
          </Button>

          <img
            src="/naikii.svg" // Reemplaza con la ruta correcta a tu archivo SVG
            alt="Logo"
            style={{ width: '80px', height: '80px', display: 'block', marginBottom: '20px' }}
          />

          <h2 className="text-start mb-4">Te damos la bienvenida</h2>
          
          {/* Texto adicional */}
          <p className="text-start" style={{ fontSize: '16pt' }}>
            Regístrate y conseguí las zapas que van con vos.
          </p>

          {isSubmitted && <Alert variant="success">Registro exitoso</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3 text-start">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Ingresa tu nombre"
                className="shadow-sm"
              />
            </Form.Group>

            <Form.Group className="mb-3 text-start">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                placeholder="Ingresa tu apellido"
                className="shadow-sm"
              />
            </Form.Group>

            <Form.Group className="mb-3 text-start">
              <Form.Label >Correo Electrónico</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Ingresa tu correo electrónico"
                className="shadow-sm"
              />
              {errors.email && <Alert variant="danger">{errors.email}</Alert>}
            </Form.Group>

            <Form.Group className="mb-3 text-start">
              <Form.Label >Fecha de Nacimiento</Form.Label>
              <Form.Control
                type="date"
                name="fechaNacimiento"
                value={formData.fechaNacimiento}
                onChange={handleChange}
                className="shadow-sm"
              />
            </Form.Group>

            <Form.Group className="mb-3 text-start">
              <Form.Label >Nombre de Usuario</Form.Label>
              <Form.Control
                type="text"
                name="usuario"
                value={formData.usuario}
                onChange={handleChange}
                placeholder="Ingresa un nombre de usuario"
                className="shadow-sm"
              />
            </Form.Group>

            <Form.Group className="mb-3 text-start">
              <Form.Label >Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="contraseña"
                value={formData.contraseña}
                onChange={handleChange}
                placeholder="Ingresa una contraseña"
                className="shadow-sm"
              />
              {errors.contraseña && <Alert variant="danger">{errors.contraseña}</Alert>}
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="w-100 mt-3"
              disabled={
                !formData.nombre ||
                !formData.apellido ||
                !formData.email ||
                !formData.contraseña
              }
            >
              Registrarme
            </Button>
          </Form>
        </Col>
        <Col md={6} className="d-none d-md-block bg-image">

        </Col>
      </Row>
    </Container>
  );
};

export default Registro;
