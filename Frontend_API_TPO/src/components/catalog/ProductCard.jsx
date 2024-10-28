import PropTypes from 'prop-types';

const ProductCard = ( { product } ) => {
    return (
        <div className="card shadow-sm">
            <img src={product.image} alt={product.name} className="card-img-top" />
            <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">Price: {product.price}</p>
            </div>
        </div>
    );
}

ProductCard.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
    }).isRequired,
};

export default ProductCard;