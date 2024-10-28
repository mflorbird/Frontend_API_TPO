// ProductList.jsx
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";

const ProductList = ({ getProducts, title }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    //
    const destacados = [
        { id: 1, name: 'Producto 1', price: 100, image: '01ZAPATILLAS.png', description: 'Producto 1 description' },
        { id: 2, name: 'Producto 2', price: 200, image: '08ZAPATILLAS.png', description: 'Producto 2 description' },
        { id: 3, name: 'Producto 3', price: 300, image: '05ZAPATILLAS.png', description: 'Producto 3 description' }
    ];

    // useEffect(() => {
    //     const loadProducts = async () => {
    //         try {
    //             const products = await getProducts();
    //             setData(products);
    //             setLoading(false);
    //         } catch (error) {
    //             console.error(`Error loading ${title}:`, error);
    //             setLoading(false);
    //         }
    //     };
    //     loadProducts();
    // }, [getProducts, title]);

    // if (loading) return <p>Loading...</p>;

    return (
        <div className="container mt-3">
            <h2>{title}</h2>
            <div className="row">
                {destacados.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductList;