import React from 'react';
import { Button } from 'react-bootstrap';

const FormSubmitButton = ({ label, disabled }) => (
  <Button variant="primary" type="submit" className="w-100 mt-3" disabled={disabled}>
    {label}
  </Button>
);

export default FormSubmitButton;
