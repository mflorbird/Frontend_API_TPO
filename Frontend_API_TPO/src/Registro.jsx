import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

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

  // Función para manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validación básica (ejemplos)
  const validate = () => {
    const newErrors = {};
    if (!formData.email.includes('@')) {
      newErrors.email = 'El correo electrónico no es válido';
    }
    if (formData.contraseña.length < 8) {
      newErrors.contraseña = 'La contraseña debe tener al menos 8 caracteres';
    }
    // Agregar más validaciones según sea necesario
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar el submit del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Si pasa las validaciones, puedes hacer el registro
      setIsSubmitted(true);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Formulario de Registro</h2>
      {isSubmitted && <Alert variant="success">Registro exitoso</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Ingresa tu nombre"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Apellido</Form.Label>
          <Form.Control
            type="text"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            placeholder="Ingresa tu apellido"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Correo Electrónico</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Ingresa tu correo electrónico"
          />
          {errors.email && <Alert variant="danger">{errors.email}</Alert>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Fecha de Nacimiento</Form.Label>
          <Form.Control
            type="date"
            name="fechaNacimiento"
            value={formData.fechaNacimiento}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Nombre de Usuario</Form.Label>
          <Form.Control
            type="text"
            name="usuario"
            value={formData.usuario}
            onChange={handleChange}
            placeholder="Ingresa un nombre de usuario"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            name="contraseña"
            value={formData.contraseña}
            onChange={handleChange}
            placeholder="Ingresa una contraseña"
          />
          {errors.contraseña && <Alert variant="danger">{errors.contraseña}</Alert>}
        </Form.Group>

        <Button variant="primary" type="submit"disabled={!formData.nombre || !formData.apellido || !formData.email || !formData.contraseña}>
          Registrarme
        </Button>

      </Form>
    </div>
  );
};

export default Registro;
