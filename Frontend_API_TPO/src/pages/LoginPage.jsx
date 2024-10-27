import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Alert, Container, Row, Col, Button } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';
import FormField from '../components/FormField';
import FormSubmitButton from '../components/FormSubmitButton';
import BackButton from '../components/BackButton';
import './Login.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    usuarioOEmail: '',
    contraseña: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.usuarioOEmail.includes('@') && formData.usuarioOEmail.length < 3) {
      newErrors.usuarioOEmail = 'Ingresa un usuario o correo válido';
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
    <Container fluid className="mt-0 p-0">
      <Row>
        <Col md={6} className="p-5 bg-light shadow-sm rounded">
          <BackButton text="Volver al inicio" />
          <img
            src="/naikii.svg"
            alt="Logo"
            style={{ width: '80px', height: '80px', display: 'block', marginBottom: '20px' }}
          />

          <h2 className="text-start mb-4">Te damos la bienvenida</h2>

          <p className="text-start" style={{ fontSize: '16pt' }}>
            Iniciá sesión y conseguí las zapas que van con vos.
          </p>

          {isSubmitted && <Alert variant="success">Inicio de sesión exitoso. ¡Bienvenido a NAIKII!</Alert>}

          <Form onSubmit={handleSubmit}>
            <FormField
              label="Usuario o correo electrónico"
              type="text"
              name="usuarioOEmail"
              value={formData.usuarioOEmail}
              onChange={handleChange}
              placeholder="Ingresa tu usuario o correo electrónico"
              error={errors.usuarioOEmail}
            />

            <FormField
              label="Contraseña"
              type="password"
              name="contraseña"
              value={formData.contraseña}
              onChange={handleChange}
              placeholder="Ingresa tu contraseña"
              error={errors.contraseña}
            />

            <FormSubmitButton
              label="Iniciar sesión"
              disabled={!formData.usuarioOEmail || !formData.contraseña}
            />

            <div className="d-flex align-items-center justify-content-center mt-4">
              <div className="line" style={{ flex: 1, height: '1px', backgroundColor: '#ccc' }}></div>
              <div className="px-3">¿Necesitás una cuenta?</div>
              <div className="line" style={{ flex: 1, height: '1px', backgroundColor: '#ccc' }}></div>
            </div>

            <div className="mt-3">
              <Link to="/register">
                <Button variant="outline-secondary" className="w-100">
                  Registrarme
                </Button>
              </Link>
            </div>
          </Form>
        </Col>
        <Col md={6} className="bg-image">
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;