import React from 'react';
import { Form } from 'react-bootstrap';

const TextAreaField = ({ label, name, value, onChange, placeholder }) => {
  return (
    <Form.Group className="mb-3 text-start">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        as="textarea"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={3}
      />
    </Form.Group>
  );
};

export default TextAreaField;
