import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { productService } from "../services/productService.js";

const ProductRow = ({ product, onProductDeleted }) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const totalStock = product?.stockTotal?.length > 0
    ? product?.stockTotal?.reduce((acc, stock) => acc + parseInt(stock.stock, 10), 0)
    : 'Sin stock';

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleDeleteProduct = async () => {
    try {
      await productService.deleteProduct(product.id);
      setShowModal(false);
      onProductDeleted();
    } catch (error) {
      console.error('No se pudo eliminar el producto:', error);
    }
  };


  const handleEditProduct = () => {
    navigate(`/add-product?productId=${product.id}`);
  };

  return (
    <>
      <tr>
        <td>
          <img src={product.image} alt={product.model} width="50" height="50" />
        </td>
        <td>{product.model}</td>
        <td>{product.category}</td>
        <td>{product.description}</td>
        <td>${product.price}</td>
        <td>{totalStock}</td>
        <td>
          <Button variant="outline-primary mb-1" onClick={handleEditProduct} style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FaEdit /></Button>
          <Button variant="outline-danger" onClick={handleShowModal} style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FaTrash /></Button>
        </td>
      </tr>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Estás seguro que deseas eliminar el producto "{product.model}"?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDeleteProduct}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProductRow;
