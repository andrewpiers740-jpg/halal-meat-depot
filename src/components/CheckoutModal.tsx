import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { OrderCustomerInfo } from '../types';
import { STORE_CONFIG } from '../data/products';
import { X, ShieldCheck, CheckCircle2, MessageCircle, FileText, CreditCard, Building2, Coins, Store, Truck, AlertCircle } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const {
    cart,
    subtotal,
    deliveryType,
    setDeliveryType,
    shippingFee,
    discountAmount,
    appliedDiscount,
    selectedPaymentMethod,
    setSelectedPaymentMethod,
    cryptoDiscountAmount,
    grandTotal,
    taxIncluded,
    createOrder,
  } = useCart();

  const [formData, setFormData] = useState<OrderCustomerInfo>({
    fullName: '',
    email: '',
    phone: '',
    deliveryType: deliveryType,
    address: '',
    suburb: '',
    postcode: '',
    state: 'NSW',
    deliveryNotes: '',
    preferredDate: '',
    deliveryWindow: 'morning',
    butcheryInstructions: '',
    paymentMethod: selectedPaymentMethod,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleInputChange = (field: keyof OrderCustomerInfo, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }

    if (field === 'deliveryType') {
      setDeliveryType(value);
    }
    if (field === 'paymentMethod') {
      setSelectedPaymentMethod(value);
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) newErrors.email = 'Valid email is required for invoice delivery';
    if (!formData.phone.trim() || formData.phone.length < 8) newErrors.phone = 'Valid Australian phone number is required';

    if (formData.deliveryType === 'delivery') {
      if (!formData.address.trim()) newErrors.address = 'Street address is required';
      if (!formData.suburb.trim()) newErrors.suburb = 'Suburb is required';
      if (!formData.postcode.trim()) newErrors.postcode = 'Postcode is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitOrderForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      createOrder({
        ...formData,
        deliveryType,
        paymentMethod: selectedPaymentMethod,
      });
      setIsSubmitting(false);
    }, 600);
  };

  const handleSendViaWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Create the order in state first
    const generatedOrder = createOrder({
      ...formData,
      deliveryType,
      paymentMethod: selectedPaymentMethod,
    });

    // Format WhatsApp message
    const itemsList = cart
      .map(
        (item, i) =>
          `${i + 1}. ${item.product.name} (x${item.quantity}) - $${(item.product.price * item.quantity).toFixed(2)} AUD\n   [Cut: ${item.selectedCut || 'Standard'}]`
      )
      .join('\n');

    const paymentLabel =
      selectedPaymentMethod === 'bank_transfer'
        ? 'Bank Transfer / PayID Osko'
        : selectedPaymentMethod === 'crypto'
        ? 'Cryptocurrency (10% Discount Applied)'
        : selectedPaymentMethod === 'card'
        ? 'Credit / Debit Card'
        : 'Cash on Depot Collection';

    const waText = `*NEW HALAL MEAT DEPOT ORDER: ${generatedOrder.id}*
----------------------------------------
*Customer Name:* ${formData.fullName}
*Phone:* ${formData.phone}
*Email:* ${formData.email}
*Method:* ${formData.deliveryType === 'delivery' ? 'Refrigerated Delivery' : 'Depot Pickup (Greenacre)'}
${
  formData.deliveryType === 'delivery'
    ? `*Address:* ${formData.address}, ${formData.suburb} NSW ${formData.postcode}\n*Delivery Notes:* ${formData.deliveryNotes || 'None'}`
    : `*Pickup Location:* 43 Banksia Rd, Greenacre NSW 2190`
}
*Preferred Time:* ${formData.preferredDate || 'Earliest available'} (${formData.deliveryWindow || 'Morning'})
*Butchery Specs:* ${formData.butcheryInstructions || 'Standard pack'}

*ORDER ITEMS:*
${itemsList}

*Subtotal:* $${subtotal.toFixed(2)} AUD
${discountAmount > 0 ? `*Promo Discount:* -$${discountAmount.toFixed(2)} AUD\n` : ''}${cryptoDiscountAmount > 0 ? `*Crypto 10% Discount:* -$${cryptoDiscountAmount.toFixed(2)} AUD\n` : ''}*Shipping:* $${shippingFee.toFixed(2)} AUD
*TOTAL PAYABLE:* $${grandTotal.toFixed(2)} AUD (Includes GST)
*Payment Choice:* ${paymentLabel}
----------------------------------------
Please confirm dispatch and receipt of this order. JazakAllah Khair!`;

    const encoded = encodeURIComponent(waText);
    window.open(`https://wa.me/${STORE_CONFIG.phoneRaw}?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-slate-200">
        
        {/* Header */}
        <div className="bg-zinc-950 text-white p-5 sm:p-6 flex items-center justify-between border-b border-rose-950">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
              <h2 className="text-xl font-black uppercase tracking-tight">
                Complete Order &amp; Dispatch Details
              </h2>
            </div>
            <p className="text-xs text-rose-200 mt-1">
              Full Order Verification • Halal Meat Depot (43 Banksia Rd, Greenacre NSW 2190)
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-rose-200 hover:text-white rounded-xl hover:bg-rose-950 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmitOrderForm} className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Customer and Delivery Inputs */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Delivery or Pickup Toggle */}
              <div>
                <label className="text-xs font-black uppercase tracking-wider text-slate-800 block mb-2">
                  Order Dispatch Option
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleInputChange('deliveryType', 'delivery')}
                    className={`p-3 rounded-2xl border text-xs font-bold flex items-center gap-2.5 transition ${
                      deliveryType === 'delivery'
                        ? 'border-rose-800 bg-rose-50 text-zinc-950 shadow-sm'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Truck className="w-4 h-4 text-rose-700" />
                    <div className="text-left">
                      <div>Refrigerated Delivery</div>
                      <div className="text-[10px] text-slate-500 font-normal">
                        {subtotal >= STORE_CONFIG.freeShippingThreshold ? 'FREE (Orders over $500)' : '$25 AUD Flat Rate'}
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleInputChange('deliveryType', 'pickup')}
                    className={`p-3 rounded-2xl border text-xs font-bold flex items-center gap-2.5 transition ${
                      deliveryType === 'pickup'
                        ? 'border-rose-800 bg-rose-50 text-zinc-950 shadow-sm'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Store className="w-4 h-4 text-rose-700" />
                    <div className="text-left">
                      <div>Depot Collection</div>
                      <div className="text-[10px] text-slate-500 font-normal">
                        FREE • 43 Banksia Rd, Greenacre
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 border-b pb-2 mb-3">
                  1. Contact Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Full Name / Business Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Tariq Mansoor / Greenacre Charcoal Grill"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className={`w-full text-xs p-2.5 rounded-xl border ${errors.fullName ? 'border-rose-500 bg-rose-50' : 'border-slate-300'} focus:outline-none focus:ring-2 focus:ring-rose-700`}
                    />
                    {errors.fullName && <p className="text-[11px] text-rose-600 mt-1">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Email Address (for Tax Invoice) *
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. orders@company.com.au"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full text-xs p-2.5 rounded-xl border ${errors.email ? 'border-rose-500 bg-rose-50' : 'border-slate-300'} focus:outline-none focus:ring-2 focus:ring-rose-700`}
                    />
                    {errors.email && <p className="text-[11px] text-rose-600 mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. +61 489 989 442"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className={`w-full text-xs p-2.5 rounded-xl border ${errors.phone ? 'border-rose-500 bg-rose-50' : 'border-slate-300'} focus:outline-none focus:ring-2 focus:ring-rose-700`}
                    />
                    {errors.phone && <p className="text-[11px] text-rose-600 mt-1">{errors.phone}</p>}
                  </div>
                </div>
              </div>

              {/* Delivery Address (if Delivery selected) */}
              {deliveryType === 'delivery' && (
                <div>
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 border-b pb-2 mb-3">
                    2. Sydney Delivery Address
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-3">
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Street Address *
                      </label>
                      <input
                        type="text"
                        placeholder="Street number and street name"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        className={`w-full text-xs p-2.5 rounded-xl border ${errors.address ? 'border-rose-500 bg-rose-50' : 'border-slate-300'} focus:outline-none focus:ring-2 focus:ring-rose-700`}
                      />
                      {errors.address && <p className="text-[11px] text-rose-600 mt-1">{errors.address}</p>}
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Suburb *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Bankstown, Greenacre, Auburn"
                        value={formData.suburb}
                        onChange={(e) => handleInputChange('suburb', e.target.value)}
                        className={`w-full text-xs p-2.5 rounded-xl border ${errors.suburb ? 'border-rose-500 bg-rose-50' : 'border-slate-300'} focus:outline-none focus:ring-2 focus:ring-rose-700`}
                      />
                      {errors.suburb && <p className="text-[11px] text-rose-600 mt-1">{errors.suburb}</p>}
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Postcode *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 2190"
                        value={formData.postcode}
                        onChange={(e) => handleInputChange('postcode', e.target.value)}
                        className={`w-full text-xs p-2.5 rounded-xl border ${errors.postcode ? 'border-rose-500 bg-rose-50' : 'border-slate-300'} focus:outline-none focus:ring-2 focus:ring-rose-700`}
                      />
                      {errors.postcode && <p className="text-[11px] text-rose-600 mt-1">{errors.postcode}</p>}
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        State
                      </label>
                      <input
                        type="text"
                        disabled
                        value="NSW (Australia)"
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-100 text-slate-600"
                      />
                    </div>

                    <div className="sm:col-span-3">
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Delivery Access Instructions (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Loading dock access, leave in cool shaded box, buzzer code..."
                        value={formData.deliveryNotes}
                        onChange={(e) => handleInputChange('deliveryNotes', e.target.value)}
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-700"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Delivery Window & Butchery Instructions */}
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 border-b pb-2 mb-3">
                  3. Schedule &amp; Packing Specifications
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-700"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Chilled Delivery Window
                    </label>
                    <select
                      value={formData.deliveryWindow}
                      onChange={(e) => handleInputChange('deliveryWindow', e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-700 bg-white"
                    >
                      <option value="morning">Morning (7:00 AM - 12:00 PM)</option>
                      <option value="afternoon">Afternoon (12:00 PM - 5:00 PM)</option>
                      <option value="anytime">Anytime during business hours</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Custom Meat Packing / Cryovac Instructions
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. vacuum seal into 2kg packs, mark Aqeeqah on boxes, leave bones for broth..."
                      value={formData.butcheryInstructions}
                      onChange={(e) => handleInputChange('butcheryInstructions', e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-700"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 border-b pb-2 mb-3">
                  4. Payment Method
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Bank Transfer / PayID */}
                  <div
                    onClick={() => handleInputChange('paymentMethod', 'bank_transfer')}
                    className={`p-3.5 rounded-2xl border text-xs cursor-pointer transition ${
                      selectedPaymentMethod === 'bank_transfer'
                        ? 'border-rose-800 bg-rose-50 text-zinc-950 font-bold shadow'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Building2 className="w-4 h-4 text-rose-800" />
                      <span className="font-bold">Bank Transfer / PayID</span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-normal">
                      CBA Depot Account • Direct Osko deposit with order reference.
                    </p>
                  </div>

                  {/* Cryptocurrency with 10% Discount */}
                  <div
                    onClick={() => handleInputChange('paymentMethod', 'crypto')}
                    className={`p-3.5 rounded-2xl border text-xs cursor-pointer transition relative ${
                      selectedPaymentMethod === 'crypto'
                        ? 'border-amber-600 bg-amber-50 text-amber-950 font-bold shadow'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <span className="absolute top-2 right-2 bg-amber-500 text-slate-950 text-[10px] font-black px-1.5 py-0.5 rounded">
                      SAVE 10%
                    </span>
                    <div className="flex items-center gap-2 mb-1">
                      <Coins className="w-4 h-4 text-amber-600" />
                      <span className="font-bold">Cryptocurrency (USDT / BTC)</span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-normal">
                      Instant 10% discount automatically applied to order total.
                    </p>
                  </div>

                  {/* Credit / Debit Card */}
                  <div
                    onClick={() => handleInputChange('paymentMethod', 'card')}
                    className={`p-3.5 rounded-2xl border text-xs cursor-pointer transition ${
                      selectedPaymentMethod === 'card'
                        ? 'border-rose-800 bg-rose-50 text-zinc-950 font-bold shadow'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <CreditCard className="w-4 h-4 text-rose-800" />
                      <span className="font-bold">Credit / Debit Card</span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-normal">
                      Visa, Mastercard, EFTPOS invoice checkout.
                    </p>
                  </div>

                  {/* Cash / Card on Pickup */}
                  <div
                    onClick={() => handleInputChange('paymentMethod', 'pickup_cash')}
                    className={`p-3.5 rounded-2xl border text-xs cursor-pointer transition ${
                      selectedPaymentMethod === 'pickup_cash'
                        ? 'border-rose-800 bg-rose-50 text-zinc-950 font-bold shadow'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Store className="w-4 h-4 text-rose-800" />
                      <span className="font-bold">Pay at Greenacre Depot</span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-normal">
                      Pay cash or EFTPOS on collection at 43 Banksia Rd.
                    </p>
                  </div>
                </div>

                {/* Crypto Details Box if Selected */}
                {selectedPaymentMethod === 'crypto' && (
                  <div className="mt-3 p-3 bg-amber-50 rounded-xl border border-amber-300 text-xs text-amber-900">
                    <p className="font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-rose-700" />
                      10% Alternative Payment Discount Applied: -${cryptoDiscountAmount.toFixed(2)} AUD
                    </p>
                    <p className="text-[11px] mt-1 text-amber-800">
                      Our official USDT (TRC-20 / ERC-20) wallet address &amp; QR code will be generated on your tax invoice and WhatsApp receipt.
                    </p>
                  </div>
                )}

                {/* Bank Transfer Details Box if Selected */}
                {selectedPaymentMethod === 'bank_transfer' && (
                  <div className="mt-3 p-3 bg-rose-50 rounded-xl border border-rose-200 text-xs text-zinc-950">
                    <p className="font-bold">CBA Bank Deposit Details (Australia):</p>
                    <div className="grid grid-cols-2 gap-2 mt-1.5 text-[11px]">
                      <div><strong>Bank:</strong> Commonwealth Bank of Australia</div>
                      <div><strong>Account:</strong> Halal Meat Depot Pty Ltd</div>
                      <div><strong>BSB:</strong> 062-124</div>
                      <div><strong>Acc:</strong> 1098 4210</div>
                      <div className="col-span-2"><strong>PayID / Phone:</strong> 0489 989 442</div>
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* Right Column: Order Summary & Dual Action Buttons */}
            <div className="lg:col-span-5 bg-slate-50 p-6 rounded-3xl border border-slate-200 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-black uppercase tracking-tight text-slate-900 border-b border-slate-200 pb-3">
                  Order Summary
                </h3>

                {/* Cart Items Preview */}
                <div className="mt-4 space-y-3 max-h-56 overflow-y-auto pr-1">
                  {cart.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-start text-xs pb-2 border-b border-slate-100">
                      <div className="pr-2">
                        <span className="font-bold text-slate-800">{item.product.name}</span>
                        <div className="text-[11px] text-slate-500">
                          Qty: {item.quantity} • {item.selectedCut || 'Standard'}
                        </div>
                      </div>
                      <span className="font-bold text-slate-900 whitespace-nowrap">
                        ${(item.product.price * item.quantity).toFixed(2)} AUD
                      </span>
                    </div>
                  ))}
                </div>

                {/* Cost Calculations */}
                <div className="mt-6 space-y-2 text-xs border-t border-slate-200 pt-4">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal:</span>
                    <span className="font-semibold text-slate-900">${subtotal.toFixed(2)} AUD</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-rose-800 font-semibold">
                      <span>Voucher Discount:</span>
                      <span>-${discountAmount.toFixed(2)} AUD</span>
                    </div>
                  )}

                  {cryptoDiscountAmount > 0 && (
                    <div className="flex justify-between text-amber-700 font-bold">
                      <span>10% Crypto Discount:</span>
                      <span>-${cryptoDiscountAmount.toFixed(2)} AUD</span>
                    </div>
                  )}

                  <div className="flex justify-between text-slate-600">
                    <span>Refrigerated Delivery:</span>
                    <span className="font-semibold text-slate-900">
                      {shippingFee === 0 ? 'FREE ($0.00)' : `$${shippingFee.toFixed(2)} AUD`}
                    </span>
                  </div>

                  <div className="flex justify-between text-slate-950 font-black text-base pt-3 border-t border-slate-200">
                    <span>Grand Total:</span>
                    <span className="text-zinc-950">${grandTotal.toFixed(2)} AUD</span>
                  </div>

                  <p className="text-[10px] text-slate-500 text-right">
                    Includes approx. ${taxIncluded.toFixed(2)} AUD Australian GST (10%)
                  </p>
                </div>
              </div>

              {/* Two Ordering Methods as Specified in E-CHECKOUT */}
              <div className="mt-8 space-y-3 pt-4 border-t border-slate-200">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-rose-800 hover:bg-rose-950 text-white py-3.5 px-4 rounded-2xl font-black text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition active:scale-95 disabled:bg-slate-400"
                >
                  <FileText className="w-4 h-4 text-amber-400" />
                  <span>{isSubmitting ? 'Processing Order...' : 'Submit Order & Generate Tax Invoice'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleSendViaWhatsApp}
                  className="w-full bg-rose-700 hover:bg-rose-700 text-white py-3.5 px-4 rounded-2xl font-black text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition active:scale-95"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Order via WhatsApp (+61 489 989 442)</span>
                </button>

                <p className="text-[10px] text-center text-slate-500 mt-2">
                  Orders submitted are automatically logged into the Halal Meat Depot dispatch queue. You will receive an official tax invoice with ABN.
                </p>
              </div>

            </div>

          </div>
        </form>

      </div>
    </div>
  );
};
