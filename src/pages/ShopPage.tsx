import React, { useState, useMemo } from 'react';
import { PRODUCTS, CATEGORIES, STORE_CONFIG } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { ProductCategory, ProductBadge } from '../types';
import { Search, Filter, SlidersHorizontal, ShieldCheck, X, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface ShopPageProps {
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedSubcategory?: string;
  setSelectedSubcategory?: (sub: string) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  selectedSubcategory: externalSelectedSubcategory,
  setSelectedSubcategory: externalSetSelectedSubcategory,
}) => {
  const { subtotal, minOrder, isMinOrderMet } = useCart();
  const [internalSelectedSubcategory, setInternalSelectedSubcategory] = useState<string>('all');
  const selectedSubcategory = externalSelectedSubcategory !== undefined ? externalSelectedSubcategory : internalSelectedSubcategory;
  const setSelectedSubcategory = externalSetSelectedSubcategory || setInternalSelectedSubcategory;

  const [selectedBadge, setSelectedBadge] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'name'>('featured');

  const currentCategoryData = CATEGORIES.find((c) => c.id === selectedCategory);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'beef') {
          if (product.category !== 'beef' && product.category !== 'wagyu') {
            return false;
          }
        } else if (selectedCategory === 'chicken') {
          if (product.category !== 'chicken' && product.category !== 'poultry') {
            return false;
          }
        } else if (product.category !== selectedCategory) {
          return false;
        }
      }

      // Subcategory filter
      if (selectedSubcategory !== 'all') {
        const normSub = selectedSubcategory.toLowerCase().trim();
        const prodSub = product.subcategory.toLowerCase().trim();
        if (prodSub !== normSub && !prodSub.includes(normSub) && !normSub.includes(prodSub)) {
          return false;
        }
      }

      // Badge filter
      if (selectedBadge !== 'all' && product.badge !== selectedBadge) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = product.name.toLowerCase().includes(query);
        const matchDesc = product.shortDescription.toLowerCase().includes(query);
        const matchCat = product.category.toLowerCase().includes(query);
        const matchOrigin = product.origin.toLowerCase().includes(query);
        const matchSub = product.subcategory.toLowerCase().includes(query);
        if (!matchName && !matchDesc && !matchCat && !matchOrigin && !matchSub) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [selectedCategory, selectedSubcategory, selectedBadge, searchQuery, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedSubcategory('all');
    setSelectedBadge('all');
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner and Category Header */}
      <div className="bg-zinc-950 text-white rounded-3xl p-6 sm:p-8 border border-rose-950 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest mb-1">
              <ShieldCheck className="w-4 h-4" /> Sydney Halal Meat Depot Catalog
            </div>
            <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
              {currentCategoryData ? currentCategoryData.name : 'All Halal Meats'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              100% pasture-fed Australian beef, Victorian lamb, Boer goat, fresh chicken, wild camel, Pekin duck, kangaroo &amp; water buffalo. All prices in AUD including GST.
            </p>
          </div>

          <div className="bg-rose-950/80 p-4 rounded-2xl border border-rose-800 text-xs text-right max-w-xs">
            <div className="text-amber-300 font-bold uppercase text-[11px]">Depot Order Rules</div>
            <div className="text-white mt-1">
              • Min Order: <strong>${STORE_CONFIG.minOrder} AUD</strong>
            </div>
            <div className="text-rose-200">
              • Free Delivery: <strong>Orders ${STORE_CONFIG.freeShippingThreshold}+ AUD</strong>
            </div>
            <div className="text-amber-400 font-semibold">
              • 10% Crypto Discount available
            </div>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setSelectedSubcategory('all');
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all uppercase ${
                isActive
                  ? 'bg-rose-800 text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Subcategory Pills (if present) */}
      {currentCategoryData && currentCategoryData.subcategories && currentCategoryData.subcategories.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="font-bold text-slate-500 uppercase text-[11px] mr-1">Subcategory:</span>
          <button
            onClick={() => setSelectedSubcategory('all')}
            className={`px-3 py-1 rounded-lg font-semibold transition ${
              selectedSubcategory === 'all'
                ? 'bg-rose-100 text-rose-950 border border-rose-300'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Subcategories
          </button>
          {currentCategoryData.subcategories.map((sub) => (
            <button
              key={sub}
              onClick={() => setSelectedSubcategory(sub)}
              className={`px-3 py-1 rounded-lg font-semibold whitespace-nowrap transition ${
                selectedSubcategory === sub
                  ? 'bg-rose-100 text-rose-950 border border-rose-300'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      )}

      {/* Filter & Sort Controls Row */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Search inside shop */}
        <div className="relative flex-1 max-w-sm">
          <input
            type="text"
            placeholder="Search within cuts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs py-2 pl-9 pr-8 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-rose-700"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-2.5 text-xs text-slate-400 hover:text-slate-600"
            >
              ✕
            </button>
          )}
        </div>

        {/* Badge & Sort dropdowns */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          {/* Badge Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-semibold">Badge:</span>
            <select
              value={selectedBadge}
              onChange={(e) => setSelectedBadge(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded-xl py-1.5 px-2 text-xs font-medium text-slate-700 focus:outline-none"
            >
              <option value="all">All Badges</option>
              <option value="Popular">Popular</option>
              <option value="Premium">Premium</option>
              <option value="Best Value">Best Value</option>
              <option value="Wholesale Favorite">Wholesale Favorite</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-semibold">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-50 border border-slate-300 rounded-xl py-1.5 px-2 text-xs font-medium text-slate-700 focus:outline-none"
            >
              <option value="featured">Featured First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Cut Name (A-Z)</option>
            </select>
          </div>

          {(selectedCategory !== 'all' || selectedSubcategory !== 'all' || selectedBadge !== 'all' || searchQuery) && (
            <button
              onClick={resetFilters}
              className="flex items-center gap-1 text-rose-600 hover:text-rose-800 font-bold text-xs ml-2"
            >
              <X className="w-3.5 h-3.5" /> Reset
            </button>
          )}
        </div>

      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center bg-white rounded-3xl border border-slate-200">
          <p className="text-base font-bold text-slate-800">No meat cuts match your current filters.</p>
          <p className="text-xs text-slate-500 mt-1">Try broadening your search term or clearing the selected subcategory.</p>
          <button
            onClick={resetFilters}
            className="mt-4 bg-rose-800 text-white text-xs font-bold px-4 py-2 rounded-xl"
          >
            Show All Depot Meats
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

    </div>
  );
};
