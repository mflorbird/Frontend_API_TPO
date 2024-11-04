// para ver 
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home.jsx'; 
import Cart from '../pages/Cart.jsx'; 
import Profile from './pages/Profile';
import Navbar from '../components/Navbar.jsx'; 
import Footer from '../components/Footer.jsx'; 

const AppRoutes = () => {
  return (
    <div>
      <Navbar />
      <div className='main-content'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        {/* agregar mas rutas*/}
      </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default AppRoutes;
