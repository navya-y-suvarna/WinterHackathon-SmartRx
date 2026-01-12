import React from 'react';
import { FileText, ShoppingCart, LogOut } from 'lucide-react';
import logo from '../assets/logo2.png';

const Header = ({ onLogout }) => {
  return (
    <header className="bg-transparent text-white px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img src={logo} alt="SmartRx Logo" className="w-16 h-16 object-contain" />
          <div>
            <h1 className="text-2xl font-bold">SmartRx</h1>
            <p className="text-xs text-teal-100">Your Health, Our Priority</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
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
