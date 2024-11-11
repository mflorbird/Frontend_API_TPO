// src/pages/Home.jsx
import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import DestacadosList from "../components/catalog/DestacadosList.jsx";
import FavoritosList from "../components/catalog/FavoritosList.jsx";
import VisitadosList from "../components/catalog/VisitadosList.jsx";
import ProductList from "../components/catalog/ProductList.jsx";
import Carousel from "../components/catalog/Carousel.jsx";
import carousel1 from "../assets/carousel1.png";
import carousel2 from "../assets/carousel2.png";
import carousel3 from "../assets/carousel3.png";
import "../styles/Home.css";


const Home = () => {

    const { user } = useContext(AppContext)
    const [carouselImages] = useState([
        { src: carousel1, alt: 'Carousel 1' },
        { src: carousel2, alt: 'Carousel 2' },
        { src: carousel3, alt: 'Carousel 3' }
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
                            <VisitadosList/>
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