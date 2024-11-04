import React from 'react';
import { Button, Spinner } from 'react-bootstrap';

const FormSubmitButton = ({ label, disabled, loading }) => (
  <Button variant="primary" type="submit" className="w-100 mt-3" disabled={disabled}>
    {loading ? <Spinner animation="border" size="sm" /> : label}
  </Button>
);

export default FormSubmitButton;
