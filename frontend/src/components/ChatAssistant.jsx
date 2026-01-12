import { useEffect, useRef, useState } from "react";

export default function ChatAssistant() {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text:
        "Hi! I’m SmartRX. Tell me your symptoms or ask about medicines, and I’ll guide you safely."
    }
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ✅ UPDATED handleSend (Backend API)
  const handleSend = async () => {
    if (!input.trim()) return;

    const userText = input;
    setInput("");

    setMessages((prev) => [...prev, { sender: "user", text: userText }]);

    try {
      const res = await fetch("http://localhost:5000/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: userText })
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: data.reply
        }
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "⚠️ Unable to connect to server. Please try again later."
        }
      ]);
    }
  };

  return (
    <div className="w-full max-w-xl bg-white border border-gray-300 rounded-2xl shadow-2xl">
      {/* HEADER */}
      <div className="px-6 py-4 border-b bg-gray-100 rounded-t-2xl">
        <h3 className="font-semibold text-gray-800">🤖 SmartRX Assistant</h3>
        <p className="text-sm text-gray-600">
          Health guidance & medicine information
        </p>
      </div>

      {/* CHAT */}
      <div className="px-6 py-4 space-y-3 max-h-96 overflow-y-auto">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-[80%] px-4 py-2 rounded-xl text-sm whitespace-pre-line ${
              msg.sender === "user"
                ? "ml-auto bg-blue-600 text-white"
                : "mr-auto bg-gray-100 text-gray-800"
            }`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* INPUT */}
      <div className="px-6 py-4 border-t bg-gray-50 rounded-b-2xl">
        <div className="flex gap-2">
          <input
            className="flex-1 border border-gray-400 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Describe your symptoms or ask a question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm hover:bg-blue-700"
          >
            Send
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-3 text-center">
          SmartRX provides guidance only and does not replace professional medical advice.
        </p>
      </div>
    </div>
  );
}
