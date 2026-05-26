import React from 'react';
import { useShop } from '../context/ShopContext';
import { Heart, Trash2, ShoppingCart, Sparkles } from 'lucide-react';

export const PageWishlist: React.FC = () => {
  const { wishlist, toggleWishlist, addToCart, navigateTo } = useShop();

  if (wishlist.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 bg-neutral-950 border border-neutral-900 rounded-full flex items-center justify-center mx-auto text-neutral-400 animate-pulse">
          <Heart className="w-10 h-10 text-rose-500" />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-3xl font-serif text-white font-bold leading-tight tracking-wide">
            Your Wishlist Sanctuary is Empty
          </h2>
          <p className="text-xs text-neutral-500 font-sans max-w-sm mx-auto">
            Save premium perfume blends that align with your requirements to track them together. Try exploring the catalog.
          </p>
        </div>

        <button
          onClick={() => navigateTo('catalog')}
          className="bg-gold-gradient text-neutral-950 font-sans font-bold px-8 py-3.5 rounded-xl uppercase tracking-wider text-xs inline-block"
        >
          Discover Fragrances
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Breadcrumbs */}
      <div className="flex items-center gap-1.5 text-[11px] font-mono tracking-wider text-neutral-500 uppercase">
        <span>Arzhaar Brhave</span>
        <span>/</span>
        <span className="text-gold">Scent Wishlist Sanctuary</span>
      </div>

      <div className="flex items-baseline justify-between border-b border-neutral-900 pb-5">
        <div>
          <h2 className="text-3xl font-serif text-white font-bold tracking-wide">
            Your Saved Fragrances ({wishlist.length})
          </h2>
          <p className="text-xs text-neutral-400 mt-1">Keep track of your luxury scent desires in one place.</p>
        </div>
      </div>

      {/* Grid displays */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlist.map(p => (
          <div
            key={p.id}
            className="bg-charcoal border border-neutral-850 rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-[#D4AF37]/30 hover:shadow-2xl transition-all"
          >
            {/* Image section */}
            <div
              className="relative aspect-[3/4] cursor-pointer"
              onClick={() => {
                navigateTo('catalog');
                setTimeout(() => {
                  const ev = new CustomEvent('termSearch', { detail: p.name });
                  window.dispatchEvent(ev);
                }, 100);
              }}
            >
              <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform group-hover:scale-103 duration-500" />
              
              {/* Overlay delete button right */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(p);
                }}
                className="absolute top-3 right-3 p-2 rounded-full bg-black/60 border border-neutral-800 text-neutral-400 hover:text-rose-500 transition-colors"
                title="Remove from wishlist"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Info details */}
            <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-[10px] font-mono text-gold-dark uppercase tracking-widest">{p.brand}</span>
                <h3 className="text-base font-serif font-bold text-neutral-250 truncate">{p.name}</h3>
                <p className="text-[11px] text-neutral-400 font-mono italic">{p.scentType} • {p.gender}</p>
              </div>

              {/* Pricing & Cart quick-add actions */}
              <div className="border-t border-neutral-900 pt-3 flex items-center justify-between">
                <span className="text-base font-serif font-bold text-gold">Rs. {p.price.toLocaleString()}</span>
                
                <button
                  onClick={() => addToCart(p, '50ml')}
                  className="bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 text-gold-light hover:text-white rounded-lg p-2 transition-all flex items-center gap-1.5 font-sans cursor-pointer font-bold text-[11px]"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>+ 50ml</span>
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
