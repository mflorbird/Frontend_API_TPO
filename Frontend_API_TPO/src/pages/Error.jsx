// import { useNavigate } from 'react-router-dom';

// const Error = () => {
//     const navigate = useNavigate();

//     return (
//         <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
//             <div className="text-center">
//                 <h1 className="display-1 fw-bold">404</h1>
//                 <h2 className="mb-4">Página no encontrada</h2>
//                 <p className="lead mb-4">
//                     Lo sentimos, la página que estás buscando no existe o ha sido movida.
//                 </p>
//                 <button
//                     onClick={() => navigate('/')}
//                     className="btn btn-primary btn-lg"
//                 >
//                     Volver al inicio
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default Error;


import { useLocation } from 'react-router-dom';
import React from "react";
import "../styles/Error.css"; 
import errorImage from "../assets/Error.svg"; 

const Error = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    
    
    const errorTitle = params.get('title') || 'Error';  
    const errorMessage = params.get('message') || 'Ocurrió un error inesperado al procesar tu solicitud'; 

    return (
        <div className="error-page d-flex flex-column align-items-center justify-content-center text-center">
            <img src={errorImage} alt="Error" className="error-image mb-6" />
            <h1 className="display-1 fw-bold">{errorTitle}</h1>
            <h2 className="mb-3">{errorMessage}</h2>
            <p className="lead mb-4 text-center text-wrap" style={{ maxWidth: '800px' }}>
                Regresa a la página de inicio para reintentar. Estamos trabajando para resolver cualquier inconveniente lo antes posible.
            </p>
            <button
                onClick={() => (window.location.href = '/')}
                className="btn btn-primary btn-lg"
            >
                Volver al inicio
            </button>
        </div>
    );
};

export default Error;




