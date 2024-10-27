import React from 'react';
import { Form } from 'react-bootstrap';

const InputField = ({ label, type, name, value, onChange, placeholder, error }) => (
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
    {error && <div className="text-danger">{error}</div>}
  </Form.Group>
);

export default InputField;
