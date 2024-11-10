import React from 'react';
import { Users, Bell, Star, Heart } from "lucide-react";
import "../styles/about.css";
import imgcabecera from '../assets/naikii.png';
import imgequipo from '../assets/equipo.jpg';

const About = () => {
  return (
    <div className="about-container">
      <div className="header-banner">
        <img src={imgcabecera} alt="Cabecera" className="header-image" />
      </div>
      
      <div className="text-section">
        <h2 className="section-title">Sobre Nosotros</h2>
        <p className="section-text">
          En NAIKII, somos más que una tienda de zapatillas. Somos un estilo de vida, una forma de expresión, y un compromiso con la comodidad y el diseño de calidad. Creemos que cada paso que das debe ser tan único como tú, y por eso seleccionamos cuidadosamente cada par de zapatillas para ofrecerte lo mejor en tendencia, innovación y confort.
          Desde nuestra fundación, hemos tenido una visión clara: poner a tu alcance las zapatillas más modernas, versátiles y cómodas, para que puedas vivir el día a día sin preocupaciones, pero siempre con estilo. Ya sea para entrenar, caminar por la ciudad o disfrutar de un momento de descanso, en NAIKII encontrarás ese par perfecto que se adapta a tu ritmo de vida.
        </p>
      </div>

      <div className="separator-image">
        <img src={imgequipo} alt="equipo" className="separator-image-content" />
      </div>

      <div className="text-section">
        <h2 className="section-title">Nuestro Proceso</h2>
        <div className="process-cards">
          {[
            {
              title: "Lo que nos distingue",
              description:
                "Nos apasiona la calidad y la sostenibilidad. Trabajamos con marcas que comparten nuestra visión de productos responsables con el medio ambiente.",
                icon: <Bell className="process-icon" />
            },
            {
              title: "Responsabilidades",
              description:
                "Nos tomamos muy en serio nuestra responsabilidad social y ambiental, promoviendo prácticas de producción sostenibles.",
                icon: <Star className="process-icon" />
            },
            {
              title: "Compromisos",
              description:
                "Nos esforzamos por ofrecerte una experiencia de compra simple y segura, con un servicio de atención al cliente dispuesto a ayudarte.",
                icon: <Heart className="process-icon" />
            },
          ].map((item, index) => (
            <div key={index} className="process-card">
                {item.icon} {/* Aquí se usa el ícono asignado */}
                <h3 className="process-title">{item.title}</h3>
                <p className="process-text">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
