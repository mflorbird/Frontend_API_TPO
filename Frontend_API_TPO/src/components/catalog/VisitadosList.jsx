// ProductList.jsx
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import {catalogService} from "../../services/catalogService.js";
import { AppContext } from '../../context/AppContext';
import { useContext } from 'react';


const VisitadosList = () => {

    const { user } = useContext(AppContext);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProducts = async () => {
            if (!user || user.visitados.length === 0) {
                setData([]);
                setLoading(false);
                return;
            }
            setLoading(true);
            try {
                const products = await catalogService.getRecentProducts()
                setData(products);
            } catch (error) {
                console.error(`Error loading products: ${error}`);
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, [user]);

    if (loading) return <p>Loading...</p>;

    // si no hay productos en visitados, no se muestra nada
    if (!data.length) return null;

    return (
        <div>
            <h2 className="text-left">Inspirado en lo último que viste</h2>
            <div className="container mt-3">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                    {data.map((product) => (
                        <div key={product.id} className="col">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default VisitadosList;