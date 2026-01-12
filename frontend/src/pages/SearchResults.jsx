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
  const products = [
    {
      name: 'Paracetamol 500mg',
      manufacturer: 'Generic Pharma Ltd.',
      packaging: 'Strip of 10 tablets',
      price: 12,
      originalPrice: 15,
      bulkPrice100: 10.5,
      bulkPrice500: 9.5,
      bulkPrice1000: 8.5,
      rating: 4.5,
      inStock: true,
      stockCount: 5000,
      delivery: '24-48 hrs',
      minOrder: '100 units',
      discount: 20,
      trending: true,
      autoRefillAvailable: true
    },
    {
      name: 'Paracetamol 650mg',
      manufacturer: 'MediCure Industries',
      packaging: 'Strip of 15 tablets',
      price: 18,
      originalPrice: 22,
      bulkPrice100: 16,
      bulkPrice500: 14.5,
      bulkPrice1000: 13,
      rating: 4.7,
      inStock: true,
      stockCount: 3200,
      delivery: '24-48 hrs',
      minOrder: '50 units',
      discount: 18,
      trending: false,
      autoRefillAvailable: true
    },
    {
      name: 'Paracetamol 500mg (Branded)',
      manufacturer: 'HealthCare Plus',
      packaging: 'Bottle of 100 tablets',
      price: 95,
      originalPrice: 120,
      bulkPrice100: 85,
      bulkPrice500: 78,
      bulkPrice1000: 72,
      rating: 4.8,
      inStock: true,
      stockCount: 1500,
      delivery: '48-72 hrs',
      minOrder: '20 units',
      discount: 21,
      trending: false,
      autoRefillAvailable: true
    },
    {
      name: 'Paracetamol Suspension 120mg/5ml',
      manufacturer: 'PediCare Pharma',
      packaging: 'Bottle of 60ml',
      price: 45,
      originalPrice: 55,
      bulkPrice100: 40,
      bulkPrice500: 37,
      bulkPrice1000: 34,
      rating: 4.6,
      inStock: true,
      stockCount: 2800,
      delivery: '24-48 hrs',
      minOrder: '50 units',
      discount: 18,
      trending: true,
      autoRefillAvailable: true
    }
  ];

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
