// src/pages/Home.jsx
import { useState, useEffect } from 'react';
import ProductList from "../components/catalog/ProductList.jsx";
import Carousel from "../components/catalog/Carousel.jsx";
import { getDestacados, getRecientes, getFavoritos } from "../services/catalogService.js";

const Home = () => {
    const [user, setUser] = useState(null);
    const [carouselImages, setCarouselImages] = useState([
        { src: 'carousel1.png', alt: 'Carousel 1' },
        { src: 'carousel2.png', alt: 'Carousel 2' },
        { src: 'carousel3.png', alt: 'Carousel 3' }
    ]);
    // mock data for destacados


    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        setUser(user);
    }, []);

    return (
        <>
            <Carousel images={carouselImages} />
            <div className="container mt-3">

                <ProductList getProducts={getDestacados} title="Imperdibles de la semana" />

                <ProductList getProducts={getDestacados} title="Calzado" />

                {user && (
                    <>
                        <ProductList getProducts={getRecientes} title="Productos Recientes" layout="list" />
                    </>
                )}
            </div>
        </>
    );
};

export default Home;