export type ProductCategory = 
  | 'all' 
  | 'beef' 
  | 'lamb' 
  | 'goat' 
  | 'chicken' 
  | 'camel' 
  | 'duck' 
  | 'kangaroo' 
  | 'water-buffalo' 
  | 'poultry' 
  | 'exotic' 
  | 'wagyu' 
  | 'wholesale';

export type ProductBadge = 'Popular' | 'Best Value' | 'Premium' | 'Sale' | 'Wholesale Favorite';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  subcategory: string;
  price: number; // in AUD including GST
  unit: string; // e.g., "per kg", "per pack (1kg)", "per carton (15kg)", "per carcass (20kg avg)"
  unitPriceComparison?: string; // e.g., "$24.50/kg"
  shortDescription: string;
  fullDescription: string;
  badge?: ProductBadge;
  image: string;
  cutOptions?: string[]; // e.g., ["Whole Piece (Cryovac)", "Steaks 25mm", "Diced Curry Cut", "Boneless"]
  minQuantity?: number;
  origin: string; // e.g., "Riverina, NSW, Australia"
  halalCertDetails: string;
  inStock: boolean;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedCut?: string;
  customNotes?: string;
}

export interface OrderCustomerInfo {
  fullName: string;
  email: string;
  phone: string;
  deliveryType: 'delivery' | 'pickup';
  address: string;
  suburb: string;
  postcode: string;
  state: string;
  deliveryNotes?: string;
  preferredDate?: string;
  deliveryWindow?: 'morning' | 'afternoon' | 'anytime';
  butcheryInstructions?: string;
  paymentMethod: 'bank_transfer' | 'card' | 'crypto' | 'pickup_cash';
  discountCode?: string;
}

export interface Order {
  id: string; // e.g. HMD-2026-8491
  createdAt: string;
  customer: OrderCustomerInfo;
  items: CartItem[];
  subtotal: number;
  discountAmount: number;
  cryptoDiscountAmount: number;
  shippingFee: number;
  total: number;
  taxIncluded: number; // GST included (10%)
  status: 'Pending' | 'Confirmed' | 'Packed' | 'Dispatched' | 'Delivered' | 'Cancelled';
  paymentStatus: 'Pending' | 'Paid' | 'Cash on Pickup';
}

export interface FilterState {
  category: string;
  subcategory: string;
  searchQuery: string;
  sortBy: 'featured' | 'price-low' | 'price-high' | 'name';
  badgeFilter: string;
}
