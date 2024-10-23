// para ver 
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home.jsx'; 
import Cart from '../pages/Cart.jsx'; 
import Navbar from '../components/Navbar.jsx'; 
import Footer from '../components/Footer.jsx'; 

const AppRoutes = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        {/* agregar mas rutas*/}
      </Routes>
      <Footer />
    </div>
  );
};

export default AppRoutes;
