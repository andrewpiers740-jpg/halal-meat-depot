import React, { useState } from 'react';
import { Order } from '../types';
import { STORE_CONFIG } from '../data/products';
import { CheckCircle2, FileText, MessageCircle, X, Printer, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { TaxInvoiceModal } from './TaxInvoiceModal';

interface OrderSuccessModalProps {
  order: Order | null;
  onClose: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({ order, onClose }) => {
  const [showInvoice, setShowInvoice] = useState(false);

  if (!order) return null;

  const handleWhatsAppNotify = () => {
    const text = `Assalamu Alaikum Halal Meat Depot. I have placed Order *${order.id}* for *${order.customer.fullName}*. Total: $${order.total.toFixed(2)} AUD. Please confirm receipt and dispatch schedule.`;
    window.open(`https://wa.me/${STORE_CONFIG.phoneRaw}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
        <div className="relative bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-slate-200">
          
          {/* Header Banner */}
          <div className="bg-zinc-950 text-white p-6 text-center relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-rose-300 hover:text-white p-2 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 bg-rose-800 rounded-full flex items-center justify-center mx-auto text-amber-400 mb-3 shadow-lg border-2 border-amber-400/30">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h2 className="text-2xl font-black uppercase tracking-tight">Order Received!</h2>
            <p className="text-xs text-rose-200 mt-1">
              JazakAllah Khair! Your Halal meat order has been logged into our Greenacre depot dispatch system.
            </p>

            <div className="mt-4 inline-block bg-rose-950/90 border border-amber-500/40 px-4 py-1.5 rounded-full text-xs font-mono font-bold text-amber-300">
              Order Ref: {order.id}
            </div>
          </div>

          {/* Details Content */}
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Quick summary cards */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="text-slate-500 block">Total Amount:</span>
                <span className="text-base font-black text-slate-900">${order.total.toFixed(2)} AUD</span>
                <span className="text-[10px] text-rose-700 block font-semibold">Includes Australian GST</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="text-slate-500 block">Dispatch Type:</span>
                <span className="text-sm font-bold text-slate-900 capitalize">
                  {order.customer.deliveryType === 'delivery' ? 'Refrigerated Delivery' : 'Depot Collection'}
                </span>
                <span className="text-[10px] text-slate-500 block">
                  {order.customer.deliveryType === 'delivery' ? `${order.customer.suburb} NSW` : 'Greenacre Depot'}
                </span>
              </div>
            </div>

            {/* Meat cutting notes reminder */}
            {order.customer.butcheryInstructions && (
              <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-2xl text-xs text-amber-950">
                <span className="font-bold block">Your Butchery Specifications:</span>
                <p className="text-[11px] mt-1 text-slate-700">{order.customer.butcheryInstructions}</p>
              </div>
            )}

            {/* Next Steps */}
            <div className="space-y-2 text-xs text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-rose-700" />
                What happens next?
              </h4>
              <p className="text-[11px] leading-relaxed">
                1. Our master butcher reviews and prepares your primal cuts to your requested specifications.
              </p>
              <p className="text-[11px] leading-relaxed">
                2. Items are vacuum-sealed in heavy gauge barrier cryovac bags to preserve cold-chain freshness.
              </p>
              <p className="text-[11px] leading-relaxed">
                3. You will receive an SMS or WhatsApp notification when our refrigerated van departs or when your order is ready for collection at 43 Banksia Rd, Greenacre.
              </p>
            </div>

            {/* Dual CTA Buttons */}
            <div className="space-y-2.5 pt-2">
              <button
                onClick={() => setShowInvoice(true)}
                className="w-full bg-rose-950 hover:bg-zinc-950 text-white py-3 px-4 rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow transition"
              >
                <FileText className="w-4 h-4 text-amber-400" />
                <span>View &amp; Print Official Tax Invoice</span>
              </button>

              <button
                onClick={handleWhatsAppNotify}
                className="w-full bg-rose-700 hover:bg-rose-700 text-white py-3 px-4 rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Message Dispatcher on WhatsApp</span>
              </button>

              <button
                onClick={onClose}
                className="w-full py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 text-center"
              >
                Return to Store
              </button>
            </div>

          </div>

        </div>
      </div>

      {showInvoice && (
        <TaxInvoiceModal order={order} onClose={() => setShowInvoice(false)} />
      )}
    </>
  );
};
