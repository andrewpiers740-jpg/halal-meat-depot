import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Order } from '../types';
import { STORE_CONFIG } from '../data/products';
import { Lock, Unlock, Search, ShieldCheck, Printer, MessageCircle, CheckCircle2, Truck, Eye, ArrowLeft, RefreshCw, ExternalLink } from 'lucide-react';
import { TaxInvoiceModal } from '../components/TaxInvoiceModal';

interface AdminPortalProps {
  onBackToStore: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ onBackToStore }) => {
  const { orders, updateOrderStatus } = useCart();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showInvoiceModal, setShowInvoiceModal] = useState<Order | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === STORE_CONFIG.adminPasscode) {
      setIsAuthenticated(true);
      setPasscodeError('');
    } else {
      setPasscodeError('Invalid passcode. Use configured depot passcode.');
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.phone.includes(searchTerm);

    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);
  const pendingOrders = orders.filter((o) => o.status === 'Pending').length;
  const packedOrders = orders.filter((o) => o.status === 'Packed').length;

  const handleSendWhatsAppLogistics = (order: Order) => {
    const text = `Assalamu Alaikum ${order.customer.fullName}, this is Halal Meat Depot Dispatch (Greenacre). Your order *${order.id}* status has been updated to *${order.status}*. Delivery address: ${order.customer.deliveryType === 'delivery' ? `${order.customer.address}, ${order.customer.suburb}` : 'Depot Pickup (43 Banksia Rd, Greenacre)'}. Inquiries call: +61 489 989 442.`;
    window.open(`https://wa.me/${order.customer.phone.replace(/[^0-9]/g, '') || STORE_CONFIG.phoneRaw}?text=${encodeURIComponent(text)}`, '_blank');
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 animate-fadeIn">
        <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-xl text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-zinc-950 text-rose-400 flex items-center justify-center mx-auto shadow-md border-2 border-rose-800">
            <Lock className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs font-black uppercase tracking-widest text-rose-800">
              Authorized Staff Only
            </span>
            <h2 className="text-2xl font-black uppercase text-zinc-900 mt-1">
              Depot Admin Reply Portal
            </h2>
            <p className="text-xs text-zinc-500 mt-1">
              Halal Meat Depot • Greenacre NSW Dispatch Queue
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-zinc-700 block mb-1 text-left">
                Enter Admin Passcode:
              </label>
              <input
                type="password"
                placeholder="Enter passcode (hmd2026)"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full text-center tracking-widest text-base font-mono p-3 rounded-xl border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-rose-800"
              />
              {passcodeError && (
                <p className="text-[11px] text-rose-600 font-bold mt-1.5">{passcodeError}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-rose-800 hover:bg-rose-900 text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl shadow transition"
            >
              Unlock Order Manager
            </button>
          </form>

          <button
            onClick={onBackToStore}
            className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-800 font-semibold"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Customer Storefront
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* Admin Header */}
      <div className="bg-zinc-900 text-white p-6 sm:p-8 rounded-3xl border border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-rose-400 uppercase tracking-widest mb-1">
            <Unlock className="w-4 h-4" /> Live Dispatch &amp; Logistics Desk
          </div>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
            Depot Orders Management
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            43 Banksia Rd, Greenacre NSW 2190 • Currency: Australian Dollar (AUD) •{' '}
            <a
              href={STORE_CONFIG.abnUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-rose-400 hover:underline"
            >
              ABN: {STORE_CONFIG.abn} ↗
            </a>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-bold rounded-xl border border-zinc-700 transition"
          >
            Lock Portal
          </button>
          <button
            onClick={onBackToStore}
            className="px-4 py-2 bg-rose-800 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow transition"
          >
            Back to Store
          </button>
        </div>
      </div>

      {/* KPI Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-2xl border border-zinc-200 shadow-sm text-xs">
          <span className="text-zinc-500 font-bold uppercase text-[11px] block">Total Orders</span>
          <span className="text-2xl font-black text-zinc-900 mt-1 block">{orders.length}</span>
          <span className="text-[10px] text-rose-700">Logged in Depot Database</span>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-zinc-200 shadow-sm text-xs">
          <span className="text-zinc-500 font-bold uppercase text-[11px] block">Pending Prep</span>
          <span className="text-2xl font-black text-amber-600 mt-1 block">{pendingOrders}</span>
          <span className="text-[10px] text-amber-700">Requires Butcher Boning</span>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-zinc-200 shadow-sm text-xs">
          <span className="text-zinc-500 font-bold uppercase text-[11px] block">Packed &amp; Cryovac</span>
          <span className="text-2xl font-black text-blue-600 mt-1 block">{packedOrders}</span>
          <span className="text-[10px] text-blue-700">Ready for Driver Pickup</span>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-zinc-200 shadow-sm text-xs">
          <span className="text-zinc-500 font-bold uppercase text-[11px] block">Total Sales</span>
          <span className="text-2xl font-black text-rose-900 mt-1 block">${totalRevenue.toFixed(2)} AUD</span>
          <span className="text-[10px] text-rose-700">Includes Australian GST</span>
        </div>
      </div>

      {/* Orders Filter & Search */}
      <div className="bg-white p-6 rounded-3xl border border-zinc-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search Order ID, name, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs py-2.5 pl-9 pr-4 bg-zinc-50 border border-zinc-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-rose-800"
            />
          </div>

          <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            {['all', 'Pending', 'Confirmed', 'Packed', 'Dispatched', 'Delivered'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`text-xs px-3 py-1.5 rounded-lg font-bold uppercase whitespace-nowrap transition ${
                  statusFilter === status
                    ? 'bg-zinc-950 text-rose-400'
                    : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto border border-zinc-200 rounded-2xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 uppercase font-bold text-[10px]">
              <tr>
                <th className="py-3 px-4">Order ID &amp; Date</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Method &amp; Delivery</th>
                <th className="py-3 px-4">Items Summary</th>
                <th className="py-3 px-4 text-right">Total (AUD)</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-zinc-400">
                    No orders match your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-zinc-50/70 transition">
                    <td className="py-3.5 px-4 font-mono font-bold text-zinc-900">
                      <div>{order.id}</div>
                      <div className="text-[10px] text-zinc-400 font-sans font-normal">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-bold text-zinc-900">{order.customer.fullName}</div>
                      <div className="text-[10px] text-zinc-500">{order.customer.phone}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="capitalize font-semibold text-zinc-800 block">
                        {order.customer.deliveryType}
                      </span>
                      <span className="text-[10px] text-zinc-500">
                        {order.customer.paymentMethod.replace('_', ' ')}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-zinc-800">
                        {order.items.length} cut(s)
                      </span>
                      <div className="text-[10px] text-zinc-500 truncate max-w-[200px]">
                        {order.items.map((i) => `${i.quantity}x ${i.product.name}`).join(', ')}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-right font-black text-zinc-900">
                      ${order.total.toFixed(2)}
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                        className={`text-[11px] font-bold py-1 px-2 rounded-lg border focus:outline-none cursor-pointer ${
                          order.status === 'Pending'
                            ? 'bg-amber-100 text-amber-900 border-amber-300'
                            : order.status === 'Confirmed'
                            ? 'bg-blue-100 text-blue-900 border-blue-300'
                            : order.status === 'Packed'
                            ? 'bg-purple-100 text-purple-900 border-purple-300'
                            : order.status === 'Dispatched'
                            ? 'bg-rose-100 text-rose-900 border-rose-300'
                            : 'bg-zinc-100 text-zinc-800 border-zinc-300'
                        }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Packed">Packed</option>
                        <option value="Dispatched">Dispatched</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => setShowInvoiceModal(order)}
                          className="p-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-lg transition"
                          title="Print Official Tax Invoice"
                        >
                          <Printer className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleSendWhatsAppLogistics(order)}
                          className="p-1.5 bg-rose-100 hover:bg-rose-200 text-rose-800 rounded-lg transition"
                          title="Send WhatsApp Logistics Notification"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showInvoiceModal && (
        <TaxInvoiceModal
          order={showInvoiceModal}
          onClose={() => setShowInvoiceModal(null)}
        />
      )}

    </div>
  );
};
