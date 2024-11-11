import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home.jsx'; 
import Cart from '../pages/Cart.jsx'; 
import CartEmpty from '../pages/CartEmpty.jsx';
import Login from '../pages/LoginPage.jsx'; 
import Register from '../pages/Registro.jsx'; 
import MainLayout from '../layouts/MainLayout.jsx';
import SimpleLayout from '../layouts/SimpleLayout.jsx';
import Checkout from '../pages/Checkout.jsx';
import Profile from '../pages/Profile';
import FinalizarCompra from '../pages/FinalizarCompra.jsx';
import ProductManagementPage from '../pages/ProductManagementPage.jsx';
import AppProvider from '../context/AppContext.jsx';
import CartEnvio from '../pages/CartEnvio.jsx';
import About from '../pages/About.jsx';
import AddProductPage from '../pages/AddProductPage'; 
import TermsAndConditions from '../pages/TermsAndConditions.jsx';
import PrivacyPolicy from '../pages/PrivacyPolicy.jsx';
import Contact from '../pages/Contact.jsx';
import ProductDetail from '../pages/ProductDetail.jsx';
import Error from '../pages/Error.jsx';
import CategoriaPage from "../pages/CategoriaPage.jsx";
import FAQ from '../pages/FAQ.jsx';

// import AddProductPage from '../pages/AddProductPage.jsx';


const AppRoutes = () => {
  return (

    <AppProvider>
      <Routes>
        
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/cartEmpty" element={<CartEmpty />} />
          <Route path="/cartEnvio" element={<CartEnvio />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/finalizarCompra" element={<FinalizarCompra />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/product-management" element={<ProductManagementPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/terminos-y-condiciones" element={<TermsAndConditions />} />
          <Route path="/politicas-de-privacidad" element={<PrivacyPolicy />} />
          <Route path="/contacto" element={<Contact/>} />
          <Route path="/producto/:id" element={<ProductDetail />} />
          <Route path="/categoria/:categoria" element={<CategoriaPage />} />
          <Route path="/FAQ" element={<FAQ />} />
        </Route>

        <Route element={<SimpleLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-product" element={<AddProductPage />} />
          <Route path="/error" element={<Error />} />
        </Route>
      </Routes>
    </AppProvider>
  );
};

export default AppRoutes;

