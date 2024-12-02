// import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { CSSTransition } from "react-transition-group";
// import "../styles/NoConnection.css";

// function NoConnection() {
//     const [backendStatus, setBackendStatus] = useState(null);
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();

//     const checkBackendConnection = async () => {
//         setLoading(true);
//         try {
//             const response = await axios.get("http://localhost:8080/status");
//             setBackendStatus(response.data.message || "Conexión exitosa");
//             setError(null);
//             setTimeout(() => navigate("/"), 2000); // Redirección después de 2 segundos
//         } catch (err) {
//             setBackendStatus(null);
//             setError(
//                 err.response
//                     ? `Error: ${err.response.status} - ${err.response.data.message}`
//                     : "No se pudo conectar al backend"
//             );
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="container vh-100 d-flex justify-content-center align-items-center bg-light">
//             <div className="text-center p-4 border rounded bg-white shadow">
//                 <h1 className="mb-4">Prueba de Conexión al Backend</h1>
//                 <button
//                     className="btn btn-primary mb-3"
//                     onClick={checkBackendConnection}
//                     disabled={loading}
//                 >
//                     {loading ? "Verificando..." : "Probar Conexión"}
//                 </button>
//                 <CSSTransition
//                     in={!!backendStatus}
//                     timeout={300}
//                     classNames="fade"
//                     unmountOnExit
//                 >
//                     <div className="alert alert-success" role="alert">
//                         {backendStatus}
//                     </div>
//                 </CSSTransition>
//                 <CSSTransition
//                     in={!!error}
//                     timeout={300}
//                     classNames="fade"
//                     unmountOnExit
//                 >
//                     <div className="alert alert-danger" role="alert">
//                         {error}
//                     </div>
//                 </CSSTransition>
//             </div>
//         </div>
//     );
// }

// export default NoConnection;


