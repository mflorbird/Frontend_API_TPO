import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ProductTable from '../components/ProductTable';
import Search from '../components/Search';
import { Button } from 'react-bootstrap';
import { AppContext } from '../context/AppContext';
import '../styles/ProductManagementPage.css';
import { useLocation } from 'react-router-dom';

const ProductManagementPage = () => {
  const navigate = useNavigate();
  const { getProductList } = useContext(AppContext); 
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]); 
  const [filteredProducts, setFilteredProducts] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 


  
  const location = useLocation();
  const [successMessage, setSuccessMessage] = useState(location.state?.successMessage || '');

  useEffect(() => {
    if (successMessage) {
      // BORRA EL MENSAJE LUEGO DE 3 SEGUNDOS
      const timer = setTimeout(() => setSuccessMessage(''), 3000);
      
      // BORRA EL STATE DEL NAVEGADOR PARA QUE NO SIGA APARECIENDO EL MENSAJE CUANDO RECARGO O VUELVO ATRÁS
      navigate(location.pathname, { replace: true, state: null });
      
      return () => clearTimeout(timer); 
    }
  }, [successMessage, navigate, location.pathname]);
  

  const fetchProducts = async () => {
    try {
      const productList = await getProductList();
      setProducts(productList);
      setFilteredProducts(productList);
    } catch (error) {
      setError('No podemos cargar tus productos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [getProductList]);

  const handleAddProduct = () => {
    navigate('/add-product');
  };

  const handleSearchClick = () => {
    const filtered = products.filter((product) =>
      product.model.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const onProductDeleted = () => {
    fetchProducts();
    setSuccessMessage('El producto se eliminó correctamente.');
    setTimeout(() => setSuccessMessage(''), 3000);
  }



  return (
    <div className="product-management">
      <Navbar />
      <h2>Mis productos</h2>

      <p className="description">Aquí podrás agregar, modificar y eliminar los productos de tu tienda.</p>
      

      <div className="search-container">
        <Search  onSearch={setSearchTerm} onSearchClick={handleSearchClick} />
        <Button onClick={handleAddProduct} variant="primary" className="add-product-button">
          Agregar producto
        </Button>
      </div>


      <div>
      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}
      </div>


      {loading ? (
        <p>Cargando productos...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ProductTable products={filteredProducts} onProductDeleted={onProductDeleted} />
      )}
    </div>
  );
};

export default ProductManagementPage;
