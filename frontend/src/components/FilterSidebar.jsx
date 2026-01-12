import React from 'react';
import { Filter } from 'lucide-react';

const FilterSidebar = () => {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="font-bold text-gray-800 flex items-center space-x-2">
                    <Filter className="w-5 h-5" />
                    <span>Filters</span>
                </h3>
                <button className="text-teal-600 text-sm hover:underline">Clear All</button>
            </div>

            {/* Category Filter */}
            <div>
                <h4 className="font-semibold text-gray-700 mb-3">Category</h4>
                <div className="space-y-2">
                    {['Prescription', 'OTC Medicines', 'Generic', 'Branded'].map((cat) => (
                        <label key={cat} className="flex items-center space-x-2 cursor-pointer hover:bg-teal-50 p-2 rounded-lg transition-colors">
                            <input type="checkbox" className="w-4 h-4 text-teal-600 rounded" />
                            <span className="text-sm text-gray-700">{cat}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Price Range */}
            <div>
                <h4 className="font-semibold text-gray-700 mb-3">Price Range (per unit)</h4>
                <div className="space-y-2">
                    {['Under ₹50', '₹50 - ₹100', '₹100 - ₹500', 'Above ₹500'].map((range) => (
                        <label key={range} className="flex items-center space-x-2 cursor-pointer hover:bg-teal-50 p-2 rounded-lg transition-colors">
                            <input type="checkbox" className="w-4 h-4 text-teal-600 rounded" />
                            <span className="text-sm text-gray-700">{range}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Bulk Discount */}
            <div>
                <h4 className="font-semibold text-gray-700 mb-3">Bulk Discounts</h4>
                <div className="space-y-2">
                    {['10%+ discount', '20%+ discount', '30%+ discount'].map((disc) => (
                        <label key={disc} className="flex items-center space-x-2 cursor-pointer hover:bg-teal-50 p-2 rounded-lg transition-colors">
                            <input type="checkbox" className="w-4 h-4 text-teal-600 rounded" />
                            <span className="text-sm text-gray-700">{disc}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Auto-Refill Available */}
            <div>
                <h4 className="font-semibold text-gray-700 mb-3">Features</h4>
                <div className="space-y-2">
                    <label className="flex items-center space-x-2 cursor-pointer hover:bg-teal-50 p-2 rounded-lg transition-colors">
                        <input type="checkbox" className="w-4 h-4 text-teal-600 rounded" />
                        <span className="text-sm text-gray-700">Auto-Refill Available</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer hover:bg-teal-50 p-2 rounded-lg transition-colors">
                        <input type="checkbox" className="w-4 h-4 text-teal-600 rounded" />
                        <span className="text-sm text-gray-700">Same Day Delivery</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer hover:bg-teal-50 p-2 rounded-lg transition-colors">
                        <input type="checkbox" className="w-4 h-4 text-teal-600 rounded" />
                        <span className="text-sm text-gray-700">In Stock</span>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default FilterSidebar;
