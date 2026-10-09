import React, { useState } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { WholesalePage } from './pages/WholesalePage';
import { HalalCertificatePage } from './pages/HalalCertificatePage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PoliciesPage } from './pages/PoliciesPage';
import { AdminPortal } from './pages/AdminPortal';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { AccountPage } from './pages/AccountPage';
import { BlogPage } from './pages/BlogPage';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { CookieBanner } from './components/CookieBanner';

function AppContent() {
  const {
    currentTab,
    setCurrentTab,
    selectedProduct,
    selectedCategory,
    setSelectedCategory,
    selectedSubcategory,
    setSelectedSubcategory,
  } = useCart();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activePolicyTab, setActivePolicyTab] = useState<'delivery' | 'refund' | 'terms' | 'privacy'>('delivery');

  const openPolicyModal = (policyId: string) => {
    setActivePolicyTab(policyId as any);
    setCurrentTab('policies');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openAdminPortal = () => {
    setCurrentTab('admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-amber-400 selection:text-slate-950">
      
      {/* Primary Navigation Header */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        onSearchChange={setSearchQuery}
        searchQuery={searchQuery}
        setSelectedCategory={setSelectedCategory}
        setSelectedSubcategory={setSelectedSubcategory}
      />

      {/* Main Page Viewport - Each page and product opens as a page on its own */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <HomePage
            setCurrentTab={setCurrentTab}
            setSelectedCategory={setSelectedCategory}
          />
        )}

        {currentTab === 'shop' && (
          <ShopPage
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedSubcategory={selectedSubcategory}
            setSelectedSubcategory={setSelectedSubcategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        )}

        {currentTab === 'product' && (
          <ProductDetailPage
            product={selectedProduct}
            onBack={() => setCurrentTab('shop')}
            onNavigateToCategory={(cat) => {
              setSelectedCategory(cat);
              setSelectedSubcategory('all');
              setCurrentTab('shop');
            }}
          />
        )}

        {currentTab === 'cart' && <CartPage />}

        {currentTab === 'checkout' && <CheckoutPage />}

        {currentTab === 'account' && <AccountPage />}

        {currentTab === 'blog' && <BlogPage />}

        {currentTab === 'wholesale' && <WholesalePage />}

        {currentTab === 'halal-certificate' && <HalalCertificatePage />}

        {currentTab === 'about' && <AboutPage />}

        {currentTab === 'contact' && <ContactPage />}

        {currentTab === 'policies' && (
          <PoliciesPage initialPolicy={activePolicyTab} />
        )}

        {currentTab === 'admin' && (
          <AdminPortal onBackToStore={() => setCurrentTab('home')} />
        )}
      </main>

      {/* Primary Footer (Blog and My Account visible) */}
      <Footer
        setCurrentTab={setCurrentTab}
        openAdminPortal={openAdminPortal}
        openPolicyModal={openPolicyModal}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Floating WhatsApp Live Chat */}
      <WhatsAppWidget />

      {/* Cookie Consent Banner */}
      <CookieBanner />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
