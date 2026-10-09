import React, { useState } from 'react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { PRODUCTS, STORE_CONFIG } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { 
  ShieldCheck, 
  Truck, 
  MapPin, 
  Scissors, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Zap, 
  Check, 
  ChevronRight, 
  ArrowLeft, 
  Flame, 
  Clock, 
  Layers, 
  Award,
  Phone,
  HelpCircle,
  Share2
} from 'lucide-react';

interface ProductDetailPageProps {
  product: Product | null;
  onBack?: () => void;
  onNavigateToCategory?: (category: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onBack,
  onNavigateToCategory,
}) => {
  const { addToCart, buyNow, setCurrentTab, setSelectedCategory } = useCart();

  // If no product is provided, fallback to the first featured product
  const currentProduct = product || PRODUCTS[0];

  const [quantity, setQuantity] = useState(1);
  const [selectedCut, setSelectedCut] = useState<string>(
    currentProduct.cutOptions && currentProduct.cutOptions.length > 0 
      ? currentProduct.cutOptions[0] 
      : 'Standard Butcher Trim'
  );
  const [customNotes, setCustomNotes] = useState('');
  const [addedToast, setAddedToast] = useState(false);
  const [activeTab, setActiveTab] = useState<'specs' | 'halal' | 'cooking'>('specs');
  const [copiedShare, setCopiedShare] = useState(false);

  const handleAddToCart = () => {
    addToCart(currentProduct, quantity, selectedCut, customNotes);
    setAddedToast(true);
    setTimeout(() => {
      setAddedToast(false);
    }, 2000);
  };

  const handleBuyNow = () => {
    buyNow(currentProduct, quantity, selectedCut, customNotes);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === currentProduct.category && p.id !== currentProduct.id
  ).slice(0, 4);

  return (
    <div className="min-h-screen bg-slate-50 py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb & Back Action */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-zinc-200">
          <nav className="flex items-center space-x-2 text-xs font-semibold text-zinc-500">
            <button 
              onClick={() => {
                setCurrentTab('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-rose-800 transition"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
            <button 
              onClick={() => {
                setSelectedCategory?.('all');
                setCurrentTab('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-rose-800 transition"
            >
              Shop All Meats
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
            <button 
              onClick={() => {
                if (onNavigateToCategory) {
                  onNavigateToCategory(currentProduct.category);
                } else {
                  setSelectedCategory?.(currentProduct.category);
                  setCurrentTab('shop');
                }
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-rose-800 uppercase transition"
            >
              {currentProduct.category}
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
            <span className="text-zinc-900 truncate max-w-[200px] sm:max-w-xs">{currentProduct.name}</span>
          </nav>

          <button
            onClick={() => {
              if (onBack) {
                onBack();
              } else {
                setCurrentTab('shop');
              }
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-700 hover:text-rose-900 bg-white border border-zinc-200 px-3.5 py-1.5 rounded-lg shadow-sm hover:border-zinc-300 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Products</span>
          </button>
        </div>

        {/* Product Core Grid */}
        <div className="bg-white rounded-3xl border border-zinc-200 shadow-sm overflow-hidden p-6 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column: Image Showcase */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-200 shadow-sm">
                <img
                  src={currentProduct.image}
                  alt={currentProduct.name}
                  className="w-full h-full object-cover"
                />

                {/* Halal Badge */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-xl shadow-md border border-rose-200 flex items-center gap-1.5 text-xs font-bold text-rose-950">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Certified Halal</span>
                </div>

                {/* Badge if available */}
                {currentProduct.badge && (
                  <span className="absolute top-4 left-4 px-3 py-1 text-xs font-bold rounded-xl tracking-wider uppercase shadow-md bg-rose-900 text-white">
                    {currentProduct.badge}
                  </span>
                )}

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl text-white text-xs">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-rose-400" />
                    <span>Origin: {currentProduct.origin}</span>
                  </span>
                  <span className="text-[11px] font-semibold text-rose-200">
                    Inspected Australian Plant
                  </span>
                </div>
              </div>

              {/* Guarantees Strip below image */}
              <div className="grid grid-cols-3 gap-3 text-center text-xs">
                <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200">
                  <Truck className="w-4 h-4 text-rose-800 mx-auto mb-1" />
                  <span className="font-bold text-zinc-900 block text-[11px]">Refrigerated Van</span>
                  <span className="text-[10px] text-zinc-500">Chilled Cold Chain</span>
                </div>
                <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                  <span className="font-bold text-zinc-900 block text-[11px]">Halal Control Australia</span>
                  <span className="text-[10px] text-zinc-500">Dual Certified</span>
                </div>
                <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200">
                  <Award className="w-4 h-4 text-amber-600 mx-auto mb-1" />
                  <span className="font-bold text-zinc-900 block text-[11px]">Direct Depot Price</span>
                  <span className="text-[10px] text-zinc-500">Wholesale &amp; Retail</span>
                </div>
              </div>
            </div>

            {/* Right Column: Product Details & Buying Actions */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-rose-50 text-rose-900 border border-rose-200 px-2.5 py-0.5 rounded-lg text-xs font-bold uppercase tracking-wider">
                    {currentProduct.category} • {currentProduct.subcategory}
                  </span>
                  <span className="text-xs font-semibold text-zinc-500">
                    SKU: {currentProduct.id.toUpperCase()}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight leading-tight">
                  {currentProduct.name}
                </h1>

                {/* Price Display */}
                <div className="mt-4 p-4 bg-zinc-50 rounded-2xl border border-zinc-200 flex flex-wrap items-baseline justify-between gap-3">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-black text-zinc-950">
                        ${currentProduct.price.toFixed(2)}
                      </span>
                      <span className="text-sm font-bold text-rose-800 uppercase tracking-wider">
                        AUD
                      </span>
                    </div>
                    <p className="text-xs text-zinc-600 mt-0.5 font-medium">
                      {currentProduct.unit} {currentProduct.unitPriceComparison ? `• ${currentProduct.unitPriceComparison}` : ''} • Inclusive of 10% Australian GST
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      In Stock Chilled
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="mt-4 text-sm text-zinc-700 leading-relaxed">
                  {currentProduct.fullDescription || currentProduct.shortDescription}
                </p>
              </div>

              {/* Butcher Cut Selector */}
              {currentProduct.cutOptions && currentProduct.cutOptions.length > 0 && (
                <div className="space-y-2.5 pt-2 border-t border-zinc-100">
                  <label className="flex items-center justify-between text-xs font-bold text-zinc-900 uppercase tracking-wider">
                    <span className="flex items-center gap-1.5 text-rose-900">
                      <Scissors className="w-4 h-4 text-rose-700" />
                      Select Master Butchery Cut / Portioning:
                    </span>
                    <span className="text-zinc-500 text-[11px] font-normal lowercase">customized by hand</span>
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {currentProduct.cutOptions.map((cut) => {
                      const isSelected = selectedCut === cut;
                      return (
                        <button
                          key={cut}
                          type="button"
                          onClick={() => setSelectedCut(cut)}
                          className={`p-3 rounded-xl border text-xs text-left flex items-center justify-between transition-all ${
                            isSelected
                              ? 'border-rose-800 bg-rose-50 text-rose-950 font-bold shadow-sm ring-1 ring-rose-800'
                              : 'border-zinc-200 hover:border-zinc-300 text-zinc-700 bg-white'
                          }`}
                        >
                          <span className="pr-2">{cut}</span>
                          {isSelected && <Check className="w-4 h-4 text-rose-800 flex-shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Custom Cutting Notes Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-800 block">
                  Butchery &amp; Cryovac Packing Notes (Optional):
                </label>
                <input
                  type="text"
                  placeholder="e.g., Cut 25mm steaks, vacuum pack into 2 individual bags, leave fat cap..."
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  className="w-full text-xs p-3 border border-zinc-300 rounded-xl bg-zinc-50 focus:bg-white focus:ring-2 focus:ring-rose-800 focus:outline-none transition"
                />
              </div>

              {/* Product Scaling & Action Buttons Area */}
              <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-zinc-800 uppercase tracking-wider">
                    Portion Quantity / Scale:
                  </span>
                  <span className="text-xs text-zinc-500 font-semibold">
                    Total: <strong className="text-zinc-950 font-black">${(currentProduct.price * quantity).toFixed(2)} AUD</strong>
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch gap-3">
                  {/* Product Scaling Stepper Button */}
                  <div className="flex items-center justify-between border-2 border-zinc-300 rounded-xl bg-white px-2 py-1 min-w-[130px] shadow-sm">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="p-2 hover:bg-zinc-100 rounded-lg text-zinc-700 active:scale-95 transition"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <div className="text-center px-3">
                      <span className="text-base font-black text-zinc-950 block leading-tight">
                        {quantity}
                      </span>
                      <span className="text-[10px] font-bold text-zinc-500 uppercase">
                        {quantity === 1 ? 'pack' : 'packs'}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                      className="p-2 hover:bg-zinc-100 rounded-lg text-zinc-700 active:scale-95 transition"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Add To Cart Button */}
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="flex-1 bg-zinc-900 hover:bg-zinc-950 text-white py-3.5 px-5 rounded-xl font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition active:scale-95"
                  >
                    {addedToast ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>Added to Cart!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4 text-rose-300" />
                        <span>Add to Cart</span>
                      </>
                    )}
                  </button>

                  {/* Buy Now Button (Directs to Checkout Page) */}
                  <button
                    type="button"
                    onClick={handleBuyNow}
                    className="flex-1 bg-gradient-to-r from-rose-800 to-rose-900 hover:from-rose-900 hover:to-rose-950 text-white py-3.5 px-5 rounded-xl font-extrabold text-xs sm:text-sm shadow-lg shadow-rose-900/30 flex items-center justify-center gap-2 transition active:scale-95"
                  >
                    <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
                    <span>Buy Now</span>
                  </button>
                </div>

                <div className="flex items-center justify-between text-[11px] text-zinc-500 pt-1">
                  <span>Minimum order across store: ${STORE_CONFIG.minOrder} AUD</span>
                  <button
                    type="button"
                    onClick={handleShare}
                    className="text-zinc-600 hover:text-rose-800 inline-flex items-center gap-1 font-semibold"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>{copiedShare ? 'Copied link!' : 'Share Cut'}</span>
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Deep Specification Tabs */}
          <div className="mt-12 pt-8 border-t border-zinc-200">
            <div className="flex border-b border-zinc-200 gap-4">
              <button
                type="button"
                onClick={() => setActiveTab('specs')}
                className={`pb-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition border-b-2 ${
                  activeTab === 'specs'
                    ? 'border-rose-800 text-rose-950'
                    : 'border-transparent text-zinc-500 hover:text-zinc-800'
                }`}
              >
                Butchery &amp; Packaging Specs
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('halal')}
                className={`pb-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition border-b-2 ${
                  activeTab === 'halal'
                    ? 'border-rose-800 text-rose-950'
                    : 'border-transparent text-zinc-500 hover:text-zinc-800'
                }`}
              >
                Halal Accreditation
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('cooking')}
                className={`pb-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition border-b-2 ${
                  activeTab === 'cooking'
                    ? 'border-rose-800 text-rose-950'
                    : 'border-transparent text-zinc-500 hover:text-zinc-800'
                }`}
              >
                Butcher&apos;s Cooking Guide
              </button>
            </div>

            <div className="py-6">
              {activeTab === 'specs' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-zinc-700">
                  <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-200">
                    <h4 className="font-bold text-zinc-950 text-sm mb-2">Storage &amp; Shelf Life</h4>
                    <ul className="space-y-1.5 list-disc list-inside text-zinc-600">
                      <li>Keep chilled at 0°C to 4°C in refrigerator.</li>
                      <li>Vacuum-sealed cryovac freshness: 14 to 21 days chilled.</li>
                      <li>Can be deep frozen up to 6 months without loss of texture.</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-200">
                    <h4 className="font-bold text-zinc-950 text-sm mb-2">Cut Preparation</h4>
                    <ul className="space-y-1.5 list-disc list-inside text-zinc-600">
                      <li>Hand trimmed by master butchers at Greenacre depot.</li>
                      <li>Fat cap calibrated to optimal 6mm thickness.</li>
                      <li>Silver skin and excess sinew carefully trimmed.</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-200">
                    <h4 className="font-bold text-zinc-950 text-sm mb-2">Cold-Chain Dispatch</h4>
                    <ul className="space-y-1.5 list-disc list-inside text-zinc-600">
                      <li>Loaded directly into certified refrigerated delivery vans.</li>
                      <li>Thermal insulated box with food-safe gel ice packs.</li>
                      <li>Dispatched daily Monday through Saturday.</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'halal' && (
                <div className="p-6 bg-emerald-50/50 rounded-2xl border border-emerald-200 text-xs text-emerald-950 space-y-3">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-700" />
                    <h4 className="font-bold text-sm text-emerald-900">Certified Halal by Halal Control Australia</h4>
                  </div>
                  <p className="leading-relaxed">
                    This product is certified Halal by
                    <strong> Halal Control Australia</strong>.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    <div className="p-3 bg-white rounded-xl border border-emerald-200 font-semibold">
                      ✓ Slayed by Muslim Slaughterman
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-emerald-200 font-semibold">
                      ✓ Tasmiyah invoked (Bismillah Allahu Akbar)
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-emerald-200 font-semibold">
                      ✓ Zero mechanical slaughter blades
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'cooking' && (
                <div className="p-6 bg-amber-50/50 rounded-2xl border border-amber-200 text-xs text-amber-950 space-y-3">
                  <div className="flex items-center gap-2">
                    <Flame className="w-5 h-5 text-amber-700" />
                    <h4 className="font-bold text-sm text-amber-900">Recommended Culinary Preparation</h4>
                  </div>
                  <p className="leading-relaxed text-zinc-700">
                    {currentProduct.category === 'beef' && 'Bring steaks to room temperature 30 minutes before grilling. Sear over extreme heat for 2-3 minutes per side, then rest for at least 5 minutes before slicing.'}
                    {currentProduct.category === 'lamb' && 'Marinate with rosemary, crushed garlic, and olive oil. Roast bone-in cuts at 180°C until internal temperature reaches 58°C for medium-rare.'}
                    {currentProduct.category === 'goat' && 'Ideal for low-and-slow braising or authentic biryani. Simmer on low heat with whole spices for 90-120 minutes until meat gently falls off the bone.'}
                    {currentProduct.category === 'chicken' && 'Pat dry thoroughly. Sear skin-on cuts to crisp the exterior, or bake whole roasts at 190°C until internal temp hits 74°C.'}
                    {['camel', 'duck', 'kangaroo', 'water-buffalo'].includes(currentProduct.category) && 'Exotic game meats are ultra-lean. Cook hot and fast to medium-rare, or slow-braise in rich aromatic gravy with stock to retain juiciness.'}
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Related Meat Cuts Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-14">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-rose-800">Explore More</span>
                <h3 className="text-xl sm:text-2xl font-black text-zinc-950 uppercase tracking-tight">
                  Related {currentProduct.category} Cuts
                </h3>
              </div>
              <button
                onClick={() => {
                  setSelectedCategory?.(currentProduct.category);
                  setCurrentTab('shop');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-xs font-bold text-rose-800 hover:text-rose-950 flex items-center gap-1 uppercase"
              >
                <span>View All</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
