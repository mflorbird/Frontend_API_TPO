import React, { useState } from 'react';
import ProductManagementHeader from '../components/ProductManagementHeader';
import ProductTable from '../components/ProductTable';
import Search from '../components/Search';
import { Button } from 'react-bootstrap'; 
import '../styles/ProductManagementPage.css';

const ProductManagementPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const products = [
    { id: 1, image: 'https://via.placeholder.com/50', name: 'Producto 1', category: 'Categoría A', description: 'Descripción del producto 1', price: '$100', stock: 20 },
    { id: 2, image: 'https://via.placeholder.com/50', name: 'Producto 2', category: 'Categoría B', description: 'Descripción del producto 2', price: '$150', stock: 15 },
  ];

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="product-management">
      <ProductManagementHeader />
      <h1>Gestión de Productos</h1>
      <p className="description">Aquí puedes agregar, modificar y eliminar los productos de tu tienda.</p>
      <div className="search-container">
        <Search onSearch={setSearchTerm} />
        <Button variant="primary" className="add-product-button">
          Agregar producto
        </Button>
      </div>
      <ProductTable products={filteredProducts} />
    </div>
  );
};

export default ProductManagementPage;
