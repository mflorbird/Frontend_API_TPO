import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import FormField from './FormField';
import TextAreaField from './TextAreaField';
import StockInput from './StockInput';


const ProductForm = ({ formValues, handleInputChange, handleImageChange, handleStockChange, image }) => {
 console.log(formValues)
 return (
   <Form className="product-form">
     <h4>Detalle de producto</h4>


     <Form.Group className="mb-3 text-start">
       <Form.Label>Imagen del modelo</Form.Label>
       <div className="image-upload">
         {image ? (
           <img src={image} alt="Preview" className="image-preview mb-3" />
         ) : (
           <div className="placeholder mb-3">No se ha seleccionado imagen</div>
         )}
         <Form.Control
           type="file"
           accept="image/*"
           onChange={handleImageChange}
           className="shadow-sm"
         />
       </div>
     </Form.Group>


     <Row>
       <Col md={6}>
         <FormField
           label="Modelo"
           type="text"
           name="model"
           value={formValues.model}
           onChange={handleInputChange}
           placeholder="Ingresa el nombre del modelo"
         />
       </Col>
       <Col md={6}>
         <FormField
           label="Categoría"
           type="text"
           name="category"
           value={formValues.category}
           onChange={handleInputChange}
           placeholder="Ingresa una categoría"
         />
       </Col>
     </Row>


     <TextAreaField
       label="Descripción"
       name="description"
       value={formValues.description}
       onChange={handleInputChange}
       placeholder="Ingresa una descripción"
     />
    
     <Row className="mt-3 mb-4">
       <Col md={6}>
         <FormField
           label="Precio"
           type="number"
           name="price"
           value={formValues.price}
           onChange={handleInputChange}
           placeholder="Ingresa el precio"
         />
       </Col>
       <Col md={6}>
         <FormField
           label="¿Es un producto destacado?"
           type="select"
           name="featured"
           value={formValues.featured}
           onChange={handleInputChange}
           placeholder="Selecciona una opción"
           options={[
             { value: true, label: 'Sí' },
             { value: false, label: 'No' }
           ]}
         />
       </Col>
     </Row>


     <h4>Stock de producto</h4>
     <StockInput
       stockItems={formValues.stockTotal}
       handleStockChange={handleStockChange} 
     />
   </Form>
 );
};


export default ProductForm;

