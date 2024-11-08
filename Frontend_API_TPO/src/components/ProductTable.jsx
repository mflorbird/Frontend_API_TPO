import React from 'react';
import { Table, Alert } from 'react-bootstrap';
import ProductRow from './ProductRow';

const ProductTable = ({ products, onProductDeleted }) => (
  <div>
    {products.length === 0 ? (
      <Alert variant="info">
        No hay productos disponibles.
      </Alert>
    ) : (
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Modelo</th>
            <th>Categoría</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <ProductRow key={product.id} product={product} onProductDeleted={onProductDeleted} />
          ))}
        </tbody>
      </Table>
    )}
  </div>
);

export default ProductTable;
