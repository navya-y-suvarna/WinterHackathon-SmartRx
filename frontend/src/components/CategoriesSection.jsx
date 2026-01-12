import React from 'react';
import { Pill, Droplet, ClipboardList, History } from 'lucide-react';
import CategoryCard from './CategoryCard';

import { useNavigate } from 'react-router-dom';

const CategoriesSection = () => {
    const navigate = useNavigate();

    const categories = [
        { icon: Pill, title: 'Medicines', itemCount: '500+ items', color: 'bg-pink-500', bgColor: 'bg-pink-50', onClick: () => navigate('/categories') },
        { icon: Droplet, title: 'Vitamins', itemCount: '200+ items', color: 'bg-amber-500', bgColor: 'bg-amber-50' },
        { icon: ClipboardList, title: 'Track Order', itemCount: 'Active', color: 'bg-blue-500', bgColor: 'bg-blue-50' },
        { icon: History, title: 'Order History', itemCount: 'Past Orders', color: 'bg-purple-500', bgColor: 'bg-purple-50' },
    ];

    return (
        <div className="mb-6">
            <div className="flex items-center space-x-2 mb-4">
                <div className="w-1 h-6 bg-[#B153D7] rounded"></div>
                <h2 className="text-xl font-bold text-white">Categories</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {categories.map((cat, idx) => (
                    <div key={idx} onClick={cat.onClick} className="cursor-pointer">
                        <CategoryCard {...cat} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoriesSection;
