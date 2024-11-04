import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home.jsx'; 
import Cart from '../pages/Cart.jsx'; 
import Profile from './pages/Profile';
import CartEmpty from '../pages/CartEmpty.jsx';
import Login from '../pages/LoginPage.jsx'; 
import Register from '../pages/Registro.jsx'; 
import MainLayout from '../layouts/MainLayout.jsx';
import SimpleLayout from '../layouts/SimpleLayout.jsx';
import Checkout from '../pages/Checkout.jsx';

import FinalizarCompra from '../pages/FinalizarCompra.jsx';

import ProductManagementPage from '../pages/ProductManagementPage.jsx';



const AppRoutes = () => {
  return (
    <Routes>
      
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/cartEmpty" element={<CartEmpty />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/finalizarCompra" element={<FinalizarCompra />} />
      </Route>

      <Route element={<SimpleLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

      </Route>

      <Route path="/product-management" element={<ProductManagementPage />} />


      {/* agregar mas rutas*/}
    </Routes>
  );
};

export default AppRoutes;

