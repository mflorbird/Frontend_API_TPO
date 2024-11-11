import React from 'react';
import { Store, MapPin, Clock, Phone } from 'lucide-react'; 
import '../styles/Contact.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Contact = () => {
  return (
    <div className="contact-container">
      <Navbar />

      <main className="container my-5">
        <h1 className="text-center mb-6">Contacto y sucursales</h1>

        <section className="my-4">
          <h3 className='mb-4'>¿En qué podemos ayudarte?</h3>
          <ul>
            <li>Te podés comunicar con nosotros de <strong>Lunes a Domingo de 9 a 21hrs</strong>.</li>
            <li>Escribinos por Whatsapp al <strong>+54 9 11 3299-6932</strong>.</li>
            <li>También podés llamarnos al <strong>+54 11 5168-6098</strong>.</li>
          </ul>
        </section>

        <hr className="my-4" />

        <section className="my-4">
          <h2 className='mb-4'>Dónde podés encontrarnos</h2>
          <div className="row">
            <div className="col-md-6 mb-4">
              <div className="card border-primary">
                <div className="card-body">
                  <h5 className="card-title">
                    <Store size={32} className="me-2" /> 
                    Lomas de Zamora
                  </h5>
                  <hr className="my-4" />
                  <p><MapPin className="me-2 text-primary" /> Av. Alte. Brown 1234, Lomas de Zamora, Buenos Aires, Argentina</p>
                  <p><Clock className="me-2 text-primary" /> Lunes a Viernes: 9:00 AM - 6:00 PM<br />Sábados: 10:00 AM - 2:00 PM<br />Domingos: Cerrado</p>
                  <p><Phone className="me-2 text-primary" /> +54 11 1234-5678</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <div className="card border-primary">
                <div className="card-body">
                  <h5 className="card-title">
                    <Store size={32} className="me-2" /> 
                    Palermo
                  </h5>
                  <hr className="my-4" />
                  <p><MapPin className="me-2 text-primary" /> Av. Santa Fe 4567, Palermo, Buenos Aires, Argentina</p>
                  <p><Clock className="me-2 text-primary" /> Lunes a Viernes: 9:30 AM - 7:00 PM<br />Sábados: 10:00 AM - 3:00 PM<br />Domingos: Cerrado</p>
                  <p><Phone className="me-2 text-primary" /> +54 11 2345-6789</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
