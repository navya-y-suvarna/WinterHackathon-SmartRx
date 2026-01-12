import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Copy, RefreshCw, Pill, Heart, AlertTriangle, Home, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import smartRxLogo from "../assets/logo2.png";

export default function Assistant({ onLogout, onNavigate }) {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isPrescriptionMode, setIsPrescriptionMode] = useState(false);
  const [conversations, setConversations] = useState([
    { id: 1, title: "Current Chat", active: true },
  ]);

  const now = () =>
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi, I'm SmartRX! 💊 I can help with general health questions and provide medicine prescriptions based on your symptoms. Choose a mode below to get started.",
      time: now(),
    },
  ]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const [copiedId, setCopiedId] = useState(null);
  const [toast, setToast] = useState(null);

  const copyMessage = (text, id) => {
    try {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      setToast("Copied!");
      setTimeout(() => {
        setCopiedId(null);
        setToast(null);
      }, 1200);
    } catch (e) {
      console.error("Copy failed", e);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input.trim(), time: now() };
    const userInput = input.trim();
    setInput("");

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    try {
      let response;
      
      if (isPrescriptionMode) {
        response = await fetch("http://localhost:5000/prescription", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userText: userInput, symptoms: userInput }),
        });
        
        const prescriptionData = await response.json();
        streamPrescriptionResponse(prescriptionData);
      } else {
        response = await fetch("http://localhost:5000/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: userInput }),
        });
        
        const chatData = await response.json();
        streamBotResponse(chatData.reply || "I'm here to help with your health concerns.");
      }
    } catch (error) {
      console.error("API Error:", error);
      setIsTyping(false);
      streamBotResponse("I'm having trouble connecting right now. Please try again in a moment.");
    }
  };

  const streamBotResponse = (fullText) => {
    setIsTyping(false);
    const id = Date.now();
    const botMsg = { id, role: "assistant", text: "", time: now() };
    setMessages((prev) => [...prev, botMsg]);

    let i = 0;
    const chunk = Math.max(1, Math.ceil(fullText.length / 40));
    const interval = setInterval(() => {
      i = Math.min(fullText.length, i + chunk);
      const partial = fullText.slice(0, i);
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, text: partial } : m))
      );
      if (i >= fullText.length) {
        clearInterval(interval);
      }
    }, 30);
  };

  const streamPrescriptionResponse = (prescriptionData) => {
    setIsTyping(false);
    const id = Date.now();
    
    let formattedResponse = "";
    
    if (prescriptionData.conditions && prescriptionData.conditions.length > 0) {
      formattedResponse += `🎯 **Identified Conditions:** ${prescriptionData.conditions.join(", ")}\n\n`;
    }
    
    if (prescriptionData.prescriptions && prescriptionData.prescriptions.length > 0) {
      formattedResponse += "💊 **Recommended Medicines:**\n\n";
      
      prescriptionData.prescriptions.forEach((prescription) => {
        if (prescription.medicines) {
          prescription.medicines.forEach((medicine) => {
            formattedResponse += `**${medicine.name}**\n`;
            formattedResponse += `• Dosage: ${medicine.dosage}\n`;
            formattedResponse += `• Max Daily: ${medicine.maxDaily}\n`;
            formattedResponse += `• Notes: ${medicine.notes}\n\n`;
          });
        }
      });
    }
    
    if (prescriptionData.advice) {
      formattedResponse += `📋 **Medical Advice:** ${prescriptionData.advice}\n\n`;
    }
    
    if (prescriptionData.disclaimer) {
      formattedResponse += `⚠️ **Important:** ${prescriptionData.disclaimer}`;
    }

    const botMsg = { id, role: "assistant", text: "", time: now(), isPrescription: true };
    setMessages((prev) => [...prev, botMsg]);

    let i = 0;
    const chunk = Math.max(1, Math.ceil(formattedResponse.length / 50));
    const interval = setInterval(() => {
      i = Math.min(formattedResponse.length, i + chunk);
      const partial = formattedResponse.slice(0, i);
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, text: partial } : m))
      );
      if (i >= formattedResponse.length) {
        clearInterval(interval);
      }
    }, 25);
  };

  const regenerateResponse = async (sourceIdx) => {
    let promptText = null;
    for (let i = sourceIdx; i >= 0; i--) {
      if (messages[i]?.role === "user") {
        promptText = messages[i].text;
        break;
      }
    }
    
    if (!promptText) return;
    
    setIsTyping(true);
    
    try {
      let response;
      
      if (isPrescriptionMode) {
        response = await fetch("http://localhost:5000/prescription", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userText: promptText, symptoms: promptText }),
        });
        
        const prescriptionData = await response.json();
        streamPrescriptionResponse(prescriptionData);
      } else {
        response = await fetch("http://localhost:5000/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: promptText }),
        });
        
        const chatData = await response.json();
        streamBotResponse(chatData.reply || "Here's another perspective on your query.");
      }
    } catch (error) {
      console.error("Regenerate Error:", error);
      setIsTyping(false);
      streamBotResponse("I apologize, but I'm having trouble generating a new response right now.");
    }
  };

  const examplePrompts = isPrescriptionMode ? [
    "I have a severe headache and feel dizzy",
    "What medicine should I take for fever and body ache?",
    "I have a persistent cough and sore throat",
    "Stomach pain with nausea, what can help?"
  ] : [
    "What are the side effects of paracetamol?",
    "Can I take multiple medicines together?",
    "How to store medicines properly?",
    "When should I consult a doctor?"
  ];

  const handlePromptClick = (prompt) => {
    setInput(prompt);
  };

  const startNewChat = () => {
    const newId = conversations.length + 1;
    setConversations((prev) =>
      prev.map((c) => ({ ...c, active: false })).concat({ 
        id: newId, 
        title: `Chat ${newId}`, 
        active: true 
      })
    );
    setMessages([
      {
        role: "assistant",
        text: "Hi, I'm SmartRX! 💊 I can help with general health questions and provide medicine prescriptions based on your symptoms. Choose a mode below to get started.",
        time: now(),
      },
    ]);
  };

  const switchMode = (prescriptionMode) => {
    setIsPrescriptionMode(prescriptionMode);
    const modeText = prescriptionMode 
      ? "💊 **Prescription Mode Activated**\nTell me your symptoms and I'll recommend appropriate medicines with dosages and safety information."
      : "🩺 **General Health Mode Activated**\nI'm here to answer your general health and medicine questions.";
    
    setMessages(prev => [...prev, {
      role: "assistant",
      text: modeText,
      time: now(),
    }]);
  };

  return (
    <>
      <style>{`
        .typing span {
          animation: blink 1.4s infinite both;
        }
        .typing span:nth-child(2) { 
          animation-delay: 0.2s; 
        }
        .typing span:nth-child(3) { 
          animation-delay: 0.4s; 
        }

        @keyframes blink {
          0% { opacity: 0.2; }
          20% { opacity: 1; }
          100% { opacity: 0.2; }
        }
      `}</style>

      <div className="h-screen flex bg-gray-900 text-white">
        {/* SIDEBAR */}
        <div className="w-72 bg-gray-800 border-r border-gray-700 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => navigate("/")}
                className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition"
              >
                <Home className="w-4 h-4" />
                <span className="text-sm">Home</span>
              </button>
              <button
                onClick={onLogout}
                className="px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition text-sm"
              >
                Logout
              </button>
            </div>
            
            {/* Mode Toggle */}
            <div className="space-y-2">
              <p className="text-xs text-gray-400 uppercase tracking-wide">Choose Mode</p>
              <div className="grid grid-cols-1 gap-2">
                <motion.button
                  onClick={() => switchMode(false)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition ${
                    !isPrescriptionMode 
                      ? "bg-blue-600 text-white" 
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Heart className="w-4 h-4" />
                  General Health
                </motion.button>
                <motion.button
                  onClick={() => switchMode(true)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition ${
                    isPrescriptionMode 
                      ? "bg-green-600 text-white" 
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Pill className="w-4 h-4" />
                  Prescription
                </motion.button>
              </div>
            </div>
          </div>

          {/* Conversation list */}
          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2">
            {conversations.map((conv) => (
              <div
                key={conv.id}
                className={`px-3 py-2 rounded cursor-pointer transition ${
                  conv.active
                    ? "bg-gray-700 text-white"
                    : "bg-gray-800 text-gray-400 hover:bg-gray-750"
                }`}
                onClick={() =>
                  setConversations((prev) =>
                    prev.map((c) => ({ ...c, active: c.id === conv.id }))
                  )
                }
              >
                {conv.title}
              </div>
            ))}
          </div>

          {/* New chat button */}
          <div className="p-3 border-t border-gray-700">
            <button
              onClick={startNewChat}
              className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white text-sm font-semibold transition"
            >
              + New chat
            </button>
          </div>
        </div>

        {/* CHAT AREA */}
        <div className="flex-1 flex flex-col bg-gray-900 relative items-center">
          {/* Header */}
          <div className="w-full max-w-3xl bg-gray-800 border-b-2 border-gray-700 px-6 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={smartRxLogo}
                  alt="SmartRX"
                  className="object-contain w-12 h-12"
                />
                <div className="leading-tight">
                  <div className="text-sm font-bold text-white">SmartRX Assistant</div>
                  <div className="text-xs text-gray-500">
                    {isPrescriptionMode ? "💊 Prescription Mode" : "🩺 General Health Mode"}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                Online
              </div>
            </div>
          </div>

          {/* Messages */}
          <motion.div layout className="w-full max-w-3xl flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {messages.length === 1 && !messages[0].id ? (
              /* Welcome screen */
              <div className="h-full flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center max-w-md"
                >
                  <div className="mb-6">
                    <img src={smartRxLogo} alt="SmartRX" className="mx-auto w-20 h-20 mb-4" />
                    <h2 className="text-2xl font-bold text-white mb-2">Welcome to SmartRX</h2>
                    <p className="text-gray-400 text-sm">
                      {isPrescriptionMode 
                        ? "Tell me your symptoms and I'll recommend medicines with proper dosages and safety information." 
                        : "Ask me anything about health, medicines, or general medical advice."}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <p className="text-gray-500 text-xs uppercase tracking-wide">Try asking:</p>
                    {examplePrompts.map((prompt, idx) => (
                      <motion.button
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        onClick={() => handlePromptClick(prompt)}
                        className="w-full px-4 py-3 text-left text-sm text-gray-300 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 hover:border-gray-600 transition"
                      >
                        <span className={isPrescriptionMode ? "text-green-400" : "text-blue-400"}>
                          {isPrescriptionMode ? "💊" : "🩺"}
                        </span> {prompt}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              </div>
            ) : (
              /* Messages */
              <>
                {messages.map((msg, idx) => {
                  const isUser = msg.role === "user";
                  return (
                    <motion.div
                      layout
                      key={idx}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`group flex ${isUser ? "justify-end" : "justify-start"} items-end gap-2`}
                    >
                      <div
                        className={`${
                          isUser
                            ? "bg-blue-600 text-white"
                            : msg.isPrescription
                            ? "bg-green-100 text-gray-900 border border-green-300"
                            : "bg-gray-100 text-gray-900"
                        } px-4 py-3 rounded-lg max-w-[80%] text-sm shadow-md`}
                      >
                        <p className="whitespace-pre-line">{msg.text}</p>
                        <div className={`mt-1 text-[10px] opacity-70 text-right`}>
                          {msg.time}
                        </div>
                      </div>

                      {!isUser && (
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => copyMessage(msg.text, idx)}
                            className="text-gray-300 hover:text-white p-2 rounded-md hover:bg-gray-700"
                            title="Copy"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => regenerateResponse(idx)}
                            className="text-gray-300 hover:text-white p-2 rounded-md hover:bg-gray-700"
                            title="Regenerate"
                          >
                            <RefreshCw className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </>
            )}
            
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="bg-gray-700 text-gray-100 px-4 py-2 rounded-lg text-sm typing">
                  <span>●</span> <span>●</span> <span>●</span>
                </div>
              </motion.div>
            )}
            
            <div ref={messagesEndRef} />
          </motion.div>

          {/* Input */}
          <div className="w-full max-w-3xl bg-gray-800 border-t border-gray-700 px-6 py-4">
            <div className="flex items-center gap-3 rounded-xl border border-gray-600 bg-gray-800/90 px-4 py-3 focus-within:ring-2 focus-within:ring-blue-400/50">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder={isPrescriptionMode ? "Describe your symptoms..." : "Ask about health or medicines..."}
                className="flex-1 resize-none outline-none bg-transparent text-white placeholder-gray-300 text-sm min-h-[20px] max-h-32"
                rows={1}
              />
              <button
                onClick={sendMessage}
                className={`w-10 h-10 rounded-full ${
                  isPrescriptionMode ? "bg-green-600 hover:bg-green-500" : "bg-blue-600 hover:bg-blue-500"
                } text-white font-semibold transition-all hover:scale-105 active:scale-95`}
              >
                ➤
              </button>
            </div>
          </div>

          {/* Toast */}
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute left-1/2 -translate-x-1/2 bottom-20 bg-gray-800 text-white border border-gray-700 px-3 py-2 rounded-lg shadow-md text-sm"
            >
              {toast}
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}
