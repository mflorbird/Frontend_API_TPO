import { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; 
import ProductForm from '../components/ProductForm';
import BackButton from '../components/BackButton';
import { Button } from 'react-bootstrap';
import { AppContext } from '../context/AppContext';
import {catalogService} from '../services/catalogService';
import { productService } from '../services/productService';
import '../styles/ProductManagementPage.css';

const AddProductPage = () => {
  const { error } = useContext(AppContext);
  const [formValues, setFormValues] = useState({
    model: '',
    category: '',
    description: '',
    price: '',
    stockTotal: [],
    featured: false,
  });

  const [image, setImage] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false); 

  const location = useLocation();
  const navigate = useNavigate();

  

  
  const productId = new URLSearchParams(location.search).get('productId'); 

  useEffect(() => {
    if (productId) {
      setIsEditMode(true);
      catalogService.getProductById(productId)
        .then((product) => {
          setFormValues({
            model: product.model,
            category: product.category,
            description: product.description,
            price: product.price,
            stockTotal: product.stockTotal,
            featured: product.featured,
          });
          setImage(product.image);
        })
        .catch((error) => console.error('Error al obtener el producto:', error));
    }
  }, [productId]);

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

  const isFormValid = () => {
    return formValues.model && formValues.category && formValues.description && formValues.price && formValues.featured && formValues.stockTotal.length > 0 && image;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = {
      ...formValues,
      image: image, 
    };

    try {
      if (isEditMode) {
        productData.id = productId;
        await productService.saveProduct(productData);
        console.log('Se actualizó el producto con éxito.');
        navigate('/product-management', { state: { successMessage: 'El producto se actualizó correctamente.' } });
      } else {
        await productService.saveProduct(productData);
        console.log('Se agregó un nuevo producto.');
        navigate('/product-management', { state: { successMessage: 'El producto se agregó correctamente.' } });
      }
    } catch (error) {
      console.error('No se pudo guardar el producto', error);
      navigate('/product-management', { state: { errorMessage: 'El producto se agregó correctamente.' } });
    }
  };


  

  return (
    <div className="container mt-5">
      <BackButton text="Volver al inicio" />
      <h2>{isEditMode ? 'Editar producto' : 'Agregar producto'}</h2>
      <p>{isEditMode ? 'Modifica los detalles del producto.' : 'Completa la siguiente información para agregar un producto a tu tienda.'}</p>
      <ProductForm
        formValues={formValues}
        image={image}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        handleStockChange={handleStockChange} 
      />

      <div className="d-flex justify-content-end mt-4">
        <Button 
          variant="primary" 
          onClick={handleSubmit} 
          disabled={!isFormValid()}
        >
          {isEditMode ? 'Guardar cambios' : 'Agregar producto'} 
        </Button>
      </div>

      {error && <p className="text-danger mt-3">Hubo un error al agregar o actualizar el producto.</p>}
    </div>
  );
};

export default AddProductPage;
