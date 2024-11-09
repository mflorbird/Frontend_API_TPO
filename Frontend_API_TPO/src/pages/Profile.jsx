import React from 'react';
import useUserData from '../hooks/useUserData';
import '../styles/profile.css';
import usePedidosFinalizados from '../hooks/usePedidosFinalizados'; 
import {useState} from 'react';


const Perfil = () => {
    const [activeTab, setActiveTab] = useState('tab1'); 
    const pedidos = usePedidosFinalizados(); 
    const { userData, loading, error: userError } = useUserData();
    if (loading) {
        return <p>Cargando datos...</p>;
    }
    if (error) {
        return <p>Error al obtener los datos: {userError.message}</p>;
    }
    if (!userData) {
        return <p>No se encontró el usuario.</p>;
    }



    return (
        <div className="perfil-container">
            <h1>Hola {userData.nombre}</h1>
            <div className="perfil-tabs">
                <button className={activeTab === "datos" ? "active" : ""} onClick={() => setActiveTab("datos")}>
                Mis datos
                </button>
                <button className={activeTab === "pedidos" ? "active" : ""} onClick={() => setActiveTab("pedidos")}>
                Mis pedidos
                </button>
                <button className={activeTab === "favoritos" ? "active" : ""} onClick={() => setActiveTab("favoritos")}>
                Mis favoritos
                </button>
            </div>

           <div className="perfil-content">
            {activeTab === "datos" && (
                <div>
                    <h2>Mis datos</h2>
                    <div className="perfil-form">
                    {/* Contenido de Mis datos */}
                    <div className="form-group">
                        <label>Nombre</label>
                        <input type="text" value={userData.nombre} disabled />
                    </div>
                    <div className="form-group">
                        <label>Apellido</label>
                        <input type="text" value={userData.apellido} disabled />
                    </div>
                    <div className="form-group">
                        <label>Correo electrónico</label>
                        <input type="email" value={userData.email} disabled />
                    </div>
                    <div className="form-group">
                        <label>Usuario</label>
                        <input type="text" value={userData.username} disabled />
                    </div>
                    </div>
                </div>
                )}

                {activeTab === "pedidos" && (
                    <div>
                        <h2>Mis Pedidos Finalizados</h2>
                        {pedidos.length > 0 ? (
                        pedidos.map((pedido, index) => (
                            <div key={index} className="pedido-card">
                            <p>Fecha de compra: {pedido.fechaCompra}</p>
                            <div className="pedido-content">
                                <img src="check-verde.png" alt="Check Verde" className="pedido-check" />
                                <div className="pedido-detalle">
                                <p>{pedido.detalle}</p>
                                </div>
                                <p className="pedido-total">Total: ${pedido.total}</p>
                            </div>
                            </div>
                        ))
                        ) : (
                        <p>No tienes pedidos finalizados.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
    };

    export default Perfil;