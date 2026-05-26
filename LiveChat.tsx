import React, { useState, useRef, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { MessageCircle, X, Send, Sparkles, Phone } from 'lucide-react';

export const LiveChat: React.FC = () => {
  const { chatMessages, sendChatMessage, isChatOpen, setIsChatOpen } = useShop();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isChatOpen) {
      scrollToBottom();
    }
  }, [chatMessages, isChatOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendChatMessage(inputText);
    setInputText('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Trigger Button */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="bg-burgundy text-gold border border-gold/40 hover:border-gold p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 group flex items-center gap-2 hover:bg-[#58111A]"
        >
          <MessageCircle className="w-6 h-6 animate-pulse" />
          <span className="hidden md:inline text-xs tracking-wider uppercase font-sans font-semibold">Fragrance Assistant</span>
        </button>
      )}

      {/* Chat Box Window */}
      {isChatOpen && (
        <div className="w-[340px] sm:w-[380px] h-[480px] bg-charcoal border border-neutral-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in backdrop-blur-md">
          {/* Header */}
          <div className="bg-maroon-gradient border-b border-neutral-800 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center border border-gold/30">
                <Sparkles className="w-5 h-5 text-gold" />
              </div>
              <div>
                <h4 className="text-sm font-serif font-bold text-gold tracking-wide">Arzhaar Brhave</h4>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  <span className="text-[11px] font-mono text-neutral-400">Karachi Scent Specialist</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <a 
                href="tel:+923147155873" 
                className="p-1 text-neutral-400 hover:text-gold transition-colors"
                title="Call Fragrance Boutique"
              >
                <Phone className="w-4 h-4" />
              </a>
              <button
                onClick={() => setIsChatOpen(false)}
                className="p-1 text-neutral-400 hover:text-rose-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Message List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#0a0a0a]">
            {chatMessages.map(msg => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm font-sans ${
                      isUser
                        ? 'bg-burgundy text-rose-50 border border-rose-950/40 rounded-tr-none'
                        : 'bg-[#18181b] text-neutral-200 border border-neutral-800/60 rounded-tl-none'
                    }`}
                  >
                    <p className="leading-relaxed">{msg.text}</p>
                    <span className="text-[10px] font-mono text-neutral-500 block text-right mt-1">
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions tags */}
          <div className="px-4 py-2 bg-dark border-t border-neutral-900 flex items-center gap-2 overflow-x-auto whitespace-nowrap scrollbar-none text-[11px]">
            {[
              'Recommend Signature Scent',
              'Oud Perfumes',
              'Delivery to Karachi',
              'Promo Coupons',
              'Store Directions'
            ].map((tag, i) => (
              <button
                key={i}
                type="button"
                onClick={() => sendChatMessage(tag)}
                className="bg-neutral-900 hover:bg-neutral-800 border border-neutral-800/80 hover:border-gold/30 text-neutral-300 rounded-full px-3 py-1 transition-all"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Chat Form Input */}
          <form
            onSubmit={handleSubmit}
            className="p-3 bg-charcoal border-t border-neutral-800 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              placeholder="Ask about perfumes, orders, notes..."
              className="flex-1 bg-neutral-900 border border-neutral-800 focus:border-gold/50 rounded-xl px-4 py-2 text-sm text-neutral-200 focus:outline-none transition-colors"
            />
            <button
              type="submit"
              className="bg-burgundy hover:bg-[#58111A] text-gold border border-gold/20 hover:border-gold p-2.5 rounded-xl transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
