import React from 'react';
import useUserData from '../hooks/useUserData';
import '../styles/profile.css';

const Perfil = () => {
  const { userData, loading, error } = useUserData();

  if (loading) {
    return <p>Cargando datos...</p>;
  }

  if (error) {
    return <p>Error al obtener los datos: {error}</p>;
  }

  if (!userData) {
    return <p>No se encontró el usuario.</p>;
  }

    /* const [isEditing, setIsEditing] = useState(false); // Estado para modo de edición */

    //  para manejar el cambio de estado edicion
    // const handleEditClick = () => {
    //     setIsEditing(true);
    // };

    // const handleSave = () => {
    //     // Lógica para guardar los datos
    //     alert("Datos guardados exitosamente");
    //     setIsEditing(false); // para volver a lectura
    // };

    // const handleEditToggle = () => {
    //     setIsEditing(!isEditing); // alternar el modo de edición
    // };

    return (
        <div className="perfil-container">
            <h1>Hola {userData.nombre}</h1>
            <div className="perfil-tabs">
                <button className="active">Mis datos</button>
                <button>Mis pedidos</button>
                <button>Mis favoritos</button>
            </div>
            <div className="perfil-content">
                <h2>Mis datos</h2>
                {/* <p>Modificá tus datos personales a continuación para que tu cuenta esté actualizada.</p> */}
                
                {/* para habilitar la edicion
                <button className="edit-toggle-button" onClick={handleEditToggle}>
                    {isEditing ? "Cancelar" : "Modificar datos"}
                </button> */}
                
                <div className="perfil-form">
                    
                    <div className="form-group">
                        <label>Nombre</label>
                        <input
                            type="text"
                            value={userData.nombre}
                            disabled
                        />
                    </div>
                    <div className="form-group">
                        <label>Apellido</label>
                        <input
                            type="text"
                            value={userData.apellido}
                            disabled
                        />
                    </div>
                    <div className="form-group">
                        <label>Correo electrónico</label>
                        <input
                            type="email"
                            value={userData.email}
                            disabled
                        />
                    </div>
                    <div className="form-group">
                        <label>Usuario</label>
                        <input
                            type="text"
                            value={userData.username}
                            disabled
                        />
                    </div>
{/*                  
                    {isEditing && (
                        <button className="save-button" onClick={handleSave}>Guardar datos</button>
                    )} */}
                </div>
            </div>
        </div>
    );
};

export default Perfil;
