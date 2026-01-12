import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import FilterSidebar from '../components/FilterSidebar';
import ProductCard from '../components/ProductCard';

const SearchResults = ({ onLogout }) => {
  const { query } = useParams();
  const [searchQuery, setSearchQuery] = useState(query || '');

  // Mock Data for "Paracetamol"
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Update local state if URL param changes
    setSearchQuery(query || '');
  }, [query]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:5000/api/products/search?q=${encodeURIComponent(query || '')}`);

        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchProducts();
    } else {
      setProducts([]);
      setLoading(false);
    }
  }, [query]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 via-emerald-900 to-teal-950">
      <Header onLogout={onLogout} />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <SearchBar />

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">Search Results for "{searchQuery}"</h2>
            <p className="text-teal-100 mt-1">{products.length} products found</p>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-sm text-teal-100">Sort by:</span>
            <select className="px-4 py-2 bg-white/10 border border-teal-500/30 text-white rounded-lg focus:outline-none focus:border-teal-400">
              <option className="text-gray-900">Price: Low to High</option>
              <option className="text-gray-900">Price: High to Low</option>
              <option className="text-gray-900">Rating</option>
              <option className="text-gray-900">Popularity</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters */}
          <div className="lg:col-span-1">
            <FilterSidebar />
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {products.map((product, idx) => (
                <ProductCard key={idx} product={product} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SearchResults;
