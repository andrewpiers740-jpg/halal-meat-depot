import React, { useState } from 'react';
import { ShieldCheck, Award, FileCheck, CheckCircle2, Download, Printer, ExternalLink, Calendar, MapPin } from 'lucide-react';
import { STORE_CONFIG } from '../data/products';

export const HalalCertificatePage: React.FC = () => {
  const [showCertModal, setShowCertModal] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="bg-zinc-950 text-white rounded-3xl p-8 sm:p-12 border-2 border-rose-950/60 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-rose-900/40 text-rose-300 text-xs font-bold px-3 py-1 rounded-full border border-rose-700/40">
            <ShieldCheck className="w-4 h-4 text-rose-400" />
            <span>Islamic Compliance &amp; Authenticity • 100% Hand Slaughtered Zabiha</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">
            Our Halal Certification &amp; Standards
          </h1>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            At Halal Meat Depot, purity and adherence to Shariah dietary laws are non-negotiable. Every carcass, primal cut, and poultry batch delivered through our Greenacre depot is strictly supervised, certified, and authenticated by accredited Australian Islamic authorities.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowCertModal(true)}
              className="bg-rose-700 hover:bg-rose-800 text-white font-black text-xs uppercase tracking-wider px-5 py-3 rounded-xl shadow-md transition flex items-center gap-2"
            >
              <FileCheck className="w-4 h-4" />
              <span>Inspect Official Certificate Document</span>
            </button>

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
              Audited and certified by both the Halal Certification Authority Australia (HCAA) and the Australian Federation of Islamic Councils (AFIC), alongside state food safety authorities.
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
          Accrediting Australian Islamic Organizations
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STORE_CONFIG.certifyingBodies.map((body, i) => (
            <div key={i} className="p-4 bg-white rounded-2xl border border-zinc-200 text-xs flex items-start gap-3">
              <Award className="w-5 h-5 text-rose-700 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-zinc-900 block">{body}</span>
                <span className="text-[11px] text-rose-800 font-semibold mt-1 block">Active Registration &amp; Inspected</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Official Certificate Document Modal */}
      {showCertModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="relative bg-white rounded-3xl max-w-2xl w-full p-8 border-4 border-rose-900 shadow-2xl">
            
            <div className="text-right">
              <button
                onClick={() => setShowCertModal(false)}
                className="text-zinc-400 hover:text-zinc-700 font-bold text-sm"
              >
                ✕ Close Preview
              </button>
            </div>

            {/* Certificate Frame */}
            <div className="border-2 border-rose-900/30 p-6 sm:p-8 rounded-2xl text-center space-y-4 bg-gradient-to-b from-rose-50/20 to-white">
              
              <div className="w-16 h-16 rounded-full bg-zinc-950 text-rose-400 flex items-center justify-center font-black text-2xl mx-auto shadow-md border-2 border-rose-800">
                حلال
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-rose-900">
                  HALAL CERTIFICATION AUTHORITY AUSTRALIA
                </span>
                <h3 className="text-2xl font-black text-zinc-900 uppercase tracking-tight">
                  CERTIFICATE OF HALAL CONFORMITY
                </h3>
                <p className="text-xs text-zinc-500">Registration Reference: #HCAA-SYD-2026-9812A</p>
              </div>

              <div className="py-4 border-y border-rose-200 text-xs text-zinc-700 space-y-2 leading-relaxed">
                <p>
                  This is to certify that the wholesale meat depot and processing facility operating under:
                </p>
                <p className="font-black text-zinc-950 text-sm">
                  HALAL MEAT DEPOT PTY LTD<br />
                  <span className="font-medium text-xs text-zinc-600">43 Banksia Rd, Greenacre NSW 2190, Australia</span>
                </p>
                <div className="pt-1">
                  <a
                    href={STORE_CONFIG.abnUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-rose-800 hover:text-rose-950 underline font-semibold text-xs"
                  >
                    ABN: {STORE_CONFIG.abn} (ABR Verified ↗)
                  </a>
                </div>
                <p className="pt-2">
                  has been thoroughly inspected and audited. All meat handling, boning, packaging, and chilled distribution procedures adhere strictly to Islamic Jurisprudential Standards for Halal Livestock Processing.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs text-left pt-2 text-zinc-600">
                <div>
                  <span className="font-bold text-zinc-900 block">Covered Livestock:</span>
                  <span>Australian Beef, Lamb, Goat, Poultry &amp; Wagyu</span>
                </div>
                <div>
                  <span className="font-bold text-zinc-900 block">Slaughter Method:</span>
                  <span>100% Hand-Slaughtered Zabiha</span>
                </div>
                <div>
                  <span className="font-bold text-zinc-900 block">Issued Location:</span>
                  <span>Sydney, NSW, Australia</span>
                </div>
                <div>
                  <span className="font-bold text-zinc-900 block">Validity:</span>
                  <span>Current 2026 Season</span>
                </div>
              </div>

              <div className="pt-6 flex justify-center gap-3">
                <button
                  onClick={() => window.print()}
                  className="bg-rose-800 hover:bg-rose-900 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 transition"
                >
                  <Printer className="w-4 h-4" /> Print Copy
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
