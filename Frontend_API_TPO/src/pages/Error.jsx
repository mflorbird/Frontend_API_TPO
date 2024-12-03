import { useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import "../styles/Error.css";
import errorImage from "../assets/Error.svg";
import {useContext, useEffect} from "react";

const Error = () => {
    const { logout } = useContext(AppContext);
    const location = useLocation();
    const params = new URLSearchParams(location.search);


    useEffect(() => {
        if (errorTitle === "401") {
            logout();
        }
    }
    , [errorTitle, logout]);


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




