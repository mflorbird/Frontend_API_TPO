import React from 'react';
import { Form, Alert } from 'react-bootstrap';

const FormField = ({ label, type, name, value, onChange, placeholder, error }) => (
  <Form.Group className="mb-3 text-start">
    <Form.Label>{label}</Form.Label>
    <Form.Control
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="shadow-sm"
    />
    {error && <Alert variant="danger">{error}</Alert>}
  </Form.Group>
);

export default FormField;
