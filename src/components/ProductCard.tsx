import React, { useState } from 'react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { ShieldCheck, Plus, Minus, ShoppingBag, Zap, Check, ArrowRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, buyNow, openProductPage } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const getBadgeClass = (badge?: string) => {
    switch (badge) {
      case 'Popular':
        return 'bg-red-800 text-white font-black';
      case 'Premium':
        return 'bg-zinc-950 text-red-400 border border-red-700 font-bold';
      case 'Best Value':
        return 'bg-zinc-900 text-white font-bold';
      case 'Wholesale Favorite':
        return 'bg-red-950 text-red-200 border border-red-800 font-bold';
      case 'Sale':
        return 'bg-rose-700 text-white font-bold';
      default:
        return 'bg-zinc-800 text-white';
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    buyNow(product, quantity);
  };

  const handleOpenPage = () => {
    openProductPage(product);
  };

  return (
    <div className="group bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:border-rose-700/60">
      
      {/* Top Image & Badges (Clicking opens dedicated product page) */}
      <div 
        className="relative aspect-[4/3] bg-zinc-100 overflow-hidden cursor-pointer" 
        onClick={handleOpenPage}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Badge */}
        {product.badge && (
          <span className={`absolute top-3 left-3 px-2.5 py-1 text-[11px] rounded-lg tracking-wide uppercase shadow-md ${getBadgeClass(product.badge)}`}>
            {product.badge}
          </span>
        )}

        {/* Halal Certified Stamp */}
        <span className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-red-950 text-[11px] font-bold px-2 py-0.5 rounded-md shadow flex items-center gap-1 border border-red-200">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> 100% Halal
        </span>

        {/* View Details hover pill */}
        <div className="absolute bottom-3 right-3 bg-white/95 text-zinc-900 text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-all transform translate-y-1 group-hover:translate-y-0 flex items-center gap-1">
          <span>View Cut</span>
          <ArrowRight className="w-3 h-3 text-rose-800" />
        </div>
      </div>

      {/* Content Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Origin & Subcategory */}
          <div className="flex items-center justify-between text-[11px] font-semibold text-zinc-500 mb-1.5 uppercase tracking-wider">
            <span className="text-red-900 bg-red-50 px-2 py-0.5 rounded border border-red-100">
              {product.subcategory}
            </span>
            <span className="truncate max-w-[120px] text-right">
              {product.origin}
            </span>
          </div>

          {/* Product Name (Opens dedicated product page) */}
          <h3
            onClick={handleOpenPage}
            className="font-bold text-zinc-900 text-base leading-snug hover:text-red-800 transition cursor-pointer line-clamp-2"
          >
            {product.name}
          </h3>

          {/* Short description */}
          <p className="text-xs text-zinc-600 mt-1.5 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Pricing Row */}
          <div className="mt-3 pt-2.5 border-t border-zinc-100 flex items-baseline justify-between">
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-black text-zinc-950">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-xs font-bold text-red-900 uppercase">
                AUD
              </span>
            </div>
            <div className="text-[11px] text-zinc-500 text-right">
              <span>{product.unit}</span>
              {product.unitPriceComparison && (
                <span className="block text-[10px] text-red-800 font-semibold">{product.unitPriceComparison}</span>
              )}
            </div>
          </div>
        </div>

        {/* Action Controls: Product Scaling Button, Add to Cart, Buy Now */}
        <div className="mt-4 pt-3 border-t border-zinc-100 space-y-2">
          
          {/* Scaling Row */}
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-zinc-600 uppercase tracking-wider">
              Quantity / Scale:
            </span>
            
            {/* Product Scaling Button (Stepper) */}
            <div className="flex items-center border border-zinc-300 rounded-lg bg-zinc-50 p-0.5">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setQuantity((q) => Math.max(1, q - 1));
                }}
                className="p-1 hover:bg-white rounded text-zinc-700 active:scale-95 transition"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-7 text-center text-xs font-black text-zinc-950 select-none">
                {quantity}
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setQuantity((q) => q + 1);
                }}
                className="p-1 hover:bg-white rounded text-zinc-700 active:scale-95 transition"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Buttons Row: Add to Cart & Buy Now */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            {/* Add to Cart Button */}
            <button
              type="button"
              onClick={handleAddToCart}
              className={`py-2 px-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition active:scale-95 border ${
                isAdded
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                  : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-900 border-zinc-200'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Added!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5 text-zinc-700" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>

            {/* Buy Now Button (Directs to Checkout Page) */}
            <button
              type="button"
              onClick={handleBuyNow}
              className="py-2 px-2.5 bg-rose-800 hover:bg-rose-900 active:scale-95 text-white rounded-xl font-extrabold text-xs shadow-sm flex items-center justify-center gap-1 transition"
            >
              <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
              <span>Buy Now</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
