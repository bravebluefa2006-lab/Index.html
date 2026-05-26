import React from 'react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { Star, Heart, ShoppingCart, Eye, Sparkles } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, viewMode = 'grid' }) => {
  const { addToCart, toggleWishlist, isInWishlist, setActiveProductId, addToRecentlyViewed } = useShop();

  const isFav = isInWishlist(product.id);

  const handleOpenDetail = () => {
    addToRecentlyViewed(product);
    setActiveProductId(product.id);
  };

  const hasDiscount = product.discount > 0;

  if (viewMode === 'list') {
    return (
      <div className="bg-[#0f0f0f] border border-[#D4AF37]/10 hover:border-[#D4AF37]/40 rounded-lg overflow-hidden flex flex-col md:flex-row gap-6 p-5 transition-all duration-300 group hover:shadow-2xl">
        {/* Product Image Frame */}
        <div className="relative w-full md:w-56 h-64 md:h-56 bg-[#151515] rounded-lg overflow-hidden flex-shrink-0 cursor-pointer" onClick={handleOpenDetail}>
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          
          {/* Scent Type Badge Overlay */}
          <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md text-[10px] text-neutral-300 px-2.5 py-1 rounded-full font-mono uppercase tracking-wider border border-neutral-800">
            {product.scentType}
          </div>

          {/* Discount Tag */}
          {hasDiscount && (
            <div className="absolute top-3 right-3 bg-burgundy text-gold font-bold text-[10px] font-mono px-2.5 py-1 rounded-full shadow-md border border-gold/20">
              SAVE {product.discount}%
            </div>
          )}
        </div>

        {/* Content details side panel */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-mono text-gold-dark uppercase tracking-widest">{product.brand}</span>
              <span className="text-xs font-serif italic text-neutral-400">{product.gender}</span>
            </div>

            <h3
              onClick={handleOpenDetail}
              className="text-xl font-serif font-bold text-white hover:text-gold transition-colors cursor-pointer tracking-wide"
            >
              {product.name}
            </h3>

            {/* Stars rating */}
            <div className="flex items-center gap-1.5 mt-2 mb-3">
              <div className="flex items-center text-gold">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < Math.floor(product.rating) ? 'fill-gold text-gold' : 'text-neutral-700'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-neutral-300 font-mono font-semibold">{product.rating}</span>
              <span className="text-xs text-neutral-500">({product.reviewsCount} reviews)</span>
            </div>

            <p className="text-sm text-neutral-300 font-sans line-clamp-2 leading-relaxed mb-4">
              {product.shortDescription}
            </p>

            {/* Scent Traits bullet point specifications */}
            <div className="flex flex-wrap gap-2 mb-4 text-[11px] font-mono text-neutral-400">
              <span className="bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded">Longevity: {product.longevity}</span>
              <span className="bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded">Sillage: {product.sillage}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-neutral-900 pt-4 gap-4">
            {/* Price block */}
            <div>
              <div className="flex items-baseline gap-2.5">
                <span className="text-2xl font-serif text-gold font-bold">Rs. {product.price.toLocaleString()}</span>
                {hasDiscount && (
                  <span className="text-sm text-neutral-500 line-through">Rs. {product.originalPrice.toLocaleString()}</span>
                )}
              </div>
              <span className="text-[10px] font-mono text-neutral-500 block mt-0.5">Custom base price for 50ml extract</span>
            </div>

            {/* Actions button row */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => toggleWishlist(product)}
                className={`p-3 rounded-full border transition-all ${
                  isFav
                    ? 'bg-[#4a0404] border-[#D4AF37]/45 text-[#D4AF37]'
                    : 'bg-[#151515] border-[#D4AF37]/20 hover:border-[#D4AF37]/60 text-neutral-400 hover:text-white'
                }`}
                title="Add to wishlist"
              >
                <Heart className={`w-4.5 h-4.5 ${isFav ? 'fill-[#D4AF37] text-[#D4AF37]' : ''}`} />
              </button>

              <button
                onClick={handleOpenDetail}
                className="bg-[#151515] border border-[#D4AF37]/20 hover:border-gold text-[#D4AF37] hover:text-white p-3 rounded-full transition-all"
                title="Quick Look"
              >
                <Eye className="w-4.5 h-4.5" />
              </button>

              <button
                onClick={() => addToCart(product, '50ml')}
                className="bg-[#D4AF37] text-neutral-950 font-sans font-bold px-5 py-3 rounded-full flex items-center gap-2 hover:bg-[#B76E79] hover:text-white transition-all cursor-pointer text-xs uppercase tracking-wider"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add 50ml</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // default: Grid layout view
  return (
    <div className="bg-[#0f0f0f] border border-[#D4AF37]/10 hover:border-[#D4AF37]/50 rounded-lg overflow-hidden flex flex-col justify-between transition-all duration-300 group hover:shadow-2xl hover:-translate-y-1">
      {/* Product Image Frame */}
      <div className="relative aspect-[3/4] bg-neutral-900 overflow-hidden cursor-pointer w-full" onClick={handleOpenDetail}>
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Wishlist Heart Overlay top actions */}
        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product);
            }}
            className={`p-2.5 rounded-full backdrop-blur-md border shadow-md transition-all ${
              isFav
                ? 'bg-burgundy/80 border-[#58111A] text-rose-500'
                : 'bg-black/60 border-neutral-800 hover:border-gold/40 text-neutral-400 hover:text-white'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500' : ''}`} />
          </button>
        </div>

        {/* Scent Category badge bottom overlay */}
        <div className="absolute bottom-4 left-4">
          <span className="bg-black/75 backdrop-blur-md text-[9px] text-neutral-300 font-mono uppercase tracking-widest px-2.5 py-1 rounded-full border border-neutral-800/80">
            {product.scentType}
          </span>
        </div>

        {/* Special status highlights tags */}
        {product.statusTags && product.statusTags.length > 0 && (
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-gold-gradient text-neutral-950 text-[9px] font-sans font-bold tracking-widest px-2.5 py-1 rounded-full uppercase shadow-md flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" />
              {product.statusTags[0]}
            </span>
          </div>
        )}

        {/* Save Discount Percentage banner */}
        {hasDiscount && (
          <div className="absolute bottom-4 right-4 bg-burgundy text-gold font-bold font-mono text-[9px] tracking-widest px-2.5 py-1 border border-gold/20 rounded-full shadow-md">
            SAVE {product.discount}%
          </div>
        )}
      </div>

      {/* Card Content details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-gold-dark uppercase tracking-widest">{product.brand}</span>
            <span className="text-[11px] font-serif italic text-neutral-400">{product.gender}</span>
          </div>
          
          <h3
            onClick={handleOpenDetail}
            className="text-base font-serif font-bold text-neutral-200 line-clamp-1 hover:text-gold transition-colors cursor-pointer tracking-wide"
          >
            {product.name}
          </h3>

          {/* Stars rating metrics */}
          <div className="flex items-center gap-1 pt-1">
            <div className="flex items-center text-gold">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.rating) ? 'fill-gold text-gold' : 'text-neutral-700'
                  }`}
                />
              ))}
            </div>
            <span className="text-[11px] text-neutral-400 font-semibold">{product.rating}</span>
            <span className="text-[10px] text-neutral-500">({product.reviewsCount})</span>
          </div>
        </div>

        {/* Pricing and Button Controls */}
        <div className="border-t border-neutral-900/60 mt-4 pt-3 flex items-center justify-between">
          <div className="flex flex-col">
            {hasDiscount && (
              <span className="text-[10px] text-neutral-500 line-through">Rs. {product.originalPrice.toLocaleString()}</span>
            )}
            <span className="text-base font-serif font-bold text-gold">Rs. {product.price.toLocaleString()}</span>
          </div>

          <button
            onClick={() => addToCart(product, '50ml')}
            className="bg-[#0f0f0f] border border-[#D4AF37]/25 hover:bg-[#D4AF37] hover:text-[#050505] text-[#D4AF37] hover:border-transparent rounded-full p-2.5 transition-all text-xs flex items-center gap-1.5 font-sans cursor-pointer font-bold shadow-md"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>+ 50ml</span>
          </button>
        </div>
      </div>
    </div>
  );
};
