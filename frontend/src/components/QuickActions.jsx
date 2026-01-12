import React from 'react';
import { Upload, MapPin } from 'lucide-react';

const QuickActions = () => {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-gray-800 font-semibold mb-4">Quick Actions</h3>
            <button className="w-full flex items-center space-x-3 p-4 rounded-xl hover:bg-teal-50 transition-colors group">
                <div className="bg-teal-500 p-2 rounded-lg group-hover:scale-110 transition-transform">
                    <Upload className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                    <p className="text-gray-800 font-medium">Upload Prescription</p>
                    <p className="text-gray-500 text-sm">Get medicines delivered</p>
                </div>
            </button>
            <button className="w-full flex items-center space-x-3 p-4 rounded-xl hover:bg-teal-50 transition-colors group mt-2">
                <div className="bg-emerald-500 p-2 rounded-lg group-hover:scale-110 transition-transform">
                    <MapPin className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                    <p className="text-gray-800 font-medium">Find Nearby Pharmacy</p>
                    <p className="text-gray-500 text-sm">Locate stores near you</p>
                </div>
            </button>
        </div>
    );
};

export default QuickActions;
