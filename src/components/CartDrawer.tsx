import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, Trash2, Plus, Minus, ShieldAlert, ArrowRight, Truck, Store, Tag, Sparkles } from 'lucide-react';
import { STORE_CONFIG } from '../data/products';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    itemCount,
    minOrder,
    freeShippingThreshold,
    isMinOrderMet,
    minOrderShortfall,
    freeShippingShortfall,
    deliveryType,
    setDeliveryType,
    shippingFee,
    discountCode,
    appliedDiscount,
    applyDiscountCode,
    removeDiscountCode,
    discountAmount,
    grandTotal,
    setIsCheckoutOpen,
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    const result = applyDiscountCode(inputCoupon);
    if (!result.success) {
      setCouponError(result.message);
    } else {
      setInputCoupon('');
    }
  };

  const proceedToCheckout = () => {
    if (!isMinOrderMet) return;
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const minOrderProgress = Math.min(100, Math.round((subtotal / minOrder) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Drawer Header */}
          <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight">Your Meat Order</h2>
                <span className="bg-rose-800 text-amber-300 text-xs font-black px-2 py-0.5 rounded-full">
                  {itemCount} {itemCount === 1 ? 'item' : 'items'}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">Halal Meat Depot • Greenacre NSW</p>
            </div>
            
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-200 transition"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Rules Banner (Min Order $250 AUD & Free Shipping $500 AUD) */}
          <div className="px-5 py-3 bg-zinc-950 text-white border-b border-zinc-900 space-y-2">
            {/* Min order check */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-red-400">Minimum Order Rule ($250 AUD)</span>
                <span>
                  {isMinOrderMet ? (
                    <span className="text-red-400 font-bold">✓ Met (${subtotal.toFixed(2)})</span>
                  ) : (
                    <span className="text-zinc-300">Add ${minOrderShortfall.toFixed(2)} AUD</span>
                  )}
                </span>
              </div>
              <div className="w-full bg-zinc-900 rounded-full h-1.5 overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${isMinOrderMet ? 'bg-red-500' : 'bg-red-400'}`}
                  style={{ width: `${minOrderProgress}%` }}
                />
              </div>
            </div>

            {/* Free refrigerated shipping progress */}
            {deliveryType === 'delivery' && (
              <div className="pt-1 border-t border-zinc-900">
                <div className="flex justify-between text-[11px] text-zinc-300 mb-1">
                  <span>Free Refrigerated Delivery ($500+ AUD)</span>
                  <span>
                    {freeShippingShortfall === 0 ? (
                      <span className="text-red-400 font-bold">Unlocked!</span>
                    ) : (
                      <span>Add ${freeShippingShortfall.toFixed(2)} for FREE</span>
                    )}
                  </span>
                </div>
                <div className="w-full bg-zinc-900 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="h-full bg-red-400 transition-all duration-300"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="py-16 text-center text-slate-500">
                <div className="w-16 h-16 rounded-full bg-slate-100 mx-auto flex items-center justify-center text-slate-400 mb-3">
                  <Truck className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-slate-800 text-sm">Your order is empty</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                  Explore our premium Australian Halal beef primals, lamb cutlets, goat, fresh chicken, and exotic meats.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-4 bg-rose-800 hover:bg-rose-950 text-white text-xs font-bold px-4 py-2 rounded-xl transition"
                >
                  Browse Meat Depot
                </button>
              </div>
            ) : (
              cart.map((item, idx) => (
                <div
                  key={`${item.product.id}-${item.selectedCut}-${idx}`}
                  className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex gap-3 items-start relative group"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-xl object-cover flex-shrink-0 border border-slate-200"
                  />
                  
                  <div className="flex-1 min-w-0 pr-6">
                    <h4 className="text-xs font-bold text-slate-900 leading-snug line-clamp-1">
                      {item.product.name}
                    </h4>
                    
                    {item.selectedCut && (
                      <p className="text-[11px] font-medium text-rose-800 mt-0.5 line-clamp-1">
                        Cut: {item.selectedCut}
                      </p>
                    )}

                    {item.customNotes && (
                      <p className="text-[10px] text-slate-500 italic mt-0.5 line-clamp-1">
                        Note: {item.customNotes}
                      </p>
                    )}

                    <div className="flex items-center justify-between mt-2">
                      <div className="text-xs font-black text-slate-900">
                        ${(item.product.price * item.quantity).toFixed(2)} AUD
                      </div>

                      {/* Quantity Selector */}
                      <div className="flex items-center bg-white border border-slate-300 rounded-lg p-0.5">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedCut)}
                          className="p-1 hover:bg-slate-100 text-slate-600 rounded"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-slate-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedCut)}
                          className="p-1 hover:bg-slate-100 text-slate-600 rounded"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Remove Item */}
                  <button
                    onClick={() => removeFromCart(item.product.id, item.selectedCut)}
                    className="absolute top-3 right-3 text-slate-400 hover:text-rose-600 transition"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Drawer Bottom Controls & Calculations */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-slate-200 bg-slate-50 space-y-3">
              
              {/* Delivery vs Depot Collection */}
              <div className="grid grid-cols-2 gap-2 bg-slate-200 p-1 rounded-xl text-xs font-bold">
                <button
                  onClick={() => setDeliveryType('delivery')}
                  className={`py-2 rounded-lg flex items-center justify-center gap-1.5 transition ${
                    deliveryType === 'delivery'
                      ? 'bg-zinc-950 text-white shadow'
                      : 'text-slate-700 hover:text-slate-900'
                  }`}
                >
                  <Truck className="w-3.5 h-3.5" />
                  <span>Refrigerated Delivery</span>
                </button>

                <button
                  onClick={() => setDeliveryType('pickup')}
                  className={`py-2 rounded-lg flex items-center justify-center gap-1.5 transition ${
                    deliveryType === 'pickup'
                      ? 'bg-zinc-950 text-white shadow'
                      : 'text-slate-700 hover:text-slate-900'
                  }`}
                >
                  <Store className="w-3.5 h-3.5" />
                  <span>Greenacre Depot Pickup</span>
                </button>
              </div>

              {/* Coupon Form */}
              <div>
                {appliedDiscount ? (
                  <div className="flex items-center justify-between bg-red-50 border border-red-200 text-red-950 px-3 py-1.5 rounded-xl text-xs">
                    <span className="font-bold flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-red-700" />
                      Promo &apos;{appliedDiscount.code}&apos; Active (-${discountAmount.toFixed(2)})
                    </span>
                    <button
                      onClick={removeDiscountCode}
                      className="text-red-700 hover:text-rose-900 font-bold underline text-[11px]"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        placeholder="Coupon code (try HALAL10)"
                        value={inputCoupon}
                        onChange={(e) => setInputCoupon(e.target.value)}
                        className="w-full text-xs uppercase px-3 py-2 border border-slate-300 rounded-xl focus:ring-1 focus:ring-red-800 focus:outline-none"
                      />
                      <Tag className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-2.5" />
                    </div>
                    <button
                      type="submit"
                      className="bg-zinc-900 hover:bg-black text-white text-xs font-bold px-3 py-2 rounded-xl"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponError && <p className="text-[11px] text-rose-600 mt-1">{couponError}</p>}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-200">
                <div className="flex justify-between">
                  <span>Subtotal (AUD):</span>
                  <span className="font-semibold text-slate-900">${subtotal.toFixed(2)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-red-800 font-semibold">
                    <span>Discount:</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>
                    {deliveryType === 'pickup'
                      ? 'Depot Collection (Greenacre):'
                      : subtotal >= freeShippingThreshold
                      ? 'Refrigerated Courier (Over $500 AUD):'
                      : 'Refrigerated Delivery Fee:'}
                  </span>
                  <span className="font-semibold text-slate-900">
                    {deliveryType === 'pickup'
                      ? 'FREE'
                      : shippingFee === 0
                      ? 'FREE ($0.00)'
                      : `$${shippingFee.toFixed(2)} AUD`}
                  </span>
                </div>

                <div className="flex justify-between text-slate-950 font-black text-sm pt-2 border-t border-slate-200">
                  <span>Estimated Total:</span>
                  <span className="text-red-900 text-base">${grandTotal.toFixed(2)} AUD</span>
                </div>

                <div className="text-[10px] text-slate-400 text-right">
                  Includes approx. ${(grandTotal / 11).toFixed(2)} AUD Australian GST
                </div>
              </div>

              {/* Min Order Warning or Checkout Button */}
              {!isMinOrderMet ? (
                <div className="p-3 bg-red-50 border border-red-200 rounded-2xl text-red-950 flex items-start gap-2.5">
                  <ShieldAlert className="w-5 h-5 text-red-700 flex-shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <p className="font-bold">Minimum Order Not Met</p>
                    <p className="text-[11px] mt-0.5 text-red-800">
                      Our commercial refrigerated supply requires a minimum order of <strong>${minOrder}.00 AUD</strong>. Please add <strong>${minOrderShortfall.toFixed(2)} AUD</strong> more to proceed.
                    </p>
                  </div>
                </div>
              ) : (
                <button
                  onClick={proceedToCheckout}
                  className="w-full bg-red-800 hover:bg-red-900 text-white py-3.5 px-4 rounded-2xl font-black text-sm shadow-xl flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  <span>Proceed to Full Order Form</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              )}

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
