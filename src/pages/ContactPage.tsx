import React, { useState } from 'react';
import { STORE_CONFIG } from '../data/products';
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, CheckCircle2, ShieldCheck, ExternalLink } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Depot Inquiry',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const handleWhatsAppDirect = () => {
    const text = `Assalamu Alaikum Halal Meat Depot. My name is ${formData.name || 'a customer'}. I would like to inquire about: ${formData.message || 'meat depot availability'}.`;
    window.open(`https://wa.me/${STORE_CONFIG.phoneRaw}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="bg-zinc-950 text-white rounded-3xl p-8 sm:p-12 border-2 border-rose-950/60 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-rose-900/40 text-rose-300 text-xs font-bold px-3 py-1 rounded-full border border-rose-700/40">
            <MapPin className="w-4 h-4 text-rose-400" />
            <span>Greenacre Depot &amp; Cold Storage • Sydney NSW</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">
            Contact Halal Meat Depot
          </h1>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            Have questions about today&apos;s whole lamb carcasses, custom primal butchery cuts, restaurant wholesale accounts, or order delivery? We are here to assist.
          </p>

          <div className="pt-1">
            <a
              href={STORE_CONFIG.abnUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-rose-300 hover:text-white text-xs font-semibold hover:border-rose-700 transition-colors"
            >
              <span>ABN: {STORE_CONFIG.abn}</span>
              <span className="text-[10px] text-zinc-400">(View on Australian Business Register ↗)</span>
            </a>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Contact Cards & Depot Location */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-white p-6 rounded-3xl border border-zinc-200 shadow-sm space-y-5">
            <h3 className="text-base font-black uppercase text-zinc-900 border-b border-zinc-100 pb-3">
              Depot Contact Details
            </h3>

            <div className="space-y-4 text-xs text-zinc-700">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-zinc-900 block">Depot Collection Address:</span>
                  <p className="text-zinc-600 mt-0.5">{STORE_CONFIG.address}</p>
                  <span className="text-[11px] text-rose-800 font-semibold block mt-1">
                    Free parking &amp; customer loading bay available.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-zinc-900 block">Phone Hotline:</span>
                  <a href="tel:+61489989442" className="text-rose-800 font-bold hover:underline">
                    {STORE_CONFIG.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-zinc-900 block">WhatsApp Dispatch:</span>
                  <a
                    href={`https://wa.me/${STORE_CONFIG.phoneRaw}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-rose-800 font-bold hover:underline"
                  >
                    +61 489 989 442 (Live Chat)
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-zinc-900 block">Email Inquiries &amp; Orders:</span>
                  <a href={`mailto:${STORE_CONFIG.email}`} className="text-zinc-600 hover:text-rose-800">
                    {STORE_CONFIG.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-zinc-900 block">Operating &amp; Pickup Hours:</span>
                  <p className="text-zinc-600 mt-0.5">{STORE_CONFIG.operatingHours}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-zinc-900 block">Australian Business Registration:</span>
                  <p className="text-zinc-600 mt-0.5">
                    ABN:{' '}
                    <a
                      href={STORE_CONFIG.abnUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-rose-800 font-bold hover:underline inline-flex items-center gap-1"
                      title="Verify ABN on Australian Business Register"
                    >
                      <span>{STORE_CONFIG.abn}</span>
                      <span className="text-[10px] text-zinc-400">↗ (ABR Verified)</span>
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-zinc-100">
              <button
                onClick={handleWhatsAppDirect}
                className="w-full bg-rose-800 hover:bg-rose-900 text-white font-bold text-xs py-3 rounded-2xl flex items-center justify-center gap-2 transition shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Message Depot on WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Location Map Visualizer Card */}
          <div className="bg-zinc-900 text-white rounded-3xl p-6 border border-zinc-800 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-rose-400">Greenacre Logistics Hub</span>
              <span className="text-[11px] text-zinc-400">Sydney Metro</span>
            </div>
            <p className="text-xs text-zinc-300">
              Centrally located near Roberts Road, Hume Highway, and the M5 corridor for rapid refrigerated distribution across Sydney.
            </p>
            <a
              href="https://maps.google.com/?q=43+Banksia+Rd,+Greenacre+NSW+2190"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-xs font-bold text-rose-400 hover:text-rose-300 underline"
            >
              Open in Google Maps Directions →
            </a>
          </div>

        </div>

        {/* Right Column: Contact Inquiry Form */}
        <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm">
          <h3 className="text-lg font-black uppercase text-zinc-900 mb-2">
            Send an Inquiry to Our Depot Desk
          </h3>
          <p className="text-xs text-zinc-500 mb-6">
            For custom cutting orders, Aqeeqah arrangements, or catering volumes.
          </p>

          {formSubmitted ? (
            <div className="p-8 bg-rose-50 border border-rose-300 rounded-2xl text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-rose-700 mx-auto" />
              <h4 className="font-bold text-rose-950 text-base">Message Sent Successfully!</h4>
              <p className="text-xs text-rose-900 max-w-sm mx-auto">
                Thank you, {formData.name}. Our dispatch team has received your inquiry and will respond within 2-4 hours during business days.
              </p>
              <button
                onClick={() => setFormSubmitted(false)}
                className="mt-3 bg-rose-800 text-white text-xs font-bold px-4 py-2 rounded-xl"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-zinc-700 block mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bilal Kassim"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-zinc-300 focus:outline-none focus:ring-1 focus:ring-rose-800"
                  />
                </div>

                <div>
                  <label className="font-bold text-zinc-700 block mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. bilal@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-zinc-300 focus:outline-none focus:ring-1 focus:ring-rose-800"
                  />
                </div>

                <div>
                  <label className="font-bold text-zinc-700 block mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 0412 000 000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-zinc-300 focus:outline-none focus:ring-1 focus:ring-rose-800"
                  />
                </div>

                <div>
                  <label className="font-bold text-zinc-700 block mb-1">Inquiry Subject</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-zinc-300 bg-white focus:outline-none focus:ring-1 focus:ring-rose-800"
                  >
                    <option value="General Depot Inquiry">General Depot Inquiry</option>
                    <option value="Whole Carcass Order">Whole Carcass (Lamb / Goat / Beef)</option>
                    <option value="Custom Cut Specs">Custom Butchery &amp; Cryovac Request</option>
                    <option value="Restaurant Wholesale Account">Restaurant Wholesale Supply</option>
                    <option value="Aqeeqah / Qurban Request">Aqeeqah / Qurban Inquiry</option>
                    <option value="Delivery Schedule Question">Delivery Schedule &amp; ETA</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="font-bold text-zinc-700 block mb-1">Message Details *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Please include cut requirements, desired quantities, delivery date, etc..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-zinc-300 focus:outline-none focus:ring-1 focus:ring-rose-800"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-rose-800 hover:bg-rose-900 text-white font-black text-xs uppercase tracking-wider py-3.5 rounded-xl transition shadow"
                >
                  Submit Inquiry
                </button>
              </div>
            </form>
          )}

        </div>

      </div>

    </div>
  );
};
