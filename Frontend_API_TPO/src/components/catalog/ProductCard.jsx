import Card from 'react-bootstrap/Card';


const ProductCard = ( { product } ) => {
    return (
        <Card className="col-md-3">
            <Card.Img variant="top" src={product.image} />
            <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>
                    {product.description}
                    {product.price}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default ProductCard;