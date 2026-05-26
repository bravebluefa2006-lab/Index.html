import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { SCENT_NOTES_DATA } from '../data/products';
import { X, Star, Heart, ShoppingCart, Sparkles, ShieldCheck, Truck, RefreshCw, PenTool } from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const {
    activeProductId,
    setActiveProductId,
    products,
    addToCart,
    toggleWishlist,
    isInWishlist,
    addReviewToProduct,
    navigateTo
  } = useShop();

  const [selectedSize, setSelectedSize] = useState<'30ml' | '50ml' | '100ml'>('50ml');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [qty, setQty] = useState(1);

  // Review Form state
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [newName, setNewName] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);

  const product = products.find(p => p.id === activeProductId);

  useEffect(() => {
    if (product) {
      setSelectedSize('50ml');
      setActiveImageIndex(0);
      setQty(1);
      setShowReviewForm(false);
      setNewRating(5);
      setNewComment('');
      setNewName('');
    }
  }, [activeProductId, product]);

  if (!product) return null;

  const notes = SCENT_NOTES_DATA[product.id] || { top: [], middle: [], base: [] };
  const multiplier = product.sizePriceMultipliers[selectedSize];
  const sizeAdjustedPrice = Math.round(product.price * multiplier);
  const isFav = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, qty);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, qty);
    setActiveProductId(null);
    navigateTo('checkout');
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    addReviewToProduct(product.id, newRating, newComment, newName);
    setNewComment('');
    setNewName('');
    setShowReviewForm(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/80">
      <div className="relative w-full max-w-5xl bg-charcoal border border-neutral-800 rounded-2xl shadow-3xl overflow-hidden animate-fade-in flex flex-col max-h-[92vh]">
        
        {/* Header Close absolute overlay */}
        <div className="absolute right-4 top-4 z-40">
          <button
            onClick={() => setActiveProductId(null)}
            className="text-neutral-400 hover:text-gold transition-colors p-2 bg-black/45 rounded-full border border-neutral-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Container split panel */}
        <div className="overflow-y-auto flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Gallery Left panel: span 5 */}
            <div className="lg:col-span-5 bg-neutral-950 p-6 flex flex-col items-center justify-center gap-4 lg:border-r border-neutral-900 min-h-[350px] lg:min-h-[500px]">
              <div className="w-full aspect-[3/4] rounded-xl overflow-hidden relative border border-neutral-800">
                <img
                  src={product.images[activeImageIndex] || product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnail slideshow */}
              {product.images.length > 1 && (
                <div className="flex gap-2 w-full justify-center">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-16 h-20 rounded-lg overflow-hidden border transition-all ${
                        activeImageIndex === idx ? 'border-gold scale-105' : 'border-neutral-800 hover:border-neutral-700'
                      }`}
                    >
                      <img src={img} alt="thumbnail" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details right panel: span 7 */}
            <div className="lg:col-span-7 p-6 md:p-8 space-y-6">
              
              {/* Core Scent identity */}
              <div className="space-y-2 border-b border-neutral-900 pb-5">
                <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-gold uppercase">
                  <span>{product.brand}</span>
                  <span>•</span>
                  <span>Karachi Boutique</span>
                  <span>•</span>
                  <span className="text-neutral-400">{product.gender}</span>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-serif text-white font-bold leading-tight tracking-wide">
                  {product.name}
                </h2>

                {/* Rating summary */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center text-gold">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating) ? 'fill-gold text-gold' : 'text-neutral-700'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-neutral-200 font-semibold font-mono">{product.rating} / 5.0</span>
                  <span className="text-xs text-neutral-500">({product.reviewsCount} customer reviews)</span>
                </div>
              </div>

              {/* Price Block and Size Selector */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-neutral-950/60 p-4 border border-neutral-900 rounded-xl">
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 block mb-1">Adjusted Price</label>
                  <div className="flex items-baseline gap-2.5">
                    <span className="text-3xl font-serif text-gold font-extrabold">Rs. {sizeAdjustedPrice.toLocaleString()}</span>
                    {product.discount > 0 && (
                      <span className="text-xs text-neutral-500 line-through">
                        Rs. {Math.round(product.originalPrice * multiplier).toLocaleString()}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-zinc-400 font-mono block mt-1">Free Delivery across Karachi on orders &gt; 8000</span>
                </div>

                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 block mb-1">Select Scent Size</label>
                  <div className="flex gap-2">
                    {(['30ml', '50ml', '100ml'] as const).map(sz => (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => setSelectedSize(sz)}
                        className={`flex-1 font-sans text-xs font-semibold py-2.5 rounded-lg border transition-all ${
                          selectedSize === sz
                            ? 'bg-burgundy border-[#58111A] text-gold'
                            : 'bg-neutral-900 border-neutral-800 hover:border-neutral-700 text-neutral-300'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Short description and Notes */}
              <div className="space-y-4">
                <p className="text-sm font-sans text-neutral-300 leading-relaxed">
                  {product.description}
                </p>

                {/* Fragrance Triad Notes parsing */}
                <div className="border border-neutral-900 rounded-xl p-4 bg-zinc-950/30 space-y-3">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-gold-light/90 border-b border-neutral-900 pb-2">Olfactory Pyramid Structure</h4>
                  
                  <div className="space-y-2.5">
                    <div className="flex items-start text-xs sm:text-sm">
                      <span className="w-20 font-bold font-serif text-neutral-300 flex-shrink-0">✨ Top Notes:</span>
                      <span className="text-neutral-400 font-sans">{notes.top.join(', ')}</span>
                    </div>
                    <div className="flex items-start text-xs sm:text-sm">
                      <span className="w-20 font-bold font-serif text-neutral-300 flex-shrink-0">🌹 Heart:</span>
                      <span className="text-neutral-400 font-sans">{notes.middle.join(', ')}</span>
                    </div>
                    <div className="flex items-start text-xs sm:text-sm">
                      <span className="w-20 font-bold font-serif text-neutral-300 flex-shrink-0">🪵 Base Chord:</span>
                      <span className="text-neutral-400 font-sans">{notes.base.join(', ')}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Scent Specifications */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center border-t border-b border-neutral-900 py-3 text-xs">
                <div>
                  <span className="text-neutral-500 block uppercase font-mono text-[9px]">Scent Type</span>
                  <span className="text-neutral-200 font-semibold">{product.scentType}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block uppercase font-mono text-[9px]">Longevity</span>
                  <span className="text-neutral-200 font-semibold">{product.longevity}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block uppercase font-mono text-[9px]">Sillage</span>
                  <span className="text-neutral-200 font-semibold">{product.sillage}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block uppercase font-mono text-[9px]">Ingredients</span>
                  <span className="text-neutral-200 block truncate" title={product.ingredients}>Organic Essences</span>
                </div>
              </div>

              {/* Quantity and Actions buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                
                {/* Quantity adjuster */}
                <div className="flex items-center bg-neutral-900 border border-neutral-800 rounded-xl px-2">
                  <button
                    onClick={() => setQty(prev => Math.max(1, prev - 1))}
                    className="p-3 text-neutral-400 hover:text-white font-bold"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-sm font-mono text-neutral-200">{qty}</span>
                  <button
                    onClick={() => setQty(prev => prev + 1)}
                    className="p-3 text-neutral-400 hover:text-white font-bold"
                  >
                    +
                  </button>
                </div>

                <div className="flex-1 grid grid-cols-2 gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="bg-neutral-900 border border-neutral-800 hover:border-gold/40 text-neutral-200 hover:text-white font-sans font-semibold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>

                  <button
                    onClick={handleBuyNow}
                    className="bg-gold-gradient text-neutral-950 font-sans font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all hover:opacity-90 shadow-lg cursor-pointer"
                  >
                    <span>Buy Now</span>
                  </button>
                </div>

                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-3.5 rounded-xl border transition-all ${
                    isFav
                      ? 'bg-burgundy/25 border-[#58111A] text-rose-500'
                      : 'bg-neutral-900 border-neutral-800 hover:border-gold/30 text-neutral-400 hover:text-white'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isFav ? 'fill-rose-600 text-rose-600' : ''}`} />
                </button>
              </div>

              {/* Guarantees column */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-neutral-950/30 p-3 rounded-lg border border-neutral-900/60 text-[11px] text-neutral-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-gold flex-shrink-0" />
                  <span>100% Authentic Products</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-gold flex-shrink-0" />
                  <span>Secure Karachi Shipping</span>
                </div>
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-gold flex-shrink-0" />
                  <span>7 Day Easy Exchanges</span>
                </div>
              </div>

              {/* Reviews detail section */}
              <div className="border-t border-neutral-900 pt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-serif font-bold text-white tracking-wide">
                    Fragrance Reviews &amp; Collector Logs
                  </h3>
                  
                  {!showReviewForm && (
                    <button
                      onClick={() => setShowReviewForm(true)}
                      className="text-xs text-gold border border-gold/20 hover:border-gold px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all bg-neutral-950/40"
                    >
                      <PenTool className="w-3 h-3" />
                      <span>Write a review</span>
                    </button>
                  )}
                </div>

                {/* Write review form toggle panel */}
                {showReviewForm && (
                  <form onSubmit={handleSubmitReview} className="bg-neutral-950 p-4 border border-rose-950/20 rounded-xl space-y-3 animate-fade-in text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-neutral-200">Share Your Fragrance Journey</span>
                      <button
                        type="button"
                        onClick={() => setShowReviewForm(false)}
                        className="text-neutral-500 hover:text-rose-500"
                      >
                        Cancel
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-neutral-400 block mb-1 font-mono text-[10px]">Your Name</label>
                        <input
                          type="text"
                          required
                          value={newName}
                          onChange={e => setNewName(e.target.value)}
                          placeholder="e.g. Murtaza Sheikh"
                          className="w-full bg-neutral-900 border border-neutral-850 rounded-lg p-2 text-neutral-200 placeholder-neutral-500 focus:outline-none"
                        />
                      </div>
                      
                      <div>
                        <label className="text-neutral-400 block mb-1 font-mono text-[10px]">Rating Code (Stars)</label>
                        <div className="flex items-center gap-1.5 mt-2">
                          {[1, 2, 3, 4, 5].map(st => (
                            <button
                              type="button"
                              key={st}
                              onClick={() => setNewRating(st)}
                              className="text-gold focus:outline-none"
                            >
                              <Star className={`w-5 h-5 ${st <= newRating ? 'fill-gold' : 'text-neutral-700'}`} />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="text-neutral-400 block mb-1 font-mono text-[10px]">Your scent logs / comments</label>
                      <textarea
                        required
                        rows={3}
                        value={newComment}
                        onChange={e => setNewComment(e.target.value)}
                        placeholder="Describe the projection, sillage, top notes after skin contact..."
                        className="w-full bg-neutral-900 border border-neutral-850 rounded-lg p-2 text-neutral-200 placeholder-neutral-500 focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="bg-gold-gradient text-neutral-950 text-[11px] font-sans font-bold px-4 py-2 rounded-lg hover:opacity-90"
                    >
                      Publish Scent Review
                    </button>
                  </form>
                )}

                {/* Display Lists of Reviews */}
                <div className="space-y-4">
                  {product.reviews.map(rev => (
                    <div key={rev.id} className="bg-[#121214] border border-neutral-900 p-4 rounded-xl space-y-2">
                      <div className="flex gap-2 items-center justify-between text-xs">
                        <span className="font-serif font-semibold text-neutral-200">{rev.userName}</span>
                        <span className="text-[10px] font-mono text-neutral-500">{rev.date}</span>
                      </div>

                      {/* Score stars */}
                      <div className="flex items-center text-gold">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${i < rev.rating ? 'fill-gold text-gold' : 'text-neutral-700'}`}
                          />
                        ))}
                      </div>

                      <p className="text-neutral-300 text-xs sm:text-sm font-sans leading-relaxed">
                        {rev.comment}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
