// import React, { useState } from 'react';
// import FormField from './FormField'; 
// import TextAreaField from './TextAreaField'; 
// import { Form, Button, Row, Col } from 'react-bootstrap';
// import StockInput from './StockInput';

// const ProductForm = () => {
//   const [formValues, setFormValues] = useState({
//     model: '',
//     category: '',
//     description: '',
//     price: '',
//     stockTotal: []
//   });
//   const [image, setImage] = useState(null);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormValues({
//       ...formValues,
//       [name]: value,
//     });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImage(URL.createObjectURL(file));
//     }
//   };


//   return (
//     <Form className="product-form">
//       <h4>Detalle de producto</h4>

//       <Form.Group className="mb-3 text-start">
//         <Form.Label>Imagen del modelo</Form.Label>
//         <div className="image-upload">
//           {image ? (
//             <img src={image} alt="Preview" className="image-preview mb-3" />
//           ) : (
//             <div className="placeholder mb-3">No se ha seleccionado imagen</div>
//           )}
//           <Form.Control 
//             type="file"
//             accept="image/*"
//             onChange={handleImageChange}
//             className="shadow-sm"
//           />
//         </div>
//       </Form.Group>

      
//       <Row>
//         <Col md={6}>
//           <FormField
//             label="Modelo"
//             type="text"
//             name="model"
//             value={formValues.model}
//             onChange={handleInputChange}
//             placeholder="Ingrese el modelo"
//           />
//         </Col>
//         <Col md={6}>
//           <FormField
//             label="Categoría"
//             type="text"
//             name="category"
//             value={formValues.category}
//             onChange={handleInputChange}
//             placeholder="Ingrese la categoría"
//           />
//         </Col>
//       </Row>

//       <TextAreaField
//         label="Descripción"
//         name="description"
//         value={formValues.description}
//         onChange={handleInputChange}
//         placeholder="Ingrese la descripción"
//       />
//    <Row className="mt-3 mb-4">
//         <Col md={6}>
//             <FormField
//             label="Precio"
//             type="number"
//             name="price"
//             value={formValues.price}
//             onChange={handleInputChange}
//             placeholder="Ingrese el precio"
//             />
//          </Col>
//     </Row>

//     <h4>Stock de producto</h4>
//     <StockInput formValues={formValues} handleInputChange={handleInputChange} />
  
//     </Form>
//   );
// };

// export default ProductForm;


import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import FormField from './FormField';
import TextAreaField from './TextAreaField';
import StockInput from './StockInput';

const ProductForm = ({ formValues, handleInputChange, handleImageChange, handleStockChange }) => {
  console.log("sss", formValues)
  return (
    <Form className="product-form">
      <h4>Detalle de producto</h4>

      <Form.Group className="mb-3 text-start">
        <Form.Label>Imagen del modelo</Form.Label>
        <div className="image-upload">
          {formValues.image ? (
            <img src={formValues.image} alt="Preview" className="image-preview mb-3" />
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
            placeholder="Ingrese el modelo"
          />
        </Col>
        <Col md={6}>
          <FormField
            label="Categoría"
            type="text"
            name="category"
            value={formValues.category}
            onChange={handleInputChange}
            placeholder="Ingrese la categoría"
          />
        </Col>
      </Row>

      <TextAreaField
        label="Descripción"
        name="description"
        value={formValues.description}
        onChange={handleInputChange}
        placeholder="Ingrese la descripción"
      />
      
      <Row className="mt-3 mb-4">
        <Col md={6}>
          <FormField
            label="Precio"
            type="number"
            name="price"
            value={formValues.price}
            onChange={handleInputChange}
            placeholder="Ingrese el precio"
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
