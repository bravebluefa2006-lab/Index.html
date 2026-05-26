import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Trash2, ArrowRight, ShoppingBag, Sparkles, Tag, ShieldCheck } from 'lucide-react';

export const PageCart: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateCartQty,
    navigateTo,
    applyCoupon,
    couponDiscount,
    activeCouponCode,
    products,
    currentUser,
    addToast
  } = useShop();

  const [couponInput, setCouponInput] = useState('');

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const promoFreeShip = activeCouponCode.toUpperCase().trim() === 'FREESHIP';
  const isFreeShip = subtotal > 8000 || promoFreeShip;
  const deliveryFee = subtotal === 0 ? 0 : (isFreeShip ? 0 : 250);
  const discountAmount = Math.round(subtotal * (couponDiscount / 100));
  const grandTotal = subtotal - discountAmount + deliveryFee;

  // Recommendations: exclude items already in cart
  const cartProductIds = cart.map(i => i.product.id);
  const recommendations = products
    .filter(p => !cartProductIds.includes(p.id))
    .slice(0, 4);

  const handleApplyCouponCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    applyCoupon(couponInput);
    setCouponInput('');
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 bg-neutral-950 border border-neutral-900 rounded-full flex items-center justify-center mx-auto text-neutral-400">
          <ShoppingBag className="w-10 h-10 text-gold-dark" />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-3xl font-serif text-white font-bold leading-tight tracking-wide">
            Your Shopping Cart is Empty
          </h2>
          <p className="text-xs text-neutral-500 font-sans max-w-sm mx-auto">
            You haven’t added any premium perfume extracts to your collection yet. Start exploring our rich, persistent house blends.
          </p>
        </div>

        <button
          onClick={() => navigateTo('catalog')}
          className="bg-gold-gradient text-neutral-950 font-sans font-bold px-8 py-3.5 rounded-xl uppercase tracking-wider text-xs inline-block"
        >
          Discover Fragrances
        </button>

        {/* Recommended Shelf */}
        <div className="border-t border-neutral-900 pt-16 space-y-6 text-left">
          <h3 className="text-xl font-serif font-bold text-white tracking-wide text-center">
            🌌 Handpicked Scent Introductions
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products.slice(0, 4).map(p => (
              <div
                key={p.id}
                onClick={() => {
                  navigateTo('catalog');
                  setTimeout(() => {
                    const ev = new CustomEvent('termSearch', { detail: p.name });
                    window.dispatchEvent(ev);
                  }, 100);
                }}
                className="bg-charcoal border border-neutral-850 p-3 rounded-xl hover:border-gold/30 cursor-pointer transition-all space-y-2 group"
              >
                <div className="aspect-square rounded overflow-hidden">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <h4 className="text-xs font-serif font-bold text-neutral-250 truncate">{p.name}</h4>
                <p className="text-[10px] font-mono text-gold font-semibold">Rs. {p.price.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Breadcrumb path */}
      <div className="flex items-center gap-1.5 text-[11px] font-mono tracking-wider text-neutral-500 uppercase">
        <span>Arzhaar Brhave</span>
        <span>/</span>
        <span className="text-gold">My cart ledger</span>
      </div>

      <h2 className="text-3xl font-serif text-white font-bold tracking-wide">
        Your Selection Cart ({cart.length} unique items)
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Cart Items Details - span 8 */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-charcoal border border-neutral-900 rounded-2xl overflow-hidden shadow-xl">
            
            {/* Header Labels table */}
            <div className="grid grid-cols-12 bg-neutral-950 p-4 border-b border-neutral-900 text-[10px] font-mono text-neutral-500 uppercase tracking-widest hidden md:grid">
              <div className="col-span-6">Scent Extract Description</div>
              <div className="col-span-2 text-center">Size Vol</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Sum price</div>
            </div>

            {/* List stacked rows */}
            <div className="divide-y divide-neutral-900/60 p-4 space-y-4 md:space-y-0">
              {cart.map(item => (
                <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center pt-4 first:pt-0 pb-4 last:pb-0">
                  
                  {/* Photo + Description block */}
                  <div className="col-span-12 md:col-span-6 flex gap-4 items-center">
                    <div className="w-16 h-20 rounded bg-neutral-950 overflow-hidden border border-neutral-850 flex-shrink-0">
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[9px] font-mono text-gold uppercase">{item.product.brand}</span>
                      <h4 className="text-sm font-serif font-bold text-neutral-200 tracking-wide truncate">{item.product.name}</h4>
                      <p className="text-[11px] text-neutral-400 font-mono italic">{item.product.scentType}</p>
                      
                      {/* Delete icon under name */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-[10px] text-rose-500/80 hover:text-rose-500 font-mono uppercase flex items-center gap-1.5 focus:outline-none mt-2 pr-2"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove scent</span>
                      </button>
                    </div>
                  </div>

                  {/* Sized label */}
                  <div className="col-span-4 md:col-span-2 flex md:justify-center items-center gap-2 justify-between">
                    <span className="text-neutral-500 text-[10px] uppercase font-mono md:hidden">Size Vol:</span>
                    <span className="text-xs font-mono font-bold bg-neutral-950 px-2.5 py-1 border border-neutral-850 text-neutral-300 rounded">
                      {item.selectedSize}
                    </span>
                  </div>

                  {/* Quantity controls */}
                  <div className="col-span-4 md:col-span-2 flex md:justify-center items-center gap-2 justify-between">
                    <span className="text-neutral-500 text-[10px] uppercase font-mono md:hidden">Quantity:</span>
                    <div className="flex bg-neutral-900 border border-neutral-850 rounded">
                      <button
                        onClick={() => updateCartQty(item.id, item.quantity - 1)}
                        className="px-2 py-1 text-xs text-neutral-400 hover:text-white font-bold"
                      >
                        -
                      </button>
                      <span className="w-6 text-center text-xs font-mono py-1 text-neutral-200">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQty(item.id, item.quantity + 1)}
                        className="px-2 py-1 text-xs text-neutral-400 hover:text-white font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Sum Price of item */}
                  <div className="col-span-4 md:col-span-2 flex md:justify-end items-center gap-2 justify-between">
                    <span className="text-neutral-500 text-[10px] uppercase font-mono md:hidden">Total Price:</span>
                    <span className="text-sm font-serif font-bold text-gold">
                      Rs. {(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>

                </div>
              ))}
            </div>

          </div>

          {/* Scent Guarantees */}
          <div className="bg-neutral-950 p-4 border border-neutral-900 rounded-xl flex items-center gap-3 text-xs text-neutral-400">
            <ShieldCheck className="w-6 h-6 text-gold" />
            <p>
              Your payment is completely secure. We support cash on delivery across Karachi, bank transfers, and mobile wallets. 7-day exchanges are fully covered.
            </p>
          </div>
        </div>

        {/* Right: Payment Ledger Summary - span 4 */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-charcoal border border-neutral-900 rounded-2xl p-6 shadow-xl space-y-5">
            <h3 className="text-lg font-serif font-bold text-white tracking-wide border-b border-neutral-900 pb-3">
              Cart Ledger Summary
            </h3>

            {/* Calculations lines */}
            <div className="space-y-3.5 text-xs sm:text-sm font-sans">
              <div className="flex justify-between text-neutral-400">
                <span>Subtotal (items sum):</span>
                <span className="font-semibold text-neutral-200">Rs. {subtotal.toLocaleString()}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-rose-450 font-medium">
                  <span className="flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5 text-gold-dark" />
                    <span>Promo Code ({activeCouponCode}):</span>
                  </span>
                  <span>- Rs. {discountAmount.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between text-neutral-400">
                <span>Shipping &amp; Delivery:</span>
                <span className="font-mono text-[11px]">
                  {deliveryFee === 0 ? <strong className="text-green-500 text-xs">FREE SHIPPING</strong> : `Rs. ${deliveryFee}`}
                </span>
              </div>

              {/* Free delivery thresholds progress bar status */}
              {subtotal < 8000 && !promoFreeShip && (
                <div className="bg-neutral-950 border border-neutral-900 p-2.5 rounded-lg text-[10px] leading-relaxed text-neutral-400">
                  <p>Add <span className="text-gold font-bold">Rs. {(8000 - subtotal).toLocaleString()}</span> more to unlock <span className="text-white font-bold">FREE SHIPPING</span> inside Pakistan!</p>
                  <div className="w-full bg-neutral-900 h-1 rounded-full mt-1.5 overflow-hidden">
                    <div className="bg-gold h-full" style={{ width: `${(subtotal / 8000) * 100}%` }}></div>
                  </div>
                </div>
              )}

              <div className="border-t border-neutral-900/60 pt-4 flex justify-between items-baseline">
                <span className="font-bold text-neutral-200">Grand Total:</span>
                <span className="text-2xl font-serif text-gold font-extrabold text-shadow-gold">Rs. {grandTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Promo Code Submission form */}
            <form onSubmit={handleApplyCouponCode} className="pt-2 border-t border-neutral-900/60 space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">Apply Promos / Coupons</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponInput}
                  onChange={e => setCouponInput(e.target.value)}
                  placeholder="e.g. BRHAVEGOLD"
                  className="flex-1 bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-gold/30 uppercase font-mono"
                />
                <button
                  type="submit"
                  className="bg-neutral-900 hover:bg-neutral-800 border border-neutral-805 text-neutral-300 hover:text-white px-3 py-1.5 text-xs rounded-lg transition-transform hover:scale-103"
                >
                  Apply
                </button>
              </div>
              <span className="text-[9px] text-neutral-500 font-mono block">Hint: Try "KARACHI10", "FREESHIP" or "BRHAVEGOLD"!</span>
            </form>

            {/* Checkout proceed link */}
            <button
              onClick={() => {
                if (!currentUser || !currentUser.isLoggedIn) {
                  addToast('Sign-In is strictly required before checking out. Joining our VIP Patrons is free and instant!', 'warning');
                  window.dispatchEvent(new CustomEvent('openAuthModal'));
                } else {
                  navigateTo('checkout');
                }
              }}
              className="w-full bg-gold-gradient text-neutral-950 py-3.5 px-4 rounded-xl font-sans font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:opacity-90 shadow-lg cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>
        </div>

      </div>

      {/* Recommended Carousel shelf */}
      {recommendations.length > 0 && (
        <section className="border-t border-neutral-900/60 pt-12 space-y-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-gold" />
            <h3 className="text-xl font-serif font-bold text-white tracking-wide">You May Also Like...</h3>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendations.map(p => (
              <div
                key={p.id}
                onClick={() => {
                  navigateTo('catalog');
                  setTimeout(() => {
                    const e = new CustomEvent('termSearch', { detail: p.name });
                    window.dispatchEvent(e);
                  }, 100);
                }}
                className="bg-charcoal border border-neutral-900 p-4 rounded-xl hover:border-gold/20 cursor-pointer transition-all space-y-3 group"
              >
                <div className="aspect-[3/4] rounded-lg overflow-hidden bg-neutral-950 border border-neutral-850">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div>
                  <span className="text-[9px] font-mono text-neutral-500 uppercase">{p.brand}</span>
                  <h4 className="text-sm font-serif font-bold text-neutral-200 truncate group-hover:text-gold transition-colors">{p.name}</h4>
                  <p className="text-xs font-mono text-gold font-bold mt-1">Rs. {p.price.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
};
