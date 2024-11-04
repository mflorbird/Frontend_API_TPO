import React from 'react';
import { Table } from 'react-bootstrap';
import ProductRow from './ProductRow';

const ProductTable = ({ products }) => (
  <Table striped bordered hover responsive>
    <thead>
      <tr>
        <th>Foto</th>
        <th>Nombre</th>
        <th>Categoría</th>
        <th>Descripción</th>
        <th>Precio</th>
        <th>Stock</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      {products.map((product) => (
        <ProductRow key={product.id} product={product} />
      ))}
    </tbody>
  </Table>
);

export default ProductTable;
