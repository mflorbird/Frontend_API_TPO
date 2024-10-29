import React from 'react';
import { Button } from 'react-bootstrap';

const ProductManagementHeader = () => (
  <div className="d-flex justify-content-between align-items-center mb-4">
    <h2>Gestión de Productos</h2>
    <Button variant="primary">Crear producto</Button>
  </div>
);

export default ProductManagementHeader;
