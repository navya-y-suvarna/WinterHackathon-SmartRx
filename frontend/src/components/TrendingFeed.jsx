import React, { useState, useEffect } from 'react';
import { Sparkles, Calendar, ArrowRight } from 'lucide-react';

const TrendingFeed = () => {
    const [trends, setTrends] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        const fetchTrends = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/products/trends');
                if (!res.ok) throw new Error(`Server error: ${res.status}`);
                const data = await res.json();
                setTrends(data);
            } catch (error) {
                console.error("Error fetching trends:", error);
                setErrorMsg(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTrends();
    }, []);

    if (loading) return <div className="text-white text-center py-2 bg-teal-800/50 text-xs">Loading insights...</div>;
    if (errorMsg) return <div className="text-red-300 text-center py-2 bg-red-900/20 text-xs">Unable to load trends: {errorMsg}</div>;
    if (!trends) return <div className="text-red-300 text-center py-2 bg-red-900/20 text-xs">Understanding seasonal data...</div>;

    return (
        <div className="w-full bg-teal-900/40 backdrop-blur-sm border-y border-white/10 overflow-hidden">
            <div className="max-w-7xl mx-auto flex items-center h-12 relative group cursor-pointer">
                {/* Fixed Label */}
                <div className="bg-teal-600 text-white px-4 h-full flex items-center z-10 font-bold text-sm shadow-lg whitespace-nowrap">
                    <Sparkles className="w-4 h-4 mr-2 text-yellow-300 animate-pulse" />
                    SMARTRX INSIGHTS
                </div>

                {/* Sliding Content */}
                <div className="flex-1 overflow-hidden relative h-full flex items-center">
                    <div className="animate-marquee whitespace-nowrap flex items-center space-x-12 px-4 text-sm text-teal-50">
                        {/* Current Month Trends */}
                        <div className="flex items-center space-x-2">
                            <span className="font-semibold text-white bg-white/10 px-2 py-0.5 rounded uppercase text-xs">
                                {trends.currentMonth} Trends
                            </span>
                            <span>
                                High demand for: <span className="text-white font-medium">{trends.trending.map(t => (t.allowed_categories || t.symptoms).replace(/"/g, '')).join(", ")}</span>
                            </span>
                        </div>

                        {/* Next Month Forecast */}
                        {trends.upcoming.length > 0 && (
                            <div className="flex items-center space-x-2">
                                <span className="font-semibold text-white bg-emerald-500/20 px-2 py-0.5 rounded uppercase text-xs flex items-center border border-emerald-500/30">
                                    <Calendar className="w-3 h-3 mr-1" />
                                    Forecast: {trends.nextMonth}
                                </span>
                                <span>
                                    Prepare stock for: <span className="text-emerald-200 font-medium">{trends.upcoming.map(t => (t.allowed_categories || t.symptoms).replace(/"/g, '')).join(", ")}</span>
                                </span>
                            </div>
                        )}

                        {/* Duplicate for seamless loop (simplified) */}
                        <div className="flex items-center space-x-2 opacity-50">
                            <span className="mx-4 text-teal-500/50">|</span>
                            <span>Stay ahead of the curve with SmartRx Analytics</span>
                        </div>
                    </div>
                </div>

                <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-teal-900 via-teal-900/80 to-transparent z-10 pointer-events-none"></div>
            </div>
        </div>
    );
};

export default TrendingFeed;
