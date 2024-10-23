import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Destacados.css';

function Destacados() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel 
    activeIndex={index} 
    onSelect={handleSelect}
    nextIcon={<span aria-hidden="true" className="carousel-control-next-icon" />} // Ícono "siguiente"
    prevIcon={<span aria-hidden="true" className="carousel-control-prev-icon" />} // Ícono "anterior"
  >
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/z1.jpg" // Reemplaza con tu ruta de imagen
          alt="Primera diapositiva"
          style={{ height: '400px', objectFit: 'cover' }}
        />
        <Carousel.Caption>
          <h3>Primera diapositiva</h3>
          <p>Descripción de la primera diapositiva.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/z2.jpg" // Reemplaza con tu ruta de imagen
          alt="Segunda diapositiva"
          style={{ height: '400px', objectFit: 'cover' }}
        />
        <Carousel.Caption>
          <h3>Segunda diapositiva</h3>
          <p>Descripción de la segunda diapositiva.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/z3.jpg" // Reemplaza con tu ruta de imagen
          alt="Tercera diapositiva"
          style={{ height: '400px', objectFit: 'cover' }}
        />
        <Carousel.Caption>
          <h3>Tercera diapositiva</h3>
          <p>Descripción de la tercera diapositiva.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Destacados;