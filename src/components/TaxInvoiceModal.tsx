import React from 'react';
import { Order } from '../types';
import { STORE_CONFIG } from '../data/products';
import { X, Printer, ShieldCheck, Download } from 'lucide-react';

interface TaxInvoiceModalProps {
  order: Order;
  onClose: () => void;
}

export const TaxInvoiceModal: React.FC<TaxInvoiceModalProps> = ({ order, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-200">
        
        {/* Top Control Bar (Hidden when printed) */}
        <div className="bg-slate-900 text-white p-4 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
            <ShieldCheck className="w-4 h-4" />
            <span>Official Australian Tax Invoice (ABN Registered)</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="bg-rose-700 hover:bg-rose-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Invoice</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Tax Invoice Content */}
        <div className="p-8 sm:p-12 text-slate-900 bg-white max-h-[85vh] overflow-y-auto print:max-h-none print:overflow-visible">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6 border-b border-slate-300 pb-8">
            <div>
              <div className="flex items-center gap-3">
                <img
                  src="/logo.jpg"
                  alt="Halal Meat Depot Logo"
                  className="h-16 w-auto max-w-[150px] rounded-xl object-contain bg-white border border-slate-200 p-1 shadow-sm"
                />
                <h1 className="text-2xl font-black tracking-tight text-slate-900 uppercase">
                  HALAL MEAT DEPOT
                </h1>
              </div>
              <p className="text-xs text-slate-600 mt-2 font-medium">
                43 Banksia Rd, Greenacre NSW 2190, Australia<br />
                ABN:{' '}
                <a
                  href={STORE_CONFIG.abnUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline font-semibold text-slate-900"
                  title="Verify ABN on Australian Business Register"
                >
                  {STORE_CONFIG.abn}
                </a>{' '}
                
                Phone: {STORE_CONFIG.phone} • Email: {STORE_CONFIG.email}
              </p>
            </div>

            <div className="sm:text-right">
              <span className="inline-block bg-slate-900 text-amber-400 text-xs font-black uppercase tracking-widest px-3 py-1 rounded-md">
                TAX INVOICE
              </span>
              <p className="text-sm font-black text-slate-900 mt-2 font-mono">
                {order.id}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Date: {new Date(order.createdAt).toLocaleDateString('en-AU', { day: '2-digit', month: 'short', year: 'numeric' })}<br />
                Payment: <span className="font-semibold text-rose-800 uppercase">{order.customer.paymentMethod.replace('_', ' ')}</span>
              </p>
            </div>
          </div>

          {/* Bill To & Dispatch To */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6 border-b border-slate-200 text-xs">
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 block mb-1">
                Billed To Customer:
              </span>
              <p className="font-bold text-slate-900 text-sm">{order.customer.fullName}</p>
              <p className="text-slate-600 mt-0.5">{order.customer.email}</p>
              <p className="text-slate-600">{order.customer.phone}</p>
            </div>

            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 block mb-1">
                Dispatch / Fulfillment:
              </span>
              <p className="font-bold text-slate-900">
                {order.customer.deliveryType === 'delivery' ? 'Refrigerated Courier Delivery' : 'Depot Pickup (Greenacre NSW)'}
              </p>
              {order.customer.deliveryType === 'delivery' ? (
                <p className="text-slate-600 mt-0.5">
                  {order.customer.address}, {order.customer.suburb} {order.customer.state} {order.customer.postcode}
                </p>
              ) : (
                <p className="text-slate-600 mt-0.5">
                  Collection Depot: 43 Banksia Rd, Greenacre NSW 2190
                </p>
              )}
              {order.customer.deliveryNotes && (
                <p className="text-slate-500 italic mt-1 text-[11px]">Note: {order.customer.deliveryNotes}</p>
              )}
            </div>
          </div>

          {/* Butchery Cut Specification */}
          {order.customer.butcheryInstructions && (
            <div className="py-3 px-4 bg-slate-50 border border-slate-200 rounded-xl my-4 text-xs">
              <span className="font-bold text-slate-900">Custom Meat Cutting &amp; Packing Specs: </span>
              <span className="text-slate-700">{order.customer.butcheryInstructions}</span>
            </div>
          )}

          {/* Itemized Table */}
          <div className="mt-4">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b-2 border-slate-900 text-slate-900 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3">Item Description</th>
                  <th className="py-3">Butchery Cut</th>
                  <th className="py-3 text-center">Qty</th>
                  <th className="py-3 text-right">Unit Price</th>
                  <th className="py-3 text-right">Amount (AUD)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                {order.items.map((item, idx) => (
                  <tr key={idx}>
                    <td className="py-3 pr-2 font-medium text-slate-900">
                      {item.product.name}
                      <div className="text-[10px] text-slate-400 font-normal">{item.product.unit}</div>
                    </td>
                    <td className="py-3 pr-2 text-rose-800 font-medium text-[11px]">
                      {item.selectedCut || 'Standard Trim'}
                    </td>
                    <td className="py-3 text-center font-bold text-slate-900">{item.quantity}</td>
                    <td className="py-3 text-right">${item.product.price.toFixed(2)}</td>
                    <td className="py-3 text-right font-bold text-slate-900">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals Section */}
          <div className="mt-6 pt-4 border-t-2 border-slate-300 flex justify-end">
            <div className="w-full sm:w-72 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal (AUD):</span>
                <span className="font-semibold text-slate-900">${order.subtotal.toFixed(2)}</span>
              </div>

              {order.discountAmount > 0 && (
                <div className="flex justify-between text-rose-800">
                  <span>Voucher Discount:</span>
                  <span className="font-semibold">-${order.discountAmount.toFixed(2)}</span>
                </div>
              )}

              {order.cryptoDiscountAmount > 0 && (
                <div className="flex justify-between text-amber-700 font-bold">
                  <span>10% Crypto Discount:</span>
                  <span>-${order.cryptoDiscountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-600">
                <span>Refrigerated Delivery:</span>
                <span className="font-semibold text-slate-900">
                  {order.shippingFee === 0 ? 'FREE ($0.00)' : `$${order.shippingFee.toFixed(2)}`}
                </span>
              </div>

              <div className="flex justify-between text-slate-900 font-black text-sm pt-2 border-t border-slate-300">
                <span>TOTAL PAYABLE (AUD):</span>
                <span className="text-zinc-950">${order.total.toFixed(2)} AUD</span>
              </div>

              <div className="text-[10px] text-slate-500 pt-1 text-right">
                Includes ${(order.total / 11).toFixed(2)} AUD Australian GST (10%)
              </div>
            </div>
          </div>

          {/* Payment Instructions & Halal Guarantee */}
          <div className="mt-8 pt-6 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-600">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="font-bold text-slate-900 block mb-1">Direct Bank Transfer Details:</span>
              <p className="text-[11px] leading-relaxed">
                Bank: Commonwealth Bank of Australia<br />
                Account Name: Halal Meat Depot Pty Ltd<br />
                BSB: 062-124 | Account: 1098 4210<br />
                Reference: <strong className="text-slate-900">{order.id}</strong>
              </p>
            </div>

            <div className="p-4 bg-rose-50 rounded-2xl border border-rose-200 text-zinc-950">
              <span className="font-bold block mb-1">Halal Certification:</span>
              <p className="text-[11px] leading-relaxed text-rose-950">
                All products are certified Halal by Halal Control Australia. Free from non-Halal contamination, temperature monitored in refrigerated vans.
              </p>
            </div>
          </div>

          <div className="mt-8 text-center text-[10px] text-slate-400">
            Thank you for choosing Halal Meat Depot • 43 Banksia Rd, Greenacre NSW 2190 • www.halalmeatdepot.com.au
          </div>

        </div>

      </div>
    </div>
  );
};
