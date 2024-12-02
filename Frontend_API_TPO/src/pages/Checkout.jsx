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
