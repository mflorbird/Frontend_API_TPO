// src/pages/Home.jsx
import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import DestacadosList from "../components/catalog/DestacadosList.jsx";
import FavoritosList from "../components/catalog/FavoritosList.jsx";
import RecientesList from "../components/catalog/RecientesList.jsx";
import ProductList from "../components/catalog/ProductList.jsx";
import Carousel from "../components/catalog/Carousel.jsx";
import "../styles/Home.css";

const Home = () => {

    const { user } = useContext(AppContext)
    const [carouselImages, setCarouselImages] = useState([
        { src: 'carousel1.png', alt: 'Carousel 1' },
        { src: 'carousel2.png', alt: 'Carousel 2' },
        { src: 'carousel3.png', alt: 'Carousel 3' }
    ]);

    console.log(user);

    return (
        <div className="home-container">
            <div className="carousel-wrapper">
                <Carousel images={carouselImages}/>
            </div>

            <div className="container mt-4">

                {user && (
                    <>
                    <section className="mb-5">
                        <h2 className="mb-4">Inspirado en tus favoritos</h2>
                        <FavoritosList/>
                    </section>
                    </>
                )}

                    <section className="mb-5">
                        <h2 className="mb-4">Imperdibles de la semana</h2>
                    <DestacadosList/>
                </section>

                {user && (
                    <>
                        <section className="mb-5">
                            <h2 className="mb-4">Inspirado en lo último que viste</h2>
                            <RecientesList/>
                        </section>
                    </>
                )}

                <section className="mb-5">
                    <h2 className="mb-4">Calzado</h2>
                    <ProductList/>
                </section>

            </div>
        </div>
    );
};

export default Home;