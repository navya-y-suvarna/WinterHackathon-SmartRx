import React, { useState } from 'react';
import { MessageSquare, Pill, Activity, MapPin, Send } from 'lucide-react';

const AIAssistantWidget = () => {
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([
        { type: 'bot', text: "👋 Hello! I'm your SmartRx AI assistant. How can I help you today?" }
    ]);
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        if (!message.trim()) return;

        // Add user message
        const userMsg = { type: 'user', text: message };
        setChatHistory(prev => [...prev, userMsg]);
        setMessage('');
        setLoading(true);

        try {
            const res = await fetch('http://localhost:5000/api/ai/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMsg.text })
            });
            const data = await res.json();

            setChatHistory(prev => [...prev, { type: 'bot', text: data.reply }]);
        } catch (error) {
            console.error("Chat error:", error);
            setChatHistory(prev => [...prev, { type: 'bot', text: "Sorry, I'm having trouble connecting to the server." }]);
        } finally {
            setLoading(false);
        }
    };

    const handleQuickAction = (action) => {
        setMessage(action);
        // Optional: auto-send
        // handleSend(); // You might need to refactor handleSend to accept an argument or use effect
    };

    return (
        <div className="bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl shadow-xl overflow-hidden flex flex-col h-[500px]">
            <div className="bg-white/10 backdrop-blur-sm px-6 py-4 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center space-x-3">
                    <div className="bg-white p-2 rounded-full">
                        <MessageSquare className="w-5 h-5 text-teal-600" />
                    </div>
                    <div>
                        <h3 className="text-white font-semibold">AI Health Assistant</h3>
                        <p className="text-teal-100 text-xs">Powered by SmartRx</p>
                    </div>
                </div>
                <button className="text-white hover:bg-white/10 p-2 rounded-lg transition-colors">
                    <div className="flex space-x-1">
                        <div className="w-1 h-1 bg-white rounded-full"></div>
                        <div className="w-1 h-1 bg-white rounded-full"></div>
                        <div className="w-1 h-1 bg-white rounded-full"></div>
                    </div>
                </button>
            </div>

            <div className="bg-white p-6 flex-1 flex flex-col overflow-hidden">
                <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2">
                    {chatHistory.map((msg, idx) => (
                        <div key={idx} className={`flex items-start space-x-3 ${msg.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                            {msg.type === 'bot' && (
                                <div className="bg-teal-100 p-2 rounded-full flex-shrink-0">
                                    <MessageSquare className="w-4 h-4 text-teal-600" />
                                </div>
                            )}
                            <div className={`${msg.type === 'user' ? 'bg-blue-100 text-blue-900 rounded-tr-none' : 'bg-teal-50 text-gray-800 rounded-tl-none'} rounded-2xl p-3 max-w-[80%]`}>
                                <p className="text-sm">{msg.text}</p>
                            </div>
                        </div>
                    ))}
                    {loading && (
                        <div className="flex items-center space-x-2 text-gray-400 text-sm ml-12">
                            <span>Thinking...</span>
                        </div>
                    )}
                </div>

                <div className="flex flex-wrap gap-2 mb-4 flex-shrink-0">
                    <button onClick={() => setMessage("Find medicines")} className="flex items-center space-x-2 bg-white border-2 border-teal-200 text-teal-700 px-4 py-2 rounded-full text-sm hover:bg-teal-50 hover:border-teal-300 transition-all">
                        <Pill className="w-4 h-4" />
                        <span>Find medicines</span>
                    </button>
                    <button onClick={() => setMessage("Check interactions")} className="flex items-center space-x-2 bg-white border-2 border-emerald-200 text-emerald-700 px-4 py-2 rounded-full text-sm hover:bg-emerald-50 hover:border-emerald-300 transition-all">
                        <Activity className="w-4 h-4" />
                        <span>Check interactions</span>
                    </button>
                    <button onClick={() => setMessage("Near pharmacies")} className="flex items-center space-x-2 bg-white border-2 border-blue-200 text-blue-700 px-4 py-2 rounded-full text-sm hover:bg-blue-50 hover:border-blue-300 transition-all">
                        <MapPin className="w-4 h-4" />
                        <span>Near pharmacies</span>
                    </button>
                </div>

                <div className="flex items-center space-x-2 flex-shrink-0">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Type your message..."
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-teal-400 transition-colors text-black"
                    />
                    <button onClick={handleSend} disabled={loading} className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white p-3 rounded-xl hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50">
                        <Send className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AIAssistantWidget;
