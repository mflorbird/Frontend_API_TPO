import React from 'react';
import { Form, Alert } from 'react-bootstrap';


const FormField = ({ label, type, name, value, onChange, placeholder, error, options }) => (
 <Form.Group className="mb-3 text-start">
   <Form.Label>{label}</Form.Label>
   {type === 'select' ? (
     <Form.Select
       name={name}
       value={value}
       onChange={onChange}
       className="shadow-sm"
     >
       <option value="" disabled>{placeholder}</option>
       {options && options.map((option, index) => (
         <option key={index} value={option.value}>
           {option.label}
         </option>
       ))}
     </Form.Select>
   ) : (
     <Form.Control
       type={type}
       name={name}
       value={value}
       onChange={onChange}
       placeholder={placeholder}
       className="shadow-sm"
     />
   )}
   {error && <Alert variant="danger">{error}</Alert>}
 </Form.Group>
);


export default FormField;



