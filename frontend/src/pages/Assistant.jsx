import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Copy, RefreshCw } from "lucide-react";
import smartRxLogo from "../assets/logo2.png";

export default function Assistant({ onLogout, onNavigate }) {
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [conversations, setConversations] = useState([
    { id: 1, title: "Current Chat", active: true },
  ]);

  const now = () =>
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text:
        "Hi, I'm SmartRX. Tell me your symptoms or ask about medicines — I'll guide you safely.",
      time: now(),
    },
  ]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Smooth auto-scroll to bottom on new messages or typing indicator
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
    setInput("");

    // Add user message immediately
    setMessages((prev) => [...prev, userMsg]);

    // Show typing indicator
    setIsTyping(true);

    try {
      // Determine if this looks like a prescription request or just general chat
      // For now, simple keywords, but ideally we'd have a UI toggle
      const isPrescriptionRelated = input.toLowerCase().includes("symptom") || 
                                    input.toLowerCase().includes("pain") || 
                                    input.toLowerCase().includes("feel") ||
                                    input.toLowerCase().includes("bad");

      let response;
      if (isPrescriptionRelated) {
           response = await fetch("http://localhost:5000/prescription", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ symptoms: input.trim(), history: "" })
           });
      } else {
           response = await fetch("http://localhost:5000/api/ai/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: input.trim() }),
          });
      }

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      streamBotResponse(data.reply);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      streamBotResponse("Sorry, I'm having trouble connecting to the server. Please check your connection.");
    }
  };

  const streamBotResponse = (fullText) => {
    // Hide typing indicator and start streaming the bot message
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

  const regenerateResponse = (sourceIdx) => {
    // Find the nearest preceding user message to use as a prompt
    let promptText = null;
    for (let i = sourceIdx; i >= 0; i--) {
      if (messages[i]?.role === "user") {
        promptText = messages[i].text;
        break;
      }
    }
    const altText =
      promptText
        ? `Another perspective: ${promptText} may also indicate mild conditions. Monitor symptoms, stay hydrated, and seek professional advice if needed.`
        : "Here’s another take: ensure proper rest, hydration, and avoid self-medicating without guidance.";
    setIsTyping(true);
    setTimeout(() => streamBotResponse(altText), 600);
  };
  const examplePrompts = [
    "I have a severe headache and dizziness",
    "Can I take paracetamol with ibuprofen together?",
    "What should I take for cold and cough?",
  ];

  const handlePromptClick = (prompt) => {
    setInput(prompt);
  };
  const startNewChat = () => {
    const newId = conversations.length + 1;
    setConversations((prev) =>
      prev.map((c) => ({ ...c, active: false })).concat({ id: newId, title: `Chat ${newId}`, active: true })
    );
    setMessages([
      {
        role: "assistant",
        text:
          "Hi, I'm SmartRX. Tell me your symptoms or ask about medicines — I'll guide you safely.",
        time: now(),
      },
    ]);
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

      <div className="h-screen flex bg-gray-900 text-white flex-col md:flex-row">
        {/* SIDEBAR - hidden on small screens */}
        <div className="hidden md:flex w-72 bg-gray-800 border-r border-gray-700 flex-col">

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
        <div className="flex-1 flex flex-col bg-gray-900 relative items-center w-full">
          {/* Slim Header: bot name + status */}
          <div className="w-full max-w-3xl bg-gray-800 border-b-2 border-gray-700 px-6 py-3">
            <div className="flex items-center gap-3">
              <img
                src={smartRxLogo}
                alt="SmartRX"
                className="object-contain"
                style={{ maxWidth: 200, maxHeight: 200 }}
              />
              <div className="leading-tight">
                <div className="text-sm font-bold text-white">SmartRX</div>
                <div className="text-xs text-gray-500">AI Assistant</div>
              </div>
            </div>
          </div>

          {/* Messages */}
          <motion.div layout className="w-full max-w-3xl flex-1 overflow-y-auto px-6 py-2 space-y-3">
            {messages.length === 1 && messages[0].role === "assistant" && !messages[0].id ? (
              // Empty state: show welcome card and example prompts
              <div className="h-full flex items-start justify-center pt-8">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full max-w-md text-center"
                >
                  <div className="mb-6">
                    <img
                      src={smartRxLogo}
                      alt="SmartRX"
                      className="mx-auto mb-4 object-contain"
                      style={{ maxWidth: 200, maxHeight: 200 }}
                    />
                    <h2 className="text-2xl font-bold text-white mb-2">Welcome to SmartRX</h2>
                    <p className="text-gray-400 text-sm">
                      Ask me anything about your health, medicines, or symptoms. I'm here to help guide you safely.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <p className="text-gray-500 text-xs uppercase tracking-wide mb-4">Try asking me about:</p>
                    {examplePrompts.map((prompt, idx) => (
                      <motion.button
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: idx * 0.1 }}
                        onClick={() => handlePromptClick(prompt)}
                        className="w-full px-4 py-3 text-left text-sm text-gray-300 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 hover:border-gray-600 transition"
                      >
                        <span className="text-blue-400">💊</span> {prompt}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              </div>
            ) : (
              // Normal messages view
              <>
                {messages.map((msg, idx) => {
                  const isUser = msg.role === "user";
                  return (
                    <motion.div
                      layout
                      key={idx}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className={`group flex ${isUser ? "justify-end" : "justify-start"} items-end gap-2`}
                    >
                      <div
                        className={`${
                          isUser
                            ? "bg-blue-600 text-white hover:ring-1 hover:ring-blue-300/40"
                            : "bg-gray-100 text-gray-900 hover:ring-1 hover:ring-gray-300/40"
                        } px-4 py-3 rounded-lg max-w-[70%] text-sm shadow-md hover:shadow-lg transition`}
                      >
                        <p className="whitespace-pre-line">{msg.text}</p>
                        <div className={`mt-1 text-[10px] opacity-0 group-hover:opacity-80 transition-opacity ${isUser ? "text-right" : "text-right"}`}>
                          {msg.time}
                        </div>
                      </div>

                      {/* Copy button for assistant messages */}
                      {!isUser && (
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            title={copiedId === idx ? "Copied!" : "Copy"}
                            aria-label="Copy message"
                            onClick={() => copyMessage(msg.text, idx)}
                            className="text-gray-300 hover:text-white p-2 rounded-md hover:bg-gray-700"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                          <button
                            title="Regenerate"
                            aria-label="Regenerate response"
                            onClick={() => regenerateResponse(idx)}
                            className="text-gray-300 hover:text-white p-2 rounded-md hover:bg-gray-700"
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
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="flex justify-start"
              >
                <div className="bg-gray-700 text-gray-100 px-4 py-2 rounded-lg text-sm shadow typing">
                  <span>●</span> <span>●</span> <span>●</span>
                </div>
              </motion.div>
            )}
            
            <div ref={messagesEndRef} />
          </motion.div>

          {/* Input bar */}
          <div className="w-full max-w-3xl bg-gray-800 border-t border-gray-700 px-6 py-4">
            <div className="flex items-center gap-2 rounded-xl border border-gray-600 bg-gray-800/90 px-4 py-3 focus-within:ring-2 ring-blue-400/50 shadow-lg backdrop-blur-md transition-all">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder="Type a message..."
                className="flex-1 resize-none outline-none bg-transparent text-white placeholder-gray-300 text-base min-h-[44px]"
                rows={1}
              />
              <button
                onClick={sendMessage}
                aria-label="Send message"
                className="grid place-items-center w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-lg font-semibold shadow-md hover:shadow-lg hover:scale-110 active:scale-95 transition-all duration-150"
              >
                ➤
              </button>
            </div>
          </div>

          {/* Copied toast */}
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.15 }}
              className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-20 bg-gray-800 text-white border border-gray-700 px-3 py-2 rounded-lg shadow-md text-sm"
            >
              {toast}
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}
