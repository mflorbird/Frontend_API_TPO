import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home.jsx'; 
import Cart from '../pages/Cart.jsx'; 
import Login from '../pages/LoginPage.jsx'; 
import Register from '../pages/Registro.jsx'; 
import MainLayout from '../layouts/MainLayout.jsx';
import SimpleLayout from '../layouts/SimpleLayout.jsx';

const AppRoutes = () => {
  return (
    <Routes>
      
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
      </Route>

      <Route element={<SimpleLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* agregar mas rutas*/}
    </Routes>
  );
};

export default AppRoutes;
