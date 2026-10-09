import React, { useState } from 'react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { X, ShieldCheck, Check, ShoppingBag, Plus, Minus, Scissors, MapPin, Truck } from 'lucide-react';
import { STORE_CONFIG } from '../data/products';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedCut, setSelectedCut] = useState<string>(
    product?.cutOptions && product.cutOptions.length > 0 ? product.cutOptions[0] : 'Standard Butcher Trim'
  );
  const [customNotes, setCustomNotes] = useState('');
  const [addedAnimation, setAddedAnimation] = useState(false);

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedCut, customNotes);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white text-slate-700 hover:text-slate-900 p-2 rounded-full shadow-md transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product Media */}
          <div className="relative bg-slate-100 h-64 md:h-full min-h-[300px]">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                {product.category} • {product.subcategory}
              </span>
              <span className="text-sm font-semibold flex items-center gap-1.5 mt-1 text-rose-200">
                <MapPin className="w-4 h-4 text-rose-400" /> Sourced from {product.origin}
              </span>
            </div>
          </div>

          {/* Product Details & Butchery Controls */}
          <div className="p-6 md:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div>
              {/* Halal Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-950 border border-red-200 text-xs font-bold mb-3">
                <ShieldCheck className="w-4 h-4 text-red-700" />
                <span>100% Certified Zabiha Halal</span>
              </div>

              <h2 className="text-xl md:text-2xl font-black text-slate-900 leading-tight">
                {product.name}
              </h2>

              {/* Price Row */}
              <div className="mt-3 flex items-baseline gap-2 pb-4 border-b border-slate-100">
                <span className="text-3xl font-black text-red-900">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-xs font-extrabold text-slate-800 uppercase">
                  AUD
                </span>
                <span className="text-xs text-slate-500 ml-2">
                  ({product.unit} • Inc. GST)
                </span>
              </div>

              {/* Full Description */}
              <p className="text-xs md:text-sm text-slate-600 mt-4 leading-relaxed">
                {product.fullDescription || product.shortDescription}
              </p>

              {/* Halal Cert Information */}
              <div className="mt-4 p-3 bg-red-50/60 rounded-xl border border-red-200 text-xs text-red-950 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-red-700 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Halal Compliance: </span>
                  {product.halalCertDetails}
                </div>
              </div>

              {/* Butchery Cut Specification */}
              {product.cutOptions && product.cutOptions.length > 0 && (
                <div className="mt-5">
                  <label className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-slate-800 mb-2">
                    <Scissors className="w-3.5 h-3.5 text-red-800" />
                    <span>Select Master Butchery Cut / Portioning:</span>
                  </label>
                  <div className="space-y-2">
                    {product.cutOptions.map((cut) => {
                      const isSelected = selectedCut === cut;
                      return (
                        <div
                          key={cut}
                          onClick={() => setSelectedCut(cut)}
                          className={`p-2.5 rounded-xl border text-xs cursor-pointer flex items-center justify-between transition-all ${
                            isSelected
                              ? 'border-red-800 bg-red-50 text-red-950 font-bold shadow-sm'
                              : 'border-slate-200 hover:border-slate-300 text-slate-700'
                          }`}
                        >
                          <span>{cut}</span>
                          {isSelected && <Check className="w-4 h-4 text-red-800" />}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Custom Cutting Notes */}
              <div className="mt-4">
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Specific Butcher Instructions (Optional):
                </label>
                <input
                  type="text"
                  placeholder="e.g. Leave extra fat cap on, 2kg cryovac bags, trim sinew..."
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-800 focus:outline-none"
                />
              </div>

              {/* Delivery dispatch info */}
              <div className="mt-4 flex items-center gap-2 text-[11px] text-slate-500">
                <Truck className="w-3.5 h-3.5 text-red-700" />
                <span>Refrigerated dispatch from {STORE_CONFIG.address}</span>
              </div>
            </div>

            {/* Bottom Actions: Quantity & Add to Cart */}
            <div className="mt-6 pt-4 border-t border-slate-200 flex items-center gap-3">
              {/* Quantity Selector */}
              <div className="flex items-center border border-slate-300 rounded-xl bg-slate-50 p-1">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-1.5 hover:bg-white rounded-lg text-slate-700 transition"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-8 text-center text-sm font-black text-slate-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-1.5 hover:bg-white rounded-lg text-slate-700 transition"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Add Button */}
              <button
                onClick={handleAddToCart}
                disabled={addedAnimation}
                className="flex-1 bg-red-800 hover:bg-red-900 text-white py-3 px-4 rounded-xl font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95 disabled:bg-red-700"
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    <span>Added to Order!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-red-200" />
                    <span>Add to Order • ${(product.price * quantity).toFixed(2)} AUD</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
