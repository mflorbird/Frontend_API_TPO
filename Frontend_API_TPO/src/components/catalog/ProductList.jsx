// ProductList.jsx
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import { fetchProductsFromDb } from "../../services/catalogService";

const ProductList = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const products = await fetchProductsFromDb();
                setData(products);
                setLoading(false);

                const uniqueCategories = ["All", ...new Set(products.map((product) => product.category))];
                setCategories(uniqueCategories);
            } catch (error) {
                console.error(`Error loading products: ${error}`);
                setLoading(false);
            }
        };
        loadProducts();
    }, []);

    const filteredData = selectedCategory === "All"
        ? data
        : data.filter((product) => product.category === selectedCategory);

    if (loading) return <p>Loading...</p>;

    return (
        <div className="container mt-3">
            <div className="mb-3">
                <label htmlFor="categoryFilter" className="form-label">Filtrar por categoría:</label>
                <select
                    id="categoryFilter"
                    className="form-select"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>

            <div className="row row-cols-lg-4 g-4">
                {filteredData.map((product) => (
                    <div key={product.id} className="col">
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
