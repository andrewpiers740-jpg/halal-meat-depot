import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, Phone, MapPin, Search, Menu, X, ShieldCheck, Flame, Percent, Truck, ExternalLink, ChevronDown, ChevronRight, Sparkles, Layers } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { STORE_CONFIG, CATEGORIES } from '../data/products';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onSearchChange: (query: string) => void;
  searchQuery: string;
  setSelectedCategory?: (cat: string) => void;
  setSelectedSubcategory?: (sub: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  onSearchChange,
  searchQuery,
  setSelectedCategory,
  setSelectedSubcategory,
}) => {
  const { itemCount, setIsCartOpen, subtotal, minOrder } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const [mobileExpandedCat, setMobileExpandedCat] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Meat categories specifically for the shop dropdown
  const meatCategories = CATEGORIES.filter((c) => c.id !== 'all' && c.id !== 'wholesale');

  // Top Bar 3-second rotating popup announcement
  const [activeTopIndex, setActiveTopIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const topAnnouncements = [
    {
      id: 'halal',
      content: (
        <span className="flex items-center gap-2 text-rose-300 font-bold tracking-wide">
          <ShieldCheck className="w-4 h-4 text-rose-400 flex-shrink-0" />
          <span>100% Certified Hand Zabiha Halal</span>
        </span>
      ),
    },
    {
      id: 'min-order',
      content: (
        <span className="flex items-center gap-2 text-zinc-100 font-bold tracking-wide">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
          <span>Min Order: ${STORE_CONFIG.minOrder} AUD</span>
        </span>
      ),
    },
    {
      id: 'free-shipping',
      content: (
        <span className="flex items-center gap-2 text-zinc-100 font-bold tracking-wide">
          <Truck className="w-4 h-4 text-rose-400 flex-shrink-0" />
          <span>Free Sydney Delivery over ${STORE_CONFIG.freeShippingThreshold} AUD</span>
        </span>
      ),
    },
    {
      id: 'crypto-discount',
      content: (
        <span className="flex items-center gap-2 text-amber-300 font-bold tracking-wide">
          <Percent className="w-4 h-4 text-amber-400 flex-shrink-0" />
          <span>10% Crypto Discount</span>
        </span>
      ),
    },
    {
      id: 'abn',
      content: (
        <a
          href={STORE_CONFIG.abnUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-rose-300 hover:text-white font-bold underline underline-offset-2 transition-colors cursor-pointer group"
          title="Verify ABN on Australian Business Register (abr.business.gov.au)"
        >
          <ExternalLink className="w-3.5 h-3.5 text-rose-400 group-hover:text-white flex-shrink-0 transition-colors" />
          <span>ABN: {STORE_CONFIG.abn} <span className="opacity-80 text-[10px]">(View on ABR ↗)</span></span>
        </a>
      ),
    },
  ];

  useEffect(() => {
    // 3 seconds per announcement: shows, then smoothly transitions off to the next
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveTopIndex((prev) => (prev + 1) % topAnnouncements.length);
        setIsTransitioning(false);
      }, 300);
    }, 3000);
    return () => clearInterval(timer);
  }, [topAnnouncements.length]);

  const navItems = [
    { id: 'home', label: 'HOME' },
    { id: 'shop', label: 'SHOP' },
    { id: 'wholesale', label: 'WHOLESALE' },
    { id: 'halal-certificate', label: 'HALAL CERTIFICATE' },
    { id: 'about', label: 'ABOUT US' },
    { id: 'contact', label: 'CONTACT US' },
    { id: 'blog', label: 'BLOG' },
    { id: 'account', label: 'MY ACCOUNT' },
  ];

  const handleNavClick = (id: string) => {
    setCurrentTab(id);
    setShopDropdownOpen(false);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDropdownCategoryClick = (categoryId: string) => {
    setSelectedCategory?.(categoryId);
    setSelectedSubcategory?.('all');
    setCurrentTab('shop');
    setShopDropdownOpen(false);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDropdownSubcategoryClick = (categoryId: string, subcategory: string) => {
    setSelectedCategory?.(categoryId);
    setSelectedSubcategory?.(subcategory);
    setCurrentTab('shop');
    setShopDropdownOpen(false);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMouseEnterShop = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setShopDropdownOpen(true);
  };

  const handleMouseLeaveShop = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setShopDropdownOpen(false);
    }, 200);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShopDropdownOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-zinc-200">
      {/* Top Banner Bar with Centralized 3-Second Pop-Up Announcement */}
      <div className="bg-zinc-950 text-zinc-100 text-xs py-2 px-4 border-b border-zinc-900 relative">
        <div className="max-w-7xl mx-auto flex items-center justify-between relative min-h-[32px]">
          
          {/* Left: Contact Phone (Desktop) */}
          <div className="hidden lg:flex items-center gap-2 text-xs font-medium z-10">
            <a
              href="tel:+61489989442"
              className="flex items-center gap-1.5 text-zinc-300 hover:text-rose-400 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-rose-500" />
              <span>{STORE_CONFIG.phone}</span>
            </a>
          </div>

          {/* Centralized Pop-up Announcement - exactly centered across the top bar */}
          <div className="w-full lg:absolute lg:inset-x-0 lg:top-0 lg:bottom-0 flex items-center justify-center pointer-events-none">
            <div className="pointer-events-auto">
              <div
                className={`inline-flex items-center justify-center bg-gradient-to-r from-zinc-900 via-rose-950/70 to-zinc-900 border border-rose-800/60 rounded-full px-5 py-1 text-xs shadow-lg shadow-black/40 transition-all duration-300 transform select-none ${
                  isTransitioning
                    ? 'opacity-0 scale-90 -translate-y-1'
                    : 'opacity-100 scale-100 translate-y-0'
                }`}
              >
                {topAnnouncements[activeTopIndex].content}
              </div>
            </div>
          </div>

          {/* Right: Location & Operating Info (Desktop) */}
          <div className="hidden lg:flex items-center justify-end gap-2 text-xs font-medium z-10">
            <span className="flex items-center gap-1 text-zinc-400">
              <MapPin className="w-3.5 h-3.5 text-rose-500" />
              <span>Greenacre NSW 2190</span>
            </span>
          </div>

        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between min-h-[100px] sm:min-h-[112px] py-2.5 gap-4">
          
          {/* Logo & Brand Identity - Resized Wider & More Visible */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 sm:gap-4 md:gap-5 cursor-pointer group select-none flex-shrink-0"
          >
            {/* Brand Logo Image from public/image - Wide, prominent, high visibility */}
            <div className="h-20 sm:h-24 md:h-28 w-auto min-w-[95px] sm:min-w-[125px] md:min-w-[150px] max-w-[190px] sm:max-w-[240px] rounded-2xl overflow-hidden bg-white shadow-md border-2 border-zinc-200 group-hover:border-rose-800 transition-all flex items-center justify-center p-1.5 flex-shrink-0">
              <img
                src="/image/logo.jpg"
                alt="Halal Meat Depot Logo"
                className="h-full w-auto max-h-24 md:max-h-28 object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-zinc-950 uppercase">
                  HALAL MEAT
                </span>
                <span className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-rose-800 uppercase bg-rose-50 px-2.5 py-0.5 rounded-lg border border-rose-200 shadow-sm">
                  DEPOT
                </span>
              </div>
              <span className="text-[11px] sm:text-xs font-bold text-zinc-600 tracking-wider uppercase hidden sm:flex items-center gap-1.5 mt-1">
                <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse"></span>
                Sydney Wholesale &amp; Retail • Greenacre NSW
              </span>
              <a
                href={STORE_CONFIG.abnUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-[10px] sm:text-[11px] font-semibold text-zinc-500 hover:text-rose-700 hidden sm:inline-flex items-center gap-1 mt-0.5 underline decoration-dotted"
                title="Verify ABN on Australian Business Register"
              >
                <span>ABN: {STORE_CONFIG.abn}</span>
                <ExternalLink className="w-2.5 h-2.5 opacity-60" />
              </a>
            </div>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search beef, lamb, goat, chicken, exotic meats..."
                value={searchQuery}
                onChange={(e) => {
                  onSearchChange(e.target.value);
                  if (currentTab !== 'shop') setCurrentTab('shop');
                }}
                className="w-full bg-zinc-50 border border-zinc-300 rounded-full py-2.5 pl-10 pr-4 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-rose-800 focus:border-transparent transition"
              />
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-3 text-xs text-zinc-400 hover:text-zinc-600 bg-zinc-200 rounded-full w-4 h-4 flex items-center justify-center"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Action CTAs: Quick Call & Cart */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowSearchInput(!showSearchInput)}
              className="lg:hidden p-2 text-zinc-700 hover:text-rose-800 rounded-lg hover:bg-zinc-100"
              aria-label="Toggle Search"
            >
              <Search className="w-5 h-5" />
            </button>

            <a
              href={`https://wa.me/${STORE_CONFIG.phoneRaw}?text=${encodeURIComponent('Assalamu Alaikum, I have an inquiry for Halal Meat Depot Greenacre.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 bg-rose-50 border border-rose-200 text-rose-900 text-xs font-bold px-3 py-2 rounded-lg hover:bg-rose-100 transition-colors shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse"></span>
              WhatsApp Order
            </a>

            {/* Cart Trigger Button */}
            <button
              onClick={() => handleNavClick('cart')}
              className="relative flex items-center gap-2.5 bg-rose-800 hover:bg-rose-900 text-white px-4 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all active:scale-95"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-zinc-100" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2.5 bg-zinc-950 text-rose-400 border border-rose-600 font-black text-[11px] w-5 h-5 rounded-full flex items-center justify-center shadow">
                    {itemCount}
                  </span>
                )}
              </div>
              <div className="hidden sm:flex flex-col text-left leading-tight">
                <span className="text-[10px] text-rose-200 uppercase tracking-wider font-semibold">
                  {subtotal >= minOrder ? 'Ready to Order' : `Min $${minOrder}`}
                </span>
                <span className="text-sm font-extrabold text-white">
                  ${subtotal.toFixed(2)} AUD
                </span>
              </div>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-zinc-800 hover:bg-zinc-100 rounded-lg"
              aria-label="Open Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Input (Expandable) */}
        {showSearchInput && (
          <div className="lg:hidden pb-3 pt-1">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search beef, lamb, goat, chicken, exotic meats..."
                value={searchQuery}
                onChange={(e) => {
                  onSearchChange(e.target.value);
                  if (currentTab !== 'shop') setCurrentTab('shop');
                }}
                className="w-full bg-zinc-100 border border-zinc-300 rounded-lg py-2.5 pl-10 pr-4 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-rose-800"
              />
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
            </div>
          </div>
        )}

        {/* Desktop Main Links */}
        <nav className="hidden lg:flex items-center space-x-1 border-t border-zinc-100 py-2.5 relative">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;

            if (item.id === 'shop') {
              return (
                <div
                  key={item.id}
                  className="relative"
                  onMouseEnter={handleMouseEnterShop}
                  onMouseLeave={handleMouseLeaveShop}
                >
                  <button
                    onClick={() => handleNavClick('shop')}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold tracking-wider rounded-lg transition-colors uppercase ${
                      isActive || shopDropdownOpen
                        ? 'bg-zinc-950 text-rose-400 shadow-sm'
                        : 'text-zinc-700 hover:text-rose-900 hover:bg-rose-50'
                    }`}
                    aria-expanded={shopDropdownOpen}
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        shopDropdownOpen ? 'rotate-180 text-rose-400' : 'text-zinc-500'
                      }`}
                    />
                  </button>
                </div>
              );
            }

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-2 text-xs font-bold tracking-wider rounded-lg transition-colors uppercase ${
                  isActive
                    ? 'bg-zinc-950 text-rose-400 shadow-sm'
                    : 'text-zinc-700 hover:text-rose-900 hover:bg-rose-50'
                }`}
              >
                {item.label}
              </button>
            );
          })}

          <div className="ml-auto flex items-center gap-3 text-xs text-zinc-500 font-medium">
            <span className="flex items-center gap-1 text-rose-900 font-semibold">
              <Flame className="w-3.5 h-3.5 text-rose-600" /> Chilled Delivery Mon-Sat
            </span>
          </div>
        </nav>

        {/* Mega Dropdown Menu for SHOP */}
        {shopDropdownOpen && (
          <div
            onMouseEnter={handleMouseEnterShop}
            onMouseLeave={handleMouseLeaveShop}
            className="hidden lg:block absolute left-4 right-4 sm:left-6 sm:right-6 lg:left-8 lg:right-8 top-[calc(100%-10px)] z-50 bg-white rounded-2xl shadow-2xl border border-zinc-200/90 overflow-hidden ring-1 ring-black/10 transition-all duration-200"
          >
            {/* Mega Dropdown Header Banner */}
            <div className="bg-gradient-to-r from-zinc-950 via-zinc-900 to-rose-950 text-white px-6 py-3.5 flex items-center justify-between border-b border-rose-900/40">
              <div className="flex items-center gap-3">
                <span className="p-1.5 rounded-lg bg-rose-600/30 text-rose-300 border border-rose-500/30">
                  <Layers className="w-4 h-4 text-rose-300" />
                </span>
                <div>
                  <h3 className="text-xs font-black tracking-wider uppercase text-zinc-100 flex items-center gap-2">
                    <span>Halal Meat Depot • Shop by Category &amp; Specialized Cuts</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-600/30 text-rose-300 border border-rose-400/30">
                      8 Meat Categories
                    </span>
                  </h3>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    100% Hand-slaughtered Zabiha Halal, custom cut by experienced Sydney butchers &amp; cryovac packed.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setSelectedCategory?.('all');
                    setSelectedSubcategory?.('all');
                    setCurrentTab('shop');
                    setShopDropdownOpen(false);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-700 hover:bg-rose-600 text-white text-xs font-bold transition shadow-sm"
                >
                  <span>View All Products</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* 8 Categories Grid */}
            <div className="p-6 bg-white grid grid-cols-4 gap-5 max-h-[66vh] overflow-y-auto">
              {meatCategories.map((cat) => (
                <div
                  key={cat.id}
                  className="group/col flex flex-col p-3.5 rounded-xl border border-zinc-100 hover:border-rose-300 hover:bg-rose-50/20 transition-all duration-150"
                >
                  {/* Category Header */}
                  <div className="flex items-start justify-between pb-2 mb-2 border-b border-zinc-100 group-hover/col:border-rose-100">
                    <button
                      onClick={() => handleDropdownCategoryClick(cat.id)}
                      className="text-left font-black text-sm text-zinc-950 group-hover/col:text-rose-800 transition-colors uppercase tracking-tight flex items-center gap-1"
                    >
                      <span>{cat.name}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-zinc-400 group-hover/col:text-rose-700 transition-transform group-hover/col:translate-x-0.5" />
                    </button>
                    <span className="text-[10px] font-bold text-zinc-400 bg-zinc-100 px-1.5 py-0.5 rounded group-hover/col:bg-rose-100 group-hover/col:text-rose-900 transition-colors">
                      {cat.subcategories?.length || 0} Cuts
                    </span>
                  </div>

                  {cat.tagline && (
                    <p className="text-[11px] font-medium text-rose-800/80 mb-2 leading-tight">
                      {cat.tagline}
                    </p>
                  )}

                  {/* Subcategories list */}
                  <ul className="space-y-1 flex-1">
                    {cat.subcategories?.map((sub) => (
                      <li key={sub}>
                        <button
                          onClick={() => handleDropdownSubcategoryClick(cat.id, sub)}
                          className="w-full text-left py-1 px-1.5 rounded text-[11.5px] text-zinc-600 hover:text-zinc-950 hover:bg-rose-100/60 transition-colors flex items-center justify-between group/sub"
                        >
                          <span className="truncate group-hover/sub:font-bold group-hover/sub:text-rose-950">
                            {sub}
                          </span>
                          <span className="text-zinc-300 group-hover/sub:text-rose-700 text-[10px] ml-1 transition-transform group-hover/sub:translate-x-0.5">
                            ›
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>

                  {/* Column Bottom Link */}
                  <button
                    onClick={() => handleDropdownCategoryClick(cat.id)}
                    className="mt-3 pt-2 text-[11px] font-bold text-rose-800 hover:text-rose-950 border-t border-zinc-100 flex items-center gap-1 text-left"
                  >
                    <span>Browse all {cat.name} cuts</span>
                    <span className="text-xs">→</span>
                  </button>
                </div>
              ))}
            </div>

            {/* Mega Dropdown Footer Strip */}
            <div className="bg-zinc-50 border-t border-zinc-200 px-6 py-3 flex items-center justify-between text-xs text-zinc-600">
              <div className="flex items-center gap-5 flex-wrap">
                <span className="flex items-center gap-1.5 font-semibold text-zinc-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>100% Hand Zabiha Halal Certified</span>
                </span>
                <span className="flex items-center gap-1.5 font-semibold text-zinc-800">
                  <Truck className="w-4 h-4 text-rose-700 flex-shrink-0" />
                  <span>Chilled Van Delivery Sydney Metro</span>
                </span>
                <span className="flex items-center gap-1.5 text-zinc-500 font-medium hidden xl:flex">
                  <span>Custom thickness &amp; cryovac packing available upon checkout notes</span>
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    handleNavClick('wholesale');
                  }}
                  className="text-xs font-bold text-rose-800 hover:text-rose-950 hover:underline"
                >
                  Wholesale Cartons ↗
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-zinc-200 px-4 pt-3 pb-6 shadow-xl animate-fadeIn max-h-[85vh] overflow-y-auto">
          {/* Mobile Logo Display */}
          <div className="flex items-center gap-3 mb-4 p-2 bg-zinc-50 rounded-2xl border border-zinc-200">
            <div className="h-16 w-auto min-w-[70px] max-w-[120px] rounded-xl overflow-hidden bg-white p-1 border border-zinc-200 flex items-center justify-center">
              <img
                src="/image/logo.jpg"
                alt="Halal Meat Depot Logo"
                className="h-full w-auto object-contain"
              />
            </div>
            <div>
              <p className="font-black text-sm text-zinc-950 uppercase">HALAL MEAT DEPOT</p>
              <p className="text-[11px] text-rose-800 font-bold">Sydney Wholesale &amp; Retail</p>
              <a
                href={STORE_CONFIG.abnUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] text-zinc-500 hover:text-rose-700 underline block"
              >
                ABN: {STORE_CONFIG.abn} ↗
              </a>
            </div>
          </div>

          {/* Shop Categories Accordion for Mobile */}
          <div className="mb-4 p-3 bg-zinc-50 rounded-xl border border-zinc-200">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[11px] font-black uppercase tracking-wider text-rose-900">
                Shop By Category &amp; Cuts
              </p>
              <button
                onClick={() => {
                  setSelectedCategory?.('all');
                  setSelectedSubcategory?.('all');
                  setCurrentTab('shop');
                  setMobileMenuOpen(false);
                }}
                className="text-[10px] font-bold text-rose-700 hover:underline"
              >
                View All →
              </button>
            </div>

            <div className="space-y-1.5">
              {meatCategories.map((cat) => {
                const isExpanded = mobileExpandedCat === cat.id;
                return (
                  <div key={cat.id} className="bg-white rounded-lg border border-zinc-200 overflow-hidden">
                    <div className="flex items-center justify-between p-2">
                      <button
                        onClick={() => handleDropdownCategoryClick(cat.id)}
                        className="font-bold text-xs text-zinc-900 uppercase flex-1 text-left hover:text-rose-800"
                      >
                        {cat.name}
                      </button>
                      <button
                        onClick={() => setMobileExpandedCat(isExpanded ? null : cat.id)}
                        className="p-1 text-zinc-400 hover:text-zinc-800"
                        aria-label={`Toggle subcategories for ${cat.name}`}
                      >
                        <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180 text-rose-700' : ''}`} />
                      </button>
                    </div>

                    {isExpanded && cat.subcategories && (
                      <div className="px-3 pb-2.5 pt-1 border-t border-zinc-100 bg-zinc-50/50 space-y-1">
                        {cat.subcategories.map((sub) => (
                          <button
                            key={sub}
                            onClick={() => handleDropdownSubcategoryClick(cat.id, sub)}
                            className="w-full text-left py-1 px-2 text-[11px] text-zinc-600 hover:text-rose-800 hover:bg-rose-50 rounded font-medium flex items-center justify-between"
                          >
                            <span>• {sub}</span>
                            <span className="text-zinc-300 text-[10px]">›</span>
                          </button>
                        ))}
                        <button
                          onClick={() => handleDropdownCategoryClick(cat.id)}
                          className="w-full text-left py-1 px-2 text-[11px] text-rose-800 font-bold hover:underline pt-1.5 border-t border-zinc-200/50"
                        >
                          View all {cat.name} products →
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left px-4 py-3 rounded-lg text-sm font-bold uppercase transition ${
                  currentTab === item.id
                    ? 'bg-zinc-950 text-rose-400'
                    : 'text-zinc-800 hover:bg-zinc-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-zinc-200 space-y-2 text-xs text-zinc-600">
            <p className="font-semibold text-zinc-900">Halal Meat Depot Greenacre</p>
            <p>{STORE_CONFIG.address}</p>
            <p>Phone: {STORE_CONFIG.phone}</p>
            <p className="text-rose-800 font-bold">100% Hand-Slaughtered Zabiha Certified</p>
          </div>
        </div>
      )}
    </header>
  );
};
