import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search/${encodeURIComponent(query)}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
      <div className="flex items-center space-x-3">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search medicines, health products, or ask a question..."
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-teal-500 transition-colors text-black"
          />
        </div>
        <button
          onClick={handleSearch}
          className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all"
        >
          Search
        </button>
      </div>
      <div className="mt-4 flex items-center space-x-4">
        <span className="text-sm text-gray-500">Popular:</span>
        {['Amoxicillin', 'Pain', 'Fever', 'Diabetes'].map((item) => (
          <button
            key={item}
            onClick={() => navigate(`/search/${item}`)}
            className="text-sm text-teal-600 hover:text-teal-700 hover:underline transition-colors"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
