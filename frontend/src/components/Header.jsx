import React from 'react';
import { FileText, ShoppingCart, LogOut, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo2.png';

const Header = ({ onLogout }) => {
  const navigate = useNavigate();

  return (
    <header className="bg-transparent text-white px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <img
          src={logo}
          alt="SmartRx"
          className="h-14 w-auto object-contain cursor-pointer"
          onClick={() => navigate('/')}
        />
        <div className="flex items-center space-x-4">
          <button
            className="hover:bg-white/10 p-2 rounded-lg transition-colors"
            onClick={() => navigate('/')}
            title="Home"
          >
            <Home className="w-5 h-5" />
          </button>
          <button className="hover:bg-white/10 p-2 rounded-lg transition-colors" onClick={onLogout} title="Logout">
            <LogOut className="w-5 h-5" />
          </button>
          <button className="hover:bg-white/10 p-2 rounded-lg transition-colors">
            <FileText className="w-5 h-5" />
          </button>
          <button className="relative hover:bg-white/10 p-2 rounded-lg transition-colors">
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              2
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
