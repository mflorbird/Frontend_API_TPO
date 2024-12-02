// import React, { useState, useEffect, useContext } from 'react';
// import { Container, Row, Col, Form, Button } from 'react-bootstrap';
// import '../styles/cartEnvio.css';
// import { useNavigate } from 'react-router-dom';
// import { AppContext } from '../context/AppContext';

// const CartEnvio = () => {
//   const navigate = useNavigate();
//   const { user, cartItems, setCartItems } = useContext(AppContext);
//   const [formData, setFormData] = useState({
//     nombre: '',
//     apellido: '',
//     direccionCalle: '',
//     direccionNumero: '',
//     direccionPisoDepto: '',
//     localidad: '',
//     provincia: '',
//     codigoPostal: '',
//     telefono: '',
//     notaPedido: '',
//   });

//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(true); 
//   const [error, setError] = useState(null);     


//   useEffect(() => {
//     if (user) {
//       setFormData({
//         nombre: user.nombre || '',
//         apellido: user.apellido || '',
//         direccionCalle: '',
//         direccionNumero: '',
//         direccionPisoDepto: '',
//         localidad: '',
//         provincia: '',
//         codigoPostal: '',
//         telefono: '',
//         notaPedido: '',
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
//       if (field !== 'direccionPisoDepto' && field !== 'notaPedido' && field !== 'nombre' && field !== 'apellido' && !formData[field]) {
//         newErrors[field] = '*Obligatorio';
//       }
//     });

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const saveShippingData = async () => {
//     try {
//       if (!user) throw new Error("Falta el ID de usuario.");
//       setCartItems((prevCarrito) => ({
//         ...prevCarrito,
//         envio: formData,
//       }));
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleCartEnvio = async (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       await saveShippingData(); 
//       navigate('/Checkout');
//     }
//   };

//   if (loading) {
//     return <p>Cargando datos...</p>;
//   }
//   if (error) {
//     return <p>Error al obtener los datos: {error}</p>;
//   }
//   if (!user) {
//     return <p>No se encontró el usuario.</p>;
//   }

//   return (
//     <Container fluid className="cartEnvio-container">
//       <ul className="progress-steps">
//         <li className="step completed">Paso 1: Completa tu carrito</li>
//         <li className="step current">Paso 2: Datos de Envío</li>
//         <li className="step pending">Paso 3: Detalle de Facturación</li>
//         <li className="step pending">Paso 4: Realizar Pago</li>
//       </ul>

//       <div className="CartEnvio-body">
//         <Button variant="secondary" className=" mt-4 full-width-button1" onClick={() => navigate('/cart')}>
//           Modificar Pedido
//         </Button>

//         <div className='FormDatos'>
//           <h2>Datos de Envío</h2>
//           <Form onSubmit={handleCartEnvio}>
//             <Row>
//               <Col md={6}>
//                 <Form.Group controlId="nombre">
//                   <Form.Label>Nombre</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="nombre"
//                     value={user ? user.nombre : formData.nombre}
//                     onChange={handleChange}
//                     className={errors.nombre ? 'input-error' : ''}
//                     readOnly
//                   />
//                   {errors.nombre && <div className="error-text">{errors.nombre}</div>}
//                 </Form.Group>
//               </Col>
//               <Col md={6}>
//                 <Form.Group controlId="apellido">
//                   <Form.Label>Apellido</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="apellido"
//                     value={user ? user.apellido : formData.apellido}
//                     onChange={handleChange}
//                     className={errors.apellido ? 'input-error' : ''}
//                     readOnly
//                   />
//                   {errors.apellido && <div className="error-text">{errors.apellido}</div>}
//                 </Form.Group>
//               </Col>
//             </Row>

           

//             <Form.Group controlId="direccionCalle">
//               <Form.Label>Dirección - Calle</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="direccionCalle"
//                 value={formData.direccionCalle}
//                 onChange={handleChange}
//                 placeholder="Ej: Habana"
//                 className={errors.direccionCalle ? 'input-error' : ''}
//                 required
//               />
//               {errors.direccionCalle && <div className="error-text">{errors.direccionCalle}</div>}
//             </Form.Group>

//             <Row>
//               <Col md={4}>
//                 <Form.Group controlId="direccionNumero">
//                   <Form.Label>Número</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="direccionNumero"
//                     value={formData.direccionNumero}
//                     onChange={handleChange}
//                     placeholder="Ej: 4310"
//                     className={errors.direccionNumero ? 'input-error' : ''}
//                     required
//                   />
//                   {errors.direccionNumero && <div className="error-text">{errors.direccionNumero}</div>}
//                 </Form.Group>
//               </Col>
//               <Col md={4}>
//                 <Form.Group controlId="direccionPisoDepto">
//                   <Form.Label>Piso/Depto</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="direccionPisoDepto"
//                     value={formData.direccionPisoDepto}
//                     onChange={handleChange}
//                   />
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Form.Group controlId="localidad">
//               <Form.Label>Localidad</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="localidad"
//                 value={formData.localidad}
//                 onChange={handleChange}
//                 placeholder="Ej: Capital Federal"
//                 className={errors.localidad ? 'input-error' : ''}
//                 required
//               />
//               {errors.localidad && <div className="error-text">{errors.localidad}</div>}
//             </Form.Group>

//             <Form.Group controlId="provincia">
//               <Form.Label>Provincia</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="provincia"
//                 value={formData.provincia}
//                 onChange={handleChange}
//                 placeholder="Ej: Buenos Aires"
//                 className={errors.provincia ? 'input-error' : ''}
//                 required
//               />
//               {errors.provincia && <div className="error-text">{errors.provincia}</div>}
//             </Form.Group>

//             <Form.Group controlId="codigoPostal">
//               <Form.Label>Código Postal</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="codigoPostal"
//                 value={formData.codigoPostal}
//                 onChange={handleChange}
//                 placeholder="Ej: 1407"
//                 className={errors.codigoPostal ? 'input-error' : ''}
//                 required
//               />
//               {errors.codigoPostal && <div className="error-text">{errors.codigoPostal}</div>}
//             </Form.Group>

//             <Form.Group controlId="telefono">
//               <Form.Label>Teléfono</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="telefono"
//                 value={formData.telefono}
//                 onChange={handleChange}
//                 placeholder="Ej: 4563-4453 o 15-2344-0900"
//                 className={errors.telefono ? 'input-error' : ''}
//                 required
//               />
//               {errors.telefono && <div className="error-text">{errors.telefono}</div>}
//             </Form.Group>

//             <Form.Group controlId="notaPedido">
//               <Form.Label>Nota de Pedido</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 rows={3}
//                 name="notaPedido"
//                 placeholder="Comentá lo que consideres necesario para las instrucciones de envío."
//                 value={formData.notaPedido}
//                 onChange={handleChange}
//               />
//             </Form.Group>

//             <Button variant="primary" type="submit" className="mt-3">
//               Continuar
//             </Button>
//           </Form>
//         </div>
//       </div>
//     </Container>
//   );
// };

// export default CartEnvio;


import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import '../styles/cartEnvio.css';
import '../styles/Stepper.css';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import BootstrapStepper from '../components/Stepper'; // Importa el Stepper actualizado

const CartEnvio = () => {
  const navigate = useNavigate();
  const { user } = useContext(AppContext);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    direccionCalle: '',
    direccionNumero: '',
    direccionPisoDepto: '',
    localidad: '',
    provincia: '',
    codigoPostal: '',
    telefono: '',
    notaPedido: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);     

  useEffect(() => {
    if (user) {
      setFormData({
        nombre: user.nombre || '',
        apellido: user.apellido || '',
        direccionCalle: '',
        direccionNumero: '',
        direccionPisoDepto: '',
        localidad: '',
        provincia: '',
        codigoPostal: '',
        telefono: '',
        notaPedido: '',
      });
      setLoading(false);  
    } else {
      setError('No se encontró el usuario.');
      setLoading(false);  
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    const validationErrors = {};
    if (!formData.nombre) validationErrors.nombre = 'El nombre es obligatorio';
    if (!formData.apellido) validationErrors.apellido = 'El apellido es obligatorio';
    if (!formData.direccionCalle) validationErrors.direccionCalle = 'La calle es obligatoria';
    if (!formData.direccionNumero) validationErrors.direccionNumero = 'El número es obligatorio';
    if (!formData.localidad) validationErrors.localidad = 'La localidad es obligatoria';
    if (!formData.provincia) validationErrors.provincia = 'La provincia es obligatoria';
    if (!formData.codigoPostal) validationErrors.codigoPostal = 'El código postal es obligatorio';
    if (!formData.telefono) validationErrors.telefono = 'El teléfono es obligatorio';
    return validationErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      navigate("/checkout");
    }
  };

  const steps = [
    "Completa tu carrito",
    "Datos de envío",
    "Detalle de facturación",
    "Realizar pago",
  ];

  return (
    <Container className="cart-envio-container">
      <h1 className='mt-4 mb-4'>Información de envío</h1>
      <div className="cart-envio-container-body">
        {/* Paso 2: Stepper actualizado */}
        <BootstrapStepper steps={steps} currentStep={1} />
        <div className="CartEnvio-body">
          <h3>Completa el formulario de envío</h3>
          <Row>
            <Col>
              <Form onSubmit={handleSubmit}>
                {/* Fila para Nombre y Apellido */}
                <Row className='mt-4 mb-4'>
                  <Col sm={6}>
                    <Form.Group controlId="formNombre">
                      <Form.Label>Nombre</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        isInvalid={!!errors.nombre}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.nombre}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col sm={6}>
                    <Form.Group controlId="formApellido">
                      <Form.Label>Apellido</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Apellido"
                        name="apellido"
                        value={formData.apellido}
                        onChange={handleChange}
                        isInvalid={!!errors.apellido}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.apellido}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                {/* Fila para Calle y Número */}
                <Row className='mb-4'>
                  <Col sm={6}>
                    <Form.Group controlId="formDireccionCalle">
                      <Form.Label>Calle</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Calle"
                        name="direccionCalle"
                        value={formData.direccionCalle}
                        onChange={handleChange}
                        isInvalid={!!errors.direccionCalle}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.direccionCalle}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col sm={6}>
                    <Form.Group controlId="formDireccionNumero">
                      <Form.Label>Número</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Número"
                        name="direccionNumero"
                        value={formData.direccionNumero}
                        onChange={handleChange}
                        isInvalid={!!errors.direccionNumero}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.direccionNumero}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                {/* Fila para Localidad y Provincia */}
                <Row className='mb-4'>
                  <Col sm={6}>
                    <Form.Group controlId="formLocalidad">
                      <Form.Label>Localidad</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Localidad"
                        name="localidad"
                        value={formData.localidad}
                        onChange={handleChange}
                        isInvalid={!!errors.localidad}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.localidad}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col sm={6}>
                    <Form.Group controlId="formProvincia">
                      <Form.Label>Provincia</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Provincia"
                        name="provincia"
                        value={formData.provincia}
                        onChange={handleChange}
                        isInvalid={!!errors.provincia}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.provincia}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                {/* Fila para Código Postal y Teléfono */}
                <Row className='mb-4'>
                  <Col sm={6}>
                    <Form.Group controlId="formCodigoPostal">
                      <Form.Label>Código Postal</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Código Postal"
                        name="codigoPostal"
                        value={formData.codigoPostal}
                        onChange={handleChange}
                        isInvalid={!!errors.codigoPostal}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.codigoPostal}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col sm={6}>
                    <Form.Group controlId="formTelefono">
                      <Form.Label>Teléfono</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Teléfono"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        isInvalid={!!errors.telefono}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.telefono}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                {/* Fila para Nota de Pedido que ocupa ambas columnas */}
                <Row className='mb-4'>
                  <Col sm={12}>
                    <Form.Group controlId="formNotaPedido">
                      <Form.Label>Nota de Pedido</Form.Label>
                      <Form.Control
                        as="textarea"
                        placeholder="¿Deseas añadir alguna nota a tu pedido?"
                        name="notaPedido"
                        value={formData.notaPedido}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                
                <Button className="mt-4 full-width-button1" variant="primary" type="submit" disabled={loading}>
                  Siguiente
                </Button>

                
                <div className="d-flex align-items-center justify-content-center mt-4">
                  <div className="line" style={{ flex: 1, height: '1px', backgroundColor: '#ccc' }}></div>
                  <div className="px-3">¿Querés modificar tu pedido?</div>
                  <div className="line" style={{ flex: 1, height: '1px', backgroundColor: '#ccc' }}></div>
                </div>

                <Button variant="outline-secondary " className=" mt-4 mb-1 full-width-button1 .custom-outline-button" onClick={() => navigate('/cart')} >
                  Modificar Pedido            
                </Button>
                
              </Form>
            </Col>
          </Row>
        </div>
      </div>
    </Container>
  );
};

export default CartEnvio;
