import React from 'react';
import { PRODUCTS, STORE_CONFIG } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { ShieldCheck, Truck, Percent, Award, ArrowRight, CheckCircle2, ChevronRight, Phone, MapPin, Store, Flame } from 'lucide-react';

interface HomePageProps {
  setCurrentTab: (tab: string) => void;
  setSelectedCategory: (cat: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ setCurrentTab, setSelectedCategory }) => {
  const featuredProducts = PRODUCTS.filter((p) => p.featured || p.badge === 'Popular').slice(0, 8);

  const categoriesPreview = [
    {
      id: 'beef',
      name: 'Beef',
      desc: 'Riverina Angus primals, Scotch fillet, brisket, mince & Wagyu MB7+',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'lamb',
      name: 'Lamb',
      desc: 'Prime French trimmed cutlets, whole carcasses, shanks & roasts',
      image: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'goat',
      name: 'Goat',
      desc: 'Tender Australian Boer goat curry cuts, diced boneless & carcasses',
      image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'chicken',
      name: 'Chicken',
      desc: 'Fresh Australian breast fillets, whole birds & bulk cartons',
      image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'camel',
      name: 'Camel',
      desc: 'Wild Australian rangeland camel curry cuts, striploin & hump',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'duck',
      name: 'Duck',
      desc: 'Grade A fresh Pekin ducks, skin-on breasts & confit marylands',
      image: 'https://images.unsplash.com/photo-1514944298350-0259e8477cb1?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'kangaroo',
      name: 'Kangaroo',
      desc: 'Wild harvested tender fillets, ultra-lean mince & braising cuts',
      image: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'water-buffalo',
      name: 'Water Buffalo',
      desc: 'Free-range rangeland buffalo striploin, ribs, curry cuts & mince',
      image: 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const handleCategoryClick = (catId: string) => {
    setSelectedCategory(catId);
    setCurrentTab('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-16 pb-16">
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-zinc-950 via-slate-900 to-zinc-950 text-white overflow-hidden py-16 lg:py-24 border-b-4 border-amber-500">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px]"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Pitch */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-950/80 border border-amber-500/40 text-amber-300 text-xs font-bold shadow-sm">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Certified Halal by Halal Control Australia • Greenacre NSW</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[1.1]">
                Sydney&apos;s Premier <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-rose-400">
                  Halal Meat Depot
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
                Wholesale primal cuts, Australian beef, Victorian prime spring lamb, tender Boer goat, fresh chicken, and specialty exotic meats. Cut, vacuum-sealed, and delivered cold to your home, restaurant, or catering kitchen across Greater Sydney.
              </p>

              {/* Order Rule Highlights */}
              <div className="grid grid-cols-3 gap-3 pt-2 max-w-lg text-xs">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-3 rounded-2xl">
                  <div className="text-amber-400 font-extrabold text-sm sm:text-base">$250 AUD</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Min Order Rule</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-3 rounded-2xl">
                  <div className="text-rose-400 font-extrabold text-sm sm:text-base">FREE Shipping</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">On orders $500+</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-3 rounded-2xl">
                  <div className="text-amber-300 font-extrabold text-sm sm:text-base">10% OFF</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Crypto Discount</div>
                </div>
              </div>

              {/* CTAs */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => {
                    setCurrentTab('shop');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider px-6 py-4 rounded-2xl shadow-xl flex items-center gap-2 transition transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>Shop Halal Meat Depot</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    setCurrentTab('wholesale');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-rose-950/70 hover:bg-rose-800 border border-rose-700/50 text-white font-bold text-xs sm:text-sm uppercase tracking-wider px-6 py-4 rounded-2xl transition"
                >
                  Wholesale B2B Supply
                </button>
              </div>

              {/* Depot Address & ABN Verification */}
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 pt-2">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-rose-400 flex-shrink-0" />
                  <span>Depot: <strong>{STORE_CONFIG.address}</strong></span>
                </span>
                <span>•</span>
                <a
                  href={STORE_CONFIG.abnUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-rose-300 hover:text-white underline underline-offset-2 inline-flex items-center gap-1 font-semibold"
                  title="Verify ABN on Australian Business Register"
                >
                  <span>ABN: {STORE_CONFIG.abn}</span>
                  <span className="text-[10px] opacity-75">(ABR Verified ↗)</span>
                </a>
              </div>
            </div>

            {/* Right Hero Visual Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border-2 border-amber-500/30 shadow-2xl group">
                <img
                  src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80"
                  alt="Halal Meat Depot Fresh Cuts"
                  className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>

                <div className="absolute bottom-6 left-6 right-6 p-4 bg-slate-900/90 backdrop-blur-md rounded-2xl border border-white/10 shadow-lg text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-amber-400 font-extrabold uppercase tracking-wide">
                      Fresh Daily Primal Supply
                    </span>
                    <span className="bg-rose-800 text-rose-100 text-[10px] font-bold px-2 py-0.5 rounded">
                      Chilled Mon-Sat
                    </span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-snug">
                    Hand-trimmed Black Angus primals and French lamb cutlets prepared by master Australian Halal butchers.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Category Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-xs font-black uppercase tracking-widest text-rose-800 mb-1">
            Certified Australian Livestock
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase">
            Browse By Meat Category
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Every primal cut and bulk carton is inspected, certified, and temperature-controlled.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4.5">
          {categoriesPreview.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className="group cursor-pointer bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:border-rose-700 flex flex-col"
            >
              <div className="relative aspect-square overflow-hidden bg-slate-100">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
              </div>
              <div className="p-3.5 text-center flex-1 flex flex-col justify-between">
                <h3 className="font-bold text-xs text-slate-900 group-hover:text-rose-800 transition uppercase tracking-tight">
                  {cat.name}
                </h3>
                <span className="text-[10px] text-slate-500 mt-1 line-clamp-2">
                  {cat.desc}
                </span>
                <span className="text-[10px] text-rose-700 font-bold mt-2 flex items-center justify-center gap-0.5">
                  View Cuts <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-black uppercase tracking-widest text-rose-800 mb-1">
              Top Wholesale &amp; Retail Picks
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase">
              Featured Meat Depot Cuts
            </h2>
          </div>
          
          <button
            onClick={() => {
              setCurrentTab('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-800 hover:text-zinc-950 uppercase tracking-wider"
          >
            <span>View All {PRODUCTS.length} Depot Products</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Halal Integrity & Sourcing Guarantees Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-zinc-950 text-white rounded-3xl p-8 sm:p-12 border-2 border-rose-950 shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-amber-500/30">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Islamic Dietary Law Compliance</span>
              </div>
              
              <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                Uncompromising Halal Integrity Since Day One
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                At Halal Meat Depot, every animal is slaughtered strictly by accredited Muslim slaughtermen reciting the Tasmiyah (Bismillahi Allahu Akbar). We strictly prohibit pork products, non-halal cross contamination, and alcohol across all our processing rooms and refrigerated transport.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                <div className="flex items-center gap-2 text-rose-200">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>100% Certified Halal Meats</span>
                </div>
                <div className="flex items-center gap-2 text-rose-200">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>Certified by Halal Control Australia</span>
                </div>
                <div className="flex items-center gap-2 text-rose-200">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>NSW Food Authority Licensed Facility</span>
                </div>
                <div className="flex items-center gap-2 text-rose-200">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>Unbroken Chilled Cold-Chain Fleet</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-rose-950/80 rounded-2xl border border-rose-800 text-center">
              <div className="w-16 h-16 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-black text-2xl mb-3 shadow">
                حلال
              </div>
              <h4 className="font-bold text-white text-base">View Official Certificate</h4>
              <p className="text-xs text-rose-200 mt-1">
                Inspect our accreditation stamps, slaughterhouse registration, and audit records.
              </p>
              <button
                onClick={() => {
                  setCurrentTab('halal-certificate');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="mt-4 bg-white text-zinc-950 font-black text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl hover:bg-amber-300 transition"
              >
                Inspect Certificates
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Wholesale & Restaurant Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-100 rounded-3xl p-8 sm:p-10 border border-slate-300 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-rose-800">
              Commercial B2B Supply
            </span>
            <h3 className="text-2xl font-black text-slate-900 uppercase">
              Supplying Sydney Restaurants, Kebab Shops &amp; Caterers
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
              Need bulk master cartons of Tomahawks, 50kg chicken shawarma cones, or whole lamb carcasses cut for wedding catering? Get volume tiered wholesale pricing.
            </p>
          </div>

          <button
            onClick={() => {
              setCurrentTab('wholesale');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex-shrink-0 bg-rose-800 hover:bg-rose-950 text-white font-black text-xs sm:text-sm uppercase tracking-wider px-6 py-3.5 rounded-2xl shadow-lg transition"
          >
            Access Wholesale Portal
          </button>
        </div>
      </section>

    </div>
  );
};
