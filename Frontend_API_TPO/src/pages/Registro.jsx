import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import AlertMessage from '../../Components/AlertMessage';
import BackButton from '../../Components/BackButton';
import InputField from '../../Components/InputField';
import './Registro.css';

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
    <Container fluid className="mt-0 p-0">
      <Row>
        <Col md={6} className="p-5 bg-light shadow-sm rounded">
          <BackButton />
          <img
            src="/naikii.svg"
            alt="Logo"
            style={{ width: '80px', height: '80px', display: 'block', marginBottom: '20px' }}
          />
          <h2 className="text-start mb-4">Te damos la bienvenida</h2>
          <p className="text-start" style={{ fontSize: '16pt' }}>
            Regístrate y conseguí las zapas que van con vos.
          </p>
          {isSubmitted && <AlertMessage variant="success" message="Tu cuenta fue creada con éxito. Empezá a disfrutar de la experiencia NAIKII" />}
          <Form onSubmit={handleSubmit}>
            <InputField
              label="Nombre"
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ingresa tu nombre"
            />
            <InputField
              label="Apellido"
              type="text"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              placeholder="Ingresa tu apellido"
            />
            <InputField
              label="Correo Electrónico"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Ingresa tu correo electrónico"
              error={errors.email}
            />
            <InputField
              label="Fecha de Nacimiento"
              type="date"
              name="fechaNacimiento"
              value={formData.fechaNacimiento}
              onChange={handleChange}
            />
            <InputField
              label="Nombre de Usuario"
              type="text"
              name="usuario"
              value={formData.usuario}
              onChange={handleChange}
              placeholder="Ingresa un nombre de usuario"
            />
            <InputField
              label="Contraseña"
              type="password"
              name="contraseña"
              value={formData.contraseña}
              onChange={handleChange}
              placeholder="Ingresa una contraseña"
              error={errors.contraseña}
            />
            <Button
              variant="primary"
              type="submit"
              className="w-100 mt-3"
              disabled={!formData.nombre || !formData.apellido || !formData.email || !formData.contraseña}
            >
              Registrarme
            </Button>
          </Form>
        </Col>
        <Col md={6} className="bg-image" />
      </Row>
    </Container>
  );
};

export default Registro;
