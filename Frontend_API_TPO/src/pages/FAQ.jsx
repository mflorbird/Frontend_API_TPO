import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/TermsAndConditions.css';

const FAQ = () => {
  return (
    <>
      <Navbar />

      <div className="terms-and-conditions container my-5">
        <h1 className="text-center">¿Cómo podemos ayudarte?</h1>
        <p className="text-center font-weight-bold mt-4">
          Aquí puedes encontrar las respuestas a las preguntas más realizadas por nuestros clientes.
        </p>

        <h4 className="mt-3">1- ¿Cómo realizo un pedido en Naikii?</h4>
        <p className="mb-3">
          Para realizar un pedido, selecciona el modelo de zapatillas que deseas, elige tu talla y agrégalo al carrito. Luego, ve al carrito y sigue los pasos para completar la compra. Te pediremos tus datos de envío y método de pago para finalizar.
        </p>

        <hr className="my-4" />

        <h4 className="mt-3">2- ¿Cuáles son las opciones de pago disponibles?</h4>
        <p className="mb-3">
          Aceptamos tarjetas de crédito y débito, transferencias bancarias y pagos a través de MercadoPago.
        </p>

        <hr className="my-4" /> 

        <h4 className="mt-3">3- ¿Cuánto tarda el envío?</h4>
        <p className="mb-3">
          Los tiempos de entrega varían según tu ubicación. En general, los pedidos nacionales tardan entre 3 y 7 días hábiles. Al momento de tu compra, te daremos una estimación de entrega más precisa.
        </p>

        <hr className="my-4" /> 

        <h4 className="mt-3">4- ¿Cómo puedo rastrear mi pedido?</h4>
        <p className="mb-3">
          Una vez enviado tu pedido, recibirás un correo electrónico con un número de seguimiento y un enlace para rastrear el envío en tiempo real.
        </p>

        <hr className="my-4" />

        <h4 className="mt-3">5- ¿Puedo cambiar la talla o modelo después de haber realizado el pedido?</h4>
        <p className="mb-3">
          Sí, si el pedido no ha sido enviado, puedes solicitar un cambio de talla o modelo contactando a nuestro equipo de atención al cliente. Si ya fue enviado, puedes hacer el cambio una vez que recibas el producto.
        </p>

        <hr className="my-4" /> 

        <h4 className="mt-3">6- ¿Cuál es la política de devoluciones de Naikii?</h4>
        <p className="mb-3">
          Ofrecemos devoluciones gratuitas dentro de los 30 días posteriores a la recepción de tu pedido, siempre que las zapatillas no hayan sido usadas y conserven su empaque original. Para más detalles, consulta nuestra política de devoluciones en el sitio web.
        </p>

        <hr className="my-4" /> 

        <h4 className="mt-3">7- ¿Cómo sé cuál es mi talla en Naikii?</h4>
        <p className="mb-3">
          Contamos con una guía de tallas disponible en cada página de producto para ayudarte a elegir la talla que mejor se ajuste a ti. Si tienes dudas, contacta a nuestro equipo de atención al cliente para obtener asesoría.
        </p>

        <hr className="my-4" /> 

        <h4 className="mt-3">8- ¿Ofrecen envíos internacionales?</h4>
        <p className="mb-3">
          Sí, realizamos envíos internacionales a una amplia variedad de países. Los tiempos de entrega y costos pueden variar según la ubicación.
        </p>

        <hr className="my-4" /> 

        <h4 className="mt-3">9- ¿Cómo puedo comunicarme con atención al cliente?</h4>
        <p className="mb-3">
          Puedes contactarnos a través de nuestro formulario de contacto en la web, por correo electrónico a soporte@naikii.com, o por WhatsApp en el número que encontrarás en nuestro sitio. 
        </p>

        <hr className="my-4" /> 

        <h4 className="mt-3">10- ¿Puedo obtener un descuento en mi primera compra?</h4>
        <p className="mb-3">
          ¡Sí! Al registrarte, recibirás un código de descuento exclusivo para tu primera compra en Naikii.
        </p>

      </div>

      <Footer />
    </>
  );
};

export default FAQ;
