// ProductList.jsx
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import { fetchProductsFromDb } from "../../services/catalogService";

const ProductList = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    //
    // const data = [
    //     { id: 1, name: 'Producto 1', price: 100, image: '01ZAPATILLAS.png', description: 'Producto 1 description' },
    //     { id: 2, name: 'Producto 2', price: 200, image: '08ZAPATILLAS.png', description: 'Producto 2 description' },
    //     { id: 3, name: 'Producto 3', price: 300, image: '05ZAPATILLAS.png', description: 'Producto 3 description' },
    //     { id: 4, name: 'Producto 4', price: 400, image: '01ZAPATILLAS.png', description: 'Producto 4 description' },
    //     { id: 5, name: 'Producto 5', price: 500, image: '01ZAPATILLAS.png', description: 'Producto 5 description' },
    //     { id: 6, name: 'Producto 6', price: 600, image: '01ZAPATILLAS.png', description: 'Producto 6 description' },
    //     { id: 7, name: 'Producto 7', price: 700, image: '01ZAPATILLAS.png', description: 'Producto 7 description' },
    //     { id: 8, name: 'Producto 8', price: 800, image: '01ZAPATILLAS.png', description: 'Producto 8 description' },
    //     { id: 9, name: 'Producto 9', price: 900, image: '01ZAPATILLAS.png', description: 'Producto 9 description' },
    //     { id: 10, name: 'Producto 10', price: 1000, image: '01ZAPATILLAS.png', description: 'Producto 10 description' }
    // ];

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const products = await fetchProductsFromDb();
                setData(products);
                setLoading(false);
            } catch (error) {
                console.error(`Error loading products: ${error}`);
                setLoading(false);
            }
        };
        loadProducts();
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <div className="container mt-3">
            <div className="row row-cols-lg-4 g-4">
                {data.map((product) => (
                    <div key={product.id} className="col">
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
