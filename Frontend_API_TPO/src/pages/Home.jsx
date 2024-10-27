import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/home.css';
import carousel1 from '../assets/carousel1.png';
import carousel2 from '../assets/carousel2.png';
import carousel3 from '../assets/carousel3.png';

const Home = () => {
  const [data, setData] = useState([]);

  // Simulación de datos para productos destacados
  useEffect(() => {
    const mockData = [
      { id: 1, title: 'Producto 1', description: 'Descripción del Producto 1' },
      { id: 2, title: 'Producto 2', description: 'Descripción del Producto 2' },
      { id: 3, title: 'Producto 3', description: 'Descripción del Producto 3' },
    ];
    setData(mockData);
  }, []);

  return (
    <div>
      <main className="content">
        {/* Carrusel de imágenes */}
        <div id="carouselMain" className="carousel slide" data-bs-ride="carousel">
          {/* Indicadores del carrusel */}
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselMain" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Imagen 1"></button>
            <button type="button" data-bs-target="#carouselMain" data-bs-slide-to="1" aria-label="Imagen 2"></button>
            <button type="button" data-bs-target="#carouselMain" data-bs-slide-to="2" aria-label="Imagen 3"></button>
          </div>

          {/* Imágenes del carrusel */}
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={carousel1} className="img-fluid" alt="Imagen 1" />
              <div className="carousel-caption d-none d-md-block">    
              </div>
            </div>
            <div className="carousel-item">
              <img src={carousel2} className="img-fluid" alt="Imagen 2" />
              <div className="carousel-caption d-none d-md-block"></div>
            </div>
            <div className="carousel-item">
              <img src={carousel3} className="img-fluid" alt="Imagen 3" />
              <div className="carousel-caption d-none d-md-block"></div>
            </div>
          </div>

          {/* Controles de navegación */}
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselMain" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Anterior</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselMain" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Siguiente</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default Home;
