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

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        setUser(user);
    }, []);

    return (
        <>
            <Carousel images={carouselImages} />
            <div className="container mt-3">
                {/* Product Lists */}
                <h2>Destacados de la semana</h2>
                <ProductList getProducts={getDestacados} title="Featured Products" layout="list" />

                <h2>Productos en Matriz</h2>
                <ProductList getProducts={getFavoritos} title="Favorite Products" layout="grid" />

                {/* Conditional Components for Logged-in User */}
                {user && (
                    <>
                        <h2>Productos Recientes</h2>
                        <ProductList getProducts={getRecientes} title="Featured Products" layout="list" />
                    </>
                )}
            </div>
        </>
    );
};

export default Home;