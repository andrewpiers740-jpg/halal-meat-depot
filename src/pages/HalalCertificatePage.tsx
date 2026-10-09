import React from 'react';
import { ShieldCheck, Award, FileCheck, CheckCircle2, Download, Printer, ExternalLink, Calendar, MapPin } from 'lucide-react';
import { STORE_CONFIG } from '../data/products';

export const HalalCertificatePage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="bg-zinc-950 text-white rounded-3xl p-8 sm:p-12 border-2 border-rose-950/60 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-rose-900/40 text-rose-300 text-xs font-bold px-3 py-1 rounded-full border border-rose-700/40">
            <ShieldCheck className="w-4 h-4 text-rose-400" />
            <span>Islamic Compliance &amp; Authenticity • Certified by Halal Control Australia</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">
            Our Halal Certification &amp; Standards
          </h1>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            At Halal Meat Depot, purity and adherence to Shariah dietary laws are non-negotiable. Every carcass, primal cut, and poultry batch delivered through our Greenacre depot is certified Halal by Halal Control Australia.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href={STORE_CONFIG.abnUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-rose-300 hover:text-white text-xs font-bold hover:border-rose-700 transition-colors"
            >
              <span>ABN: {STORE_CONFIG.abn}</span>
              <span className="text-[10px] text-zinc-400">(View on ABR ↗)</span>
            </a>
          </div>
        </div>
      </div>

      {/* The 5 Pillars of Our Halal Guarantee */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs font-black uppercase tracking-widest text-rose-800">
            Islamic Integrity
          </span>
          <h2 className="text-2xl font-black uppercase text-zinc-900 mt-1">
            The 5 Pillars of Halal Meat Depot
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-3xl border border-zinc-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-800 flex items-center justify-center font-black">
              1
            </div>
            <h3 className="font-bold text-zinc-900 text-sm">Practicing Muslim Slaughtermen</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Every single animal is processed by mature, practicing Muslim slaughtermen who recite the Tasmiyah (*Bismillahi Allahu Akbar*) individually upon each animal at the moment of slaughter.
            </p>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-zinc-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-800 flex items-center justify-center font-black">
              2
            </div>
            <h3 className="font-bold text-zinc-900 text-sm">Swift, Compassionate Incision</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              In accordance with Sunnah animal welfare, a razor-sharp blade is employed to swiftly sever the esophagus, trachea, and carotid arteries, ensuring immediate loss of sensation and thorough blood drainage.
            </p>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-zinc-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-800 flex items-center justify-center font-black">
              3
            </div>
            <h3 className="font-bold text-zinc-900 text-sm">Zero Cross-Contamination</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Our 43 Banksia Rd Greenacre depot is a strictly dedicated Halal facility. Pork, non-Halal offal, and alcoholic marinades or sanitizers are strictly barred from entering the premises.
            </p>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-zinc-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-800 flex items-center justify-center font-black">
              4
            </div>
            <h3 className="font-bold text-zinc-900 text-sm">Accredited Certifying Bodies</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Our products are certified Halal by Halal Control Australia.
            </p>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-zinc-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-800 flex items-center justify-center font-black">
              5
            </div>
            <h3 className="font-bold text-zinc-900 text-sm">Aqeeqah &amp; Charity Compliance</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Full Islamic documentation provided for newborn Aqeeqah, vow fulfillment (Nadhr), and seasonal Qurban sacrifice, with custom butchery and charity portioning.
            </p>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-zinc-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-800 flex items-center justify-center font-black">
              ✓
            </div>
            <h3 className="font-bold text-zinc-900 text-sm">HACCP &amp; Cold Chain Verified</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Temperature continuously monitored below 4°C from the abattoir chilling room to your kitchen bench, ensuring both religious compliance (*Halalan*) and hygiene purity (*Tayyiban*).
            </p>
          </div>
        </div>
      </div>

      {/* Certifying Bodies Showcase */}
      <div className="bg-zinc-50 rounded-3xl p-8 sm:p-10 border border-zinc-200">
        <h3 className="text-lg font-black uppercase text-zinc-900 mb-6 text-center">
          Our Halal Certifier
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STORE_CONFIG.certifyingBodies.map((body, i) => (
            <div key={i} className="p-4 bg-white rounded-2xl border border-zinc-200 text-xs flex items-start gap-3">
              <Award className="w-5 h-5 text-rose-700 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-zinc-900 block">{body}</span>
                <span className="text-[11px] text-rose-800 font-semibold mt-1 block">Certificate available on request</span>
              </div>
            </div>
          ))}
        </div>
      </div>



    </div>
  );
};
