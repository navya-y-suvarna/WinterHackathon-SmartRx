import React from 'react';

const CategoryCard = ({ icon: Icon, title, itemCount, color, bgColor }) => {
    return (
        <div className={`${bgColor} rounded-2xl p-6 cursor-pointer transition-all hover:scale-105 hover:shadow-xl group`}>
            <div className={`${color} w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <Icon className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-gray-800 font-semibold text-lg mb-1">{title}</h3>
            <p className="text-gray-500 text-sm">{itemCount}</p>
        </div>
    );
};

export default CategoryCard;
