import React, { useState } from 'react';
import { MessageSquare, Pill, Activity, MapPin, Send, Maximize2, Minimize2 } from 'lucide-react';

const AIAssistantWidget = () => {
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([
        { type: 'bot', text: "👋 Hello! I'm your SmartRx AI assistant. How can I help you today?" }
    ]);
    const [loading, setLoading] = useState(false);
    const [isMaximized, setIsMaximized] = useState(true);

    const messagesEndRef = React.useRef(null);

    React.useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatHistory]);

    const handleSend = async (customMessage = null) => {
        const msgText = typeof customMessage === 'string' ? customMessage : message;
        
        if (!msgText || !msgText.trim()) return;

        const userMsg = { type: 'user', text: msgText };
        setChatHistory(prev => [...prev, userMsg]);
        
        if (typeof customMessage !== 'string') {
            setMessage('');
        }
        
        setLoading(true);

        try {
            // Check if this is a quick action first (if we want to route that way)
            // But since I have a separate handleQuickAction calling a separate endpoint, 
            // I'll stick to the standard chat endpoint here unless it matches specific strings.
            // Actually, to be consistent, let's just use the chat endpoint for everything 
            // because I updated the backend chat endpoint to handle intents!
            // Wait, I kept /quick-action in backend too. Use it for specific buttons if desired.
            
            // Let's use the standard chat endpoint which now supports intents + history
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
        // We can either call handleSend(action) and let backend intent logic handle it,
        // OR call the specific quick-action endpoint.
        // The backend intent logic handles "Find medicines" but maybe not perfectly matching the string.
        // Let's use the dedicated quick-action endpoint for these buttons for instant mock response.
        
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
            <div className={`bg-gradient-to-br from-teal-500 to-emerald-600 shadow-2xl overflow-hidden flex flex-col transition-all duration-500 ease-in-out ${isMaximized ? 'w-full h-full max-w-6xl max-h-[90vh] rounded-3xl' : 'h-[500px] rounded-2xl'
                }`}>
                {/* Header */}
                <div className="bg-white/10 backdrop-blur-sm px-6 py-5 flex items-center justify-between flex-shrink-0 border-b border-white/10">
                    <div className="flex items-center space-x-3">
                        <div className="bg-white p-2.5 rounded-2xl shadow-lg">
                            <MessageSquare className="w-6 h-6 text-teal-600" />
                        </div>
                        <div>
                            <h3 className="text-white font-bold text-lg">AI Health Assistant</h3>
                            <p className="text-teal-50 text-xs opacity-80 font-medium">Powered by SmartRx</p>
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

                <div className="bg-white p-6 md:p-8 flex-1 flex flex-col overflow-hidden m-1.5 rounded-b-3xl">
                    <div className="flex-1 overflow-y-auto mb-6 space-y-6 pr-2 scrollbar-thin scrollbar-thumb-teal-100 scrollbar-track-transparent">
                        {chatHistory.map((msg, idx) => (
                            <div key={idx} className={`flex items-start space-x-4 ${msg.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                                {msg.type === 'bot' && (
                                    <div className="bg-teal-100 p-2.5 rounded-2xl flex-shrink-0 shadow-sm border border-teal-200">
                                        <MessageSquare className="w-5 h-5 text-teal-600" />
                                    </div>
                                )}
                                <div className={`${msg.type === 'user'
                                        ? 'bg-teal-600 text-white rounded-tr-none shadow-lg shadow-teal-700/10'
                                        : 'bg-slate-50 text-gray-800 rounded-tl-none border border-slate-100 shadow-sm'
                                    } rounded-3xl p-4 md:p-5 max-w-[85%] text-[15px] leading-relaxed`}>
                                    <p className="whitespace-pre-wrap">{msg.text}</p>
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="flex items-center space-x-3 text-teal-500 text-sm ml-16 font-semibold animate-pulse">
                                <div className="flex space-x-1">
                                    <div className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-bounce"></div>
                                    <div className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                    <div className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
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
                                className="flex items-center space-x-2 bg-white border-2 border-teal-100 text-teal-700 px-6 py-3 rounded-2xl text-sm font-bold hover:bg-teal-50 hover:border-teal-300 hover:scale-105 transition-all shadow-sm"
                            >
                                <Pill className="w-5 h-5" />
                                <span>Find medicines</span>
                            </button>
                            <button 
                                onClick={() => handleQuickAction("Check interactions")} 
                                className="flex items-center space-x-2 bg-white border-2 border-emerald-100 text-emerald-700 px-6 py-3 rounded-2xl text-sm font-bold hover:bg-emerald-50 hover:border-emerald-300 hover:scale-105 transition-all shadow-sm"
                            >
                                <Activity className="w-5 h-5" />
                                <span>Check interactions</span>
                            </button>
                            <button 
                                onClick={() => handleQuickAction("Near pharmacies")} 
                                className="flex items-center space-x-2 bg-white border-2 border-blue-100 text-blue-700 px-6 py-3 rounded-2xl text-sm font-bold hover:bg-blue-50 hover:border-blue-300 hover:scale-105 transition-all shadow-sm"
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
                                className="w-full px-6 py-4.5 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-teal-500 focus:bg-white transition-all text-slate-900 shadow-inner group-hover:border-slate-300"
                            />
                        </div>
                        <button
                            onClick={() => handleSend()}
                            disabled={loading || !message.trim()}
                            className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white p-4.5 rounded-2xl hover:shadow-xl hover:scale-105 transition-all disabled:opacity-30 cursor-pointer shadow-teal-500/20 active:scale-95"
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
