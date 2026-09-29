import React, { useState } from 'react';
import { Bot, MessageSquare, X, Send, Sparkles, User } from 'lucide-react';

export function SupportAiChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hello! I am CloudsBuilt AI Assistant. How can I help you with our software engineering and AI automation services today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setLoading(true);

    setTimeout(() => {
      let aiReply = "Hello! I am CloudsBuilt AI Assistant. We provide enterprise software services and AI automation. You can reach us anytime on WhatsApp at +923429339057 or via our contact form!";
      
      const lower = userMsg.toLowerCase();
      if (lower.includes('price') || lower.includes('cost') || lower.includes('pricing') || lower.includes('plan')) {
        aiReply = "Our pricing is customized per project requirements and discussed during consultation on contact. You can check our Pricing section for package tiers!";
      } else if (lower.includes('service') || lower.includes('development') || lower.includes('software') || lower.includes('company')) {
        aiReply = "As a professional software company, we build custom full-stack web applications, mobile apps, enterprise business software, and intelligent AI automation agents for global businesses.";
      } else if (lower.includes('whatsapp') || lower.includes('phone') || lower.includes('contact') || lower.includes('reach') || lower.includes('chat')) {
        aiReply = "You can chat with us instantly on WhatsApp at +923429339057 or email us at team.cloudsbuild@gmail.com. Our engineering team is online 24/7!";
      } else if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
        aiReply = "Hello! Welcome to CloudsBuilt. How can we help you with your next software or AI automation project?";
      }

      setMessages((prev) => [...prev, { sender: 'ai', text: aiReply }]);
      setLoading(false);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-2xl flex items-center justify-center hover:scale-110 transition-all duration-300 group relative"
          aria-label="Open AI Support Chat"
        >
          <Bot className="w-7 h-7" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white animate-pulse"></span>
        </button>
      ) : (
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-80 sm:w-96 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
          
          {/* Header */}
          <div className="bg-[#0F172A] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm">CloudsBuilt AI Support</h4>
                <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span> Online & Ready
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="p-4 h-80 overflow-y-auto space-y-3 bg-slate-50 text-sm">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl ${
                  msg.sender === 'user' 
                    ? 'bg-blue-600 text-white rounded-br-none' 
                    : 'bg-white text-slate-800 border border-slate-200 shadow-xs rounded-bl-none'
                }`}>
                  <p className="text-xs leading-relaxed">{msg.text}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-2xl border border-slate-200 text-slate-400 text-xs italic">
                  AI is typing...
                </div>
              </div>
            )}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-100 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about our services..."
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-600 bg-slate-50/50"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-10 h-10 rounded-xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-md transition-all shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </div>
  );
}
