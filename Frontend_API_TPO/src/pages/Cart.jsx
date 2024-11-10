import React, { useEffect, useState } from 'react';
import "../styles/cart.css";
import { useNavigate } from 'react-router-dom';
import useUserData from '../hooks/useUserData';
import axios from 'axios';

const API_USERS_URL = 'http://localhost:3000/users';
const API_CART_URL = 'http://localhost:3000/cart';
const API_CHECKOUT_URL = 'http://localhost:3000/checkout';

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [discountCode, setDiscountCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  //esto tambien para idUsuario=1
  const [userWithId1, setUserWithId1] = useState(null);


    // fetch user with idUsuario=1
    const fetchUserWithId1 = async () => {
      try {
        const response = await axios.get(`${API_USERS_URL}?idUsuario=1`);
        setUserWithId1(response.data[0]); 
      } catch (error) {
        console.error("Error al obtener el usuario con idUsuario = 1:", error);
      }
    }; 


  const fetchCartItems = async () => {
    try {
      const response = await axios.get(API_CART_URL); 
      setCartItems(response.data);
    } catch (error) {
      console.error("Error al obtener los productos del carrito:", error);
    }
  };

  const calculateTotal = () => {
    const calculatedSubtotal = cartItems.reduce((acc, item) => acc + (Number(item.price) * Number(item.quantity)), 0);
    setSubtotal(calculatedSubtotal);

    const total = calculatedSubtotal + shippingCost - discountAmount;
    setTotalAmount(total);

    const totalItemsCount = cartItems.reduce((acc, item) => acc + Number(item.quantity), 0);
    setTotalItems(totalItemsCount);
  };

  useEffect(() => {
    fetchUserWithId1(); //el de idUsuario1
    fetchCartItems(); // Llamar a la función de productos
  }, []);

  useEffect(() => {
    calculateTotal();
  }, [cartItems, discountAmount]);

  const applyDiscount = () => {
    if (discountCode === 'NAIKI10') {
      const discount = subtotal * 0.10; // 10% del subtotal
      setDiscountAmount(discount);
    } else {
      setDiscountAmount(0);
      alert("Código de descuento inválido");
    }
  };

  const handleQuantityChange = async (itemId, newQuantity) => {
    try {
      await axios.patch(`${API_CART_URL}/${itemId}`, { quantity: newQuantity });
  
      // Actualizar el carrito en el estado local
      setCartItems(cartItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      ));
    } catch (error) {
      console.error("Error al actualizar la cantidad:", error);
    }
  };

  const handleDeleteItem = async (itemId, quantity) => {
    try {
      if (quantity > 1) {
        const newQuantity = quantity - 1;
        await axios.patch(`${API_CART_URL}/${itemId}`, { quantity: newQuantity });
  
        setCartItems(cartItems.map((item) =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        ));
      } else {
        // Eliminar el producto del carrito
        await axios.delete(`${API_CART_URL}/${itemId}`);
        setCartItems(cartItems.filter((item) => item.id !== itemId));
  
        // Ahora eliminar también el producto del checkout
        await eliminarProductoDelCheckout(itemId);
      }
    } catch (error) {
      console.error("Error al eliminar el producto del carrito:", error);
    }
  };
  
  // Función para eliminar el producto del checkout
  const eliminarProductoDelCheckout = async (itemId) => {
    try {
      // Primero, obtener la compra activa del usuario
      const response = await axios.get(`${API_CHECKOUT_URL}?idUsuario=${userWithId1.idUsuario}`);
      let compraExistente = response.data[0]; // Asumimos que solo hay una compra activa por usuario
      
      if (compraExistente) {
        // Filtrar el modelo eliminado
        const nuevosModelos = compraExistente.models.filter((modelo) => modelo.id !== itemId);
  
        // Recalcular el subtotal, descuento y total después de la eliminación
        const nuevoSubtotal = nuevosModelos.reduce((acc, item) => acc + (item.quantity * item.price), 0);
        const nuevoTotal = nuevoSubtotal - compraExistente.descuento;
  
        // Actualizamos la base de datos del checkout
        await axios.put(`${API_CHECKOUT_URL}/${compraExistente.id}`, {
          ...compraExistente,
          models: nuevosModelos,
          subtotal: nuevoSubtotal.toFixed(2),
          total: nuevoTotal.toFixed(2),
        });
      }
    } catch (error) {
      console.error("Error al eliminar el producto del checkout:", error);
    }
  };

  // Nueva función para guardar la compra
  const guardarCompra = async () => {
    if (!userWithId1) return;
    try {
      // Verificar si ya existe una compra para el usuario en checkout
      const response = await axios.get(`${API_CHECKOUT_URL}?idUsuario=${userWithId1.mail}`);
      let compraExistente = response.data[0]; // Asumimos que solo hay una compra activa por usuario
  
      const nuevosItems = cartItems.map((item) => ({
        model: item.model,
        quantity: item.quantity,
        price: parseFloat(item.price),
      }));
  

      let nuevoSubtotal = 0;
      let nuevoDescuento = 0;
      let nuevoTotal = 0;

      if (compraExistente) {
        // Si existe una compra, actualizamos las cantidades de los modelos
        const modelosExistentes = compraExistente.models;
  
        nuevosItems.forEach((nuevoItem) => {
          const modeloExistente = modelosExistentes.find((modelo) => modelo.model === nuevoItem.model);
          if (modeloExistente) {
            // Si el modelo ya existe, sumamos las cantidades
            modeloExistente.quantity = nuevoItem.quantity;
          } else {
            // Si el modelo es nuevo, lo agregamos a la lista de modelos
            modelosExistentes.push(nuevoItem);
          }
        });
  
        // Recalcular subtotal, descuento y total
        const nuevoSubtotal = modelosExistentes.reduce((acc, item) => acc + (item.quantity * item.price), 0); // Asegurarnos de que la multiplicación sea con números
        const nuevoDescuento = parseFloat(discountAmount); // Asegurarnos de que el descuento sea un número
        const nuevoTotal = nuevoSubtotal - nuevoDescuento;

        // Actualizamos la compra existente con los nuevos valores
        await axios.put(`${API_CHECKOUT_URL}/${compraExistente.id}`, {
          ...compraExistente,
          models: modelosExistentes,
          subtotal: nuevoSubtotal.toFixed(2), // Convertimos el subtotal a string con 2 decimales para almacenarlo
          descuento: nuevoDescuento.toFixed(2), // Lo mismo con el descuento
          total: nuevoTotal.toFixed(2), // Y con el total
        });
      } else {     
        // Si no existe una compra previa, creamos una nueva
        const nuevaCompra = {
          idUsuario: userWithId1.idUsuario,
          mail: userWithId1.mail,
          idCompra: Math.floor(Math.random() * 100000), // Genera un id aleatorio
          models: nuevosItems,
          fechaDeCompra: new Date().toISOString(),
          subtotal: nuevoSubtotal.toFixed(2), // Convertimos a string con 2 decimales para almacenarlo
          descuento: nuevoDescuento.toFixed(2), // Lo mismo con el descuento
          total: nuevoTotal.toFixed(2), // Y con el total
        };

    await axios.post(API_CHECKOUT_URL, nuevaCompra);
    }

    // Redirige a la página de envío después de guardar o actualizar
    navigate('/CartEnvio');

  } catch (error) {
    console.error("Error al guardar o actualizar la compra:", error);
  }
};
    const addTestItem = () => {
      const testItem = {
        id: Math.floor(Math.random() * 100000),
        model: 'Campus',
        size: '44',
        price: 40000,
        quantity: 1,
        image: '/path/to/default-image.jpg',
        category: 'Urban'
      };
      setCartItems([...cartItems, testItem]);
    };


  if (!userWithId1) return <p>Cargando datos del usuario...</p>;

  return (
    <div className="cart-container">
      <div className="cart-container-body">
        <h1>Hola {userWithId1.nombre}</h1>
        
        <ul className="progress-steps">
          <li className="step current">Paso 1: Completa tu carrito</li>
          <li className="step pending">Paso 2: Datos de Envío</li>
          <li className="step pending">Paso 3: Detalle de Facturación</li>
          <li className="step pending">Paso 4: Realizar Pago</li>
        </ul>
      
        <p>Visualizá los productos que tenes en tu carrito</p>
        <div className="cart-content">
          <div className="cart-items">
            {cartItems.length === 0 ? (
              <p>No hay productos en el carrito.</p>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.image || '/path/to/default-image.jpg'} alt={item.category} />
                  <div className="item-details">
                    <p><strong>{item.model}</strong></p>
                    <p>Talle: {item.size || 'N/A'}</p>
                    <p>Precio: ${item.price}</p>
                  </div>
                  <div className="item-quantity">
                    <label htmlFor={`quantity-${item.id}`}>Cantidad</label>
                    <select
                      id={`quantity-${item.id}`}
                      value={item.quantity || 1}
                      onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                    >
                      {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button className="delete-item-btn" onClick={() => handleDeleteItem(item.id, item.quantity)}>
                    🗑️
                  </button>
                </div>
              ))
            )}
          </div>
          <button onClick={addTestItem}>Agregar artículo de prueba</button>

          <div className="cart-summary">
            
            <h3>Resumen del pedido</h3>
            {cartItems.map((item) => (
              <div key={item.id} className="summary-item">
                <p>{item.model} : {item.quantity}</p>
                <p>${item.price}</p>
              </div>
            ))}
            <p>Subtotal: ${Number(subtotal).toFixed(2)}</p>
            <p>Descuento: -${Number(discountAmount).toFixed(2)}</p>
            <p>Total (IVA incluido): ${Number(totalAmount).toFixed(2)}</p>
            <input
              type="text"
              placeholder="Ingresá tu cupón"
              className="coupon-input"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
            />
            <button className="apply-discount-btn" onClick={applyDiscount}>Aplicar descuento</button>
            <button className="datosEnvio-btn" onClick={guardarCompra}>Siguiente</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
