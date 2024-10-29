
const Carousel = ({ images }) => {
    return (
        <div>
            <main className="content">
                <div id="carouselMain" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        {images.map((image, index) => (
                            <button
                                key={index}
                                type="button"
                                data-bs-target="#carouselExampleIndicators"
                                data-bs-slide-to={index}
                                className={index === 0 ? 'active' : ''}
                                aria-current={index === 0 ? 'true' : 'false'}
                                aria-label={`Slide ${index + 1}`}
                            ></button>
                        ))}
                    </div>

                    <div className="carousel-inner">
                        {images.map((image, index) => (
                            <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                <img src={image.src} className="d-block w-100" alt={image.alt}/>

                            </div>
                        ))}
                    </div>
                    <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target="#carouselMain"
                        data-bs-slide="prev"
                    >
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Anterior</span>
                    </button>
                    <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#carouselMain"
                        data-bs-slide="next"
                    >
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Siguiente</span>
                    </button>

        </div>
        </main>
        </div>
    );
};

export default Carousel;