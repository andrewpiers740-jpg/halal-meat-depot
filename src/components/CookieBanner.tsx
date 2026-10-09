import React, { useState, useEffect } from 'react';
import { ShieldCheck, X } from 'lucide-react';

export const CookieBanner: React.FC = () => {
  const [accepted, setAccepted] = useState(true);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('hmd_cookie_consent');
      if (!consent) {
        setAccepted(false);
      }
    } catch {
      setAccepted(true);
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem('hmd_cookie_consent', 'true');
    } catch (e) {
      console.error(e);
    }
    setAccepted(true);
  };

  if (accepted) return null;

  return (
    <div className="fixed bottom-4 left-4 z-40 max-w-sm bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-slate-200 text-xs text-slate-700 animate-fadeIn">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-800 flex items-center justify-center flex-shrink-0 mt-0.5">
          <ShieldCheck className="w-4 h-4" />
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-slate-900 text-xs">Australian Privacy &amp; Cookies Notice</h4>
          <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
            We use essential cookies to maintain your shopping cart, calculate chilled freight rules, and ensure secure order submission under Australian Privacy Principles.
          </p>
          <div className="mt-3 flex items-center gap-2">
            <button
              onClick={handleAccept}
              className="bg-rose-950 hover:bg-zinc-950 text-white font-bold text-[11px] px-3 py-1.5 rounded-lg shadow-sm transition"
            >
              Accept &amp; Continue
            </button>
            <button
              onClick={handleAccept}
              className="text-slate-500 hover:text-slate-800 font-semibold text-[11px]"
            >
              Preferences
            </button>
          </div>
        </div>
        <button
          onClick={handleAccept}
          className="text-slate-400 hover:text-slate-600 p-1"
          aria-label="Dismiss cookie notice"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
