import React, { useEffect, useState } from 'react';
import '../styles/profile.css';
import { AppContext } from '../context/AppContext';

const Perfil = () => {
    const [userData, setUserData] = useState(null);

    //ver si esto hacemos hook
    useEffect (() => {
      const fetchUserData = async () => {
        try {
          const response = await fetch ('http://localhost:3000/users');
          const data = await response.json();

          //solo el user
          const user=data.find(user => user.role === "user");
          if (user){
            setUserData(user);
          }
        }catch (error){
          console.error("Error al obtener datos:", error);
        }
      };

      fetchUserData();

    }, []);

    if (!userData){
      return <p>Cargando datos...</p>
    }

    /* const [nombre, setNombre] = useState("José");
    const [apellido, setApellido] = useState("Perez");
    const [correo, setCorreo] = useState("nombre@dominio.com");
    const [usuario, setUsuario] = useState("user123");
    const [fechaNacimiento, setFechaNacimiento] = useState("13/03/1995");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isEditing, setIsEditing] = useState(false); // Estado para modo de edición */

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
            <h1>Hola {userData.username}</h1>
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
