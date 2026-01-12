import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Pill } from 'lucide-react';

const CategoriesPage = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                // Fetch from port 5000
                const res = await fetch('http://localhost:5000/api/products/categories');
                const data = await res.json();
                setCategories(data);
            } catch (error) {
                console.error("Failed to fetch categories", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <button
                onClick={() => navigate('/')}
                className="flex items-center text-teal-700 font-medium mb-6 hover:text-teal-800 transition"
            >
                <ArrowLeft size={20} className="mr-2" /> Back to Home
            </button>

            <h1 className="text-3xl font-bold text-gray-800 mb-8">Medicine Categories</h1>

            {loading ? (
                <div className="text-center text-gray-500 py-10">Loading categories...</div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {categories.map((cat, idx) => (
                        <div
                            key={idx}
                            onClick={() => navigate(`/category/${encodeURIComponent(cat)}`)}
                            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md cursor-pointer transition border border-gray-100 flex flex-col items-center text-center group"
                        >
                            <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-teal-200 transition">
                                <Pill className="text-teal-600" size={24} />
                            </div>
                            <h3 className="font-semibold text-gray-800 group-hover:text-teal-700">{cat}</h3>
                            <span className="text-xs text-gray-400 mt-1">View Products</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CategoriesPage;
