import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart } from 'lucide-react';

const CategoryProductsPage = () => {
    const { category } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const res = await fetch(`http://localhost:5000/api/products/category/${encodeURIComponent(category)}`);
                const data = await res.json();
                setProducts(data);
            } catch (error) {
                console.error("Failed to fetch products", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [category]);

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <button
                onClick={() => navigate('/categories')}
                className="flex items-center text-teal-700 font-medium mb-6 hover:text-teal-800 transition"
            >
                <ArrowLeft size={20} className="mr-2" /> Back to Categories
            </button>

            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                    Category: <span className="text-teal-700">{category}</span>
                </h1>
                <p className="text-gray-500">{products.length} medicines found</p>
            </div>

            {loading ? (
                <div className="text-center py-10">Loading products...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <div key={product._id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-bold text-gray-800 text-lg">{product.name}</h3>
                                    <p className="text-sm text-gray-500">{product.manufacturer}</p>
                                </div>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${product.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                                </span>
                            </div>

                            <div className="space-y-2 mb-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Packaging</span>
                                    <span className="font-medium text-gray-700">{product.packaging}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Price</span>
                                    <span className="font-bold text-teal-700">₹{product.price}</span>
                                </div>
                            </div>

                            <button className="w-full bg-teal-600 text-white py-2 rounded-xl font-medium hover:bg-teal-700 transition flex items-center justify-center space-x-2">
                                <ShoppingCart size={18} />
                                <span>Add to Cart</span>
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CategoryProductsPage;
