import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { STORE_CONFIG } from '../data/products';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ArrowLeft, 
  Truck, 
  ShieldCheck, 
  Store, 
  Tag, 
  Check, 
  Percent, 
  AlertCircle,
  Scissors
} from 'lucide-react';

export const CartPage: React.FC = () => {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
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
    cryptoDiscountAmount,
    selectedPaymentMethod,
    grandTotal,
    setCurrentTab,
    openProductPage,
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');
    const result = applyDiscountCode(inputCoupon);
    if (!result.success) {
      setCouponError(result.message);
    } else {
      setCouponSuccess(result.message);
      setInputCoupon('');
    }
  };

  const handleProceedToCheckout = () => {
    if (!isMinOrderMet) return;
    setCurrentTab('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const minOrderProgress = Math.min(100, Math.round((subtotal / minOrder) * 100));

  return (
    <div className="min-h-screen bg-slate-50 py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Title */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-zinc-200">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-rose-800">Review &amp; Portions</div>
            <h1 className="text-2xl sm:text-3xl font-black text-zinc-950 uppercase tracking-tight flex items-center gap-3">
              <span>Your Shopping Cart</span>
              <span className="text-sm font-bold bg-rose-100 text-rose-900 px-3 py-0.5 rounded-full">
                {itemCount} {itemCount === 1 ? 'Cut' : 'Cuts'}
              </span>
            </h1>
          </div>

          <button
            onClick={() => {
              setCurrentTab('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-700 hover:text-rose-900 bg-white border border-zinc-200 px-4 py-2 rounded-xl shadow-sm transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue Shopping</span>
          </button>
        </div>

        {cart.length === 0 ? (
          /* Empty Cart View */
          <div className="bg-white rounded-3xl border border-zinc-200 p-12 text-center max-w-xl mx-auto shadow-sm space-y-4">
            <div className="w-20 h-20 rounded-full bg-rose-50 border border-rose-200 text-rose-800 flex items-center justify-center mx-auto shadow-inner">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <h2 className="text-xl font-black text-zinc-950 uppercase tracking-tight">Your Cart is Empty</h2>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed max-w-md mx-auto">
              You haven&apos;t added any Australian Halal meat cuts or wholesale primals yet. Browse our butcher shop to explore beef, lamb, goat, chicken, and exotic meats.
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  setCurrentTab('shop');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 bg-rose-800 hover:bg-rose-900 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md transition active:scale-95"
              >
                <span>Browse Depot Cuts</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Active Cart Grid */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 8 Cols: Items & Delivery Preference */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Thresholds Banner */}
              <div className="bg-zinc-950 text-white p-5 rounded-2xl border border-zinc-900 space-y-3 shadow-md">
                {/* Min Order Bar */}
                <div>
                  <div className="flex justify-between items-center text-xs font-semibold mb-1.5">
                    <span className="flex items-center gap-1.5 text-zinc-200">
                      <ShieldCheck className="w-4 h-4 text-rose-400" />
                      <span>Minimum Order Requirement (${minOrder} AUD)</span>
                    </span>
                    <span>
                      {isMinOrderMet ? (
                        <span className="text-emerald-400 font-bold flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> Met (${subtotal.toFixed(2)})
                        </span>
                      ) : (
                        <span className="text-rose-400 font-bold">
                          Add ${minOrderShortfall.toFixed(2)} AUD more
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${
                        isMinOrderMet ? 'bg-emerald-500' : 'bg-rose-500'
                      }`}
                      style={{ width: `${minOrderProgress}%` }}
                    />
                  </div>
                </div>

                {/* Free Delivery Bar */}
                {deliveryType === 'delivery' && (
                  <div className="pt-2 border-t border-zinc-800/80">
                    <div className="flex justify-between items-center text-xs mb-1.5">
                      <span className="flex items-center gap-1.5 text-zinc-300">
                        <Truck className="w-4 h-4 text-rose-400" />
                        <span>Free Sydney Refrigerated Delivery (${freeShippingThreshold} AUD)</span>
                      </span>
                      <span>
                        {freeShippingShortfall === 0 ? (
                          <span className="text-amber-300 font-bold">Unlocked! (Free Shipping)</span>
                        ) : (
                          <span className="text-zinc-400">
                            Add ${freeShippingShortfall.toFixed(2)} for FREE delivery
                          </span>
                        )}
                      </span>
                    </div>
                    <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-rose-500 to-amber-400 transition-all duration-300"
                        style={{ width: `${freeShippingProgress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Delivery / Pickup Method Selection */}
              <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-sm">
                <span className="text-xs font-bold text-zinc-900 uppercase tracking-wider block mb-3">
                  Select Dispatch or Collection Method:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setDeliveryType('delivery')}
                    className={`p-4 rounded-xl border text-left flex items-start gap-3 transition ${
                      deliveryType === 'delivery'
                        ? 'border-rose-800 bg-rose-50/60 ring-1 ring-rose-800'
                        : 'border-zinc-200 hover:border-zinc-300 bg-zinc-50/50'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${deliveryType === 'delivery' ? 'bg-rose-800 text-white' : 'bg-zinc-200 text-zinc-700'}`}>
                      <Truck className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-xs text-zinc-950 uppercase">Refrigerated Van Delivery</p>
                      <p className="text-[11px] text-zinc-500 mt-0.5">Greater Sydney Metro • Cold chain direct to your door</p>
                      <p className="text-[11px] font-semibold text-rose-800 mt-1">
                        {subtotal >= freeShippingThreshold ? 'FREE Shipping' : `$${STORE_CONFIG.flatShippingFee} AUD flat fee`}
                      </p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryType('pickup')}
                    className={`p-4 rounded-xl border text-left flex items-start gap-3 transition ${
                      deliveryType === 'pickup'
                        ? 'border-rose-800 bg-rose-50/60 ring-1 ring-rose-800'
                        : 'border-zinc-200 hover:border-zinc-300 bg-zinc-50/50'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${deliveryType === 'pickup' ? 'bg-rose-800 text-white' : 'bg-zinc-200 text-zinc-700'}`}>
                      <Store className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-xs text-zinc-950 uppercase">Depot Pickup (Free)</p>
                      <p className="text-[11px] text-zinc-500 mt-0.5">43 Banksia Rd, Greenacre NSW 2190</p>
                      <p className="text-[11px] font-semibold text-emerald-700 mt-1">
                        $0.00 • Same day collection ready
                      </p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Items List */}
              <div className="bg-white rounded-3xl border border-zinc-200 shadow-sm divide-y divide-zinc-100 overflow-hidden">
                <div className="p-5 bg-zinc-50 border-b border-zinc-200 flex items-center justify-between text-xs font-bold text-zinc-700 uppercase tracking-wider">
                  <span>Product Cut &amp; Custom Portion</span>
                  <span>Quantity &amp; Total</span>
                </div>

                {cart.map((item, index) => {
                  const lineTotal = item.product.price * item.quantity;
                  return (
                    <div key={`${item.product.id}-${item.selectedCut || ''}-${index}`} className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      
                      {/* Product Thumbnail & Details */}
                      <div className="flex items-start gap-4 flex-1">
                        <div 
                          onClick={() => openProductPage(item.product)}
                          className="w-20 h-20 rounded-xl overflow-hidden bg-zinc-100 border border-zinc-200 flex-shrink-0 cursor-pointer group"
                        >
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition"
                          />
                        </div>

                        <div className="space-y-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-rose-800 bg-rose-50 px-2 py-0.5 rounded border border-rose-100 inline-block">
                            {item.product.category} • {item.product.subcategory}
                          </span>
                          
                          <h3 
                            onClick={() => openProductPage(item.product)}
                            className="text-sm font-bold text-zinc-950 hover:text-rose-800 cursor-pointer transition"
                          >
                            {item.product.name}
                          </h3>

                          {item.selectedCut && (
                            <p className="text-xs text-rose-950 font-semibold flex items-center gap-1">
                              <Scissors className="w-3 h-3 text-rose-700" />
                              <span>Portion: {item.selectedCut}</span>
                            </p>
                          )}

                          {item.customNotes && (
                            <p className="text-[11px] text-zinc-500 italic">
                              Notes: &quot;{item.customNotes}&quot;
                            </p>
                          )}

                          <p className="text-xs text-zinc-500">
                            ${item.product.price.toFixed(2)} AUD <span className="text-[11px]">({item.product.unit})</span>
                          </p>
                        </div>
                      </div>

                      {/* Quantity Controls & Line Total */}
                      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-100">
                        {/* Quantity Stepper */}
                        <div className="flex items-center border border-zinc-300 rounded-xl bg-zinc-50 p-1 shadow-sm">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedCut)}
                            className="p-1.5 hover:bg-white rounded-lg text-zinc-700 active:scale-95 transition"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-9 text-center text-xs font-black text-zinc-950">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedCut)}
                            className="p-1.5 hover:bg-white rounded-lg text-zinc-700 active:scale-95 transition"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Total Price */}
                        <div className="text-right min-w-[90px]">
                          <span className="text-sm font-black text-zinc-950 block">
                            ${lineTotal.toFixed(2)}
                          </span>
                          <span className="text-[10px] text-zinc-400 block">Inc. GST</span>
                        </div>

                        {/* Remove Button */}
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.product.id, item.selectedCut)}
                          className="p-2 text-zinc-400 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                    </div>
                  );
                })}

                <div className="p-4 bg-zinc-50 flex items-center justify-between text-xs">
                  <button
                    type="button"
                    onClick={clearCart}
                    className="text-zinc-500 hover:text-rose-800 font-semibold transition"
                  >
                    Clear All Cart Items
                  </button>
                  <span className="text-zinc-500">
                    Hand-inspected before refrigerated pack
                  </span>
                </div>
              </div>

            </div>

            {/* Right 4 Cols: Order Summary & Checkout */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Order Summary Card */}
              <div className="bg-white rounded-3xl border border-zinc-200 p-6 shadow-sm space-y-5">
                <h3 className="text-base font-black text-zinc-950 uppercase tracking-tight pb-3 border-b border-zinc-100">
                  Order Summary
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between text-zinc-600">
                    <span>Subtotal ({itemCount} cuts):</span>
                    <span className="font-bold text-zinc-950">${subtotal.toFixed(2)} AUD</span>
                  </div>

                  <div className="flex justify-between text-zinc-600">
                    <span>Dispatch ({deliveryType === 'delivery' ? 'Refrigerated Van' : 'Depot Pickup'}):</span>
                    <span>
                      {shippingFee === 0 ? (
                        <strong className="text-emerald-700 uppercase font-black">Free</strong>
                      ) : (
                        <strong className="font-bold text-zinc-950">${shippingFee.toFixed(2)} AUD</strong>
                      )}
                    </span>
                  </div>

                  {appliedDiscount && (
                    <div className="flex justify-between text-emerald-700 font-bold bg-emerald-50 p-2 rounded-lg border border-emerald-200">
                      <span>Voucher ({appliedDiscount.code}):</span>
                      <span>-${discountAmount.toFixed(2)} AUD</span>
                    </div>
                  )}

                  {selectedPaymentMethod === 'crypto' && cryptoDiscountAmount > 0 && (
                    <div className="flex justify-between text-amber-700 font-bold bg-amber-50 p-2 rounded-lg border border-amber-200">
                      <span>10% Crypto Discount:</span>
                      <span>-${cryptoDiscountAmount.toFixed(2)} AUD</span>
                    </div>
                  )}

                  <div className="pt-3 border-t border-zinc-200 flex justify-between items-baseline">
                    <div>
                      <span className="text-sm font-black text-zinc-950 block">Grand Total:</span>
                      <span className="text-[10px] text-zinc-400">Includes 10% Australian GST</span>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-black text-rose-900">
                        ${grandTotal.toFixed(2)}
                      </span>
                      <span className="text-xs font-bold text-zinc-900 ml-1">AUD</span>
                    </div>
                  </div>
                </div>

                {/* Min Order Notice */}
                {!isMinOrderMet && (
                  <div className="p-3.5 bg-rose-50 rounded-xl border border-rose-200 text-xs text-rose-950 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-700 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-bold block">Minimum Order Not Met:</strong>
                      <span>Add ${minOrderShortfall.toFixed(2)} AUD more of quality meat to checkout.</span>
                    </div>
                  </div>
                )}

                {/* Checkout CTA */}
                <button
                  type="button"
                  onClick={handleProceedToCheckout}
                  disabled={!isMinOrderMet}
                  className="w-full bg-rose-800 hover:bg-rose-900 disabled:bg-zinc-300 disabled:cursor-not-allowed text-white font-extrabold text-sm py-4 rounded-xl shadow-lg transition active:scale-95 flex items-center justify-center gap-2"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Coupon Code Box */}
                <div className="pt-4 border-t border-zinc-100">
                  <span className="text-xs font-bold text-zinc-700 block mb-2">Have a Voucher or Discount Code?</span>
                  {appliedDiscount ? (
                    <div className="flex items-center justify-between p-2.5 bg-zinc-50 rounded-xl border border-zinc-200 text-xs">
                      <div className="flex items-center gap-1.5 font-bold text-zinc-800">
                        <Tag className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Code: {appliedDiscount.code}</span>
                      </div>
                      <button
                        type="button"
                        onClick={removeDiscountCode}
                        className="text-xs text-rose-700 hover:underline font-bold"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="e.g. HALAL10 or DEPOT50"
                        value={inputCoupon}
                        onChange={(e) => setInputCoupon(e.target.value)}
                        className="flex-1 text-xs px-3 py-2 border border-zinc-300 rounded-xl uppercase focus:ring-1 focus:ring-rose-800 focus:outline-none"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-zinc-900 hover:bg-zinc-950 text-white font-bold text-xs rounded-xl transition"
                      >
                        Apply
                      </button>
                    </form>
                  )}

                  {couponError && <p className="text-[11px] text-rose-600 mt-1.5 font-semibold">{couponError}</p>}
                  {couponSuccess && <p className="text-[11px] text-emerald-600 mt-1.5 font-semibold">{couponSuccess}</p>}
                </div>

                {/* Crypto Highlight */}
                <div className="p-3 bg-zinc-950 text-amber-300 rounded-xl text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-bold">
                    <Percent className="w-3.5 h-3.5 text-amber-400" />
                    <span>Pay with Crypto &amp; Save 10%</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-snug">
                    Select Cryptocurrency at checkout for an instant 10% discount on entire cart.
                  </p>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};
