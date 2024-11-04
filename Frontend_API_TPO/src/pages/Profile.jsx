import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/profile.css';

function Profile() {
  return (
    <div>
      <Navbar />
      <main className="profile-container">
        <h1 className="profile-header">Mi Perfil</h1>
        <form className="profile-form">
          <div className="form-group">
            <label>Nombre</label>
            <input type="text" />
          </div>
          <div className="form-group">
            <label>Apellido</label>
            <input type="text" />
          </div>
          <div className="form-group">
            <label>Correo Electrónico</label>
            <input type="email" />
          </div>
          <div className="form-group">
            <label>Nombre de Usuario</label>
            <input type="text" />
          </div>
          <div className="form-group">
            <label>Fecha de Nacimiento</label>
            <input type="date" />
          </div>
          <div className="form-group">
            <label>Contraseña</label>
            <input type="password" />
          </div>
          <div className="form-group">
            <label>Confirmar Contraseña</label>
            <input type="password" />
          </div>
          <button className="profile-btn">Guardar Cambios</button>
        </form>
      </main>
      <Footer />
    </div>
  );
}

export default Profile;
