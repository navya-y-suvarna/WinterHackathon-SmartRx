import React from 'react';

const CategoryCard = ({ icon: Icon, title, itemCount, color, bgColor }) => {
    return (
        <div className={`bg-white/95 backdrop-blur-sm border-2 border-slate-200 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_8px_48px_0_rgba(255,255,255,0.4)] hover:border-white group`}>
            <div className={`${color} w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <Icon className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-gray-800 font-semibold text-lg mb-1">{title}</h3>
            <p className="text-gray-500 text-sm">{itemCount}</p>
        </div>
    );
};

export default CategoryCard;
