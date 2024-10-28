import React, { useState } from 'react';
import { Container, Row, Col, Form, Alert, Button } from 'react-bootstrap';
import BackButton from '../components/BackButton';
import FormField from '../components/FormField';
import FormSubmitButton from '../components/FormSubmitButton';
import '../styles/checkout.css';

const Checkout = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    paymentMethod: 'creditCard',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'El nombre completo es obligatorio';
    if (!formData.address) newErrors.address = 'La dirección es obligatoria';
    if (!formData.city) newErrors.city = 'La ciudad es obligatoria';
    if (!formData.postalCode) newErrors.postalCode = 'El código postal es obligatorio';
    if (!formData.country) newErrors.country = 'El país es obligatorio';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitted(true);
      console.log('Datos del formulario:', formData);
    }
  };

  return (
    <Container fluid className="mt-0 p-0">
      <Row>
        <Col md={6} className="p-5 bg-light shadow-sm rounded">
          <BackButton text="Volver al carrito" />
          <h2 className="text-start mb-4">Datos de Facturacion</h2>

          {isSubmitted && <Alert variant="success">Pedido realizado exitosamente. ¡Gracias por tu compra!</Alert>}

          <Form onSubmit={handleSubmit} className="checkout-form">
            <FormField
              label="Nombre Completo"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ingresa tu nombre completo"
              error={errors.name}
            />

            <FormField
              label="Dirección"
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Ingresa tu dirección"
              error={errors.address}
            />

            <FormField
              label="Ciudad"
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Ingresa tu ciudad"
              error={errors.city}
            />

            <FormField
              label="Código Postal"
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              placeholder="Ingresa tu código postal"
              error={errors.postalCode}
            />

            <FormField
              label="País"
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Ingresa tu país"
              error={errors.country}
            />

            <Form.Group className="mb-3">
              <Form.Label>Método de Pago</Form.Label>
              <Form.Select
                id="paymentMethod"
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
              >
                <option value="creditCard">Tarjeta de Crédito</option>
                <option value="paypal">PayPal</option>
                <option value="bankTransfer">Transferencia Bancaria</option>
              </Form.Select>
            </Form.Group>

            <FormSubmitButton
              label="Realizar Pedido"
              disabled={!formData.name || !formData.address || !formData.city || !formData.postalCode || !formData.country}
            />
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;
