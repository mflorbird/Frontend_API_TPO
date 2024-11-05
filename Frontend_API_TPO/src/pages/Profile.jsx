import React, { useState } from 'react';
import '../styles/profile.css';
import { AppContext } from '../context/AppContext';

const Perfil = () => {
    const [nombre, setNombre] = useState("José");
    const [apellido, setApellido] = useState("Perez");
    const [correo, setCorreo] = useState("nombre@dominio.com");
    const [usuario, setUsuario] = useState("user123");
    const [fechaNacimiento, setFechaNacimiento] = useState("13/03/1995");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isEditing, setIsEditing] = useState(false); // Estado para modo de edición

    //  para manejar el cambio de estado edicion
    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        // Lógica para guardar los datos
        alert("Datos guardados exitosamente");
        setIsEditing(false); // para volver a lectura
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing); // alternar el modo de edición
    };

    return (
        <div className="perfil-container">
            <h1>Hola {nombre}</h1>
            <div className="perfil-tabs">
                <button className="active">Mis datos</button>
                {!isEditing && (
                    <button onClick={handleEditClick}>Modificar datos</button>
                )}
                <button>Mis pedidos</button>
                <button>Mis favoritos</button>
            </div>
            <div className="perfil-content">
                <h2>Mis datos</h2>
                <p>Modificá tus datos personales a continuación para que tu cuenta esté actualizada.</p>
                
                {/* para habilitar la edicion */}
                <button className="edit-toggle-button" onClick={handleEditToggle}>
                    {isEditing ? "Cancelar" : "Modificar datos"}
                </button>
                
                <div className="perfil-form">
                    
                    <div className="form-group">
                        <label>Nombre</label>
                        <input
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            disabled={!isEditing}
                        />
                    </div>
                    <div className="form-group">
                        <label>Apellido</label>
                        <input
                            type="text"
                            value={apellido}
                            onChange={(e) => setApellido(e.target.value)}
                            disabled={!isEditing}
                        />
                    </div>
                    <div className="form-group">
                        <label>Correo electrónico</label>
                        <input
                            type="email"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                            disabled={!isEditing}
                        />
                    </div>
                    <div className="form-group">
                        <label>Usuario</label>
                        <input
                            type="text"
                            value={usuario}
                            onChange={(e) => setUsuario(e.target.value)}
                            disabled={!isEditing}
                        />
                    </div>
                    <div className="form-group">
                        <label>Fecha de nacimiento</label>
                        <input
                            type="date"
                            value={fechaNacimiento}
                            onChange={(e) => setFechaNacimiento(e.target.value)}
                            disabled={!isEditing}
                        />
                    </div>
                    <h3>Contraseña</h3>
                    <div className="form-group">
                        <label>Contraseña</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={!isEditing}
                        />
                    </div>
                    <div className="form-group">
                        <label>Confirmar contraseña</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            disabled={!isEditing}
                        />
                    </div>

                    {isEditing && (
                        <button className="save-button" onClick={handleSave}>Guardar datos</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Perfil;
