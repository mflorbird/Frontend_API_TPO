// ProductList.jsx
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";

const ProductList = ({ getProducts, title }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const products = await getProducts();
                setData(products);
                setLoading(false);
            } catch (error) {
                console.error(`Error loading ${title}:`, error);
                setLoading(false);
            }
        };
        loadProducts();
    }, [getProducts, title]);

    if (loading) return <p>Loading...</p>;

    return (
        <div className="container mt-3">
            <h2>{title}</h2>
            <div className="row">
                {data.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductList;