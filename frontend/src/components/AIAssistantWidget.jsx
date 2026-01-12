import React, { useState } from 'react';
import { MessageSquare, Pill, Activity, MapPin, Send, Maximize2, Minimize2 } from 'lucide-react';

const AIAssistantWidget = () => {
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([
        { type: 'bot', text: "👋 Hello! I'm your SmartRx AI assistant. How can I help you today?" }
    ]);
    const [loading, setLoading] = useState(false);
    const [isMaximized, setIsMaximized] = useState(false);

    const messagesEndRef = React.useRef(null);

    React.useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatHistory]);

    const handleLocatePharmacy = () => {
        if (!navigator.geolocation) {
            setChatHistory(prev => [...prev, { type: 'bot', text: "❌ Geolocation is not supported by your browser." }]);
            return;
        }

        setChatHistory(prev => [...prev, { type: 'bot', text: "📍 Locating nearby pharmacies..." }]);

        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            const url = `https://www.google.com/maps/search/pharmacies/@${latitude},${longitude},15z`;
            window.open(url, '_blank');
            setChatHistory(prev => [...prev, { type: 'bot', text: "✅ Opened verified nearby pharmacies in Google Maps." }]);
        }, (error) => {
            console.error("Error getting location:", error);
            setChatHistory(prev => [...prev, { type: 'bot', text: "⚠️ Unable to access location. Opening general search." }]);
            window.open("https://www.google.com/maps/search/pharmacies/", '_blank');
        });
    };

    const handleSend = async (customMessage = null) => {
        const msgText = typeof customMessage === 'string' ? customMessage : message;

        if (!msgText || !msgText.trim()) return;

        // Intercept "Near pharmacies" intent client-side (Local Feature)
        if (msgText.toLowerCase().includes('near pharmacies') || msgText.toLowerCase().includes('nearby pharmacy')) {
            if (typeof customMessage !== 'string') setMessage('');
            const userMsg = { type: 'user', text: msgText };
            setChatHistory(prev => [...prev, userMsg]);
            handleLocatePharmacy();
            return;
        }

        const userMsg = { type: 'user', text: msgText };
        setChatHistory(prev => [...prev, userMsg]);

        if (typeof customMessage !== 'string') {
            setMessage('');
        }

        setLoading(true);
        try {
            // Use standard chat endpoint
            const res = await fetch('http://localhost:5000/api/ai/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: userMsg.text,
                    history: chatHistory.map(msg => ({
                        role: msg.type === 'user' ? 'user' : 'model',
                        parts: [{ text: msg.text }]
                    }))
                })
            });

            if (!res.ok) throw new Error(`Server returned ${res.status}`);
            const data = await res.json();

            setChatHistory(prev => [...prev, { type: 'bot', text: data.reply }]);
        } catch (error) {
            console.error("Chat error:", error);
            setChatHistory(prev => [...prev, { type: 'bot', text: "Sorry, I'm having trouble connecting to the server. Check if backend is running." }]);
        } finally {
            setLoading(false);
        }
    };

    const handleQuickAction = async (action) => {
        const userMsg = { type: 'user', text: action };
        setChatHistory(prev => [...prev, userMsg]);
        setLoading(true);

        try {
            const res = await fetch('http://localhost:5000/api/ai/quick-action', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action })
            });

            if (!res.ok) throw new Error(`Server returned ${res.status}`);
            const data = await res.json();

            setChatHistory(prev => [...prev, { type: 'bot', text: data.reply }]);
        } catch (error) {
            console.error("Quick action error:", error);
            handleSend(action); // Fallback to normal chat
        } finally {
            setLoading(false);
        }
    };

    const toggleFull = () => {
        setIsMaximized(!isMaximized);
    };

    return (
        <div className={`${isMaximized ? 'fixed inset-0 z-[9999] p-4 md:p-8 bg-black/40 backdrop-blur-sm flex items-center justify-center' : 'w-full'}`}>
            <div className={`bg-gradient-to-br from-blue-700 to-emerald-600 shadow-2xl overflow-hidden flex flex-col transition-all duration-500 ease-in-out ${isMaximized ? 'w-full h-full max-w-6xl max-h-[90vh] rounded-3xl' : 'h-[500px] rounded-2xl'
                }`}>
                {/* Header */}
                <div className="bg-white/10 backdrop-blur-sm px-6 py-5 flex items-center justify-between flex-shrink-0 border-b border-white/10">
                    <div className="flex items-center space-x-3">
                        <div className="bg-white p-2.5 rounded-2xl shadow-lg">
                            <MessageSquare className="w-6 h-6 text-blue-700" />
                        </div>
                        <div>
                            <h3 className="text-white font-bold text-lg">AI Health Assistant</h3>
                            <p className="text-white/80 text-xs font-medium">Powered by SmartRx</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={toggleFull}
                            className="text-white hover:bg-white/20 p-2.5 rounded-xl transition-all cursor-pointer backdrop-blur-md"
                        >
                            {isMaximized ? <Minimize2 className="w-6 h-6" /> : <Maximize2 className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                <div className="bg-white/95 backdrop-blur-sm border-2 border-blue-500/20 p-6 md:p-8 flex-1 flex flex-col overflow-hidden m-1.5 rounded-b-3xl">
                    <div className="flex-1 overflow-y-auto mb-6 space-y-6 pr-2 scrollbar-thin scrollbar-thumb-blue-500/20 scrollbar-track-transparent">
                        {chatHistory.map((msg, idx) => (
                            <div key={idx} className={`flex items-start space-x-4 ${msg.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                                {msg.type === 'bot' && (
                                    <div className="bg-blue-50 p-2.5 rounded-2xl flex-shrink-0 shadow-sm border border-blue-100">
                                        <MessageSquare className="w-5 h-5 text-blue-600" />
                                    </div>
                                )}
                                <div className={`${msg.type === 'user'
                                    ? 'bg-blue-700 text-white rounded-tr-none shadow-lg shadow-blue-700/20'
                                    : 'bg-emerald-50 text-gray-800 rounded-tl-none border border-emerald-100 shadow-sm'
                                    } rounded-3xl p-4 md:p-5 max-w-[85%] text-[15px] leading-relaxed`}>
                                    <p className="whitespace-pre-wrap">{msg.text}</p>
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="flex items-center space-x-3 text-blue-600 text-sm ml-16 font-semibold animate-pulse">
                                <div className="flex space-x-1">
                                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce"></div>
                                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                                </div>
                                <span className="uppercase tracking-widest text-xs">Consulting Data...</span>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {isMaximized && (
                        <div className="flex flex-wrap gap-3 mb-8 justify-center animate-in fade-in slide-in-from-bottom-2 duration-700">
                            <button
                                onClick={() => handleQuickAction("Find medicines")}
                                className="flex items-center space-x-2 bg-white border-2 border-blue-200 text-blue-700 px-6 py-3 rounded-2xl text-sm font-bold hover:bg-blue-50 hover:border-blue-500 hover:scale-105 transition-all shadow-sm"
                            >
                                <Pill className="w-5 h-5" />
                                <span>Find medicines</span>
                            </button>
                            <button
                                onClick={() => handleQuickAction("Check interactions")}
                                className="flex items-center space-x-2 bg-white border-2 border-green-200 text-green-700 px-6 py-3 rounded-2xl text-sm font-bold hover:bg-green-50 hover:border-green-500 hover:scale-105 transition-all shadow-sm"
                            >
                                <Activity className="w-5 h-5" />
                                <span>Check interactions</span>
                            </button>
                            <button
                                onClick={() => handleQuickAction("Near pharmacies")}
                                className="flex items-center space-x-2 bg-white border-2 border-emerald-200 text-emerald-700 px-6 py-3 rounded-2xl text-sm font-bold hover:bg-emerald-50 hover:border-emerald-500 hover:scale-105 transition-all shadow-sm"
                            >
                                <MapPin className="w-5 h-5" />
                                <span>Near pharmacies</span>
                            </button>
                        </div>
                    )}

                    <div className="flex items-center space-x-3 mt-auto pt-4 border-t border-slate-100">
                        <div className="flex-1 relative group">
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Type your clinical query or medicine name..."
                                className="w-full px-6 py-4.5 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all text-slate-900 shadow-inner group-hover:border-slate-300"
                            />
                        </div>
                        <button
                            onClick={() => handleSend()}
                            disabled={loading || !message.trim()}
                            className="bg-gradient-to-r from-blue-700 to-blue-500 text-white p-4.5 rounded-2xl hover:shadow-xl hover:scale-105 transition-all disabled:opacity-30 cursor-pointer shadow-blue-500/20 active:scale-95"
                        >
                            <Send className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIAssistantWidget;
