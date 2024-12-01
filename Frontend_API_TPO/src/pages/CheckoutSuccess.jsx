import React from "react";
import "../styles/Error.css"; 
import successImage from "../assets/Checkout.svg"; 
import { useNavigate } from 'react-router-dom';

const CheckoutSuccess = () => {
    const navigate = useNavigate();

    return (
        <div className="error-page d-flex flex-column align-items-center justify-content-center text-center">
            <img src={successImage} alt="Error" className="error-image mb-6" />
            <h1 className="display-1 fw-bold">¡Gracias por tu compra!</h1>
            <h2 className="mb-3">Tu pedido ha sido procesado y pronto estará en camino</h2>
            <p className="lead mb-4 text-center text-wrap" style={{ maxWidth: '800px' }}>
            Para continuar, puedes regresar a la página de inicio y seguir explorando. Si deseas ver el detalle de tu pedido, dirígete a la sección de 'Mis pedidos' en tu perfil.
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

export default CheckoutSuccess;




