import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import '../styles/checkout.css';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import OrderSummary from '../components/OrderSummary';


const Checkout = () => {
  const navigate = useNavigate(); 
  const { user, cartItems, subtotal, discount, cart, setDiscount,  } = useContext(AppContext);
  const [discountCode, setDiscountCode] = useState('');
  useEffect(() => {
    if (!user || !cart) {
        navigate('/error');
    }
}, [user, cart, navigate]);

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    cuitDni: '',
    provincia: '',
    codigoPostal: '',
    email: '',
  });


  const [errors, setErrors] = useState('');
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);      
  const [shippingData, setShippingData] = useState({});

  useEffect(() => {
    if (user) {
      setFormData({
        nombre: user.nombre || '',
        apellido: user.apellido || '',
        cuitDni: '',
        provincia: '',
        codigoPostal: '',
        email: user.email || '',
      });
      setLoading(false);  
    } else {
      setError('No se encontró el usuario.');
      setLoading(false);  
    }
  }, [user]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  
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
    Object.keys(formData).forEach((field) => {
      if (field !== 'nombre' && field !== 'apellido' && field !== 'email' && !formData[field]) {
        newErrors[field] = '*Obligatorio';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; 
  };

  
  const saveShippingData = async () => {
    try {
      if (!user || !user.id) throw new Error("Falta el ID de usuario.");
      
      // saco de aca el setcartitems
      const shippingDataToSave = {
        ...formData,
        userId: user.id,
      };

      // aca dsp si llegamos guardamos los datos.
      setShippingData(shippingDataToSave);
    } catch (error) {
      console.error("Error al guardar los datos de envío:", error);
    }
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      await saveShippingData(); 
      console.log("Redirigiendo a FinalizarCompra..."); //  esto para verificar el flujo
      navigate('/finalizarCompra');
    }
  };
 
  return (
    <Container fluid className="checkout-container">
      <ul className="progress-steps">
        <li className="step completed">Paso 1: Completa tu carrito</li>
        <li className="step completed">Paso 2: Datos de Envío</li>
        <li className="step current">Paso 3: Detalle de Facturación</li>
        <li className="step pending">Paso 4: Realizar Pago</li>
      </ul>

      <div className="Checkout-body">
        <Form onSubmit={handleCheckout}>
          <Row>
            {/* Columna izquierda: Detalles de Facturación */}
            <Col md={6} className="p-5">
              <h2>Detalles de Facturación</h2>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="nombre">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      className={errors.nombre ? 'input-error' : ''}
                    />
                    {errors.nombre && <div className="error-text">{errors.nombre}</div>}
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="apellido">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control
                      type="text"
                      name="apellido"
                      value={formData.apellido}
                      onChange={handleChange}
                      className={errors.apellido ? 'input-error' : ''}
                    />
                    {errors.apellido && <div className="error-text">{errors.apellido}</div>}
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group controlId="cuitDni">
                <Form.Label>CUIT/DNI</Form.Label>
                <Form.Control
                  type="text"
                  name="cuitDni"
                  value={formData.cuitDni}
                  onChange={handleChange}
                  className={errors.cuitDni ? 'input-error' : ''}
                />
                {errors.cuitDni && <div className="error-text">{errors.cuitDni}</div>}
              </Form.Group>

              <Form.Group controlId="provincia">
                <Form.Label>Provincia</Form.Label>
                <Form.Control
                  type="text"
                  name="provincia"
                  value={formData.provincia}
                  onChange={handleChange}
                  className={errors.provincia ? 'input-error' : ''}
                />
                {errors.provincia && <div className="error-text">{errors.provincia}</div>}
              </Form.Group>

              <Form.Group controlId="codigoPostal">
                <Form.Label>Código Postal</Form.Label>
                <Form.Control
                  type="text"
                  name="codigoPostal"
                  value={formData.codigoPostal}
                  onChange={handleChange}
                  className={errors.codigoPostal ? 'input-error' : ''}
                />
                {errors.codigoPostal && <div className="error-text">{errors.codigoPostal}</div>}
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label>Correo Electrónico</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'input-error' : ''}
                />
                {errors.email && <div className="error-text">{errors.email}</div>}
              </Form.Group>
            </Col>

            {/* Columna derecha: Tu Pedido */}
            <Col md={6} className="p-5 bg-light">
              
              <div className="order-summary-container">
              <OrderSummary subtotal={cart.precioTotal} discountAmount={cart.discount} totalAmount={cart.precioDiscount} />
              </div>

              <Button variant="secondary" className="mt-3" onClick={() => navigate('/Cart')}>
                Modificar Pedido
              </Button>

              <p></p>
              
              <Button variant="primary" type="submit" className="mt-3">
                Continuar a Finalizar Compra
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </Container>
  );
};

export default Checkout;