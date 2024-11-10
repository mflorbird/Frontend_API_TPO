import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    return (
        <div className="card h-100">
            <img
                src={product.image}
                className="card-img-top"
                alt={product.model}
                style={{ objectFit: 'cover', height: '200px' }}
            />
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.model}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">
                    <strong>Precio: ${product.price}</strong>
                </p>
                <Link
                    to={`/producto/${product.id}`}
                    className="btn btn-primary mt-auto"
                >
                    Ver Producto
                </Link>
            </div>
        </div>
    );
};

export default ProductCard;