import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Alert, Container, Row, Col, Button, FormCheck } from 'react-bootstrap';
import BackButton from '../components/BackButton';
import FormField from '../components/FormField';
import FormSubmitButton from '../components/FormSubmitButton';
import { registerUser } from '../services/authService';
import '../styles/Registro.css'

const RegistroPage = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    fechaNacimiento: '',
    usuario: '',
    contraseña: '',
    favoritos: [],
    visitados: []
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      setError(null);
      try {
        await registerUser(formData);
        setIsSubmitted(true);
      } catch (error) {
        setError('No pudimos crear tu cuenta. Inténtalo nuevamente.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Container fluid className="mt-0 p-0">
      <Row>
        <Col md={6} className="p-5 bg-light shadow-sm rounded">
        <Link to="/" className="text-decoration-none text-dark mb-4 d-block">
            &larr; Volver
        </Link>
          <img
            src="/naikii.svg"
            alt="Logo"
            style={{ width: '80px', height: '80px', display: 'block', marginBottom: '20px' }}
          />
          <h2 className="text-start mb-4">Te damos la bienvenida</h2>
          <p className="text-start" style={{ fontSize: '16pt' }}>
            Regístrate y conseguí las zapas que van con vos.
          </p>

          {isSubmitted && <Alert variant="success">Tu cuenta fue creada con éxito. Inicia sesión y empezá a disfrutar de la experiencia NAIKII</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <FormField
              label="Nombre"
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ingresa tu nombre"
              error={errors.nombre}
            />

            <FormField
              label="Apellido"
              type="text"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              placeholder="Ingresa tu apellido"
              error={errors.apellido}
            />

            <FormField
              label="Correo electrónico"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Ingresa tu correo electrónico"
              error={errors.email}
            />

            <FormField
              label="Fecha de Nacimiento"
              type="date"
              name="fechaNacimiento"
              value={formData.fechaNacimiento}
              onChange={handleChange}
              error={errors.fechaNacimiento}
            />

            <FormField
              label="Nombre de usuario"
              type="text"
              name="usuario"
              value={formData.usuario}
              onChange={handleChange}
              placeholder="Ingresa un nombre de usuario"
              error={errors.usuario}
            />

            <FormField
              label="Contraseña"
              type="password"
              name="contraseña"
              value={formData.contraseña}
              onChange={handleChange}
              placeholder="Ingresa una contraseña"
              error={errors.contraseña}
            />

            <div>
              <label className="form-check-label mt-4 mb-4" htmlFor="acceptTerms">
              • Al registrarme, confirmo que he leído y acepto los   <a href="/terminos-y-condiciones" target="_blank">Términos y Condiciones</a> así como las <a href="/politicas-de-privacidad" target="_blank">Políticas de Privacidad</a>.
              </label>
            </div>

            <FormSubmitButton
              label="Registrarme"
              loading={loading}
              disabled={loading || !formData.nombre || !formData.apellido || !formData.email || !formData.contraseña || !formData.fechaNacimiento || !formData.usuario}
            />
            <div className="d-flex align-items-center justify-content-center mt-4">
              <div className="line" style={{ flex: 1, height: '1px', backgroundColor: '#ccc' }}></div>
              <div className="px-3">¿Ya tenés una cuenta?</div>
              <div className="line" style={{ flex: 1, height: '1px', backgroundColor: '#ccc' }}></div>
            </div>
            <div className="mt-3">
              <Link to="/login">
                <Button variant="outline-secondary"  className="w-100">
                  Iniciar sesión
                </Button>
              </Link>
            </div>
          </Form>
        </Col>
        <Col md={6} className="bg-image-register"></Col>
      </Row>
    </Container>
  );
};

export default RegistroPage;
