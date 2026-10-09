import React from 'react';
import { ShieldCheck, Award, HeartHandshake, MapPin, Truck, CheckCircle2, ExternalLink } from 'lucide-react';
import { STORE_CONFIG } from '../data/products';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="bg-zinc-950 text-white rounded-3xl p-8 sm:p-12 border-2 border-rose-950/60 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-rose-900/40 text-rose-300 text-xs font-bold px-3 py-1 rounded-full border border-rose-700/40">
            <Award className="w-4 h-4 text-rose-400" />
            <span>Sydney Butcher Heritage • Greenacre NSW</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">
            About Halal Meat Depot
          </h1>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            Founded in the heart of Western Sydney at Greenacre, Halal Meat Depot was established to bridge the gap between premium Australian farm-gate livestock and the discerning Halal culinary community.
          </p>

          <div className="pt-2">
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

      {/* Story & Philosophy */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6 space-y-4 text-zinc-700 text-xs sm:text-sm leading-relaxed">
          <span className="text-xs font-black uppercase tracking-widest text-rose-800">
            Our Purpose
          </span>
          <h2 className="text-2xl font-black text-zinc-900 uppercase tracking-tight">
            From Regional Australian Pastures to Your Kitchen Table
          </h2>
          <p>
            Australia produces some of the finest beef, lamb, goat, fresh chicken, and specialty exotic meats on earth. Yet for too long, Australian Muslim families and restaurant operators faced limited choices: either high-priced retail butcher shops or uncertain slaughterhouse provenance.
          </p>
          <p>
            Halal Meat Depot operates on a wholesale-direct depot model. By procuring primal cuts, whole carcasses, and carton lots directly from audited Halal abattoirs in the Riverina, Gippsland, Bourke, and New England tablelands, we eliminate unnecessary middlemen.
          </p>
          <p>
            The result? Exceptional Black Angus Scotch fillets, sweet milk-fed Victorian lamb cutlets, tender Boer goat, fresh daily chicken, and wild exotic meats at authentic depot wholesale rates, with complete peace of mind that your meat is certified Halal by Halal Control Australia.
          </p>

          <div className="pt-2 grid grid-cols-2 gap-4 text-xs font-bold text-zinc-900">
            <div className="p-3 bg-rose-50 rounded-xl border border-rose-200">
              <span className="text-rose-800 text-base font-black block">100%</span>
              Australian Sourced Livestock
            </div>
            <div className="p-3 bg-rose-50 rounded-xl border border-rose-200">
              <span className="text-rose-800 text-base font-black block">4°C</span>
              Strict Cold-Chain Refrigeration
            </div>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="rounded-3xl overflow-hidden border-2 border-zinc-200 shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80"
              alt="Master Butcher Cutting"
              className="w-full h-80 object-cover"
            />
            <div className="p-6 bg-zinc-900 text-white text-xs space-y-1">
              <p className="font-bold text-rose-400">Master Butchery &amp; Custom Portioning</p>
              <p className="text-zinc-400">
                Every order is hand-inspected, French-trimmed, or custom diced right in our temperature-controlled Greenacre depot cutting rooms.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Depot Values */}
      <div className="bg-zinc-50 rounded-3xl p-8 sm:p-10 border border-zinc-200 space-y-6">
        <h3 className="text-xl font-black uppercase text-zinc-900 text-center">
          What Sets Halal Meat Depot Apart
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-zinc-600">
          <div className="p-5 bg-white rounded-2xl border border-zinc-200 space-y-2">
            <ShieldCheck className="w-6 h-6 text-rose-800" />
            <h4 className="font-bold text-zinc-900 text-sm">Sacred Trust (Amanah)</h4>
            <p>
              Halal is not just a commercial logo to us; it is a sacred trust. Every product we sell is certified Halal by Halal Control Australia.
            </p>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-zinc-200 space-y-2">
            <Truck className="w-6 h-6 text-rose-800" />
            <h4 className="font-bold text-zinc-900 text-sm">Sydney-Wide Cold Delivery</h4>
            <p>
              Our fleet of refrigerated delivery vans ensures meat arrives at your door chilled below 4°C, packed in leakproof food-grade vacuum seals.
            </p>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-zinc-200 space-y-2">
            <HeartHandshake className="w-6 h-6 text-rose-800" />
            <h4 className="font-bold text-zinc-900 text-sm">Transparent Australian Pricing</h4>
            <p>
              Clear per-kilogram breakdowns with Australian GST included. No surprise handling charges or hidden cutting fees.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
