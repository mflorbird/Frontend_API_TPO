import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';

const BackButton = () => (
  <Link to="/">
    <Button variant="link" className="text-decoration-none text-dark d-flex align-items-center mb-3" >
      <FaArrowLeft className="me-2" />
      Volver al inicio
    </Button>
  </Link>

);

export default BackButton;
