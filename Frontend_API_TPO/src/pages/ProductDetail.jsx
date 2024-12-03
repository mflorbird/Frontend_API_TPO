import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import {catalogService} from '../services/catalogService';
import { Button, ToggleButton, ButtonGroup } from 'react-bootstrap';
import { BsHeart, BsHeartFill, BsCheckCircleFill  } from 'react-icons/bs';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/ProductDetail.css';

const ProductDetail = () => {
    const { id } = useParams();
    const { user, actualizarFavoritos, actualizarVisitados, addItemToCart, cart } = useContext(AppContext);
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedSize, setSelectedSize] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [showConfirmation, setShowConfirmation] = useState(false); // Nuevo estado para el mensaje

    useEffect(() => {
        const loadProduct = async () => {
            try {
                setLoading(true);
                const data = await catalogService.getProductById(id);
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

    useEffect(() => {
        if (user && product) {
            setIsFavorite(user.favoritos.includes(product.id));
            const nuevosVisitados = [...user.visitados];
            if (!nuevosVisitados.includes(product.id)) {
                nuevosVisitados.push(product.id);
            }
            actualizarVisitados(user, nuevosVisitados);
        }
    }, [user, id, product]);

    const handleSizeSelect = (size) => {
        setSelectedSize(size);
    };

    const handleAddToCart = async () => {
        if (!selectedSize) {
            alert("Selecciona un talle antes de agregar al carrito.");
            return;
        }

        if (!user) {
            navigate("/login");
            return;
        }

        try {
            const cartItem = {
                id: product.id,
                size: selectedSize,
                quantity: quantity,
                price: product.price,
                model: product.model,
                image: product.image
            };

            await addItemToCart(cartItem);

            setShowConfirmation(true);

            setTimeout(() => setShowConfirmation(false), 1500);

            console.log('Producto agregado exitosamente', cartItem);
            console.log('Producto agregado exitosamente', cart);
            console.log('Carrito actualizado', cart);
        } catch (error) {
            console.error("Error al agregar al carrito:", error);
            alert("Hubo un error al agregar el producto al carrito.");
        }
    };

    const toggleFavorite = async () => {
        if (!user) {
            navigate("/login");
            return;
        }

        try {
            let nuevosFavoritos;
            const productId = product.id;

            if (isFavorite) {
                nuevosFavoritos = user.favoritos.filter(fav => fav !== productId);
            } else {
                nuevosFavoritos = [...user.favoritos, productId];
            }

            await actualizarFavoritos(user, nuevosFavoritos);
            setIsFavorite(!isFavorite);
        } catch (error) {
            console.error("Error al actualizar favoritos:", error);
        }
    };

    if (!product) {
        return <div className="container mt-5">Producto no encontrado</div>;
    }

    return (
        <div className="product-detail-container">
            <div className="container my-5">
                <Link to="/" className="text-decoration-none mb-4 d-block">
                    &larr; Volver al inicio
                </Link>
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

                        <div className="quantity mb-3">
                            <h5>Cantidad</h5>
                            <div className="d-flex align-items-center">
                                <Button
                                    variant="outline-secondary"
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                >
                                    -
                                </Button>
                                <span className="mx-3">{quantity}</span>
                                <Button
                                    variant="outline-secondary"
                                    onClick={() => setQuantity(quantity + 1)}
                                >
                                    +
                                </Button>
                            </div>
                        </div>

                        <div className="mt-4 d-flex align-items-center">
                            <Button
                                variant="primary"
                                className="me-3 btn-lg"
                                onClick={handleAddToCart}
                                disabled={!selectedSize}
                            >
                                Agregar al carrito
                            </Button>
                            {user && (
                                <>
                                    <Button
                                        variant="outline-secondary"
                                        onClick={toggleFavorite}
                                        className="btn-lg me-2"
                                    >
                                        {isFavorite ? <BsHeartFill color="red"/> : <BsHeart/>}
                                    </Button>

                                    {showConfirmation && (
                                        <div
                                            className="d-flex align-items-center"
                                            style={{ color: 'green' }}
                                            
                                        >
                                            <BsCheckCircleFill  size={30} />
                                            <p className="mb-0 ms-2">Se agregó</p>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
