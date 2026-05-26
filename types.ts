export interface ScentNotes {
  top: string[];
  middle: string[];
  base: string[];
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  helpfulCount: number;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  reviews: Review[];
  gender: 'Men' | 'Women' | 'Unisex';
  category: 'Men' | 'Women' | 'Unisex' | 'Attar' | 'Luxury' | 'Best Sellers' | 'New Arrivals';
  scentType: string;
  longevity: '6-8 Hours' | '8-12 Hours' | '12+ Hours' | 'Long Lasting';
  sillage: 'Intimate' | 'Moderate' | 'Strong' | 'Heavy';
  shortDescription: string;
  description: string;
  ingredients: string;
  sizePriceMultipliers: {
    '30ml': number; // e.g. 0.7
    '50ml': number; // e.g. 1.0 (base price)
    '100ml': number; // e.g. 1.6
  };
  image: string;
  images: string[]; // multi-angle gallery
  discount: number; // percentage
  statusTags: string[]; // e.g. ['Best Seller', 'New Arrival']
}

export interface CartItem {
  id: string; // combination of productId + size
  product: Product;
  selectedSize: '30ml' | '50ml' | '100ml';
  quantity: number;
  price: number; // calculated price based on base price * multiplier
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  isLoggedIn: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: CartItem[];
  subtotal: number;
  deliveryCharges: number;
  discount: number;
  couponCode?: string;
  total: number;
  shippingAddress: {
    fullName: string;
    phone: string;
    address: string;
    city: string;
    optionalInstructions?: string;
  };
  paymentMethod: 'Cash on Delivery' | 'Bank Transfer' | 'EasyPaisa' | 'JazzCash';
  status: 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  date: string;
  trackingNumber: string;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  timestamp: string;
}
