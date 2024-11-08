import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';  // Asegúrate de importar la Navbar
import ProductTable from '../components/ProductTable';
import Search from '../components/Search';
import { Button } from 'react-bootstrap'; 
import '../styles/ProductManagementPage.css';

const ProductManagementPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const products = [
    { id: 1, image: 'https://via.placeholder.com/50', name: 'Producto 1', category: 'Categoría A', description: 'Descripción del producto 1', price: '$100', stock: 20 },
    { id: 2, image: 'https://via.placeholder.com/50', name: 'Producto 2', category: 'Categoría B', description: 'Descripción del producto 2', price: '$150', stock: 15 },
  ];

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProduct = () => {
    navigate('/add-product')
  }

  return (
    <div className="product-management">
      {/* Reemplazar ProductManagementHeader por Navbar */}
      <Navbar />
      <h1>Gestión de Productos</h1>
      <p className="description">Aquí puedes agregar, modificar y eliminar los productos de tu tienda.</p>
      <div className="search-container">
        <Search onSearch={setSearchTerm} />
        <Button onClick={handleAddProduct} variant="primary" className="add-product-button">
          Agregar producto
        </Button>
      </div>
      <ProductTable products={filteredProducts} />
    </div>
  );
};

export default ProductManagementPage;
