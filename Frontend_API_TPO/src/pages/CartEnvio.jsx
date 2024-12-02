import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import '../styles/cartEnvio.css';
import '../styles/Stepper.css';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import BootstrapStepper from '../components/Stepper'; 

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
       
        <BootstrapStepper steps={steps} currentStep={1} />
        <div className="CartEnvio-body">
          <h3>Completa el formulario de envío</h3>
          <Row>
            <Col>
              <Form onSubmit={handleSubmit}>
                
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
