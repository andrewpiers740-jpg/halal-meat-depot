import React, { useState } from 'react';
import { PRODUCTS, STORE_CONFIG } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { ShieldCheck, Truck, Building2, Download, MessageCircle, CheckCircle2, FileText, Phone, Mail, Award, Clock } from 'lucide-react';

export const WholesalePage: React.FC = () => {
  const wholesaleProducts = PRODUCTS.filter((p) => p.category === 'wholesale' || p.badge === 'Wholesale Favorite' || p.badge === 'Best Value');

  const [rfqSubmitted, setRfqSubmitted] = useState(false);
  const [rfqData, setRfqData] = useState({
    businessName: '',
    contactName: '',
    abn: '',
    email: '',
    phone: '',
    businessType: 'Restaurant / Cafe',
    weeklyVolume: '100kg - 300kg',
    cutsRequired: '',
    deliveryDays: 'Monday & Thursday',
  });

  const handleRfqSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRfqSubmitted(true);
  };

  const handleWhatsAppWholesale = () => {
    const text = `Assalamu Alaikum Halal Meat Depot Wholesale team. I am interested in opening a commercial B2B supply account for: ${rfqData.businessName || 'my business'}. Weekly volume approx: ${rfqData.weeklyVolume}. Please provide your wholesale meat rate sheet.`;
    window.open(`https://wa.me/${STORE_CONFIG.phoneRaw}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Wholesale Header */}
      <div className="bg-gradient-to-r from-zinc-950 via-slate-900 to-zinc-950 text-white rounded-3xl p-8 sm:p-12 border-2 border-rose-800 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-amber-500/30">
            <Building2 className="w-4 h-4 text-amber-400" />
            <span>Commercial Foodservice &amp; Butcher Supply • Greenacre NSW</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">
            Sydney Wholesale Halal Meat Supply
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Direct depot wholesale pricing for Sydney steakhouses, Lebanese charcoal grills, kebab houses, burger joints, caterers, and food manufacturers. Master carton deliveries in unbroken refrigerated cold-chains.
          </p>

          <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-rose-200">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400" /> Cryovac Barrier Master Cartons
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400" /> Custom Shawarma Cone Specs
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400" /> NSW Food Authority Audited
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400" /> 10% Crypto Settlement Discount
            </span>
          </div>

          <div className="pt-1">
            <a
              href={STORE_CONFIG.abnUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-rose-300 hover:text-white text-xs font-semibold hover:border-rose-700 transition-colors"
            >
              <span>ABN: {STORE_CONFIG.abn}</span>
              <span className="text-[10px] text-zinc-400">(Australian Business Register Verified ↗)</span>
            </a>
          </div>
        </div>
      </div>

      {/* Tier Pricing Structure */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-800">Tier 1</span>
            <h3 className="text-lg font-black text-slate-900 mt-1">Commercial Cartons</h3>
            <p className="text-xs text-slate-500 mt-2">
              For busy restaurants, cafes, and pop-up kitchens ordering single or multiple 10kg - 15kg cartons.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-100 text-xs space-y-1.5 text-slate-700">
              <p>• Min Order: $250 AUD</p>
              <p>• Next-day refrigerated delivery across Sydney</p>
              <p>• Free shipping over $500 AUD</p>
            </div>
          </div>
          <button
            onClick={() => window.scrollTo({ top: 900, behavior: 'smooth' })}
            className="mt-6 w-full bg-slate-900 text-white text-xs font-bold py-2.5 rounded-xl hover:bg-slate-800 transition"
          >
            Order Master Cartons Below
          </button>
        </div>

        <div className="p-6 bg-zinc-950 text-white rounded-3xl border-2 border-amber-500 shadow-lg flex flex-col justify-between relative">
          <span className="absolute -top-3 right-6 bg-amber-400 text-slate-950 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full">
            Most Popular
          </span>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Tier 2</span>
            <h3 className="text-lg font-black text-white mt-1">Weekly Contract Accounts</h3>
            <p className="text-xs text-slate-300 mt-2">
              For high-volume kebab shops, charcoal rotisseries, and catering venues requiring 200kg - 800kg weekly.
            </p>
            <div className="mt-4 pt-4 border-t border-rose-950 text-xs space-y-1.5 text-rose-100">
              <p>• Dedicated wholesale price matrix with locked rates</p>
              <p>• Priority 6:00 AM delivery runs</p>
              <p>• 7 or 14-day trade credit accounts (approved ABN)</p>
            </div>
          </div>
          <button
            onClick={handleWhatsAppWholesale}
            className="mt-6 w-full bg-amber-400 text-slate-950 text-xs font-black py-2.5 rounded-xl hover:bg-amber-300 transition"
          >
            Request Contract Account
          </button>
        </div>

        <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-800">Tier 3</span>
            <h3 className="text-lg font-black text-slate-900 mt-1">Pallet &amp; Carcass Lots</h3>
            <p className="text-xs text-slate-500 mt-2">
              For supermarket chains, butcher shops, institutional buyers, and community Aqeeqah / Qurban events.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-100 text-xs space-y-1.5 text-slate-700">
              <p>• Full pallet pricing (1,000kg+ loads)</p>
              <p>• Whole lamb &amp; goat carcass hanging lots</p>
              <p>• Direct abattoir transfer logistics</p>
            </div>
          </div>
          <button
            onClick={() => window.scrollTo({ top: 1200, behavior: 'smooth' })}
            className="mt-6 w-full bg-slate-900 text-white text-xs font-bold py-2.5 rounded-xl hover:bg-slate-800 transition"
          >
            Submit Pallet RFQ
          </button>
        </div>
      </div>

      {/* Wholesale Product Showcase */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-black uppercase text-slate-900 tracking-tight">
              Commercial Master Cartons
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Order directly online or add to your dispatch cart today.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wholesaleProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>

      {/* RFQ Request Form */}
      <div className="bg-slate-50 rounded-3xl p-8 sm:p-12 border border-slate-200">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-xs font-black uppercase tracking-widest text-rose-800">
              Commercial Inquiries
            </span>
            <h3 className="text-2xl font-black uppercase text-slate-900 mt-1">
              Request a Custom Wholesale Rate Card
            </h3>
            <p className="text-xs text-slate-500 mt-2">
              Fill in your venue details and our wholesale sales manager will provide itemized wholesale carton pricing within 2 business hours.
            </p>
          </div>

          {rfqSubmitted ? (
            <div className="p-8 bg-rose-100 border border-rose-300 rounded-2xl text-center space-y-3">
              <div className="w-12 h-12 bg-rose-800 text-amber-400 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-zinc-950 text-base">Wholesale RFQ Submitted!</h4>
              <p className="text-xs text-rose-950 max-w-md mx-auto">
                JazakAllah Khair! We have received your inquiry for <strong>{rfqData.businessName}</strong>. Our Greenacre depot sales director will contact you on {rfqData.phone || 'your phone'} shortly.
              </p>
              <button
                onClick={() => setRfqSubmitted(false)}
                className="mt-3 bg-rose-950 text-white text-xs font-bold px-4 py-2 rounded-xl"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleRfqSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Trading / Business Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sydney Charcoal Lounge"
                    value={rfqData.businessName}
                    onChange={(e) => setRfqData({ ...rfqData, businessName: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-rose-700"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Contact Person *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Samer Haddad"
                    value={rfqData.contactName}
                    onChange={(e) => setRfqData({ ...rfqData, contactName: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-rose-700"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Business ABN (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. 51 824 912 301"
                    value={rfqData.abn}
                    onChange={(e) => setRfqData({ ...rfqData, abn: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-rose-700"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Business Phone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 0412 000 000"
                    value={rfqData.phone}
                    onChange={(e) => setRfqData({ ...rfqData, phone: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-rose-700"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. kitchen@sydneycharcoal.com.au"
                    value={rfqData.email}
                    onChange={(e) => setRfqData({ ...rfqData, email: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-rose-700"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Estimated Weekly Meat Volume</label>
                  <select
                    value={rfqData.weeklyVolume}
                    onChange={(e) => setRfqData({ ...rfqData, weeklyVolume: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-rose-700"
                  >
                    <option value="50kg - 150kg">50kg - 150kg (Small Restaurant)</option>
                    <option value="150kg - 400kg">150kg - 400kg (Busy Grill / Kebab)</option>
                    <option value="400kg - 1,000kg">400kg - 1,000kg (High Volume)</option>
                    <option value="1,000kg+">1,000kg+ (Pallet / Institutional)</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="font-bold text-slate-700 block mb-1">Cuts &amp; Products Required</label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Chicken maryland fillets skinless, lamb cutlets french trimmed, whole wagyu briskets, diced goat..."
                    value={rfqData.cutsRequired}
                    onChange={(e) => setRfqData({ ...rfqData, cutsRequired: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-rose-700"
                  />
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-rose-800 hover:bg-rose-950 text-white font-black text-xs uppercase tracking-wider py-3.5 rounded-xl transition shadow"
                >
                  Submit Wholesale Request
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppWholesale}
                  className="bg-rose-700 hover:bg-rose-700 text-white font-bold text-xs uppercase tracking-wider py-3.5 px-6 rounded-xl transition flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Wholesale Desk</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

    </div>
  );
};
