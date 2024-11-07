import React from 'react';
import ProductForm from '../components/ProductForm';
import BackButton from '../components/BackButton';
import '../styles/ProductManagementPage.css';
import { Button } from 'react-bootstrap';

const AddProductPage = () => (
  <div className="container mt-5">
    <BackButton text="Volver al inicio" />
    <h2>Agregar producto</h2>
    <p>Completa la siguiente información para agregar un producto a tu tienda.</p>
    <ProductForm />
    <Button variant="primary" type="submit" className="mt-5 float-end">
        Agregar modelo
    </Button>
  </div>
);

export default AddProductPage;
