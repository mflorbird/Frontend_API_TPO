// import { useState, useEffect, useContext } from 'react';
// import { Container, Row, Col, Button, Form, Image, Alert } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import qr from '../assets/QRNAIKI.png';
// // import '../styles/finalizarCompra.css';
// import { AppContext } from '../context/AppContext';
// import OrderSummary from '../components/OrderSummary';

// const FinalizarCompra = ({ formData }) => {
//   const navigate = useNavigate();
//   const [metodoPago, setMetodoPago] = useState('');
//   const [loading, setLoading] = useState(false);
//   const { user, setUser, cart, checkoutCart } = useContext(AppContext);

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem('user'));
//     if (!user && storedUser) {
//       setUser(storedUser);
//     }
//   }, []);

//   useEffect(() => {
//     if (!loading && (!user || !cart)) {
//       navigate('/error');
//     }
//   }, [user, cart, loading, navigate]);

//   const [error, setError] = useState('');

//   useEffect(() => {
//     setLoading(true);
//     setTimeout(() => setLoading(false));
//   }, []);


//   const handleConfirmPurchase = async () => {  // Asegúrate de pasar el userId aquí
//     setLoading(true);
    
//     try {
//       if (!user)  { // si no hay usuario que log.
//             throw new Error('Usuario no encontrado');
//         }

//         if (!cart || !cart.items || Object.keys(cart.items).length === 0) {
//             throw new Error('El carrito está vacío o no tiene productos');
//         }

//         // Ejecutar el checkout
//         const result = await checkoutCart();

//         if (result.valid) {
//             //alert('¡Gracias por comprar en NAIKII!');
//             navigate('/checkout-success');  // Redirigir a la página de éxito
//         } else {
//           // isValid: false,
//           //     invalidItems: validation.invalidItems,
//           //     message: 'No se puede realizar el checkout, hay productos sin stock suficiente',
//           //     validations: validation.validations

//           // hacer un alert con los productos que no tienen stock suficiente y decir que no se puede realizar la compra
//             setError(result.message);
//           const invalidItems = result.invalidItems.map(({ model, size }) => ({ model, size }));
//           alert(`No se puede completar la compra. Los siguientes productos no tienen stock suficiente:
//               ${invalidItems.map(item => `- Modelo: ${item.model}, Talle: ${item.size}`).join('\n')}
//                 Por favor, ajusta la cantidad o revisa los productos.`);
//             navigate('/cart');

//         }
//     } catch (error) {
//         console.error('Error al confirmar la compra:', error);
//         alert('Hubo un error al procesar la compra. Intenta nuevamente más tarde.');
//         setError('Error al realizar el checkout');
//     }

//     setLoading(false);
//   };




//   const handleMetodoPagoChange = (e) => setMetodoPago(e.target.value);

//   if (loading) return <p>Cargando datos...</p>;
//   if (error) return <p>Error al obtener los datos: {error}</p>;


//   return (
//     <Container fluid className="finalizar-compra-container">
//       <ul className="progress-steps">
//         <li className="step completed">Paso 1: Completa tu carrito</li>
//         <li className="step completed">Paso 2: Datos de Envío</li>
//         <li className="step completed">Paso 3: Detalle de Facturación</li>
//         <li className="step current">Paso 4: Realizar Pago</li>
//       </ul>

//       <div className="confirmacion-body">
//         <Row>
//           <Col md={8}>
//             <h2>Confirmación del Pedido</h2>
//             <p><strong>Nombre:</strong> {user.nombre}</p>
//             <p><strong>Apellido:</strong> {user.apellido}</p>
//             <p><strong>Email:</strong> {user.email}</p>

//             <div className="mt-4">
//               <h4>Selecciona el Método de Pago</h4>
//               <select value={metodoPago} onChange={handleMetodoPagoChange}>
//                 <option value="">Selecciona un método</option>
//                 <option value="tarjetaCredito">Tarjeta de Crédito</option>
//                 <option value="billeteraDigital">Billetera Digital</option>
//                 <option value="transferenciaBancaria">Transferencia Bancaria</option>
//               </select>

//               <div className="mt-4">
//                 {metodoPago === 'tarjetaCredito' && <TarjetaCreditoForm onConfirm={handleConfirmPurchase} />}
//                 {metodoPago === 'billeteraDigital' && <BilleteraDigitalForm onConfirm={handleConfirmPurchase} />}
//                 {metodoPago === 'transferenciaBancaria' && <TransferenciaBancariaForm onConfirm={handleConfirmPurchase} />}
//               </div>
//             </div>
//           </Col>
//           <Col md={4} className="bg-light p-3">

//               <OrderSummary subtotal={cart.precioTotal} discountAmount={cart.discount} totalAmount={cart.precioDiscount} />

            
//           </Col>
//         </Row>
//       </div>
//     </Container>
//   );
// };

// // Formulario de Tarjeta de Crédito
// const TarjetaCreditoForm = ({ onConfirm }) => {
//   const [formData, setFormData] = useState({
//     numeroTarjeta: '',
//     fechaVencimiento: '',
//     codigoSeguridad: '',
//     nombreApellido: '',
//   });
//   const [errors, setErrors] = useState({});

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

//   const validateFields = () => {
//     const newErrors = {};
//     Object.keys(formData).forEach((field) => {
//       if (!formData[field]) {
//         newErrors[field] = '*Obligatorio';
//       }
//     });

//     setErrors(newErrors);
//     if (Object.keys(newErrors).length === 0) {
//       onConfirm();
//     }
//   };

//   return (
//     <Form onSubmit={(e) => { e.preventDefault(); validateFields(); }}>
//       <Row>
//         <Col md={6}>
//           <Form.Group controlId="numeroTarjeta">
//             <Form.Label>Número de Tarjeta</Form.Label>
//             <Form.Control
//               type="text"
//               name="numeroTarjeta"
//               value={formData.numeroTarjeta}
//               onChange={handleChange}
//               placeholder="Ej. 1234 5678 9012 3456"
//               isInvalid={!!errors.numeroTarjeta}
//             />
//             <Form.Control.Feedback type="invalid">
//               {errors.numeroTarjeta}
//             </Form.Control.Feedback>
//           </Form.Group>
//         </Col>
//         <Col md={6}>
//           <Form.Group controlId="fechaVencimiento">
//             <Form.Label>Fecha de Vencimiento</Form.Label>
//             <Form.Control
//               type="text"
//               name="fechaVencimiento"
//               value={formData.fechaVencimiento}
//               onChange={handleChange}
//               placeholder="MM/AA"
//               isInvalid={!!errors.fechaVencimiento}
//             />
//             <Form.Control.Feedback type="invalid">
//               {errors.fechaVencimiento}
//             </Form.Control.Feedback>
//           </Form.Group>
//         </Col>
//       </Row>
//       <Row>
//         <Col md={6}>
//           <Form.Group controlId="codigoSeguridad">
//             <Form.Label>Código de Seguridad</Form.Label>
//             <Form.Control
//               type="text"
//               name="codigoSeguridad"
//               value={formData.codigoSeguridad}
//               onChange={handleChange}
//               placeholder="Ej. 123"
//               isInvalid={!!errors.codigoSeguridad}
//             />
//             <Form.Control.Feedback type="invalid">
//               {errors.codigoSeguridad}
//             </Form.Control.Feedback>
//           </Form.Group>
//         </Col>
//         <Col md={6}>
//           <Form.Group controlId="nombreApellido">
//             <Form.Label>Nombre y Apellido</Form.Label>
//             <Form.Control
//               type="text"
//               name="nombreApellido"
//               value={formData.nombreApellido}
//               onChange={handleChange}
//               placeholder="Ej. Juan Pérez"
//               isInvalid={!!errors.nombreApellido}
//             />
//             <Form.Control.Feedback type="invalid">
//               {errors.nombreApellido}
//             </Form.Control.Feedback>
//           </Form.Group>
//         </Col>
//       </Row>
//       <Button variant="success" type="submit" className="mt-3">
//         Confirmar Compra
//       </Button>
//     </Form>
//   );
// };

// // Formulario de Billetera Digital
// const BilleteraDigitalForm = ({ onConfirm }) => (
//   <div>
//     <h3>Último Paso: Realizar el Pago con tu Billetera Digital</h3>
//     <h5>Escanea el código QR y selecciona el método de pago de tu billetera</h5>
//     <Image src={qr} alt="Código QR" fluid />
//     <Form.Group className="mt-3">
//       <Form.Label>Adjunta el comprobante de pago</Form.Label>
//       <Form.Control type="file" />
//     </Form.Group>
//     <Button variant="success" onClick={onConfirm}>
//       Confirmar Compra
//     </Button>
//   </div>
// );

// // Formulario de Transferencia Bancaria
// const TransferenciaBancariaForm = ({ onConfirm }) => (
//   <div>
//     <h3>Último Paso: Realizar el Pago con Transferencia Bancaria</h3>
//     <Alert variant="secondary">
//       <p><strong>CBU:</strong> 2541002333058810</p>
//       <p><strong>Usuario:</strong> NaikiiZapas </p>
//       <p><strong>Empresa:</strong> Naikii </p>
//       <p><strong>Alias:</strong> naikii.ok </p>
//       <p><strong>Banco:</strong> Banco de la Nacion Argentina </p>
//     </Alert>
//     <Form.Group className="mt-3">
//       <Form.Label>Adjunta el comprobante de pago</Form.Label>
//       <Form.Control type="file" />
//     </Form.Group>
//     <Button variant="primary" onClick={() => handleConfirmPurchase(user?.id)}>Confirmar Compra</Button>
    
   
//   </div>
// );

// export default FinalizarCompra;

import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Form, Button, Image, Alert } from 'react-bootstrap';
import { AppContext } from '../context/AppContext';
import OrderSummary from '../components/OrderSummary';
import Stepper from '../components/Stepper';
import qr from '../assets/QRNAIKI.png';
import '../styles/finalizarCompra.css';

const FinalizarCompra = ({ formData }) => {
  const navigate = useNavigate();
  const [metodoPago, setMetodoPago] = useState('');
  const [formularioValido, setFormularioValido] = useState(false); // Nuevo estado
  const [loading, setLoading] = useState(false);
  const { user, cart, checkoutCart } = useContext(AppContext);
  const [error, setError] = useState('');


  useEffect(() => {
    if (!loading && (!user || !cart)) {
      navigate('/error');
    }
  }, [user, cart, loading, navigate]);


  useEffect(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 500); // Simula un pequeño delay
  }, []);

  const handleMetodoPagoChange = (e) => {
    setMetodoPago(e.target.value);
    setFormularioValido(false); // Reinicia la validez al cambiar el método de pago
  };

  const actualizarFormularioValido = (valido) => {
    setFormularioValido(valido);
  };

  const handleConfirmPurchase = async () => {
    setLoading(true);
    try {
      if (!user) throw new Error('Usuario no encontrado');
      if (!cart || !cart.items || Object.keys(cart.items).length === 0) {
        throw new Error('El carrito está vacío o no tiene productos');
      }

      const result = await checkoutCart();

      if (result.valid) {
        navigate('/checkout-success');
      } else {
        setError(result.message);
        const invalidItems = result.invalidItems.map(({ model, size }) => ({ model, size }));
        alert(`No se puede completar la compra. Los siguientes productos no tienen stock suficiente:
${invalidItems.map(item => `- Modelo: ${item.model}, Talle: ${item.size}`).join('\n')}
Por favor, ajusta la cantidad o revisa los productos.`);
        navigate('/cart');
      }
    } catch (error) {
      console.error('Error al confirmar la compra:', error);
      alert('Hubo un error al procesar la compra. Intenta nuevamente más tarde.');
      setError('Error al realizar el checkout');
    }
    setLoading(false);
  };

  if (loading) return <p>Cargando datos...</p>;
  if (error) return <p>Error al obtener los datos: {error}</p>;


  return (
    <div className="checkout-container">
      <div className="checkout-container-body">
        <h1>Confirmación y pago del pedido</h1>
        <Stepper
          currentStep={4}
          steps={['Completa tu carrito', 'Datos de envío', 'Detalle de facturación', 'Realizar pago']}
        />

        <div className="checkout-content">
          {/* Sección de información del pedido */}
          <div className="checkout-items">
            <h3 className='mb-4'>Selecciona el método de pago y completa los datos requeridos</h3>
            {console.log('user:', user)}
            <p><strong>Nombre:</strong> {user.nombre}</p>
            <p><strong>Apellido:</strong> {user.apellido}</p>
            <p><strong>Email:</strong> {user.email}</p>

            <div className="form-group mt-4">
              <h6 className='mt-4 mb-4'>Elige tu método de pago favorito:</h6>
              <select value={metodoPago} onChange={handleMetodoPagoChange}>
                <option value="">Selecciona un método</option>
                <option value="tarjetaCredito">Tarjeta de Crédito</option>
                <option value="billeteraDigital">Billetera Digital</option>
                <option value="transferenciaBancaria">Transferencia Bancaria</option>
              </select>

              <div className="mt-4">
                {metodoPago === 'tarjetaCredito' && (
                  <TarjetaCreditoForm onValid={actualizarFormularioValido} />
                )}
                {metodoPago === 'billeteraDigital' && (
                  <BilleteraDigitalForm onValid={actualizarFormularioValido} />
                )}
                {metodoPago === 'transferenciaBancaria' && (
                  <TransferenciaBancariaForm onValid={actualizarFormularioValido} />
                )}
              </div>
            </div>
          </div>

          {/* Resumen de compra */}
          <div className="checkout-summary">
            <OrderSummary
              subtotal={cart?.precioTotal || 0}
              discountAmount={cart?.discount || 0}
              totalAmount={cart?.precioDiscount || 0}
            />
            {/* Botón de continuar */}
            <Button
              className="checkout-next-btn mt-4"
              variant="primary"
              disabled={!formularioValido}
              onClick={handleConfirmPurchase}
            >
              Confirmar Compra
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

// Formulario de Tarjeta de Crédito
const TarjetaCreditoForm = ({ onValid }) => {
  const [formData, setFormData] = useState({
    numeroTarjeta: '',
    fechaVencimiento: '',
    codigoSeguridad: '',
    nombreApellido: '',
  });

  useEffect(() => {
    const esFormularioValido = Object.values(formData).every((value) => value.trim() !== '');
    onValid(esFormularioValido);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Form>
      <Row>
        <Col md={6}>
          <Form.Group controlId="numeroTarjeta">
            <Form.Label>Número de Tarjeta</Form.Label>
            <Form.Control
              type="text"
              name="numeroTarjeta"
              value={formData.numeroTarjeta}
              onChange={handleChange}
              placeholder="Ej. 1234 5678 9012 3456"
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="fechaVencimiento">
            <Form.Label>Fecha de Vencimiento</Form.Label>
            <Form.Control
              type="text"
              name="fechaVencimiento"
              value={formData.fechaVencimiento}
              onChange={handleChange}
              placeholder="MM/AA"
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Form.Group controlId="codigoSeguridad">
            <Form.Label>Código de Seguridad</Form.Label>
            <Form.Control
              type="text"
              name="codigoSeguridad"
              value={formData.codigoSeguridad}
              onChange={handleChange}
              placeholder="Ej. 123"
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="nombreApellido">
            <Form.Label>Nombre y Apellido</Form.Label>
            <Form.Control
              type="text"
              name="nombreApellido"
              value={formData.nombreApellido}
              onChange={handleChange}
              placeholder="Ej. Juan Pérez"
            />
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
};


// Formulario de Billetera Digital
const BilleteraDigitalForm = ({ onValid }) => {
  const [comprobante, setComprobante] = useState(null);

  useEffect(() => {
    // Valida si el formulario está completo
    onValid(comprobante !== null);
  }, [comprobante]);

  const handleFileChange = (e) => {
    setComprobante(e.target.files[0]);
  };

  return (
    <div>
      <h3>Último Paso: Realizar el Pago con tu Billetera Digital</h3>
      <h5>Escanea el código QR y selecciona el método de pago de tu billetera</h5>
      <Image src={qr} alt="Código QR" fluid />
      <Form.Group className="mt-3">
        <Form.Label>Adjunta el comprobante de pago</Form.Label>
        <Form.Control type="file" onChange={handleFileChange} />
      </Form.Group>
    </div>
  );
};


// Formulario de Transferencia Bancaria
const TransferenciaBancariaForm = ({ onValid }) => {
  const [comprobante, setComprobante] = useState(null);

  useEffect(() => {
    // Valida si el formulario está completo
    onValid(comprobante !== null);
  }, [comprobante]);

  const handleFileChange = (e) => {
    setComprobante(e.target.files[0]);
  };

  return (
    <div>
      <h3>Último Paso: Realizar el Pago con Transferencia Bancaria</h3>
      <Alert variant="secondary">
        <p><strong>CBU:</strong> 2541002333058810</p>
        <p><strong>Usuario:</strong> NaikiiZapas </p>
        <p><strong>Empresa:</strong> Naikii </p>
        <p><strong>Alias:</strong> naikii.ok </p>
        <p><strong>Banco:</strong> Banco de la Nacion Argentina </p>
      </Alert>
      <Form.Group className="mt-3">
        <Form.Label>Adjunta el comprobante de pago</Form.Label>
        <Form.Control type="file" onChange={handleFileChange} />
      </Form.Group>
    </div>
  );
};


export default FinalizarCompra;



