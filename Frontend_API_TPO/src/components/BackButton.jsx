// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Button } from 'react-bootstrap';
// import { FaArrowLeft } from 'react-icons/fa';

// const BackButton = () => (
//   <Link to="/">
//     <Button variant="link" className="text-decoration-none text-dark d-flex align-items-center mb-3" >
//       <FaArrowLeft className="me-2" />
//       Volver al inicio
//     </Button>
//   </Link>

// );

// export default BackButton;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';

const BackButton = () => {
  const navigate = useNavigate();

  // Función para volver a la página anterior
  const handleBackClick = () => {
    navigate(-1); // Esto hace que se regrese a la página anterior
  };

  return (
    <Button 
      variant="link" 
      className="text-decoration-none text-dark d-flex align-items-center mb-3" 
      onClick={handleBackClick}
    >
      <FaArrowLeft className="me-2" />
      Volver 
    </Button>
  );
};

export default BackButton;
