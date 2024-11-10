// ProductList.jsx
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import { getVisitados } from "../../services/catalogService.js";
import { AppContext } from '../../context/AppContext';
import { useContext } from 'react';


const VisitadosList = () => {

    const { user } = useContext(AppContext);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);


    // const data = [
    //     { id: 1, name: 'Producto 1', price: 100, image: '01ZAPATILLAS.png', description: 'Producto 1 description' },
    //     { id: 2, name: 'Producto 2', price: 200, image: '08ZAPATILLAS.png', description: 'Producto 2 description' },
    //     { id: 3, name: 'Producto 3', price: 300, image: '05ZAPATILLAS.png', description: 'Producto 3 description' },
    //     { id: 4, name: 'Producto 4', price: 400, image: '01ZAPATILLAS.png', description: 'Producto 4 description' }
    // ];

    useEffect(() => {
        const loadProducts = async () => {
            if (user.favoritos.length === 0) {
                setLoading(false);
                return;
            }
            try {
                const products = await getVisitados( user );
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

    if (!data.length) return <p>No hay productos visitados</p>;

    return (
        <div className="container mt-3">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                {data.map((product) => (
                    <div key={product.id} className="col">
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VisitadosList;