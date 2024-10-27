import React from 'react';
import { Button } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';

const BackButton = () => (
  <Button variant="link" className="text-decoration-none text-dark d-flex align-items-center mb-3">
    <FaArrowLeft className="me-2" />
    Volver al inicio
  </Button>
);

export default BackButton;
