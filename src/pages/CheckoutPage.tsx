import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { OrderCustomerInfo } from '../types';
import { STORE_CONFIG } from '../data/products';
import { 
  ShieldCheck, 
  Truck, 
  Store, 
  CreditCard, 
  Building2, 
  Coins, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle, 
  Scissors, 
  Printer, 
  Phone, 
  FileText
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    subtotal,
    itemCount,
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
    setCurrentTab,
    isMinOrderMet,
    minOrder,
    minOrderShortfall,
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
    preferredDate: 'Next Available Morning Delivery',
    deliveryWindow: 'morning',
    butcheryInstructions: '',
    paymentMethod: selectedPaymentMethod,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<any>(null);

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

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const ord = createOrder({
        ...formData,
        deliveryType,
        paymentMethod: selectedPaymentMethod,
      });
      setIsSubmitting(false);
      setConfirmedOrder(ord);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 600);
  };

  const handleSendViaWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const ord = createOrder({
      ...formData,
      deliveryType,
      paymentMethod: selectedPaymentMethod,
    });

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

    const waText = `*NEW HALAL MEAT DEPOT ORDER: ${ord.id}*
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
*Shipping:* $${shippingFee.toFixed(2)} AUD
*Discounts:* -$${(discountAmount + cryptoDiscountAmount).toFixed(2)} AUD
*TOTAL DUE:* $${ord.total.toFixed(2)} AUD (Inc. GST)
*Payment Method:* ${paymentLabel}
----------------------------------------
Please confirm receipt and booking of my Halal butchery dispatch.`;

    window.open(`https://wa.me/${STORE_CONFIG.phoneRaw}?text=${encodeURIComponent(waText)}`, '_blank');
    setConfirmedOrder(ord);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If order was just placed, display Order Success Page
  if (confirmedOrder) {
    return (
      <div className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl border border-zinc-200 shadow-xl overflow-hidden p-8 sm:p-10 text-center space-y-6">
            <div className="w-20 h-20 bg-rose-800 rounded-full flex items-center justify-center mx-auto text-amber-400 shadow-lg border-2 border-amber-400/40">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-rose-800">Order Placed Successfully</span>
              <h1 className="text-2xl sm:text-3xl font-black text-zinc-950 uppercase tracking-tight mt-1">
                JazakAllah Khair!
              </h1>
              <p className="text-xs sm:text-sm text-zinc-600 mt-2 max-w-md mx-auto">
                Your Halal meat depot order has been registered in our Greenacre butchery scheduling queue. A tax invoice has been generated for your records.
              </p>
            </div>

            <div className="bg-zinc-950 text-white p-5 rounded-2xl text-left space-y-3">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                <span className="text-xs text-zinc-400">Order Reference:</span>
                <span className="text-sm font-mono font-bold text-amber-300">{confirmedOrder.id}</span>
              </div>
              <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                <span className="text-xs text-zinc-400">Total Amount:</span>
                <span className="text-base font-black text-white">${confirmedOrder.total.toFixed(2)} AUD</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-400">Dispatch Method:</span>
                <span className="text-xs font-semibold text-zinc-200 uppercase">
                  {confirmedOrder.customer.deliveryType === 'delivery' ? 'Refrigerated Delivery' : 'Depot Pickup (Greenacre)'}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                type="button"
                onClick={() => {
                  setCurrentTab('account');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex-1 bg-zinc-900 hover:bg-zinc-950 text-white font-bold text-xs sm:text-sm py-3.5 px-5 rounded-xl transition"
              >
                View in My Account
              </button>
              <button
                type="button"
                onClick={() => {
                  setCurrentTab('shop');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex-1 bg-rose-800 hover:bg-rose-900 text-white font-bold text-xs sm:text-sm py-3.5 px-5 rounded-xl transition"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If cart is empty and no confirmed order, show redirect to shop
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 py-16">
        <div className="max-w-md mx-auto px-4 text-center bg-white p-10 rounded-3xl border border-zinc-200 shadow-sm space-y-4">
          <AlertCircle className="w-12 h-12 text-rose-800 mx-auto" />
          <h2 className="text-xl font-black text-zinc-950 uppercase">No Items to Checkout</h2>
          <p className="text-xs text-zinc-600">Please add items to your cart before proceeding to checkout.</p>
          <button
            onClick={() => {
              setCurrentTab('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="bg-rose-800 hover:bg-rose-900 text-white font-bold text-xs px-6 py-3 rounded-xl transition"
          >
            Browse Meat Depot
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Bar */}
        <div className="flex items-center justify-between gap-4 mb-8 pb-4 border-b border-zinc-200">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-rose-800">Direct Checkout</div>
            <h1 className="text-2xl sm:text-3xl font-black text-zinc-950 uppercase tracking-tight">
              Order Dispatch &amp; Payment
            </h1>
          </div>

          <button
            onClick={() => {
              setCurrentTab('cart');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-700 hover:text-rose-900 bg-white border border-zinc-200 px-4 py-2 rounded-xl shadow-sm transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Cart</span>
          </button>
        </div>

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left 7 Columns: Delivery & Payment Details */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Contact Details */}
            <div className="bg-white p-6 rounded-3xl border border-zinc-200 shadow-sm space-y-4">
              <h2 className="text-sm font-black text-zinc-950 uppercase tracking-wider pb-2 border-b border-zinc-100 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-rose-800 text-white text-xs flex items-center justify-center font-bold">1</span>
                <span>Customer &amp; Contact Details</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-zinc-700 block mb-1">
                    Full Name / Business Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tariq Al-Mansoor or Bankstown Grill"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className="w-full text-xs p-3 border border-zinc-300 rounded-xl bg-zinc-50 focus:bg-white focus:ring-2 focus:ring-rose-800 focus:outline-none"
                  />
                  {errors.fullName && <p className="text-[11px] text-rose-600 mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="text-xs font-bold text-zinc-700 block mb-1">
                    Email Address (For Tax Invoice) *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full text-xs p-3 border border-zinc-300 rounded-xl bg-zinc-50 focus:bg-white focus:ring-2 focus:ring-rose-800 focus:outline-none"
                  />
                  {errors.email && <p className="text-[11px] text-rose-600 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="text-xs font-bold text-zinc-700 block mb-1">
                    Australian Mobile Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0412 345 678"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full text-xs p-3 border border-zinc-300 rounded-xl bg-zinc-50 focus:bg-white focus:ring-2 focus:ring-rose-800 focus:outline-none"
                  />
                  {errors.phone && <p className="text-[11px] text-rose-600 mt-1">{errors.phone}</p>}
                </div>
              </div>
            </div>

            {/* Step 2: Delivery vs Pickup Address */}
            <div className="bg-white p-6 rounded-3xl border border-zinc-200 shadow-sm space-y-4">
              <h2 className="text-sm font-black text-zinc-950 uppercase tracking-wider pb-2 border-b border-zinc-100 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-rose-800 text-white text-xs flex items-center justify-center font-bold">2</span>
                <span>Fulfillment &amp; Location</span>
              </h2>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleInputChange('deliveryType', 'delivery')}
                  className={`p-3.5 rounded-xl border text-left flex items-center gap-3 transition ${
                    formData.deliveryType === 'delivery'
                      ? 'border-rose-800 bg-rose-50 text-rose-950 font-bold ring-1 ring-rose-800'
                      : 'border-zinc-200 text-zinc-700 bg-zinc-50'
                  }`}
                >
                  <Truck className="w-4 h-4 text-rose-800 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-bold uppercase">Refrigerated Van Delivery</p>
                    <p className="text-[10px] text-zinc-500 font-normal">Greater Sydney</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleInputChange('deliveryType', 'pickup')}
                  className={`p-3.5 rounded-xl border text-left flex items-center gap-3 transition ${
                    formData.deliveryType === 'pickup'
                      ? 'border-rose-800 bg-rose-50 text-rose-950 font-bold ring-1 ring-rose-800'
                      : 'border-zinc-200 text-zinc-700 bg-zinc-50'
                  }`}
                >
                  <Store className="w-4 h-4 text-rose-800 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-bold uppercase">Depot Pickup</p>
                    <p className="text-[10px] text-zinc-500 font-normal">Greenacre NSW ($0)</p>
                  </div>
                </button>
              </div>

              {formData.deliveryType === 'delivery' ? (
                <div className="space-y-3 pt-2">
                  <div>
                    <label className="text-xs font-bold text-zinc-700 block mb-1">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 142 Waterloo Road"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="w-full text-xs p-3 border border-zinc-300 rounded-xl bg-zinc-50 focus:bg-white focus:ring-2 focus:ring-rose-800 focus:outline-none"
                    />
                    {errors.address && <p className="text-[11px] text-rose-600 mt-1">{errors.address}</p>}
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="text-xs font-bold text-zinc-700 block mb-1">Suburb *</label>
                      <input
                        type="text"
                        required
                        placeholder="Greenacre"
                        value={formData.suburb}
                        onChange={(e) => handleInputChange('suburb', e.target.value)}
                        className="w-full text-xs p-3 border border-zinc-300 rounded-xl bg-zinc-50 focus:bg-white focus:ring-2 focus:ring-rose-800 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-zinc-700 block mb-1">Postcode *</label>
                      <input
                        type="text"
                        required
                        placeholder="2190"
                        value={formData.postcode}
                        onChange={(e) => handleInputChange('postcode', e.target.value)}
                        className="w-full text-xs p-3 border border-zinc-300 rounded-xl bg-zinc-50 focus:bg-white focus:ring-2 focus:ring-rose-800 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-zinc-700 block mb-1">State</label>
                      <input
                        type="text"
                        readOnly
                        value="NSW"
                        className="w-full text-xs p-3 border border-zinc-200 rounded-xl bg-zinc-100 text-zinc-500 font-bold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-zinc-700 block mb-1">
                      Delivery Driver Notes / Gate Code (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Ring buzzer 4, leave on porch in shade, rear loading dock..."
                      value={formData.deliveryNotes}
                      onChange={(e) => handleInputChange('deliveryNotes', e.target.value)}
                      className="w-full text-xs p-3 border border-zinc-300 rounded-xl bg-zinc-50 focus:bg-white focus:ring-2 focus:ring-rose-800 focus:outline-none"
                    />
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-200 text-xs text-zinc-700 space-y-1">
                  <p className="font-bold text-zinc-950">Depot Pickup Location:</p>
                  <p>{STORE_CONFIG.address} (Western Sydney Hub)</p>
                  <p className="text-[11px] text-zinc-500 pt-1">Hours: {STORE_CONFIG.operatingHours}</p>
                </div>
              )}

              {/* Master Butcher Custom Instructions */}
              <div className="pt-2">
                <label className="text-xs font-bold text-zinc-800 block mb-1">
                  Master Butcher Preparation Notes (Optional):
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Cut steaks thick 30mm, pack into 2kg bags, trim sinew..."
                  value={formData.butcheryInstructions}
                  onChange={(e) => handleInputChange('butcheryInstructions', e.target.value)}
                  className="w-full text-xs p-3 border border-zinc-300 rounded-xl bg-zinc-50 focus:bg-white focus:ring-2 focus:ring-rose-800 focus:outline-none"
                />
              </div>
            </div>

            {/* Step 3: Payment Method Selection */}
            <div className="bg-white p-6 rounded-3xl border border-zinc-200 shadow-sm space-y-4">
              <h2 className="text-sm font-black text-zinc-950 uppercase tracking-wider pb-2 border-b border-zinc-100 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-rose-800 text-white text-xs flex items-center justify-center font-bold">3</span>
                <span>Select Payment Method</span>
              </h2>

              <div className="space-y-3">
                {/* Bank Transfer */}
                <label className={`p-4 rounded-xl border flex items-start gap-3 cursor-pointer transition ${
                  formData.paymentMethod === 'bank_transfer'
                    ? 'border-rose-800 bg-rose-50/60 ring-1 ring-rose-800'
                    : 'border-zinc-200 hover:border-zinc-300 bg-zinc-50/50'
                }`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bank_transfer"
                    checked={formData.paymentMethod === 'bank_transfer'}
                    onChange={() => handleInputChange('paymentMethod', 'bank_transfer')}
                    className="mt-1 text-rose-800 focus:ring-rose-800"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 font-bold text-xs text-zinc-950">
                      <Building2 className="w-4 h-4 text-rose-800" />
                      <span>Direct Bank Transfer / PayID Osko</span>
                    </div>
                    <p className="text-[11px] text-zinc-500 mt-0.5">
                      BSB &amp; Account details provided upon confirmation. Fast instant Osko payment.
                    </p>
                  </div>
                </label>

                {/* Credit Card */}
                <label className={`p-4 rounded-xl border flex items-start gap-3 cursor-pointer transition ${
                  formData.paymentMethod === 'card'
                    ? 'border-rose-800 bg-rose-50/60 ring-1 ring-rose-800'
                    : 'border-zinc-200 hover:border-zinc-300 bg-zinc-50/50'
                }`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={() => handleInputChange('paymentMethod', 'card')}
                    className="mt-1 text-rose-800 focus:ring-rose-800"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 font-bold text-xs text-zinc-950">
                      <CreditCard className="w-4 h-4 text-rose-800" />
                      <span>Credit or Debit Card</span>
                    </div>
                    <p className="text-[11px] text-zinc-500 mt-0.5">
                      Visa, Mastercard, AMEX processed securely with 256-bit encryption.
                    </p>
                  </div>
                </label>

                {/* Cryptocurrency */}
                <label className={`p-4 rounded-xl border flex items-start gap-3 cursor-pointer transition ${
                  formData.paymentMethod === 'crypto'
                    ? 'border-amber-600 bg-amber-50/60 ring-1 ring-amber-600'
                    : 'border-zinc-200 hover:border-zinc-300 bg-zinc-50/50'
                }`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="crypto"
                    checked={formData.paymentMethod === 'crypto'}
                    onChange={() => handleInputChange('paymentMethod', 'crypto')}
                    className="mt-1 text-amber-600 focus:ring-amber-600"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 font-bold text-xs text-zinc-950">
                      <Coins className="w-4 h-4 text-amber-600" />
                      <span>Cryptocurrency (USDT / BTC / ETH)</span>
                      <span className="bg-amber-500 text-zinc-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                        Save 10%
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-500 mt-0.5">
                      Instant 10% discount automatically calculated on your invoice total.
                    </p>
                  </div>
                </label>

                {/* Cash on Pickup */}
                {formData.deliveryType === 'pickup' && (
                  <label className={`p-4 rounded-xl border flex items-start gap-3 cursor-pointer transition ${
                    formData.paymentMethod === 'pickup_cash'
                      ? 'border-rose-800 bg-rose-50/60 ring-1 ring-rose-800'
                      : 'border-zinc-200 hover:border-zinc-300 bg-zinc-50/50'
                  }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="pickup_cash"
                      checked={formData.paymentMethod === 'pickup_cash'}
                      onChange={() => handleInputChange('paymentMethod', 'pickup_cash')}
                      className="mt-1 text-rose-800 focus:ring-rose-800"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 font-bold text-xs text-zinc-950">
                        <Store className="w-4 h-4 text-rose-800" />
                        <span>Cash upon Depot Collection</span>
                      </div>
                      <p className="text-[11px] text-zinc-500 mt-0.5">
                        Pay cash over the counter at 43 Banksia Rd, Greenacre NSW.
                      </p>
                    </div>
                  </label>
                )}
              </div>
            </div>

          </div>

          {/* Right 5 Columns: Order Summary & Place Order Action */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white p-6 rounded-3xl border border-zinc-200 shadow-sm space-y-5">
              <h3 className="text-sm font-black text-zinc-950 uppercase tracking-wider pb-2 border-b border-zinc-100 flex items-center justify-between">
                <span>Order Breakdown</span>
                <span className="text-xs font-bold text-rose-800">{itemCount} items</span>
              </h3>

              {/* Items List */}
              <div className="space-y-3 max-h-72 overflow-y-auto pr-1 text-xs">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between gap-3 pb-2 border-b border-zinc-100">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-10 h-10 rounded-lg object-cover bg-zinc-100 border border-zinc-200 flex-shrink-0"
                      />
                      <div>
                        <p className="font-bold text-zinc-950 line-clamp-1">{item.product.name}</p>
                        <p className="text-[10px] text-zinc-500">
                          Qty: {item.quantity} • {item.selectedCut || 'Standard'}
                        </p>
                      </div>
                    </div>
                    <span className="font-bold text-zinc-950 whitespace-nowrap">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-2 text-xs pt-2 border-t border-zinc-100">
                <div className="flex justify-between text-zinc-600">
                  <span>Subtotal:</span>
                  <span className="font-bold text-zinc-950">${subtotal.toFixed(2)} AUD</span>
                </div>

                <div className="flex justify-between text-zinc-600">
                  <span>Dispatch Fee:</span>
                  <span>
                    {shippingFee === 0 ? (
                      <strong className="text-emerald-700 font-bold uppercase">Free</strong>
                    ) : (
                      <strong className="font-bold text-zinc-950">${shippingFee.toFixed(2)} AUD</strong>
                    )}
                  </span>
                </div>

                {appliedDiscount && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Coupon ({appliedDiscount.code}):</span>
                    <span>-${discountAmount.toFixed(2)} AUD</span>
                  </div>
                )}

                {formData.paymentMethod === 'crypto' && cryptoDiscountAmount > 0 && (
                  <div className="flex justify-between text-amber-700 font-bold">
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

              {/* Minimum Order Verification */}
              {!isMinOrderMet && (
                <div className="p-3 bg-rose-50 rounded-xl border border-rose-200 text-xs text-rose-900 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold">
                    <AlertCircle className="w-4 h-4 text-rose-700" />
                    <span>Store Minimum: ${minOrder} AUD</span>
                  </div>
                  <p className="text-[11px] text-zinc-600">
                    Your subtotal is currently ${subtotal.toFixed(2)}. Please add ${minOrderShortfall.toFixed(2)} AUD more to place this order.
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting || !isMinOrderMet}
                  className="w-full bg-rose-800 hover:bg-rose-900 disabled:bg-zinc-300 disabled:cursor-not-allowed text-white font-black text-sm py-4 rounded-xl shadow-lg transition active:scale-95 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Processing Order...</span>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-amber-300" />
                      <span>Place &amp; Confirm Order</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleSendViaWhatsApp}
                  disabled={!isMinOrderMet}
                  className="w-full bg-emerald-700 hover:bg-emerald-800 disabled:bg-zinc-300 disabled:cursor-not-allowed text-white font-bold text-xs py-3 rounded-xl shadow transition active:scale-95 flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-emerald-200" />
                  <span>Order via WhatsApp Dispatch</span>
                </button>
              </div>

              <div className="pt-2 text-[11px] text-zinc-500 text-center space-y-1">
                <p>✓ 100% Hand Zabiha Halal Certified (HCAA &amp; AFIC)</p>
                <p>✓ NSW Food Authority Registered Depot Plant</p>
              </div>

            </div>

          </div>

        </form>

      </div>
    </div>
  );
};
