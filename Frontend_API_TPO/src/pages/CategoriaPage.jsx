import { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import DestacadosList from "../components/catalog/DestacadosList.jsx";
import CategoriaList from "../components/catalog/CategoriaList.jsx";
import Carousel from "../components/catalog/Carousel.jsx";
import "../styles/CategoriaPage.css";

const CategoriaPage = () => {
    const { categoria } = useParams();
    const [category, setCategory] = useState(categoria);

    const { user } = useContext(AppContext);
    const [carouselImages, setCarouselImages] = useState([
        { src: 'carousel1.png', alt: 'Carousel 1' },
        { src: 'carousel2.png', alt: 'Carousel 2' },
        { src: 'carousel3.png', alt: 'Carousel 3' }
    ]);

    useEffect(() => {
        setCategory(categoria);
    }, [categoria]);

    return (
        <div className="categoria-container">
            <div className="container mt-4">
                <section className="mb-5">
                    <h2 className="mb-4">Imperdibles de la semana</h2>
                    <DestacadosList />
                </section>
                <section className="mb-5">
                    <h2 className="mb-4">{category}</h2>
                    <CategoriaList categoria={category} />
                </section>
            </div>
        </div>
    );
};

export default CategoriaPage;