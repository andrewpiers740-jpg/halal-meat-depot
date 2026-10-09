import React, { useState } from 'react';
import { MessageCircle, X, Send, ShieldCheck, Clock, Phone } from 'lucide-react';
import { STORE_CONFIG } from '../data/products';

export const WhatsAppWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMessage, setCustomMessage] = useState('');

  const quickQuestions = [
    'Assalamu Alaikum! What are today’s fresh whole lamb prices?',
    'Do you deliver refrigerated to Bankstown/Liverpool area today?',
    'Can I order custom cut Wagyu steaks for my restaurant?',
    'What time is the Greenacre depot open for meat collection?',
  ];

  const handleSend = (msgText?: string) => {
    const textToSend = msgText || customMessage || 'Assalamu Alaikum, I have an inquiry for Halal Meat Depot.';
    const encoded = encodeURIComponent(textToSend);
    window.open(`https://wa.me/${STORE_CONFIG.phoneRaw}?text=${encoded}`, '_blank');
    setCustomMessage('');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      
      {/* Expanded WhatsApp Chat Bubble Drawer */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-fadeIn">
          {/* Header */}
          <div className="bg-rose-950 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-rose-800 flex items-center justify-center text-amber-400 font-bold border border-rose-700">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-rose-400 border-2 border-white rounded-full"></span>
              </div>
              <div>
                <h4 className="font-bold text-sm leading-tight">Halal Meat Depot Live Chat</h4>
                <p className="text-[11px] text-rose-200 flex items-center gap-1 mt-0.5">
                  <Clock className="w-3 h-3" /> Online now • Greenacre NSW
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-rose-300 hover:text-white p-1 rounded-lg"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 bg-slate-50 space-y-3 max-h-72 overflow-y-auto">
            {/* Depot Welcoming Message */}
            <div className="p-3 bg-white rounded-2xl rounded-tl-none border border-slate-200 shadow-sm text-xs text-slate-700 space-y-1">
              <p className="font-semibold text-zinc-950">Assalamu Alaikum &amp; Welcome!</p>
              <p className="text-slate-600">
                How can our butcher team help you today? Chat directly with our Sydney depot manager for orders, custom primal cuts, or delivery ETAs.
              </p>
              <span className="text-[10px] text-slate-400 block text-right">Just now</span>
            </div>

            {/* Quick Prompt Questions */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Quick Inquiries:
              </span>
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q)}
                  className="w-full text-left p-2 rounded-xl bg-rose-50/70 hover:bg-rose-100/70 text-zinc-950 text-[11px] font-medium border border-rose-200/60 transition"
                >
                  &ldquo;{q}&rdquo;
                </button>
              ))}
            </div>
          </div>

          {/* Chat Input */}
          <div className="p-3 bg-white border-t border-slate-200">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1 text-xs px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-rose-700"
              />
              <button
                onClick={() => handleSend()}
                className="bg-rose-800 hover:bg-rose-950 text-white p-2.5 rounded-xl transition shadow"
                aria-label="Send WhatsApp message"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="flex items-center justify-between mt-2 text-[10px] text-slate-400 px-1">
              <span>Direct WhatsApp: {STORE_CONFIG.phone}</span>
              <span className="flex items-center gap-1 text-rose-700 font-semibold">
                <ShieldCheck className="w-3 h-3" /> Official Depot
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 bg-rose-700 hover:bg-rose-800 text-white py-3 px-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 group border-2 border-white"
        aria-label="WhatsApp live chat support"
      >
        <div className="relative">
          <MessageCircle className="w-6 h-6 text-amber-300" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full animate-ping"></span>
        </div>
        <span className="font-extrabold text-xs tracking-wide">
          {isOpen ? 'Close' : 'Chat & Order on WhatsApp'}
        </span>
      </button>

    </div>
  );
};
