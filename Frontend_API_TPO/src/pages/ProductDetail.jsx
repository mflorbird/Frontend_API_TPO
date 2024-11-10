// src/pages/ProductDetail.jsx
import { useParams, useNavigate } from 'react-router-dom';
import {useState, useEffect, useContext} from 'react';
import { AppContext } from '../context/AppContext';
import { getProductById } from '../services/catalogService';
import { Button, ToggleButton, ButtonGroup } from 'react-bootstrap';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/ProductDetail.css';

const ProductDetail = () => {
    const { id } = useParams();
    const { user } = useContext(AppContext)
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedSize, setSelectedSize] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);


    useEffect(() => {
        const loadProduct = async () => {
            try {
                setLoading(true);
                const data = await getProductById(id);
                setProduct(data);
            } catch (error) {
                console.error("Error loading product:", error);
                navigate('/error');
            } finally {
                setLoading(false);
            }
        };

        loadProduct();
    }, [id, navigate]);
    console.log(product);

    const handleSizeSelect = (size) => {
        setSelectedSize(size);
    };

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
    };

    if (loading) {
        return <div className="container mt-5">Cargando...</div>;
    }

    if (!product) {
        return <div className="container mt-5">Producto no encontrado</div>;
    }

    return (
        <div className="product-detail-container">
            <div className="container my-5">
                <a href="/" className="text-decoration-none mb-4 d-block">
                    &larr; Volver al inicio
                </a>
                <div className="row">
                    <div className="col-md-6">
                        <img
                            src={product.image}
                            alt={product.model}
                            className="img-fluid rounded"
                        />
                    </div>
                    <div className="col-md-6">
                        <h1>{product.model}</h1>
                        <h2 className="text-primary">${product.price}</h2>
                        <p className="lead">{product.description}</p>

                        <div className="sizes mb-3">
                            <h5>Talle</h5>
                            <ButtonGroup className="mb-3">
                                {product.stockTotal.map(({size, stock}) => (
                                    <ToggleButton
                                        key={size}
                                        type="radio"
                                        variant={selectedSize === size ? "primary" : "outline-secondary"}
                                        name="size"
                                        value={size}
                                        checked={selectedSize === size}
                                        disabled={stock === 0}
                                        onClick={() => handleSizeSelect(size)}
                                    >
                                        {size}
                                    </ToggleButton>
                                ))}
                            </ButtonGroup>
                        </div>

                        {!user && (
                        <div className="mt-4">
                            <Button variant="primary"
                                    className="me-3 btn-lg"
                                    onClick={() => navigate("/login")}
                                    disabled={!selectedSize}>
                                Agregar al carrito
                            </Button>
                        </div>
                        )}
                            {user && (
                                <div className="mt-4">
                                    <Button variant="primary"
                                            className="me-3 btn-lg"
                                            onClick={() => navigate("/cart")}
                                            disabled={!selectedSize}>
                                        Agregar al carrito
                                    </Button>
                                    <Button
                                        variant="outline-secondary"
                                        onClick={toggleFavorite}
                                        className="btn-lg"
                                    >
                                        {isFavorite ? <BsHeartFill/> : <BsHeart/>}
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            );
            };

            export default ProductDetail;
