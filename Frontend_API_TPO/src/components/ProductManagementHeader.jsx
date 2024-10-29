import React, { useContext } from "react";
import { Dropdown } from 'react-bootstrap';
import userPhoto from '../assets/user-photo.jpeg';
import { AppContext } from '../context/AppContext.jsx';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.svg'; 

const ProductManagementHeader = () => {
  const { user, logout } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <nav className="custom-navbar d-flex justify-content-between align-items-center">
     
      <img src={logo} alt="Logo" className="navbar-logo" />

     
      <div className="navbar-user">
        {user ? (
          <Dropdown>
            <Dropdown.Toggle className="navbar-profile dropdown-toggle-white" id="dropdown-basic">
              <img src={userPhoto} alt="Usuario" className="navbar-user-photo" />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => { logout(); navigate("/login"); }}>
                Cerrar Sesión
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <button onClick={() => navigate("/login")} className="login-button">
            Iniciar Sesión
          </button>
        )}
      </div>
    </nav>
  );
};

export default ProductManagementHeader;
