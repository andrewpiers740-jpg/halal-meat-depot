import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { STORE_CONFIG } from '../data/products';
import { 
  User, 
  Package, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  Scissors, 
  FileText, 
  CreditCard, 
  ArrowRight, 
  Check, 
  Phone, 
  Truck,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { TaxInvoiceModal } from '../components/TaxInvoiceModal';
import { Order } from '../types';

export const AccountPage: React.FC = () => {
  const { orders, setCurrentTab, clearCart, addToCart } = useCart();
  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'preferences' | 'perks'>('orders');
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<Order | null>(null);

  // User Profile State (persisted locally)
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('hmd_user_profile');
      if (saved) return JSON.parse(saved);
    } catch {}
    return {
      fullName: 'Tariq Al-Mansoor',
      email: 'tariq.mansoor@sydneygrill.com.au',
      phone: '0412 889 332',
      address: '88 Chapel Road',
      suburb: 'Bankstown',
      postcode: '2200',
      state: 'NSW',
      steakThickness: '25mm (Standard Thick Cut)',
      packingPreference: 'Individual 1kg Cryovac Vacuum Packs',
      fatCapPreference: 'Standard 6mm Butcher Fat Cap',
    };
  });

  const [isSaved, setIsSaved] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem('hmd_user_profile', JSON.stringify(profile));
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const handleReorder = (order: Order) => {
    order.items.forEach((item) => {
      addToCart(item.product, item.quantity, item.selectedCut, item.customNotes);
    });
    setCurrentTab('cart');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Account Header Hero */}
        <div className="bg-zinc-950 text-white rounded-3xl p-6 sm:p-8 border border-zinc-900 shadow-xl mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-rose-900/60 border border-rose-700/80 text-rose-300 flex items-center justify-center font-black text-2xl shadow-inner flex-shrink-0">
              <User className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
                  {profile.fullName || 'My Account'}
                </h1>
                <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">
                  Verified Member
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-1 flex items-center gap-2">
                <span>{profile.email}</span>
                <span>•</span>
                <span>{profile.phone}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <div className="bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-xl text-center">
              <span className="text-[10px] text-zinc-400 uppercase block font-semibold">Total Orders</span>
              <span className="text-lg font-black text-white">{orders.length}</span>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-xl text-center">
              <span className="text-[10px] text-zinc-400 uppercase block font-semibold">Crypto Discount</span>
              <span className="text-lg font-black text-amber-400">10% Active</span>
            </div>
            <button
              onClick={() => {
                setCurrentTab('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-rose-800 hover:bg-rose-900 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-md"
            >
              Order Meats
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-zinc-200 gap-2 mb-8 overflow-x-auto pb-1 text-xs sm:text-sm font-bold">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2.5 rounded-xl transition flex items-center gap-2 uppercase tracking-wider ${
              activeTab === 'orders'
                ? 'bg-rose-900 text-white shadow-sm'
                : 'bg-white text-zinc-600 hover:text-zinc-900 border border-zinc-200'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Order History ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('preferences')}
            className={`px-4 py-2.5 rounded-xl transition flex items-center gap-2 uppercase tracking-wider ${
              activeTab === 'preferences'
                ? 'bg-rose-900 text-white shadow-sm'
                : 'bg-white text-zinc-600 hover:text-zinc-900 border border-zinc-200'
            }`}
          >
            <Scissors className="w-4 h-4" />
            <span>Butchery Preferences</span>
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`px-4 py-2.5 rounded-xl transition flex items-center gap-2 uppercase tracking-wider ${
              activeTab === 'addresses'
                ? 'bg-rose-900 text-white shadow-sm'
                : 'bg-white text-zinc-600 hover:text-zinc-900 border border-zinc-200'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Saved Address &amp; Contact</span>
          </button>

          <button
            onClick={() => setActiveTab('perks')}
            className={`px-4 py-2.5 rounded-xl transition flex items-center gap-2 uppercase tracking-wider ${
              activeTab === 'perks'
                ? 'bg-rose-900 text-white shadow-sm'
                : 'bg-white text-zinc-600 hover:text-zinc-900 border border-zinc-200'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Halal Perks &amp; Crypto</span>
          </button>
        </div>

        {/* Tab 1: Orders History */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {orders.length === 0 ? (
              <div className="bg-white rounded-3xl border border-zinc-200 p-12 text-center max-w-lg mx-auto shadow-sm space-y-4">
                <Package className="w-12 h-12 text-zinc-300 mx-auto" />
                <h3 className="text-base font-black text-zinc-950 uppercase">No Previous Orders</h3>
                <p className="text-xs text-zinc-500">
                  You haven&apos;t placed any orders with Halal Meat Depot yet. Your future butchery orders and tax invoices will be logged here.
                </p>
                <button
                  onClick={() => {
                    setCurrentTab('shop');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-rose-800 hover:bg-rose-900 text-white text-xs font-bold px-5 py-2.5 rounded-xl"
                >
                  Shop Halal Meats
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-sm space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-100 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-sm text-zinc-950">{order.id}</span>
                          <span className="text-[11px] px-2.5 py-0.5 rounded-full font-bold uppercase bg-rose-50 text-rose-800 border border-rose-200">
                            {order.status}
                          </span>
                          <span className="text-[11px] px-2 py-0.5 rounded font-medium bg-emerald-50 text-emerald-800">
                            {order.paymentStatus}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-500 mt-1 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          <span>Placed {new Date(order.createdAt).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-base font-black text-zinc-950">
                          ${order.total.toFixed(2)} AUD
                        </span>
                        <button
                          type="button"
                          onClick={() => setSelectedInvoiceOrder(order)}
                          className="inline-flex items-center gap-1 text-xs font-bold text-rose-800 hover:text-rose-950 bg-rose-50 hover:bg-rose-100 border border-rose-200 px-3 py-1.5 rounded-lg transition"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>Tax Invoice</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleReorder(order)}
                          className="inline-flex items-center gap-1 text-xs font-bold text-white bg-zinc-900 hover:bg-zinc-950 px-3 py-1.5 rounded-lg transition"
                        >
                          <span>Reorder Cuts</span>
                        </button>
                      </div>
                    </div>

                    {/* Order Items Snapshot */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="p-3 bg-zinc-50 rounded-xl border border-zinc-100 flex items-center gap-3">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-10 h-10 rounded-lg object-cover bg-white border border-zinc-200 flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-zinc-950 truncate">{item.product.name}</p>
                            <p className="text-[11px] text-zinc-500">
                              Qty: {item.quantity} • {item.selectedCut || 'Standard Cut'}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center justify-between text-[11px] text-zinc-500 pt-1">
                      <span>Dispatch: {order.customer.deliveryType === 'delivery' ? `Refrigerated Van to ${order.customer.suburb} NSW` : 'Depot Pickup (Greenacre NSW)'}</span>
                      <span>Payment: {order.customer.paymentMethod.toUpperCase()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Butchery Preferences */}
        {activeTab === 'preferences' && (
          <div className="bg-white rounded-3xl border border-zinc-200 p-6 sm:p-8 shadow-sm max-w-2xl">
            <h2 className="text-base font-black text-zinc-950 uppercase tracking-tight mb-2">
              Default Butchery &amp; Portioning Preferences
            </h2>
            <p className="text-xs text-zinc-500 mb-6">
              These cutting instructions are automatically referenced by our Master Halal Butchers when processing your order.
            </p>

            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-zinc-800 block mb-1">
                  Preferred Steak Thickness:
                </label>
                <select
                  value={profile.steakThickness}
                  onChange={(e) => setProfile({ ...profile, steakThickness: e.target.value })}
                  className="w-full p-3 border border-zinc-300 rounded-xl bg-zinc-50 font-medium"
                >
                  <option value="20mm (Medium Cut)">20mm (Medium Cut)</option>
                  <option value="25mm (Standard Thick Cut)">25mm (Standard Thick Cut)</option>
                  <option value="30mm (Thick Cut / Bistecca)">30mm (Thick Cut / Bistecca)</option>
                  <option value="Whole Primal Uncut (Cryovac)">Whole Primal Uncut (Cryovac)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-zinc-800 block mb-1">
                  Vacuum Packaging &amp; Bagging:
                </label>
                <select
                  value={profile.packingPreference}
                  onChange={(e) => setProfile({ ...profile, packingPreference: e.target.value })}
                  className="w-full p-3 border border-zinc-300 rounded-xl bg-zinc-50 font-medium"
                >
                  <option value="Individual 1kg Cryovac Vacuum Packs">Individual 1kg Cryovac Vacuum Packs</option>
                  <option value="2kg Multi-pack Cryovac Vacuum Packs">2kg Multi-pack Cryovac Vacuum Packs</option>
                  <option value="Bulk 5kg-10kg Master Cartons">Bulk 5kg-10kg Master Cartons</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-zinc-800 block mb-1">
                  Fat Cap Calibration:
                </label>
                <select
                  value={profile.fatCapPreference}
                  onChange={(e) => setProfile({ ...profile, fatCapPreference: e.target.value })}
                  className="w-full p-3 border border-zinc-300 rounded-xl bg-zinc-50 font-medium"
                >
                  <option value="Standard 6mm Butcher Fat Cap">Standard 6mm Butcher Fat Cap</option>
                  <option value="Trimmed Extra Lean (3mm Cap)">Trimmed Extra Lean (3mm Cap)</option>
                  <option value="Untrimmed (Natural Grass-Fed Fat)">Untrimmed (Natural Grass-Fed Fat)</option>
                </select>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="bg-rose-800 hover:bg-rose-900 text-white font-bold text-xs py-3 px-6 rounded-xl transition flex items-center gap-2"
                >
                  {isSaved ? <Check className="w-4 h-4 text-emerald-400" /> : null}
                  <span>{isSaved ? 'Preferences Saved!' : 'Save Butchery Preferences'}</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tab 3: Saved Address & Contact */}
        {activeTab === 'addresses' && (
          <div className="bg-white rounded-3xl border border-zinc-200 p-6 sm:p-8 shadow-sm max-w-2xl">
            <h2 className="text-base font-black text-zinc-950 uppercase tracking-tight mb-2">
              Primary Contact &amp; Delivery Address
            </h2>
            <p className="text-xs text-zinc-500 mb-6">
              Saved for refrigerated deliveries across Greater Sydney.
            </p>

            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="font-bold text-zinc-800 block mb-1">Full Customer Name</label>
                  <input
                    type="text"
                    value={profile.fullName}
                    onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                    className="w-full p-3 border border-zinc-300 rounded-xl bg-zinc-50"
                  />
                </div>

                <div>
                  <label className="font-bold text-zinc-800 block mb-1">Email Address</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full p-3 border border-zinc-300 rounded-xl bg-zinc-50"
                  />
                </div>

                <div>
                  <label className="font-bold text-zinc-800 block mb-1">Mobile Phone</label>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="w-full p-3 border border-zinc-300 rounded-xl bg-zinc-50"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="font-bold text-zinc-800 block mb-1">Street Address</label>
                  <input
                    type="text"
                    value={profile.address}
                    onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                    className="w-full p-3 border border-zinc-300 rounded-xl bg-zinc-50"
                  />
                </div>

                <div>
                  <label className="font-bold text-zinc-800 block mb-1">Suburb</label>
                  <input
                    type="text"
                    value={profile.suburb}
                    onChange={(e) => setProfile({ ...profile, suburb: e.target.value })}
                    className="w-full p-3 border border-zinc-300 rounded-xl bg-zinc-50"
                  />
                </div>

                <div>
                  <label className="font-bold text-zinc-800 block mb-1">Postcode</label>
                  <input
                    type="text"
                    value={profile.postcode}
                    onChange={(e) => setProfile({ ...profile, postcode: e.target.value })}
                    className="w-full p-3 border border-zinc-300 rounded-xl bg-zinc-50"
                  />
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="bg-rose-800 hover:bg-rose-900 text-white font-bold text-xs py-3 px-6 rounded-xl transition flex items-center gap-2"
                >
                  {isSaved ? <Check className="w-4 h-4 text-emerald-400" /> : null}
                  <span>{isSaved ? 'Address Saved!' : 'Save Address'}</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tab 4: Perks & Crypto */}
        {activeTab === 'perks' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-zinc-950 text-white rounded-3xl p-6 sm:p-8 border border-zinc-900 shadow-sm space-y-4">
              <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full text-xs font-bold border border-amber-500/30">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>10% Crypto Discount Benefit</span>
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight text-white">Save on Every Order</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                As part of our modern payment options, we accept USDT, Bitcoin, and Ethereum. When selecting cryptocurrency at checkout, an automatic 10% discount is applied to your meat invoice.
              </p>
              <div className="pt-2 text-xs text-amber-300 font-mono">
                Coupon Code not needed • Applied automatically at Checkout
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200 shadow-sm space-y-4">
              <div className="inline-flex items-center gap-2 bg-rose-50 text-rose-900 px-3 py-1 rounded-full text-xs font-bold border border-rose-200">
                <ShieldCheck className="w-4 h-4 text-rose-700" />
                <span>100% Hand Zabiha Guarantee</span>
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight text-zinc-950">Dual Halal Certification</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Every carton and primal cut handled at our Greenacre depot is strictly supervised under HCAA and AFIC slaughter regulations with zero machine slaughter.
              </p>
              <button
                onClick={() => {
                  setCurrentTab('halal-certificate');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-xs font-bold text-rose-800 hover:text-rose-950 inline-flex items-center gap-1 uppercase"
              >
                <span>View Official Halal Certificates</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Tax Invoice Modal */}
      {selectedInvoiceOrder && (
        <TaxInvoiceModal
          order={selectedInvoiceOrder}
          onClose={() => setSelectedInvoiceOrder(null)}
        />
      )}
    </div>
  );
};
