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
    <div className="bg-white/95 backdrop-blur-sm border-2 border-[#59B3FC]/40 rounded-2xl shadow-[0_8px_32px_0_rgba(89,179,252,0.4)] p-6 mb-6 transition-all duration-300 hover:shadow-[0_8px_48px_0_rgba(89,179,252,0.7)] hover:border-[#59B3FC]/60 hover:scale-[1.01]">
      <div className="flex items-center space-x-3">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search medicines, health products, or ask a question..."
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#B153D7] transition-colors text-black"
          />
        </div>
        <button
          onClick={handleSearch}
          className="bg-[#FB8A4B] text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 hover:bg-[#FB8A4B]/90 transition-all w-24 md:w-auto"
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
            className="text-sm text-[#59B3FC] hover:text-[#59B3FC]/80 hover:underline transition-colors font-medium"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
