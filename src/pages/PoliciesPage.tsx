import React, { useState } from 'react';
import { STORE_CONFIG } from '../data/products';
import { ShieldCheck, Truck, RefreshCw, FileText, Lock } from 'lucide-react';

interface PoliciesPageProps {
  initialPolicy?: 'delivery' | 'refund' | 'terms' | 'privacy';
}

export const PoliciesPage: React.FC<PoliciesPageProps> = ({ initialPolicy = 'delivery' }) => {
  const [activeTab, setActiveTab] = useState<'delivery' | 'refund' | 'terms' | 'privacy'>(initialPolicy);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div>
        <span className="text-xs font-black uppercase tracking-widest text-rose-800">
          Australian Consumer &amp; Food Compliance
        </span>
        <h1 className="text-3xl font-black uppercase text-zinc-900 mt-1">
          Store Policies &amp; Terms
        </h1>
        <p className="text-xs text-zinc-500 mt-1">
          Halal Meat Depot • 43 Banksia Rd, Greenacre NSW 2190 •{' '}
          <a
            href={STORE_CONFIG.abnUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-rose-800 font-semibold hover:underline"
            title="Verify ABN on Australian Business Register"
          >
            ABN: {STORE_CONFIG.abn} ↗
          </a>
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-zinc-200 overflow-x-auto text-xs font-bold">
        <button
          onClick={() => setActiveTab('delivery')}
          className={`py-3 px-5 border-b-2 transition whitespace-nowrap uppercase flex items-center gap-1.5 ${
            activeTab === 'delivery'
              ? 'border-rose-800 text-rose-950 bg-rose-50/50'
              : 'border-transparent text-zinc-500 hover:text-zinc-800'
          }`}
        >
          <Truck className="w-4 h-4" />
          <span>Delivery &amp; Shipping Policy</span>
        </button>

        <button
          onClick={() => setActiveTab('refund')}
          className={`py-3 px-5 border-b-2 transition whitespace-nowrap uppercase flex items-center gap-1.5 ${
            activeTab === 'refund'
              ? 'border-rose-800 text-rose-950 bg-rose-50/50'
              : 'border-transparent text-zinc-500 hover:text-zinc-800'
          }`}
        >
          <RefreshCw className="w-4 h-4" />
          <span>Refund &amp; Returns Policy</span>
        </button>

        <button
          onClick={() => setActiveTab('terms')}
          className={`py-3 px-5 border-b-2 transition whitespace-nowrap uppercase flex items-center gap-1.5 ${
            activeTab === 'terms'
              ? 'border-rose-800 text-rose-950 bg-rose-50/50'
              : 'border-transparent text-zinc-500 hover:text-zinc-800'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Terms &amp; Conditions</span>
        </button>

        <button
          onClick={() => setActiveTab('privacy')}
          className={`py-3 px-5 border-b-2 transition whitespace-nowrap uppercase flex items-center gap-1.5 ${
            activeTab === 'privacy'
              ? 'border-rose-800 text-rose-950 bg-rose-50/50'
              : 'border-transparent text-zinc-500 hover:text-zinc-800'
          }`}
        >
          <Lock className="w-4 h-4" />
          <span>Privacy Policy</span>
        </button>
      </div>

      {/* Content */}
      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-zinc-200 shadow-sm text-xs sm:text-sm text-zinc-700 leading-relaxed space-y-6">
        
        {/* Delivery Policy */}
        {activeTab === 'delivery' && (
          <div className="space-y-4">
            <h2 className="text-xl font-black text-zinc-900 uppercase">
              Refrigerated Delivery &amp; Shipping Policy
            </h2>
            <div className="p-4 bg-rose-50 rounded-2xl border border-rose-200 text-rose-950 space-y-1">
              <p className="font-bold">Key Order Dispatch Rules:</p>
              <p>• <strong>Minimum Order Rule:</strong> $250.00 AUD per order across all meat categories.</p>
              <p>• <strong>Free Delivery Threshold:</strong> Orders of $500.00 AUD or more receive 100% FREE refrigerated courier transport across Greater Sydney.</p>
              <p>• <strong>Standard Delivery Fee:</strong> Flat $25.00 AUD refrigerated transit charge for orders between $250.00 and $499.99 AUD.</p>
              <p>• <strong>Depot Collection:</strong> Always FREE at 43 Banksia Rd, Greenacre NSW 2190.</p>
            </div>

            <h3 className="font-bold text-zinc-900 text-sm mt-4">1. Temperature Controlled Cold Chain</h3>
            <p>
              All Halal meat products are dispatched in active refrigerated transport units maintained below 4°C. Meat is packaged in commercial-grade vacuum barrier cryovac packaging with moisture absorption liners.
            </p>

            <h3 className="font-bold text-zinc-900 text-sm">2. Delivery Windows &amp; Suburbs Covered</h3>
            <p>
              We deliver Monday through Saturday across Greater Sydney, including Canterbury-Bankstown, Western Sydney, Liverpool, Parramatta, Inner West, Hills District, St George, Sutherland Shire, and Sydney Metro. Morning windows operate between 7:00 AM - 12:00 PM; Afternoon windows operate 12:00 PM - 5:00 PM.
            </p>

            <h3 className="font-bold text-zinc-900 text-sm">3. Delivery Attendance</h3>
            <p>
              Due to the perishable nature of fresh meat, someone must be present to receive the order or have specified a secure shaded cool box location in the order delivery notes.
            </p>
          </div>
        )}

        {/* Refund Policy */}
        {activeTab === 'refund' && (
          <div className="space-y-4">
            <h2 className="text-xl font-black text-zinc-900 uppercase">
              Refund &amp; Replacement Policy
            </h2>
            <p>
              At Halal Meat Depot, customer satisfaction and quality assurance are central to our business. Because meat is a perishable food product, specific provisions apply in compliance with the Australian Consumer Law (ACL).
            </p>

            <h3 className="font-bold text-zinc-900 text-sm">1. Inspection Upon Delivery</h3>
            <p>
              Please inspect all vacuum pouches and cartons upon receipt. If you believe an item has arrived compromised, warm, or not according to your cutting specification, you must contact our depot team within 12 hours of delivery via WhatsApp (+61 489 989 442) or email (orders@halalmeatdepot.com.au) with photographic evidence.
            </p>

            <h3 className="font-bold text-zinc-900 text-sm">2. Remedies &amp; Replacements</h3>
            <p>
              Where an item is proven to have suffered a packaging failure or temperature discrepancy under our control, we will issue an immediate replacement delivery on our next morning run or process a full credit/refund to your original payment method.
            </p>

            <h3 className="font-bold text-zinc-900 text-sm">3. Change of Mind</h3>
            <p>
              Due to strict NSW Food Authority food hygiene guidelines, we cannot accept returns or provide refunds for change of mind once fresh perishable meat has been accepted by the customer.
            </p>
          </div>
        )}

        {/* Terms and Conditions */}
        {activeTab === 'terms' && (
          <div className="space-y-4">
            <h2 className="text-xl font-black text-zinc-900 uppercase">
              Terms &amp; Conditions of Sale
            </h2>
            <p>
              By accessing www.halalmeatdepot.com.au or placing an order via our online form or WhatsApp portal, you agree to these Terms and Conditions.
            </p>

            <h3 className="font-bold text-zinc-900 text-sm">1. Australian Dollar Currency &amp; GST</h3>
            <p>
              All prices shown on this site are in Australian Dollars (AUD) and are inclusive of the 10% Australian Goods and Services Tax (GST) where applicable under ATO regulations.
            </p>

            <h3 className="font-bold text-zinc-900 text-sm">2. Approximate Carcass &amp; Primal Weights</h3>
            <p>
              Natural livestock primal cuts and whole carcasses vary naturally in weight. When you order a whole lamb or beef primal, the advertised weight represents an average piece. Final weights are recorded on our trade-approved scales prior to dispatch.
            </p>

            <h3 className="font-bold text-zinc-900 text-sm">3. 10% Crypto Discount Terms</h3>
            <p>
              Orders opting for cryptocurrency payment receive a 10% discount off the meat total. Cryptographic settlements (USDT / BTC) must be confirmed prior to final dispatch of goods.
            </p>
          </div>
        )}

        {/* Privacy Policy */}
        {activeTab === 'privacy' && (
          <div className="space-y-4">
            <h2 className="text-xl font-black text-zinc-900 uppercase">
              Privacy Policy (Australian Privacy Principles)
            </h2>
            <p>
              Halal Meat Depot Pty Ltd is committed to protecting your privacy in accordance with the Privacy Act 1988 (Cth) and the Australian Privacy Principles (APPs).
            </p>

            <h3 className="font-bold text-zinc-900 text-sm">1. Information We Collect</h3>
            <p>
              When you submit an order, we collect only information necessary to fulfill your butcher dispatch: full name, contact phone number, email address for your official tax invoice, delivery address, and meat cutting preferences.
            </p>

            <h3 className="font-bold text-zinc-900 text-sm">2. Use of Information</h3>
            <p>
              Your personal data is used solely for order processing, logistics routing by our refrigerated driver, and official tax invoice generation. We never sell, rent, or lease customer contact lists to third-party marketing companies.
            </p>

            <h3 className="font-bold text-zinc-900 text-sm">3. Security</h3>
            <p>
              All digital records are secured using standard SSL/TLS encryption. If you have questions regarding your stored records, contact our privacy officer at orders@halalmeatdepot.com.au.
            </p>
          </div>
        )}

      </div>

    </div>
  );
};
