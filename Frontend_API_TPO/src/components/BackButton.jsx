import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';

const BackButton = () => {
  const navigate = useNavigate();

  
  const handleBackClick = () => {
    navigate("/"), { state: null };; 
  };

  return (
    <Button 
      variant="link" 
      className="text-decoration-none text-dark d-flex align-items-center mb-3" 
      onClick={handleBackClick}
    >
      <FaArrowLeft className="me-2" />
      Volver a Inicio
    </Button>
  );
};

export default BackButton;
