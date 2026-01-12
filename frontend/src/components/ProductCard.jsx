import React, { useState } from 'react';
import { ShoppingCart, Pill, TrendingUp, Star, Package, Truck, Clock, RefreshCw, Settings, Calendar, BarChart3 } from 'lucide-react';

const ProductCard = ({ product }) => {
    const [quantity, setQuantity] = useState(1);
    const [showAutoRefill, setShowAutoRefill] = useState(false);

    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group">
            <div className="relative">
                <div className="bg-gradient-to-br from-teal-100 to-emerald-100 h-48 flex items-center justify-center">
                    <Pill className="w-20 h-20 text-teal-600" />
                </div>
                {product.discount && (
                    <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        -{product.discount}%
                    </div>
                )}
                {product.trending && (
                    <div className="absolute top-3 left-3 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
                        <TrendingUp className="w-3 h-3" />
                        <span>Trending</span>
                    </div>
                )}
            </div>

            <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                        <h3 className="font-bold text-gray-800 text-lg mb-1">{product.name}</h3>
                        <p className="text-sm text-gray-500">{product.manufacturer}</p>
                    </div>
                    <div className="flex items-center space-x-1 bg-yellow-50 px-2 py-1 rounded-lg">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm font-semibold text-gray-700">{product.rating}</span>
                    </div>
                </div>

                <div className="flex items-center space-x-2 mb-3">
                    <Package className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{product.packaging}</span>
                </div>

                {/* Pricing */}
                <div className="mb-4">
                    <div className="flex items-baseline space-x-2 mb-2">
                        <span className="text-2xl font-bold text-teal-600">₹{product.price}</span>
                        {product.originalPrice && (
                            <span className="text-sm text-gray-400 line-through">₹{product.originalPrice}</span>
                        )}
                        <span className="text-xs text-gray-500">per unit</span>
                    </div>

                    {/* Bulk Pricing */}
                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 space-y-1">
                        <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-600">100+ units</span>
                            <span className="font-semibold text-emerald-700">₹{product.bulkPrice100}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-600">500+ units</span>
                            <span className="font-semibold text-emerald-700">₹{product.bulkPrice500}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-600">1000+ units</span>
                            <span className="font-semibold text-emerald-700">₹{product.bulkPrice1000}</span>
                        </div>
                    </div>
                </div>

                {/* Stock Status */}
                <div className="flex items-center space-x-2 mb-4">
                    {product.inStock ? (
                        <>
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-sm text-green-700 font-medium">{product.stockCount} units in stock</span>
                        </>
                    ) : (
                        <>
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            <span className="text-sm text-red-700 font-medium">Out of stock</span>
                        </>
                    )}
                </div>

                {/* Delivery Info */}
                <div className="flex items-center space-x-4 text-xs text-gray-600 mb-4 pb-4 border-b">
                    <div className="flex items-center space-x-1">
                        <Truck className="w-4 h-4" />
                        <span>{product.delivery}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>Min order: {product.minOrder}</span>
                    </div>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center space-x-2 mb-4">
                    <span className="text-sm text-gray-600 font-medium">Quantity:</span>
                    <div className="flex items-center space-x-2 border-2 border-gray-200 rounded-lg">
                        <button
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="px-3 py-1 hover:bg-gray-100 transition-colors"
                        >
                            -
                        </button>
                        <span className="px-4 font-semibold">{quantity}</span>
                        <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="px-3 py-1 hover:bg-gray-100 transition-colors"
                        >
                            +
                        </button>
                    </div>
                    <span className="text-xs text-gray-500">units</span>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                    <button className="w-full bg-gradient-to-r from-teal-600 to-teal-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all flex items-center justify-center space-x-2">
                        <ShoppingCart className="w-5 h-5" />
                        <span>Add to Cart</span>
                    </button>

                    {product.autoRefillAvailable && (
                        <>
                            <button
                                onClick={() => setShowAutoRefill(!showAutoRefill)}
                                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all flex items-center justify-center space-x-2"
                            >
                                <RefreshCw className="w-5 h-5" />
                                <span>Setup Auto-Refill</span>
                            </button>

                            {showAutoRefill && (
                                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-xl p-4 mt-2">
                                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center space-x-2">
                                        <Settings className="w-4 h-4" />
                                        <span>Configure Auto-Refill</span>
                                    </h4>

                                    <div className="space-y-3">
                                        <div>
                                            <label className="text-sm text-gray-600 mb-1 block">Frequency</label>
                                            <select className="w-full px-3 py-2 border-2 border-emerald-200 rounded-lg focus:outline-none focus:border-emerald-400">
                                                <option>Weekly</option>
                                                <option>Bi-weekly</option>
                                                <option>Monthly</option>
                                                <option>Quarterly</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="text-sm text-gray-600 mb-1 block">Quantity per delivery</label>
                                            <input
                                                type="number"
                                                defaultValue="100"
                                                className="w-full px-3 py-2 border-2 border-emerald-200 rounded-lg focus:outline-none focus:border-emerald-400"
                                            />
                                        </div>

                                        <div>
                                            <label className="text-sm text-gray-600 mb-1 block">Start date</label>
                                            <div className="flex items-center space-x-2 px-3 py-2 border-2 border-emerald-200 rounded-lg">
                                                <Calendar className="w-4 h-4 text-gray-400" />
                                                <input
                                                    type="date"
                                                    className="flex-1 focus:outline-none bg-transparent"
                                                />
                                            </div>
                                        </div>

                                        <div className="bg-white rounded-lg p-3 space-y-2">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-gray-600">Auto-Refill Discount:</span>
                                                <span className="font-semibold text-emerald-700">5% Extra Off</span>
                                            </div>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-gray-600">Estimated Monthly Cost:</span>
                                                <span className="font-bold text-gray-800">₹{product.price * 100 * 0.95 * 4}</span>
                                            </div>
                                        </div>

                                        <button className="w-full bg-emerald-600 text-white py-2 rounded-lg font-semibold hover:bg-emerald-700 transition-colors">
                                            Activate Auto-Refill
                                        </button>
                                    </div>
                                </div>
                            )}
                        </>
                    )}

                    <button className="w-full border-2 border-teal-500 text-teal-600 py-3 rounded-xl font-semibold hover:bg-teal-50 transition-all flex items-center justify-center space-x-2">
                        <BarChart3 className="w-5 h-5" />
                        <span>View Details</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
