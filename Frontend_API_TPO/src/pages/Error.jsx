import { useNavigate } from 'react-router-dom';

const Error = () => {
    const navigate = useNavigate();

    return (
        <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
            <div className="text-center">
                <h1 className="display-1 fw-bold">404</h1>
                <h2 className="mb-4">Página no encontrada</h2>
                <p className="lead mb-4">
                    Lo sentimos, la página que estás buscando no existe o ha sido movida.
                </p>
                <button
                    onClick={() => navigate('/')}
                    className="btn btn-primary btn-lg"
                >
                    Volver al inicio
                </button>
            </div>
        </div>
    );
};

export default Error;