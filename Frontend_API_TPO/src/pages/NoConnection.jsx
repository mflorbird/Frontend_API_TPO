import { useNavigate } from 'react-router-dom';
import React from "react";
import "../styles/Error.css"; 
import errorImage from "../assets/Error.svg"; 

const NoConnection = () => {
   
    const errorTitle = 'No hay conexión';  
    const errorMessage = 'Por favor, revisa tu conexión a Internet'; 
    const navigate = useNavigate();

    return (
        <div className="error-page d-flex flex-column align-items-center justify-content-center text-center">
            <img src={errorImage} alt="Error" className="error-image mb-6" />
            <h1 className="display-1 fw-bold">{errorTitle}</h1>
            <h2 className="mb-3">{errorMessage}</h2>
            <p className="lead mb-4 text-center text-wrap" style={{ maxWidth: '800px' }}>
                Regresa a la página de inicio para reintentar. Estamos trabajando para resolver cualquier inconveniente lo antes posible.
            </p>
            <button
                onClick={() => navigate('/')}
                className="btn btn-primary btn-lg"
            >
                Volver al inicio
            </button>
        </div>
    );
};

export default NoConnection;