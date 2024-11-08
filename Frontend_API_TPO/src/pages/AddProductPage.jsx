import React, { useState, useContext } from 'react';
import ProductForm from '../components/ProductForm';
import BackButton from '../components/BackButton';
import { Button } from 'react-bootstrap';
import { AppContext } from '../context/AppContext';
import '../styles/ProductManagementPage.css';

const AddProductPage = () => {
  const { addProduct, error } = useContext(AppContext); 

  const [formValues, setFormValues] = useState({
    model: '',
    category: '',
    description: '',
    price: '',
    stockTotal: []
  });

  const [image, setImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
  
    if (type === 'checkbox') {
      setFormValues({
        ...formValues,
        [name]: checked ? [...formValues[name], value] : formValues[name].filter(item => item !== value),
      });
    } else if (type === 'number') {
      setFormValues({
        ...formValues,
        [name]: parseFloat(value),
      });
    } else {
      setFormValues({
        ...formValues,
        [name]: value,
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      
      reader.onloadend = () => {
        setImage(reader.result); 
      };
      
      reader.readAsDataURL(file);
    }
  };

  const handleStockChange = (value) => {
    setFormValues({
      ...formValues,
      stockTotal: value,  
    });
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = {
      ...formValues,
      image: image, 
    };
    console.log(productData);
    addProduct(productData); 
  };

  return (
    <div className="container mt-5">
      <BackButton text="Volver al inicio" />
      <h2>Agregar producto</h2>
      <p>Completa la siguiente información para agregar un producto a tu tienda.</p>
      <ProductForm
        formValues={formValues}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        handleStockChange={handleStockChange} 
      />

      <div className="d-flex justify-content-end mt-4">
        <Button variant="primary" onClick={handleSubmit}>
          Agregar modelo
        </Button>
      </div>

      {error && <p className="text-danger mt-3">Hubo un error al agregar el producto.</p>}
    </div>
  );
};

export default AddProductPage;
