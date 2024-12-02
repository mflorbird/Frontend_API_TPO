import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Form, Button, Image, Alert } from 'react-bootstrap';
import { AppContext } from '../context/AppContext';
import OrderSummary from '../components/OrderSummary';
import Stepper from '../components/Stepper';
import qr from '../assets/QRNAIKI.png';
import '../styles/finalizarCompra.css';

// Constants
const PAYMENT_METHODS = {
  CREDIT_CARD: 'tarjetaCredito',
  DIGITAL_WALLET: 'billeteraDigital',
  BANK_TRANSFER: 'transferenciaBancaria'
};

const CHECKOUT_STEPS = [
  'Completa tu carrito',
  'Datos de envío',
  'Detalle de facturación',
  'Realizar pago'
];

const FinalizarCompra = () => {
  const navigate = useNavigate();
  const [metodoPago, setMetodoPago] = useState('');
  const [formularioValido, setFormularioValido] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user, cart, checkoutCart } = useContext(AppContext);

  // Memoized navigation effect
  const handleNavigation = useCallback(() => {
    if (!loading && (!user || !cart)) {
      navigate('/error');
    }
  }, [user, cart, loading, navigate]);

  useEffect(() => {
    handleNavigation();
  }, [handleNavigation]);

  // Loading simulation with cleanup
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Payment method change handler
  const handleMetodoPagoChange = (e) => {
    const selectedMethod = e.target.value;
    setMetodoPago(selectedMethod);
    setFormularioValido(false);
  };

  // Purchase confirmation handler
  const handleConfirmPurchase = async () => {
    setLoading(true);
    try {
      if (!user) throw new Error('Usuario no encontrado');
      if (!cart?.items || Object.keys(cart.items).length === 0) {
        throw new Error('El carrito está vacío o no tiene productos');
      }

      const result = await checkoutCart();

      if (result.valid) {
        navigate('/checkout-success');
      } else {
        const invalidItems = result.invalidItems.map(({ model, size }) =>
            `- Modelo: ${model}, Talle: ${size}`
        ).join('\n');

        alert(`No se puede completar la compra. Los siguientes productos no tienen stock suficiente:\n${invalidItems}\n\nPor favor, ajusta la cantidad o revisa los productos.`);
        navigate('/cart');
      }
    } catch (error) {
      console.error('Error al confirmar la compra:', error);
      alert('Hubo un error al procesar la compra. Intenta nuevamente más tarde.');
      setError('Error al realizar el checkout');
    } finally {
      setLoading(false);
    }
  };

  // Render loading or error states
  if (loading) return <p>Cargando datos...</p>;
  if (error) return <p>Error al obtener los datos: {error}</p>;

  return (
      <div className="checkout-container">
        <div className="checkout-container-body">
          <h1>Confirmación y pago del pedido</h1>
          <Stepper
              currentStep={4}
              steps={CHECKOUT_STEPS}
          />

          <div className="checkout-content">
            <div className="checkout-items">
              <h3 className='mb-4'>
                Selecciona el método de pago y completa los datos requeridos
              </h3>

              <UserInfoDisplay user={user} />

              <div className="form-group mt-4">
                <h6 className='mt-4 mb-4'>Elige tu método de pago favorito:</h6>
                <PaymentMethodSelector
                    metodoPago={metodoPago}
                    onMetodoPagoChange={handleMetodoPagoChange}
                    onFormValidation={setFormularioValido}
                />
              </div>
            </div>

            <div className="checkout-summary">
              <OrderSummary
                  subtotal={cart?.precioTotal || 0}
                  discountAmount={cart?.discount || 0}
                  totalAmount={cart?.precioDiscount || 0}
              />

              <CheckoutActionButtons
                  formularioValido={formularioValido}
                  onConfirmPurchase={handleConfirmPurchase}
                  onModifyOrder={() => navigate('/cart')}
              />
            </div>
          </div>
        </div>
      </div>
  );
};

// Extracted user info display component
const UserInfoDisplay = ({ user }) => (
    <>
      <p><strong>Nombre:</strong> {user.nombre}</p>
      <p><strong>Apellido:</strong> {user.apellido}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </>
);

// Payment method selector component
const PaymentMethodSelector = ({
                                 metodoPago,
                                 onMetodoPagoChange,
                                 onFormValidation
                               }) => {
  return (
      <>
        <select value={metodoPago} onChange={onMetodoPagoChange}>
          <option value="">Selecciona un método</option>
          <option value={PAYMENT_METHODS.CREDIT_CARD}>Tarjeta de Crédito</option>
          <option value={PAYMENT_METHODS.DIGITAL_WALLET}>Billetera Digital</option>
          <option value={PAYMENT_METHODS.BANK_TRANSFER}>Transferencia Bancaria</option>
        </select>

        <div className="mt-4">
          {metodoPago === PAYMENT_METHODS.CREDIT_CARD && (
              <CreditCardForm onValid={onFormValidation} />
          )}
          {metodoPago === PAYMENT_METHODS.DIGITAL_WALLET && (
              <DigitalWalletForm onValid={onFormValidation} />
          )}
          {metodoPago === PAYMENT_METHODS.BANK_TRANSFER && (
              <BankTransferForm onValid={onFormValidation} />
          )}
        </div>
      </>
  );
};

// Checkout action buttons component
const CheckoutActionButtons = ({
                                 formularioValido,
                                 onConfirmPurchase,
                                 onModifyOrder
                               }) => (
    <>
      <Button
          className="checkout-next-btn mt-4"
          variant="primary"
          disabled={!formularioValido}
          onClick={onConfirmPurchase}
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
          className="mt-4 mb-1 full-width-button1 custom-outline-button"
          onClick={onModifyOrder}
      >
        Modificar Pedido
      </Button>
    </>
);

// Credit Card Form Component
const CreditCardForm = ({ onValid }) => {
  const [formData, setFormData] = useState({
    numeroTarjeta: '',
    fechaVencimiento: '',
    codigoSeguridad: '',
    nombreApellido: '',
  });

  useEffect(() => {
    const isFormValid = Object.values(formData).every((value) => value.trim() !== '');
    onValid(isFormValid);
  }, [formData, onValid]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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

// Digital Wallet Form Component
const DigitalWalletForm = ({ onValid }) => {
  const [comprobante, setComprobante] = useState(null);

  useEffect(() => {
    onValid(comprobante !== null);
  }, [comprobante, onValid]);

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

// Bank Transfer Form Component
const BankTransferForm = ({ onValid }) => {
  const [comprobante, setComprobante] = useState(null);

  useEffect(() => {
    onValid(comprobante !== null);
  }, [comprobante, onValid]);

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