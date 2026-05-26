import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, User, Order, ChatMessage } from '../types';
import { PREMIUM_PRODUCTS } from '../data/products';

export type RouteType = 'home' | 'catalog' | 'cart' | 'wishlist' | 'checkout' | 'blog' | 'about' | 'tracker' | 'account';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}

interface ShopContextType {
  currentRoute: RouteType;
  navigateTo: (route: RouteType) => void;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  cart: CartItem[];
  addToCart: (product: Product, size: '30ml' | '50ml' | '100ml', qty?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQty: (cartItemId: string, qty: number) => void;
  clearCart: () => void;
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  currentUser: User | null;
  loginUser: (email: string, name: string, phone: string, address: string, city: string) => void;
  logoutUser: () => void;
  updateUserProfile: (name: string, phone: string, address: string, city: string) => void;
  orders: Order[];
  placeOrder: (shipping: { fullName: string; phone: string; address: string; city: string; optionalInstructions?: string }, method: Order['paymentMethod'], couponCode?: string) => Order | null;
  recentlyViewed: Product[];
  addToRecentlyViewed: (product: Product) => void;
  activeProductId: string | null;
  setActiveProductId: (id: string | null) => void;
  activeBlogId: string | null;
  setActiveBlogId: (id: string | null) => void;
  toasts: Toast[];
  addToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchFilter: string;
  setSearchFilter: (category: string) => void;
  addReviewToProduct: (productId: string, rating: number, comment: string, name: string) => void;
  chatMessages: ChatMessage[];
  sendChatMessage: (text: string) => void;
  isChatOpen: boolean;
  setIsChatOpen: (open: boolean) => void;
  couponDiscount: number;
  activeCouponCode: string;
  applyCoupon: (code: string) => boolean;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) throw new Error('useShop must be used within ShopProvider');
  return context;
};

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRoute, setCurrentRoute] = useState<RouteType>('home');
  const [products, setProducts] = useState<Product[]>(PREMIUM_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);
  const [activeProductId, setActiveProductId] = useState<string | null>(null);
  const [activeBlogId, setActiveBlogId] = useState<string | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFilter, setSearchFilter] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [activeCouponCode, setActiveCouponCode] = useState('');
  
  // Chat state
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    // Cart
    const savedCart = localStorage.getItem('ab_cart');
    if (savedCart) setCart(JSON.parse(savedCart));

    // Wishlist
    const savedWishlist = localStorage.getItem('ab_wishlist');
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

    // User
    const savedUser = localStorage.getItem('ab_user');
    if (savedUser) setCurrentUser(JSON.parse(savedUser));

    // Orders
    const savedOrders = localStorage.getItem('ab_orders');
    if (savedOrders) setOrders(JSON.parse(savedOrders));

    // Recently viewed
    const savedRecent = localStorage.getItem('ab_recently');
    if (savedRecent) {
      const ids: string[] = JSON.parse(savedRecent);
      const recentProducts = ids
        .map(id => PREMIUM_PRODUCTS.find(p => p.id === id))
        .filter((p): p is Product => !!p);
      setRecentlyViewed(recentProducts);
    }

    // Set initial welcome chat message
    setChatMessages([
      {
        id: 'welcome',
        sender: 'agent',
        text: 'Assalam-o-Alaikum! Welcome to Arzhaar Brhave Perfumes Karachi. How can I help you find your signature scent today?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, []);

  // Sync state helpers
  const saveCartToStorage = (updatedCart: CartItem[]) => {
    setCart(updatedCart);
    localStorage.setItem('ab_cart', JSON.stringify(updatedCart));
  };

  const saveWishlistToStorage = (updatedWishlist: Product[]) => {
    setWishlist(updatedWishlist);
    localStorage.setItem('ab_wishlist', JSON.stringify(updatedWishlist));
  };

  const addToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const navigateTo = (route: RouteType) => {
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSearchQuery(''); // Clear search on navigation
  };

  // Cart operations
  const addToCart = (product: Product, size: '30ml' | '50ml' | '100ml', qty = 1) => {
    const cartItemId = `${product.id}-${size}`;
    const multiplier = product.sizePriceMultipliers[size];
    const itemPrice = Math.round(product.price * multiplier);

    const existingIndex = cart.findIndex(item => item.id === cartItemId);
    const updatedCart = [...cart];

    if (existingIndex > -1) {
      updatedCart[existingIndex].quantity += qty;
      addToast(`Increased quantity of ${product.name} (${size}) in cart`, 'success');
    } else {
      updatedCart.push({
        id: cartItemId,
        product,
        selectedSize: size,
        quantity: qty,
        price: itemPrice
      });
      addToast(`Added ${product.name} (${size}) to shopping cart`, 'success');
    }

    saveCartToStorage(updatedCart);
  };

  const removeFromCart = (cartItemId: string) => {
    const item = cart.find(i => i.id === cartItemId);
    const updatedCart = cart.filter(i => i.id !== cartItemId);
    saveCartToStorage(updatedCart);
    if (item) {
      addToast(`Removed ${item.product.name} (${item.selectedSize}) from cart`, 'info');
    }
  };

  const updateCartQty = (cartItemId: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    const updatedCart = cart.map(item =>
      item.id === cartItemId ? { ...item, quantity: qty } : item
    );
    saveCartToStorage(updatedCart);
  };

  const clearCart = () => {
    saveCartToStorage([]);
    setCouponDiscount(0);
    setActiveCouponCode('');
  };

  // Coupon Engine
  const applyCoupon = (code: string): boolean => {
    const sanitized = code.toUpperCase().trim();
    if (sanitized === 'KARACHI10') {
      setCouponDiscount(10); // 10% Off
      setActiveCouponCode('KARACHI10');
      addToast('Promo Code "KARACHI10" Applied! Enjoy 10% Off.', 'success');
      return true;
    } else if (sanitized === 'BRHAVEGOLD') {
      setCouponDiscount(20); // 20% Off
      setActiveCouponCode('BRHAVEGOLD');
      addToast('Royal Promo "BRHAVEGOLD" Applied! Enjoy 20% Off.', 'success');
      return true;
    } else if (sanitized === 'FREESHIP') {
      // Handled as special free delivery in checkout
      setCouponDiscount(5); // 5% discount too!
      setActiveCouponCode('FREESHIP');
      addToast('Promo Code "FREESHIP" Applied! Enjoy 5% Off & Free Delivery.', 'success');
      return true;
    }
    addToast('Invalid Coupon Code. Try "KARACHI10" or "BRHAVEGOLD"!', 'warning');
    return false;
  };

  // Wishlist
  const toggleWishlist = (product: Product) => {
    const exists = wishlist.some(item => item.id === product.id);
    let updated;
    if (exists) {
      updated = wishlist.filter(item => item.id !== product.id);
      addToast(`Removed ${product.name} from Wishlist`, 'info');
    } else {
      updated = [...wishlist, product];
      addToast(`Added ${product.name} to Wishlist`, 'success');
    }
    saveWishlistToStorage(updated);
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some(item => item.id === productId);
  };

  // Auth
  const loginUser = (email: string, name: string, phone: string, address: string, city: string) => {
    const userObj: User = {
      id: 'usr_' + Date.now().toString(),
      email,
      name,
      phone,
      address,
      city,
      isLoggedIn: true
    };
    setCurrentUser(userObj);
    localStorage.setItem('ab_user', JSON.stringify(userObj));
    addToast(`Welcome back, ${name}! Logged in successfully.`, 'success');
  };

  const logoutUser = () => {
    const name = currentUser?.name || '';
    setCurrentUser(null);
    localStorage.removeItem('ab_user');
    addToast(`Goodbye ${name}! See you soon.`, 'info');
  };

  const updateUserProfile = (name: string, phone: string, address: string, city: string) => {
    if (!currentUser) return;
    const updated = { ...currentUser, name, phone, address, city };
    setCurrentUser(updated);
    localStorage.setItem('ab_user', JSON.stringify(updated));
    addToast('Profile records updated successfully.', 'success');
  };

  // Placement of Orders
  const placeOrder = (
    shipping: { fullName: string; phone: string; address: string; city: string; optionalInstructions?: string },
    method: Order['paymentMethod'],
    couponCode?: string
  ): Order | null => {
    if (cart.length === 0) return null;

    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    // Standard shipping fee Rs. 250, free if coupon is FREESHIP or total > Rs. 8000
    const promoFreeShip = couponCode?.toUpperCase().trim() === 'FREESHIP';
    const isFree = subtotal > 8000 || promoFreeShip;
    const deliveryCharges = isFree ? 0 : 250;
    const discountAmount = Math.round(subtotal * (couponDiscount / 100));
    const total = subtotal - discountAmount + deliveryCharges;

    const orderNum = 'AB-' + Math.floor(100000 + Math.random() * 900000).toString();
    const trackingNum = 'TRACK-' + Math.floor(5000000 + Math.random() * 4999999).toString();

    const newOrder: Order = {
      id: 'ord_' + Date.now().toString(),
      orderNumber: orderNum,
      items: [...cart],
      subtotal,
      deliveryCharges,
      discount: discountAmount,
      couponCode,
      total,
      shippingAddress: shipping,
      paymentMethod: method,
      status: 'Processing',
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      trackingNumber: trackingNum
    };

    const updatedOrders = [newOrder, ...orders];
    setOrders(updatedOrders);
    localStorage.setItem('ab_orders', JSON.stringify(updatedOrders));

    // Send order package payload automatically to full-stack backend
    fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...newOrder,
        customerEmail: currentUser?.email || ''
      })
    })
    .then(r => r.json())
    .then(data => {
      console.log('Order registered on server:', data);
    })
    .catch(err => {
      console.warn('Server order reporting skipped:', err);
    });

    // Clear cart upon standard completion
    clearCart();
    addToast(`Success! Your order ${orderNum} has been registered and dispatched.`, 'success');
    return newOrder;
  };

  // Recently viewed products
  const addToRecentlyViewed = (product: Product) => {
    const list = [product, ...recentlyViewed.filter(p => p.id !== product.id)].slice(0, 8);
    setRecentlyViewed(list);
    localStorage.setItem('ab_recently', JSON.stringify(list.map(p => p.id)));
  };

  // Add reviews to local product list
  const addReviewToProduct = (productId: string, rating: number, comment: string, name: string) => {
    const updatedProducts = products.map(prod => {
      if (prod.id === productId) {
        const newReview = {
          id: 'rev_' + Date.now().toString(),
          userName: name || 'Anonymous Fragrance Lover',
          rating,
          comment,
          date: new Date().toISOString().split('T')[0],
          helpfulCount: 0
        };
        const updatedReviews = [newReview, ...prod.reviews];
        const newRating = parseFloat(
          ((prod.rating * prod.reviewsCount + rating) / (prod.reviewsCount + 1)).toFixed(1)
        );

        return {
          ...prod,
          reviews: updatedReviews,
          reviewsCount: prod.reviewsCount + 1,
          rating: newRating
        };
      }
      return prod;
    });

    setProducts(updatedProducts);
    addToast('Thank you! Your product review has been published.', 'success');
  };

  // Chat agent response logic with backend Gemini integration and custom sandbox fallback
  const sendChatMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: 'usr_' + Date.now().toString(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);

    const typingId = 'agent_typing_' + Date.now().toString();
    const typingMsg: ChatMessage = {
      id: typingId,
      sender: 'agent',
      text: 'Fragrance expert is formulating an answer...',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setChatMessages(prev => [...prev, typingMsg]);

    // Track current history to pass to Gemini
    const currentHistory = [...chatMessages, userMsg];

    fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text, history: currentHistory })
    })
    .then(res => res.json())
    .then(data => {
      setChatMessages(prev => prev.map(m => m.id === typingId ? {
        ...m,
        id: 'agent_' + Date.now().toString(),
        text: data.reply || "Forgive me, my olfactory gears are realigning. Could you ask once more, premium patron?"
      } : m));
    })
    .catch(err => {
      console.warn("AI chat fetch failed, substituting sandbox lookup matches:", err);
      let replyText = "I see! If you have queries about Arzhaar Brhave fragrances, our Karachi-made perfume oil blends provide unparalleled longevity. Feel free to call us at +92 314 7155873.";
      const query = text.toLowerCase();

      if (query.includes('hello') || query.includes('hi') || query.includes('salam') || query.includes('assalam')) {
        replyText = `Walaikum Assalam! I hope you are having an amazing day. Are you looking for Men's, Women's, or Unisex perfumes today? I highly recommend trying "Oud Al Karachi"!`;
      } else if (query.includes('ship') || query.includes('delivery') || query.includes('karachi') || query.includes('charges')) {
        replyText = "We offer premium Cash on Delivery throughout Karachi and across Pakistan. Shipping is free for orders above Rs. 8,000, otherwise it’s a flat Rs. 250 standard charge.";
      } else if (query.includes('longevity') || query.includes('last') || query.includes('quality')) {
        replyText = `Our premium perfume extracts range from 8 to 12+ hours of performance. For ultimate longevity, our focused Pure Attars (100% oil extracts) easily exceed 12-24 hours!`;
      } else if (query.includes('oud') || query.includes('signature') || query.includes('recommend')) {
        replyText = `For a deep, royal experience, choose our flagship "Oud Al Karachi" (Rs. 8,500) or "Khamrah Divine" (Rs. 5,900) - which is an astonishing sweet gourmand masterpiece!`;
      } else if (query.includes('easy') || query.includes('jazz') || query.includes('payment') || query.includes('bank')) {
        replyText = "We accept Cash on Delivery (COD), Direct Bank Transfer, EasyPaisa, and JazzCash. You can make choice selections during the multi-step checkout.";
      } else if (query.includes('address') || query.includes('location') || query.includes('shop') || query.includes('store')) {
        replyText = "Our boutique perfumery is located in Orangi Town, Karachi, Pakistan. You can visit us in person or order online for direct home delivery. Call +92 314 7155873 for coordination!";
      } else if (query.includes('discount') || query.includes('coupon') || query.includes('code')) {
        replyText = 'You can use promo code "KARACHI10" for 10% off, or "BRHAVEGOLD" for 20% off your purchase! Type them in during step 1 of payment.';
      }

      setChatMessages(prev => prev.map(m => m.id === typingId ? {
        ...m,
        id: 'agent_' + Date.now().toString(),
        text: replyText
      } : m));
    });
  };

  return (
    <ShopContext.Provider
      value={{
        currentRoute,
        navigateTo,
        products,
        setProducts,
        cart,
        addToCart,
        removeFromCart,
        updateCartQty,
        clearCart,
        wishlist,
        toggleWishlist,
        isInWishlist,
        currentUser,
        loginUser,
        logoutUser,
        updateUserProfile,
        orders,
        placeOrder,
        recentlyViewed,
        addToRecentlyViewed,
        activeProductId,
        setActiveProductId,
        activeBlogId,
        setActiveBlogId,
        toasts,
        addToast,
        removeToast,
        searchQuery,
        setSearchQuery,
        searchFilter,
        setSearchFilter,
        addReviewToProduct,
        chatMessages,
        sendChatMessage,
        isChatOpen,
        setIsChatOpen,
        couponDiscount,
        activeCouponCode,
        applyCoupon
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
