// para ver 
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home.jsx'; 
import Cart from '../pages/Cart.jsx'; 
import CartEmpty from '../pages/CartEmpty.jsx';
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
        <Route path="/cartEmpty" element={<CartEmpty />} /> {/*agrego una mas*/}
        {/* agregar mas rutas*/}
      </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default AppRoutes;
