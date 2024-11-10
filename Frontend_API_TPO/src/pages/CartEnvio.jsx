import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import '../styles/cartEnvio.css';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const CartEnvio = () => {
  const navigate = useNavigate();
  const { user, cartItems, setCartItems } = useContext(AppContext);
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
  const [loading, setLoading] = useState(true);  // Estado para loading
  const [error, setError] = useState(null);      // Estado para error

  // Utilizar los datos del contexto para prellenar los campos
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
      setLoading(false);  // Datos cargados, detener loading
    } else {
      setError('No se encontró el usuario.');
      setLoading(false);  // Finalizar loading en caso de error
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Eliminar errores en tiempo real si el campo es válido
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
      if (field !== 'direccionPisoDepto' && field !== 'notaPedido' && field !== 'nombre' && field !== 'apellido' && !formData[field]) {
        newErrors[field] = '*Obligatorio';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveShippingData = async () => {
    try {
      if (!user || !user.id) throw new Error("Falta el ID de usuario.");
      setCartItems((prevCarrito) => ({
        ...prevCarrito,
        envio: formData,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleCartEnvio = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      await saveShippingData(); // Guarda los datos antes de navegar
      navigate('/Checkout');
    }
  };

  if (loading) {
    return <p>Cargando datos...</p>;
  }
  if (error) {
    return <p>Error al obtener los datos: {error}</p>;
  }
  if (!user) {
    return <p>No se encontró el usuario.</p>;
  }

  return (
    <Container fluid className="cartEnvio-container">
      <ul className="progress-steps">
        <li className="step completed">Paso 1: Completa tu carrito</li>
        <li className="step current">Paso 2: Datos de Envío</li>
        <li className="step pending">Paso 3: Detalle de Facturación</li>
        <li className="step pending">Paso 4: Realizar Pago</li>
      </ul>

      <div className="CartEnvio-body">
        <Button variant="secondary" className="mt-4" onClick={() => navigate('/Cart')}>
          Modificar Pedido
        </Button>

        <div className='FormDatos'>
          <h2>Datos de Envío</h2>
          <Form onSubmit={handleCartEnvio}>
            <Row>
              <Col md={6}>
                <Form.Group controlId="nombre">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    name="nombre"
                    value={user ? user.nombre : formData.nombre}
                    onChange={handleChange}
                    className={errors.nombre ? 'input-error' : ''}
                    readOnly
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
                    value={user ? user.apellido : formData.apellido}
                    onChange={handleChange}
                    className={errors.apellido ? 'input-error' : ''}
                    readOnly
                  />
                  {errors.apellido && <div className="error-text">{errors.apellido}</div>}
                </Form.Group>
              </Col>
            </Row>

            {/* Resto del formulario... */}

            <Button variant="primary" type="submit" className="mt-3">
              Continuar
            </Button>
          </Form>
        </div>
      </div>
    </Container>
  );
};

export default CartEnvio;
