import React from 'react';
import { Button } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ProductRow = ({ product }) => (
  <tr>
    <td><img src={product.image} alt={product.name} width="50" /></td>
    <td>{product.name}</td>
    <td>{product.category}</td>
    <td>{product.description}</td>
    <td>{product.price}</td>
    <td>{product.stock}</td>
    <td>
      <Button variant="outline-primary" className="me-2"><FaEdit /></Button>
      <Button variant="outline-danger"><FaTrash /></Button>
    </td>
  </tr>
);

export default ProductRow;
