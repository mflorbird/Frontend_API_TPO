// import React, { useState, useEffect, useContext } from 'react';
// import { Container, Row, Col, Form, Button } from 'react-bootstrap';
// import '../styles/checkout.css';
// import { useNavigate } from 'react-router-dom';
// import { AppContext } from '../context/AppContext';
// import OrderSummary from '../components/OrderSummary';


// const Checkout = () => {
//   const navigate = useNavigate(); 
//   const { user, cart } = useContext(AppContext);
//   const [discountCode, setDiscountCode] = useState('');
//   useEffect(() => {
//     if (!user || !cart) {
//         navigate('/error');
//     }
// }, [user, cart, navigate]);

//   const [formData, setFormData] = useState({
//     nombre: '',
//     apellido: '',
//     cuitDni: '',
//     provincia: '',
//     codigoPostal: '',
//     email: '',
//   });


//   const [errors, setErrors] = useState('');
//   const [loading, setLoading] = useState(true); 
//   const [error, setError] = useState(null);      
//   const [shippingData, setShippingData] = useState({});

//   useEffect(() => {
//     if (user) {
//       setFormData({
//         nombre: user.nombre || '',
//         apellido: user.apellido || '',
//         cuitDni: '',
//         provincia: '',
//         codigoPostal: '',
//         email: user.email || '',
//       });
//       setLoading(false);  
//     } else {
//       setError('No se encontró el usuario.');
//       setLoading(false);  
//     }
//   }, [user]);


//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
  
//     if (value && errors[name]) {
//       setErrors((prevErrors) => {
//         const updatedErrors = { ...prevErrors };
//         delete updatedErrors[name];
//         return updatedErrors;
//       });
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     Object.keys(formData).forEach((field) => {
//       if (field !== 'nombre' && field !== 'apellido' && field !== 'email' && !formData[field]) {
//         newErrors[field] = '*Obligatorio';
//       }
//     });

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0; 
//   };

  
//   const saveShippingData = async () => {
//     try {
//       if (!user ) throw new Error("Falta el usuario");
      
//       // saco de aca el setcartitems
//       const shippingDataToSave = {
//         ...formData,
//         userId: user.id,
//       };

//       // aca dsp si llegamos guardamos los datos.
//       setShippingData(shippingDataToSave);
//     } catch (error) {
//       console.error("Error al guardar los datos de envío:", error);
//     }
//   };

//   const handleCheckout = async (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       await saveShippingData(); 
//       console.log("Redirigiendo a FinalizarCompra..."); //  esto para verificar el flujo
//       navigate('/finalizarCompra');
//     }
//   };
 
//   return (
//     <Container fluid className="checkout-container">
//       <ul className="progress-steps">
//         <li className="step completed">Paso 1: Completa tu carrito</li>
//         <li className="step completed">Paso 2: Datos de Envío</li>
//         <li className="step current">Paso 3: Detalle de Facturación</li>
//         <li className="step pending">Paso 4: Realizar Pago</li>
//       </ul>

//       <div className="Checkout-body">
//         <Form onSubmit={handleCheckout}>
//           <Row>
//             {/* Columna izquierda: Detalles de Facturación */}
//             <Col md={6} className="p-5">
//               <h2>Detalles de Facturación</h2>
//               <Row>
//                 <Col md={6}>
//                   <Form.Group controlId="nombre">
//                     <Form.Label>Nombre</Form.Label>
//                     <Form.Control
//                       type="text"
//                       name="nombre"
//                       value={formData.nombre}
//                       onChange={handleChange}
//                       className={errors.nombre ? 'input-error' : ''}
//                     />
//                     {errors.nombre && <div className="error-text">{errors.nombre}</div>}
//                   </Form.Group>
//                 </Col>
//                 <Col md={6}>
//                   <Form.Group controlId="apellido">
//                     <Form.Label>Apellido</Form.Label>
//                     <Form.Control
//                       type="text"
//                       name="apellido"
//                       value={formData.apellido}
//                       onChange={handleChange}
//                       className={errors.apellido ? 'input-error' : ''}
//                     />
//                     {errors.apellido && <div className="error-text">{errors.apellido}</div>}
//                   </Form.Group>
//                 </Col>
//               </Row>

//               <Form.Group controlId="cuitDni">
//                 <Form.Label>CUIT/DNI</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="cuitDni"
//                   value={formData.cuitDni}
//                   onChange={handleChange}
//                   placeholder="Ej: 18.625.111"
//                   className={errors.cuitDni ? 'input-error' : ''}
//                 />
//                 {errors.cuitDni && <div className="error-text">{errors.cuitDni}</div>}
//               </Form.Group>

//               <Form.Group controlId="provincia">
//                 <Form.Label>Provincia</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="provincia"
//                   value={formData.provincia}
//                   onChange={handleChange}
//                   placeholder="Ej: Buenos Aires"
//                   className={errors.provincia ? 'input-error' : ''}
//                 />
//                 {errors.provincia && <div className="error-text">{errors.provincia}</div>}
//               </Form.Group>

//               <Form.Group controlId="codigoPostal">
//                 <Form.Label>Código Postal</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="codigoPostal"
//                   value={formData.codigoPostal}
//                   onChange={handleChange}
//                   placeholder="Ej: 1607"
//                   className={errors.codigoPostal ? 'input-error' : ''}
//                 />
//                 {errors.codigoPostal && <div className="error-text">{errors.codigoPostal}</div>}
//               </Form.Group>

//               <Form.Group controlId="email">
//                 <Form.Label>Correo Electrónico</Form.Label>
//                 <Form.Control
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className={errors.email ? 'input-error' : ''}
//                 />
//                 {errors.email && <div className="error-text">{errors.email}</div>}
//               </Form.Group>
//             </Col>

//             {/* Columna derecha: Tu Pedido */}
//             <Col md={6} className="p-5 bg-light">
              
//               <div className="order-summary-container">
//               <OrderSummary subtotal={cart.precioTotal} discountAmount={cart.discount} totalAmount={cart.precioDiscount} />
//               </div>

//               <Button variant="secondary" className="mt-3" onClick={() => navigate('/Cart')}>
//                 Modificar Pedido
//               </Button>

//               <p></p>
              
//               <Button variant="primary" type="submit" className="mt-3">
//                 Continuar a Finalizar Compra
//               </Button>
//             </Col>
//           </Row>
//         </Form>
//       </div>
//     </Container>
//   );
// };

// export default Checkout;

import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Button } from 'react-bootstrap';
import '../styles/checkout.css';
import '../styles/Stepper.css';
import BootstrapStepper from '../components/Stepper';
import OrderSummary from '../components/OrderSummary';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, setBillingDetails } = useContext(AppContext);
  const [billingDetails, setLocalBillingDetails] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [errors, setErrors] = useState({});
  const steps = [
    "Completa tu carrito",
    "Datos de envío",
    "Detalle de facturación",
    "Realizar pago",
  ];

  useEffect(() => {
    // Verificar si todos los campos requeridos están llenos
    const isValid = Object.values(billingDetails).every(field => field.trim() !== '');
    setIsFormValid(isValid);
  }, [billingDetails]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalBillingDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Limpiar los errores cuando el campo se completa
    if (value && errors[name]) {
      setErrors((prevErrors) => {
        const updatedErrors = { ...prevErrors };
        delete updatedErrors[name];
        return updatedErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(billingDetails).forEach((field) => {
      if (!billingDetails[field].trim()) {
        newErrors[field] = 'Este campo es obligatorio';
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Verifica si no hay errores
  };

  const saveBillingDetails = async () => {
    try {
      // Si hay errores, no guarda los datos
      if (!validateForm()) {
        return;
      }
      setBillingDetails(billingDetails);
    } catch (error) {
      console.error("Error al guardar los detalles de facturación:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      await saveBillingDetails();
      navigate('/finalizarCompra');
    }
  };

  return (
    <div className="checkout-container">
      <div className="checkout-container-body">
        <h1 className='mt-4 mb-4'>Detalle de facturación</h1>
        
        {/* Stepper */}
        <BootstrapStepper steps={steps} currentStep={2} />

        <div className="checkout-content">
          {/* Formulario de Facturación */}
          <div className="checkout-items">
            <h3 className='mb-4'>Completa la información de facturación</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Nombre Completo</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={billingDetails.name}
                  onChange={handleInputChange}
                  required
                  className={errors.name ? 'input-error' : ''}
                />
                {errors.name && <div className="error-text">{errors.name}</div>}
              </div>
              <div className="form-group">
                <label htmlFor="address">Dirección</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={billingDetails.address}
                  onChange={handleInputChange}
                  required
                  className={errors.address ? 'input-error' : ''}
                />
                {errors.address && <div className="error-text">{errors.address}</div>}
              </div>
              <div className="form-group">
                <label htmlFor="phone">Teléfono</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={billingDetails.phone}
                  onChange={handleInputChange}
                  required
                  className={errors.phone ? 'input-error' : ''}
                />
                {errors.phone && <div className="error-text">{errors.phone}</div>}
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={billingDetails.email}
                  onChange={handleInputChange}
                  required
                  className={errors.email ? 'input-error' : ''}
                />
                {errors.email && <div className="error-text">{errors.email}</div>}
              </div>
            </form>
          </div>

          {/* Resumen de Compra */}
          <div className="cart-summary">
            <OrderSummary
              subtotal={cart?.precioTotal || 0}
              discountAmount={cart?.discount || 0}
              totalAmount={cart?.precioDiscount || 0}
            />

            {/* Botón dentro del contenedor de resumen de compra */}
            <Button
              className="checkout-next-btn mt-4"
              onClick={handleSubmit}
              disabled={!isFormValid || !cart || !cart.items}
            >
              Continuar al pago
            </Button>

            <div className="d-flex align-items-center justify-content-center mt-4">
              <div className="line" style={{ flex: 1, height: '1px', backgroundColor: '#ccc' }}></div>
              <div className="px-3">¿Querés modificar tu pedido?</div>
              <div className="line" style={{ flex: 1, height: '1px', backgroundColor: '#ccc' }}></div>
            </div>

            <Button 
              variant="outline-secondary" 
              className="mt-4 mb-1 full-width-button1 .custom-outline-button" 
              onClick={() => navigate('/cart')}
            >
              Modificar Pedido
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
