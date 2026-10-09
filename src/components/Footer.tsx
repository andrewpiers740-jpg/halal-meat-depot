import React from 'react';
import { ShieldCheck, MapPin, Phone, Mail, Award, Truck, Lock, ArrowUpRight, ExternalLink } from 'lucide-react';
import { STORE_CONFIG } from '../data/products';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
  openAdminPortal: () => void;
  openPolicyModal: (policyId: string) => void;
  setSelectedCategory?: (cat: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  setCurrentTab,
  openAdminPortal,
  openPolicyModal,
  setSelectedCategory,
}) => {
  const navigateTo = (tab: string) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToCategory = (catId: string) => {
    if (setSelectedCategory) {
      setSelectedCategory(catId);
    }
    setCurrentTab('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-zinc-950 text-zinc-300 pt-16 pb-12 border-t-4 border-rose-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Feature Highlights Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-12 border-b border-zinc-800">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-rose-950/60 border border-rose-800/60 flex items-center justify-center flex-shrink-0 text-rose-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">100% Certified Halal</h4>
              <p className="text-xs text-zinc-400 mt-1">Strict hand-slaughtered Zabiha compliant with AFIC &amp; HCAA oversight.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-rose-950/60 border border-rose-800/60 flex items-center justify-center flex-shrink-0 text-rose-400">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Refrigerated Fleet</h4>
              <p className="text-xs text-zinc-400 mt-1">Direct temperature-controlled cold chain delivery across Greater Sydney.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-rose-950/60 border border-rose-800/60 flex items-center justify-center flex-shrink-0 text-rose-400">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Wholesale &amp; Retail</h4>
              <p className="text-xs text-zinc-400 mt-1">Direct depot pricing for restaurants, catering businesses, and families.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-rose-950/60 border border-rose-800/60 flex items-center justify-center flex-shrink-0 text-rose-400">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">10% Crypto Discount</h4>
              <p className="text-xs text-zinc-400 mt-1">Save 10% on your orders when paying via cryptocurrency or USDT.</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links & Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 py-12 border-b border-zinc-800">
          
          {/* Brand Bio with Resized, Wider Logo */}
          <div className="space-y-4">
            <div className="flex flex-col gap-3">
              <div className="h-16 w-auto min-w-[90px] max-w-[170px] rounded-2xl overflow-hidden bg-white p-2 border-2 border-zinc-700 shadow-xl flex items-center justify-center flex-shrink-0">
                <img
                  src="/image/logo.jpg"
                  alt="Halal Meat Depot Logo"
                  className="h-full w-auto object-contain"
                />
              </div>
              <div>
                <span className="text-lg font-black text-white tracking-tight block uppercase">HALAL MEAT DEPOT</span>
                <span className="text-[11px] text-rose-400 font-bold uppercase tracking-wider block mt-0.5">Sydney Wholesale &amp; Retail</span>
                <a
                  href={STORE_CONFIG.abnUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-zinc-400 hover:text-rose-300 font-medium inline-flex items-center gap-1 mt-1 underline decoration-dotted"
                  title="Verify ABN on Australian Business Register"
                >
                  <span>ABN: {STORE_CONFIG.abn}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
            
            <p className="text-xs text-zinc-400 leading-relaxed">
              Sydney&apos;s trusted Halal meat depot in Greenacre NSW. 100% genuine Australian pasture-fed meats &amp; poultry with uncompromising Zabiha slaughter integrity.
            </p>

            <div className="pt-1 text-xs text-rose-400 font-semibold space-y-1">
              <p>• NSW Food Authority Plant</p>
              <p>• HCAA &amp; AFIC Halal Certified</p>
            </div>
          </div>

          {/* Meat Categories */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-rose-400 mb-4">Meat Categories</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigateToCategory('beef')} className="hover:text-rose-400 transition text-left flex items-center gap-1.5 uppercase font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span> Beef
                </button>
              </li>
              <li>
                <button onClick={() => navigateToCategory('lamb')} className="hover:text-rose-400 transition text-left flex items-center gap-1.5 uppercase font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span> Lamb
                </button>
              </li>
              <li>
                <button onClick={() => navigateToCategory('goat')} className="hover:text-rose-400 transition text-left flex items-center gap-1.5 uppercase font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span> Goat
                </button>
              </li>
              <li>
                <button onClick={() => navigateToCategory('chicken')} className="hover:text-rose-400 transition text-left flex items-center gap-1.5 uppercase font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span> Chicken
                </button>
              </li>
              <li>
                <button onClick={() => navigateToCategory('camel')} className="hover:text-rose-400 transition text-left flex items-center gap-1.5 uppercase font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span> Camel
                </button>
              </li>
              <li>
                <button onClick={() => navigateToCategory('duck')} className="hover:text-rose-400 transition text-left flex items-center gap-1.5 uppercase font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span> Duck
                </button>
              </li>
              <li>
                <button onClick={() => navigateToCategory('kangaroo')} className="hover:text-rose-400 transition text-left flex items-center gap-1.5 uppercase font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span> Kangaroo
                </button>
              </li>
              <li>
                <button onClick={() => navigateToCategory('water-buffalo')} className="hover:text-rose-400 transition text-left flex items-center gap-1.5 uppercase font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span> Water Buffalo
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-rose-400 mb-4">Depot Navigation</h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => navigateTo('home')} className="hover:text-rose-400 transition">HOME</button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop')} className="hover:text-rose-400 transition">SHOP ALL MEATS</button>
              </li>
              <li>
                <button onClick={() => navigateTo('wholesale')} className="hover:text-rose-400 transition">WHOLESALE B2B SUPPLY</button>
              </li>
              <li>
                <button onClick={() => navigateTo('halal-certificate')} className="hover:text-rose-400 transition">HALAL CERTIFICATES</button>
              </li>
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-rose-400 transition">ABOUT US</button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-rose-400 transition">CONTACT US</button>
              </li>
              <li>
                <button onClick={() => navigateTo('blog')} className="hover:text-rose-400 transition">BLOG / BUTCHERY GUIDES</button>
              </li>
              <li>
                <button onClick={() => navigateTo('account')} className="hover:text-rose-400 transition text-amber-300 font-semibold">MY ACCOUNT</button>
              </li>
            </ul>
          </div>

          {/* Policies & Compliance */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-rose-400 mb-4">Policies &amp; Orders</h3>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li>
                <button onClick={() => openPolicyModal('delivery')} className="hover:text-white transition">Delivery &amp; Shipping Policy</button>
              </li>
              <li>
                <button onClick={() => openPolicyModal('refund')} className="hover:text-white transition">Refund &amp; Return Policy</button>
              </li>
              <li>
                <button onClick={() => openPolicyModal('terms')} className="hover:text-white transition">Terms &amp; Conditions</button>
              </li>
              <li>
                <button onClick={() => openPolicyModal('privacy')} className="hover:text-white transition">Privacy Policy</button>
              </li>
              <li>
                <span className="text-rose-300 font-medium">Min Order: $250.00 AUD</span>
              </li>
              <li>
                <span className="text-zinc-500">Free Sydney Delivery over $500</span>
              </li>
            </ul>
          </div>

          {/* Depot Location & Contact */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-rose-400 mb-4">Sydney Depot</h3>
            <div className="space-y-3 text-xs text-zinc-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                <span>
                  {STORE_CONFIG.address}
                  <span className="block text-[11px] text-zinc-500">Western Sydney Hub</span>
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-rose-500 flex-shrink-0" />
                <a href="tel:+61489989442" className="text-zinc-200 hover:text-rose-400 transition">
                  {STORE_CONFIG.phone}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-rose-500 flex-shrink-0" />
                <a href={`mailto:${STORE_CONFIG.email}`} className="text-zinc-400 hover:text-rose-400 transition">
                  {STORE_CONFIG.email}
                </a>
              </div>

              <p className="text-[11px] text-zinc-500 pt-2 border-t border-zinc-800">
                {STORE_CONFIG.operatingHours}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Admin Reply Portal Link */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span>© {new Date().getFullYear()} {STORE_CONFIG.name}. All Rights Reserved.</span>
            <span>•</span>
            <a
              href={STORE_CONFIG.abnUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-rose-400 hover:text-rose-300 underline underline-offset-2 transition-colors inline-flex items-center gap-1 font-semibold"
              title="Verify ABN on Australian Business Register (abr.business.gov.au)"
            >
              <span>ABN: {STORE_CONFIG.abn}</span>
              <span className="text-[10px] opacity-80">(ABR Verified ↗)</span>
            </a>
            <span>•</span>
            <span>Sydney, New South Wales, Australia</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={openAdminPortal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-rose-300 hover:border-rose-900 text-[11px] font-semibold transition-all"
            >
              <Lock className="w-3 h-3 text-rose-400" />
              <span>Admin Order Portal</span>
              <ArrowUpRight className="w-3 h-3 opacity-60" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
