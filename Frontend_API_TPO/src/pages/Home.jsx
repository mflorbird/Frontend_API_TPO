import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/home.css';

const Home = () => {
  const [data, setData] = useState([]);

  // Simulación de datos 
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
      <main className="home-content">
        <h1>Bienvenido a Naikii</h1>
        <h2>Productos destacados</h2>
        <ul className="product-list">
          {data.map(item => (
            <li key={item.id} className="product-item">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </li>
          ))}
        </ul>
      </main>
      
    </div>
  );
};

export default Home;
