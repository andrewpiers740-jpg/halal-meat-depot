import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, OrderCustomerInfo } from '../types';
import { STORE_CONFIG } from '../data/products';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedCut?: string, customNotes?: string) => void;
  updateQuantity: (productId: string, quantity: number, selectedCut?: string) => void;
  removeFromCart: (productId: string, selectedCut?: string) => void;
  clearCart: () => void;
  subtotal: number;
  itemCount: number;
  minOrder: number;
  freeShippingThreshold: number;
  isMinOrderMet: boolean;
  minOrderShortfall: number;
  freeShippingShortfall: number;
  shippingFee: number;
  discountCode: string;
  appliedDiscount: { code: string; percentage?: number; fixed?: number } | null;
  applyDiscountCode: (code: string) => { success: boolean; message: string };
  removeDiscountCode: () => void;
  discountAmount: number;
  selectedPaymentMethod: 'bank_transfer' | 'card' | 'crypto' | 'pickup_cash';
  setSelectedPaymentMethod: (method: 'bank_transfer' | 'card' | 'crypto' | 'pickup_cash') => void;
  deliveryType: 'delivery' | 'pickup';
  setDeliveryType: (type: 'delivery' | 'pickup') => void;
  cryptoDiscountAmount: number;
  grandTotal: number;
  taxIncluded: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  orders: Order[];
  createOrder: (customer: OrderCustomerInfo) => Order;
  updateOrderStatus: (orderId: string, status: Order['status'], paymentStatus?: Order['paymentStatus']) => void;
  selectedProductForModal: Product | null;
  setSelectedProductForModal: (product: Product | null) => void;
  activeOrderSuccess: Order | null;
  setActiveOrderSuccess: (order: Order | null) => void;
  // Full Page Navigation & State
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedSubcategory: string;
  setSelectedSubcategory: (sub: string) => void;
  openProductPage: (product: Product) => void;
  openCartPage: () => void;
  openCheckoutPage: () => void;
  buyNow: (product: Product, quantity?: number, selectedCut?: string, customNotes?: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'hmd_cart_v1';
const ORDERS_STORAGE_KEY = 'hmd_orders_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
      // Default sample historical orders for depot admin portal demonstration
      const sampleOrders: Order[] = [
        {
          id: 'HMD-2026-9281',
          createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
          customer: {
            fullName: 'Tariq Al-Mansoor',
            email: 'tariq.mansoor@sydneygrill.com.au',
            phone: '0412 889 332',
            deliveryType: 'delivery',
            address: '88 Chapel Road',
            suburb: 'Bankstown',
            postcode: '2200',
            state: 'NSW',
            deliveryNotes: 'Rear loading dock at restaurant. Ring buzzer on arrival.',
            preferredDate: 'Tomorrow Morning',
            deliveryWindow: 'morning',
            butcheryInstructions: 'Vacuum pack beef ribeye into 4 individual bags. Leave tomahawks whole.',
            paymentMethod: 'bank_transfer',
          },
          items: [
            {
              product: {
                id: 'hmd-beef-ribeye',
                name: 'Australian Black Angus Halal Ribeye / Scotch Fillet Primal',
                category: 'beef',
                subcategory: 'Primal Cuts',
                price: 195.00,
                unit: 'approx. 4.5kg whole primal piece',
                shortDescription: '100% Grass-Fed Riverina Black Angus Ribeye primal',
                fullDescription: '',
                image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80',
                origin: 'Riverina, NSW',
                halalCertDetails: 'Halal Control Australia Certified',
                inStock: true,
              },
              quantity: 2,
              selectedCut: 'Cut into 25mm Steaks (Individually bagged)',
            },
            {
              product: {
                id: 'hmd-lamb-cutlets',
                name: 'Victorian Prime Halal Lamb Cutlets (French Trimmed)',
                category: 'lamb',
                subcategory: 'Cutlets & Chops',
                price: 110.00,
                unit: '2.0kg pack',
                shortDescription: 'Milk-fed Victorian lamb cutlets',
                fullDescription: '',
                image: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=1000&q=80',
                origin: 'Gippsland, VIC',
                halalCertDetails: 'Halal Control Australia Certified',
                inStock: true,
              },
              quantity: 2,
              selectedCut: 'Standard French Trim (Bone clean)',
            }
          ],
          subtotal: 610.00,
          discountAmount: 0,
          cryptoDiscountAmount: 0,
          shippingFee: 0,
          total: 610.00,
          taxIncluded: 55.45,
          status: 'Confirmed',
          paymentStatus: 'Paid',
        }
      ];
      return sampleOrders;
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [activeOrderSuccess, setActiveOrderSuccess] = useState<Order | null>(null);

  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'bank_transfer' | 'card' | 'crypto' | 'pickup_cash'>('bank_transfer');
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<{ code: string; percentage?: number; fixed?: number } | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  const openProductPage = (product: Product) => {
    setSelectedProduct(product);
    setSelectedProductForModal(product);
    setCurrentTab('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openCartPage = () => {
    setCurrentTab('cart');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openCheckoutPage = () => {
    setCurrentTab('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (product: Product, quantity = 1, selectedCut?: string, customNotes?: string) => {
    const cutToUse = selectedCut || (product.cutOptions && product.cutOptions[0]) || 'Standard Butcher Trim';
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedCut === cutToUse
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        if (customNotes) updated[existingIndex].customNotes = customNotes;
        return updated;
      } else {
        return [...prev, { product, quantity, selectedCut: cutToUse, customNotes }];
      }
    });
  };

  const buyNow = (product: Product, quantity = 1, selectedCut?: string, customNotes?: string) => {
    addToCart(product, quantity, selectedCut, customNotes);
    setCurrentTab('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updateQuantity = (productId: string, quantity: number, selectedCut?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedCut);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId && (!selectedCut || item.selectedCut === selectedCut)) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const removeFromCart = (productId: string, selectedCut?: string) => {
    setCart((prev) =>
      prev.filter((item) => !(item.product.id === productId && (!selectedCut || item.selectedCut === selectedCut)))
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedDiscount(null);
    setDiscountCode('');
  };

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const minOrder = STORE_CONFIG.minOrder; // 250 AUD
  const freeShippingThreshold = STORE_CONFIG.freeShippingThreshold; // 500 AUD
  const isMinOrderMet = subtotal >= minOrder;
  const minOrderShortfall = Math.max(0, minOrder - subtotal);
  const freeShippingShortfall = Math.max(0, freeShippingThreshold - subtotal);

  // Shipping logic:
  // Pickup is $0
  // Delivery is $0 if subtotal >= 500, else $25 flat
  const shippingFee = deliveryType === 'pickup' ? 0 : subtotal >= freeShippingThreshold ? 0 : STORE_CONFIG.flatShippingFee;

  // Coupon Discount
  let discountAmount = 0;
  if (appliedDiscount) {
    if (appliedDiscount.percentage) {
      discountAmount = (subtotal * appliedDiscount.percentage) / 100;
    } else if (appliedDiscount.fixed) {
      discountAmount = Math.min(subtotal, appliedDiscount.fixed);
    }
  }

  // 10% Crypto discount if paying via crypto (from spec section C & P)
  const eligibleAmountAfterDiscount = Math.max(0, subtotal - discountAmount);
  const cryptoDiscountAmount =
    selectedPaymentMethod === 'crypto'
      ? (eligibleAmountAfterDiscount * STORE_CONFIG.cryptoDiscountPercentage) / 100
      : 0;

  const grandTotal = Math.max(0, eligibleAmountAfterDiscount - cryptoDiscountAmount + shippingFee);
  // Australian GST is 1/11th of total price (since prices include tax)
  const taxIncluded = grandTotal / 11;

  const applyDiscountCode = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'HALAL10') {
      setAppliedDiscount({ code: cleanCode, percentage: 10 });
      setDiscountCode(cleanCode);
      return { success: true, message: 'Success! 10% discount applied to your order.' };
    }
    if (cleanCode === 'DEPOT50') {
      if (subtotal < 400) {
        return { success: false, message: 'DEPOT50 requires a minimum order of $400 AUD.' };
      }
      setAppliedDiscount({ code: cleanCode, fixed: 50 });
      setDiscountCode(cleanCode);
      return { success: true, message: 'Success! $50 AUD bulk discount applied.' };
    }
    if (cleanCode === 'WELCOME5') {
      setAppliedDiscount({ code: cleanCode, percentage: 5 });
      setDiscountCode(cleanCode);
      return { success: true, message: 'Welcome voucher applied (5% off)!' };
    }
    return { success: false, message: 'Invalid discount coupon code. Please try HALAL10' };
  };

  const removeDiscountCode = () => {
    setAppliedDiscount(null);
    setDiscountCode('');
  };

  const createOrder = (customer: OrderCustomerInfo): Order => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newOrder: Order = {
      id: `HMD-2026-${randomSuffix}`,
      createdAt: new Date().toISOString(),
      customer,
      items: [...cart],
      subtotal,
      discountAmount,
      cryptoDiscountAmount,
      shippingFee,
      total: grandTotal,
      taxIncluded,
      status: 'Pending',
      paymentStatus: customer.paymentMethod === 'pickup_cash' ? 'Cash on Pickup' : 'Pending',
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setIsCheckoutOpen(false);
    setActiveOrderSuccess(newOrder);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['status'], paymentStatus?: Order['paymentStatus']) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          return {
            ...ord,
            status,
            paymentStatus: paymentStatus || ord.paymentStatus,
          };
        }
        return ord;
      })
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        subtotal,
        itemCount,
        minOrder,
        freeShippingThreshold,
        isMinOrderMet,
        minOrderShortfall,
        freeShippingShortfall,
        shippingFee,
        discountCode,
        appliedDiscount,
        applyDiscountCode,
        removeDiscountCode,
        discountAmount,
        selectedPaymentMethod,
        setSelectedPaymentMethod,
        deliveryType,
        setDeliveryType,
        cryptoDiscountAmount,
        grandTotal,
        taxIncluded,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        orders,
        createOrder,
        updateOrderStatus,
        selectedProductForModal,
        setSelectedProductForModal,
        activeOrderSuccess,
        setActiveOrderSuccess,
        currentTab,
        setCurrentTab,
        selectedProduct,
        setSelectedProduct,
        selectedCategory,
        setSelectedCategory,
        selectedSubcategory,
        setSelectedSubcategory,
        openProductPage,
        openCartPage,
        openCheckoutPage,
        buyNow,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
