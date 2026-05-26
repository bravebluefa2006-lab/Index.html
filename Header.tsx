import React, { useState, useEffect } from 'react';
import { useShop, RouteType } from '../context/ShopContext';
import { Search, Heart, ShoppingBag, User, Menu, X, ChevronDown, Sparkle, MapPin } from 'lucide-react';
import { AuthModal } from './AuthModal';

export const Header: React.FC = () => {
  const {
    currentRoute,
    navigateTo,
    cart,
    wishlist,
    currentUser,
    logoutUser,
    products,
    setActiveProductId,
    addToRecentlyViewed
  } = useShop();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const [suggestions, setSuggestions] = useState<typeof products>([]);
  const [isScrolled, setIsScrolled] = useState(false);

  // Monitor screen scrolling to change navbar styles
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    const handleOpenAuth = () => {
      setIsAuthModalOpen(true);
    };
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('openAuthModal', handleOpenAuth);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('openAuthModal', handleOpenAuth);
    };
  }, []);

  // Update suggestions list as searchVal changes
  useEffect(() => {
    if (!searchVal.trim()) {
      setSuggestions([]);
      return;
    }
    const matches = products.filter(
      p =>
        p.name.toLowerCase().includes(searchVal.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchVal.toLowerCase()) ||
        p.scentType.toLowerCase().includes(searchVal.toLowerCase())
    ).slice(0, 5);
    setSuggestions(matches);
  }, [searchVal, products]);

  const totalCartQty = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleSuggestionClick = (prod: typeof products[0]) => {
    setSearchVal('');
    setSuggestions([]);
    addToRecentlyViewed(prod);
    setActiveProductId(prod.id);
  };

  const handleCategoryNav = (catName: string) => {
    setIsCategoryDropdownOpen(false);
    setIsMobileMenuOpen(false);
    // Setting global query search matching the category name or filter trigger standardly
    navigateTo('catalog');
    // Pre-inject a search or category select by firing a window event or simple custom state integration. Let's redirect beautifully.
    setTimeout(() => {
      const e = new CustomEvent('catSelect', { detail: catName });
      window.dispatchEvent(e);
    }, 100);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchVal.trim()) return;
    
    // Pass search term to Catalog
    navigateTo('catalog');
    setTimeout(() => {
      const ev = new CustomEvent('termSearch', { detail: searchVal });
      window.dispatchEvent(ev);
    }, 100);
    setSearchVal('');
    setSuggestions([]);
  };

  return (
    <>
      {/* Top micro bar for branding/announcement info */}
      <div className="bg-maroon-gradient text-gold text-[10px] md:text-[11px] font-mono py-2 px-4 flex items-center justify-between border-b border-[#D4AF37]/20 z-40 relative">
        <div className="flex items-center gap-1">
          <Sparkle className="w-3 h-3 animate-spin" />
          <span>KARACHI LAUNCH SPECIAL: Use Code <strong className="text-white select-all">BRHAVEGOLD</strong> for 20% Off!</span>
        </div>
        <div className="hidden sm:flex items-center gap-3 text-neutral-400">
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-gold" />
            <span className="text-sleek-rose">Store: Orangi Town, Karachi</span>
          </div>
          <span className="text-[#D4AF37]/40">•</span>
          <a href="tel:+923147155873" className="hover:text-gold transition-colors font-bold">+92 314 7155873</a>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 w-full font-serif border-b ${
          isScrolled
            ? 'bg-[#0a0a0a]/95 border-[#D4AF37]/35 shadow-2xl backdrop-blur-md py-3'
            : 'bg-[#0a0a0a] border-[#D4AF37]/20 py-4.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          
          {/* Logo Frame */}
          <div
            onClick={() => navigateTo('home')}
            className="flex-shrink-0 flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-9 h-9 bg-burgundy border border-gold/55 rounded-lg flex items-center justify-center group-hover:border-gold transition-colors">
              <span className="font-serif font-black text-[#D4AF37] text-base">AB</span>
            </div>
            <div className="hidden md:block select-none leading-none pl-1.5">
              <h1 className="text-xl font-bold tracking-widest text-[#D4AF37] uppercase font-serif group-hover:text-white transition-colors">
                Arzhaar Brhave
              </h1>
              <span className="text-[8px] uppercase tracking-[0.25em] text-[#B76E79]">
                Premium Fragrances • Karachi
              </span>
            </div>
          </div>

          {/* Search Bar - Amazon style with autocomplete suggestions */}
          <div className="flex-1 max-w-md relative hidden md:block">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                value={searchVal}
                onChange={e => setSearchVal(e.target.value)}
                placeholder="Search signature scent, brands, notes (e.g. Oud, Musk)..."
                className="w-full bg-[#151515] border border-gold/40 focus:border-gold rounded-full pl-5 pr-12 py-2 text-xs text-neutral-200 placeholder-sleek-rose/50 focus:outline-none transition-all"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1 text-[#D4AF37] hover:text-white bg-burgundy px-3.5 py-1.5 rounded-full border border-gold/30 transition-colors"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Suggestions Box overlay */}
            {suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-charcoal border border-neutral-800 rounded-xl shadow-3xl overflow-hidden z-50 text-xs">
                <div className="bg-zinc-950 px-3 py-1.5 text-[10px] text-zinc-500 font-mono uppercase tracking-wider border-b border-neutral-900">
                  Recommended Fragrance Matches
                </div>
                {suggestions.map(p => (
                  <div
                    key={p.id}
                    onClick={() => handleSuggestionClick(p)}
                    className="flex items-center gap-3 p-3 hover:bg-neutral-900 cursor-pointer transition-colors border-b border-neutral-900/60"
                  >
                    <img src={p.image} alt={p.name} referrerPolicy="no-referrer" className="w-8 h-10 object-cover rounded" />
                    <div className="flex-1 min-w-0">
                      <p className="font-serif font-bold text-neutral-200 truncate">{p.name}</p>
                      <p className="text-[10px] font-mono text-gold-dark">{p.brand} • {p.scentType}</p>
                    </div>
                    <span className="text-gold font-semibold font-serif">Rs. {p.price.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Links links navigation: desktop */}
          <nav className="hidden lg:flex items-center gap-6 text-xs uppercase tracking-wider font-sans font-semibold text-neutral-300">
            <button
              onClick={() => navigateTo('home')}
              className={`hover:text-gold transition-colors cursor-pointer ${currentRoute === 'home' ? 'text-gold' : ''}`}
            >
              Home
            </button>

            {/* Category Dropdown Toggle Menu */}
            <div className="relative">
              <button
                onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                className="hover:text-gold transition-colors flex items-center gap-1 cursor-pointer focus:outline-none"
              >
                <span>Collections</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {isCategoryDropdownOpen && (
                <div className="absolute top-full left-0 mt-3.5 w-48 bg-charcoal border border-neutral-800 rounded-xl shadow-2xl py-2 z-50 animate-fade-in text-neutral-300">
                  {[
                    { label: 'Men Scents', value: 'Men' },
                    { label: 'Women Scents', value: 'Women' },
                    { label: 'Unisex Blends', value: 'Unisex' },
                    { label: 'Alcohol-free Attar', value: 'Attar' },
                    { label: 'Exclusive Luxury', value: 'Luxury' },
                    { label: 'Trending Sellers', value: 'Best Sellers' },
                    { label: 'New Scent Arrivals', value: 'New Arrivals' }
                  ].map((cat, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleCategoryNav(cat.value)}
                      className="w-full text-left font-sans text-xs px-4 py-2 hover:bg-neutral-900 hover:text-gold transition-colors focus:outline-none"
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => navigateTo('catalog')}
              className={`hover:text-gold transition-colors cursor-pointer ${currentRoute === 'catalog' ? 'text-gold' : ''}`}
            >
              Store catalog
            </button>
            <button
              onClick={() => navigateTo('blog')}
              className={`hover:text-gold transition-colors cursor-pointer ${currentRoute === 'blog' ? 'text-gold' : ''}`}
            >
              Guides &amp; Blog
            </button>
            <button
              onClick={() => navigateTo('tracker')}
              className={`hover:text-gold transition-colors cursor-pointer ${currentRoute === 'tracker' ? 'text-gold' : ''}`}
            >
              Track Order
            </button>
            <button
              onClick={() => navigateTo('about')}
              className={`hover:text-gold transition-colors cursor-pointer ${currentRoute === 'about' ? 'text-gold' : ''}`}
            >
              About Us
            </button>
          </nav>

          {/* User profiles, Wishlist, Cart micro icons */}
          <div className="flex items-center gap-4">
            
            {/* User Login indicator */}
            {currentUser && currentUser.isLoggedIn ? (
              <div className="relative group">
                <button
                  onClick={() => navigateTo('account')}
                  className="flex items-center gap-2 cursor-pointer focus:outline-none"
                >
                  <div className="hidden sm:flex flex-col items-end text-right leading-none select-none">
                    <span className="text-[9px] text-[#B76E79] font-medium uppercase tracking-[0.1em]">Welcome back,</span>
                    <span className="text-xs font-bold text-white mt-0.5">{currentUser.name.split(' ')[0]}</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-burgundy border border-gold/50 flex items-center justify-center font-bold font-serif text-[#D4AF37] text-xs">
                    {currentUser.name.charAt(0)}
                  </div>
                </button>
                
                {/* Dropdown menu hover panel */}
                <div className="absolute right-0 top-full mt-2 w-44 bg-charcoal border border-[#D4AF37]/30 rounded-xl shadow-2xl py-1.5 z-50 text-xs text-neutral-300 hidden group-hover:block animate-fade-in animate-duration-200">
                  <button
                    onClick={() => navigateTo('account')}
                    className="w-full text-left px-4 py-2 hover:bg-neutral-900 hover:text-gold transition-colors"
                  >
                    User Dashboard
                  </button>
                  <button
                    onClick={() => navigateTo('tracker')}
                    className="w-full text-left px-4 py-2 hover:bg-neutral-900 hover:text-gold transition-colors"
                  >
                    Order History
                  </button>
                  <div className="border-t border-[#D4AF37]/10 my-1"></div>
                  <button
                    onClick={logoutUser}
                    className="w-full text-left px-4 py-2 text-rose-450 hover:bg-burgundy/40 hover:text-rose-400 transition-colors"
                  >
                    Log Out
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="text-[#D4AF37] hover:text-white transition-colors flex items-center justify-center gap-1.5 bg-[#0e0a0a] border border-gold/30 hover:border-gold px-3.5 py-2 rounded-xl text-xs font-semibold font-sans cursor-pointer focus:outline-none"
              >
                <User className="w-4 h-4 text-[#D4AF37]" />
                <span className="hidden sm:inline">VIP Lounge</span>
              </button>
            )}

            {/* Wishlist icon with badge counter */}
            <button
              onClick={() => navigateTo('wishlist')}
              className="relative text-neutral-300 hover:text-rose-500 transition-colors p-2.5 rounded-xl bg-[#151515] border border-gold/15 hover:border-[#D4AF37]/50 cursor-pointer"
              title="View Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-burgundy text-[#D4AF37] font-sans font-bold text-[9px] w-5 h-5 rounded-full flex items-center justify-center p-0.5 border border-dark animate-pulse">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Cart Bag icon with badge count */}
            <button
              onClick={() => navigateTo('cart')}
              className="relative text-neutral-300 hover:text-gold transition-colors p-2.5 rounded-xl bg-[#151515] border border-gold/15 hover:border-[#D4AF37]/50 cursor-pointer"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {totalCartQty > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-burgundy text-[#D4AF37] font-sans font-extrabold text-[9px] w-5 h-5 rounded-full flex items-center justify-center p-0.5 border border-dark">
                  {totalCartQty}
                </span>
              )}
            </button>

            {/* Native Mobile Menu toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 bg-neutral-900 border border-neutral-850 text-neutral-300 hover:text-gold rounded-xl flex items-center lg:hidden focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>

          </div>

        </div>

        {/* Collapsible Mobile Navigation drawer panels */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 bg-charcoal border-t border-neutral-900 p-4 space-y-4 animate-fade-in text-sm font-sans font-semibold text-neutral-300 uppercase tracking-widest text-center">
            
            {/* Mobile Search block */}
            <form onSubmit={handleSearchSubmit} className="relative w-full mb-4">
              <input
                type="text"
                value={searchVal}
                onChange={e => setSearchVal(e.target.value)}
                placeholder="Search premium perfumes / notes..."
                className="w-full bg-neutral-900 border border-neutral-800 focus:border-gold/50 rounded-xl pl-4 pr-10 py-2 text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 text-neutral-400 hover:text-gold p-2"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </form>

            <button
              onClick={() => { navigateTo('home'); setIsMobileMenuOpen(false); }}
              className="block w-full py-2 hover:text-gold transition-all"
            >
              Home
            </button>
            <button
              onClick={() => { navigateTo('catalog'); setIsMobileMenuOpen(false); }}
              className="block w-full py-2 hover:text-gold transition-all"
            >
              Store catalog
            </button>
            <button
              onClick={() => { navigateTo('blog'); setIsMobileMenuOpen(false); }}
              className="block w-full py-2 hover:text-gold transition-all"
            >
              Guides &amp; Blog
            </button>
            <button
              onClick={() => { navigateTo('tracker'); setIsMobileMenuOpen(false); }}
              className="block w-full py-2 hover:text-gold transition-all"
            >
              Track Order
            </button>
            <button
              onClick={() => { navigateTo('about'); setIsMobileMenuOpen(false); }}
              className="block w-full py-2 hover:text-gold transition-all"
            >
              About Us
            </button>
          </div>
        )}
      </header>

      {/* Auth Modal Trigger Container render overlay */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
};
