import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import { SlidersHorizontal, LayoutGrid, List, RotateCcw, Search, Sparkles } from 'lucide-react';

export const PageCatalog: React.FC = () => {
  const { products } = useShop();

  // layout togglers
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // filter configurations
  const [selectedGender, setSelectedGender] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<number>(12000);
  const [selectedLongevity, setSelectedLongevity] = useState<string>('');
  const [selectedSillage, setSelectedSillage] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortOption, setSortOption] = useState<string>('best-selling');

  // Trigger filters automatically on cross page events
  useEffect(() => {
    const handleCat = (e: Event) => {
      const cat = (e as CustomEvent).detail;
      if (cat === 'Men' || cat === 'Women' || cat === 'Unisex') {
        setSelectedGender(cat);
        setSelectedCategory('');
      } else {
        setSelectedCategory(cat);
        setSelectedGender('');
      }
      setSearchTerm('');
    };

    const handleSearch = (e: Event) => {
      const query = (e as CustomEvent).detail;
      setSearchTerm(query || '');
      // Clear filters upon search
      setSelectedGender('');
      setSelectedCategory('');
      setSelectedBrand('');
    };

    window.addEventListener('catSelect', handleCat);
    window.addEventListener('termSearch', handleSearch);

    return () => {
      window.removeEventListener('catSelect', handleCat);
      window.removeEventListener('termSearch', handleSearch);
    };
  }, []);

  const handleResetFilters = () => {
    setSelectedGender('');
    setSelectedCategory('');
    setSelectedBrand('');
    setMaxPrice(12000);
    setSelectedLongevity('');
    setSelectedSillage('');
    setSearchTerm('');
    setSortOption('best-selling');
  };

  // Perform filtration logic across 26 perfumes
  const filteredProducts = products.filter(prod => {
    // Gender Check
    if (selectedGender && prod.gender !== selectedGender) return false;

    // Category Check
    if (selectedCategory) {
      if (selectedCategory === 'Attar' && prod.category !== 'Attar') return false;
      if (selectedCategory === 'Luxury' && prod.category !== 'Luxury') return false;
      if (selectedCategory === 'Best Sellers' && prod.category !== 'Best Sellers') return false;
      if (selectedCategory === 'New Arrivals' && prod.category !== 'New Arrivals') return false;
    }

    // Brand Check
    if (selectedBrand && prod.brand !== selectedBrand) return false;

    // Price Check
    if (prod.price > maxPrice) return false;

    // Longevity Check
    if (selectedLongevity && prod.longevity !== selectedLongevity) return false;

    // Sillage Check
    if (selectedSillage && prod.sillage !== selectedSillage) return false;

    // Search query match
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      const matchName = prod.name.toLowerCase().includes(q);
      const matchBrand = prod.brand.toLowerCase().includes(q);
      const matchNotes = prod.scentType.toLowerCase().includes(q) || prod.shortDescription.toLowerCase().includes(q);
      if (!matchName && !matchBrand && !matchNotes) return false;
    }

    return true;
  });

  // Sort filtered products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === 'price-low') return a.price - b.price;
    if (sortOption === 'price-high') return b.price - a.price;
    if (sortOption === 'rating') return b.rating - a.rating;
    if (sortOption === 'discount') return b.discount - a.discount;
    if (sortOption === 'newest') {
      const aIsNew = a.statusTags.includes('New Arrival') ? 1 : 0;
      const bIsNew = b.statusTags.includes('New Arrival') ? 1 : 0;
      return bIsNew - aIsNew;
    }
    // Default or Best-selling: Sort rating * reviewsCount density
    return (b.rating * b.reviewsCount) - (a.rating * a.reviewsCount);
  });

  // Unique brand lists
  const brandsList = ['Arzhaar Brhave', 'Lattafa', 'Ajmal', 'Rasasi', 'Al Haramain', 'Ard Al Zaafaran'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Page Path breadcrumbs */}
      <div className="flex items-center gap-1.5 text-[11px] font-mono tracking-wider text-neutral-500 uppercase">
        <span>Arzhaar Brhave</span>
        <span>/</span>
        <span>Karachi Store</span>
        <span>/</span>
        <span className="text-gold">Scent catalog</span>
      </div>

      {/* Catalogue header title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-900 pb-6">
        <div>
          <h2 className="text-3xl font-serif text-white font-bold tracking-wide">
            Our Perfume Vault
          </h2>
          <p className="text-xs text-neutral-400 mt-1 font-sans">
            {filteredProducts.length} Premium Fragrances suited for climate resilient projection on Karachi skin.
          </p>
        </div>

        {/* Layout switcher & Sorting tools */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Layout buttons */}
          <div className="flex bg-neutral-950 p-1 rounded-xl border border-neutral-805">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-burgundy text-gold' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-burgundy text-gold' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Sort selection dropdown */}
          <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-850 px-3 py-1.5 rounded-xl">
            <span className="text-[10px] font-mono text-neutral-500 uppercase">Sort:</span>
            <select
              value={sortOption}
              onChange={e => setSortOption(e.target.value)}
              className="bg-transparent border-0 text-xs font-semibold text-neutral-200 focus:outline-none"
            >
              <option value="best-selling">Best Selling Partners</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Star Ratings</option>
              <option value="discount">Largest Savings %</option>
              <option value="newest">Fresh New Arrivals</option>
            </select>
          </div>

          {/* Rest filter button */}
          <button
            onClick={handleResetFilters}
            className="flex items-center gap-1.5 border border-dashed border-neutral-800 text-neutral-400 hover:text-gold px-3.5 py-2 rounded-xl text-xs font-sans font-semibold cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

        </div>
      </div>

      {/* Main Body Grid with left sidebar filters and right results */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar Facet Filters - span 1 */}
        <div className="space-y-6 bg-[#0a0a0a] p-5 rounded-lg border border-[#D4AF37]/10 h-fit">
          <div className="flex items-center justify-between pb-3 border-b border-[#D4AF37]/20">
            <span className="text-xs uppercase tracking-widest font-mono font-bold text-[#D4AF37] flex items-center gap-1.5">
              <SlidersHorizontal className="w-4 h-4" />
              <span>Facet Filters</span>
            </span>
          </div>

          {/* Manual textual search within results */}
          <div className="space-y-2">
            <label className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">Scent Search</label>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Type note, name..."
                className="w-full bg-[#151515] border border-[#D4AF37]/30 focus:border-[#D4AF37] focus:outline-none p-2 rounded-lg text-xs text-[#e5e5e5] placeholder-sleek-rose/40"
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm('')} className="absolute right-2 top-2 text-neutral-500 hover:text-white text-[10px]">X</button>
              )}
            </div>
          </div>

          {/* Gender Scent Filters */}
          <div className="space-y-2">
            <label className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">Gender target</label>
            <div className="flex flex-wrap gap-1.5">
              {['', 'Men', 'Women', 'Unisex'].map(g => (
                <button
                  key={g}
                  onClick={() => setSelectedGender(g)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-sans font-medium border transition-colors cursor-pointer ${
                    selectedGender === g
                      ? 'bg-[#4a0404] border-[#D4AF37]/50 text-gold font-bold'
                      : 'bg-[#151515] border-[#D4AF37]/10 hover:border-[#D4AF37]/35 text-[#e5e5e5]'
                  }`}
                >
                  {g === '' ? 'All Scents' : g}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filters */}
          <div className="space-y-2">
            <label className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">Category collections</label>
            <div className="flex flex-col gap-1.5">
              {['', 'Attar', 'Luxury', 'Best Sellers', 'New Arrivals'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-sans transition-colors flex items-center justify-between border cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#4a0404] border-[#D4AF37]/40 text-gold font-bold'
                      : 'bg-[#151515]/60 hover:bg-[#151515] text-[#e5e5e5] border-[#D4AF37]/10'
                  }`}
                >
                  <span>{cat === '' ? 'Entire Portfolio' : cat}</span>
                  {selectedCategory === cat && <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>}
                </button>
              ))}
            </div>
          </div>

          {/* Brand Filters */}
          <div className="space-y-2">
            <label className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">Perfume Brands</label>
            <select
              value={selectedBrand}
              onChange={e => setSelectedBrand(e.target.value)}
              className="w-full bg-[#151515] border border-[#D4AF37]/30 text-xs text-[#e5e5e5] p-2.5 rounded-lg focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="" className="bg-[#151515]">All Fragrance Houses</option>
              {brandsList.map(b => (
                <option key={b} value={b} className="bg-[#151515]">{b}</option>
              ))}
            </select>
          </div>

          {/* Max Price ranges */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-wider text-neutral-400">
              <span>Budget Cap</span>
              <span className="text-[#D4AF37] font-bold">Rs. {maxPrice.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={2500}
              max={12000}
              step={500}
              value={maxPrice}
              onChange={e => setMaxPrice(parseInt(e.target.value))}
              className="w-full h-1 bg-[#151515] rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
            />
            <div className="flex justify-between text-[9px] text-neutral-500 font-mono">
              <span>Rs. 2,500</span>
              <span>Rs. 12,000</span>
            </div>
          </div>

          {/* Longevity Filter */}
          <div className="space-y-2">
            <label className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">Scent Longevity on Clothes</label>
            <select
              value={selectedLongevity}
              onChange={e => setSelectedLongevity(e.target.value)}
              className="w-full bg-[#151515] border border-[#D4AF37]/30 text-xs text-[#e5e5e5] p-2.5 rounded-lg focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="" className="bg-[#151515]">Any Scent Longevity</option>
              <option value="6-8 Hours" className="bg-[#151515]">Fresh Day-wear (6-8 Hours)</option>
              <option value="8-12 Hours" className="bg-[#151515]">Strong Projection (8-12 Hours)</option>
              <option value="12+ Hours" className="bg-[#151515]">Royal Extreme (12+ hours)</option>
            </select>
          </div>

          {/* Sillage density filter */}
          <div className="space-y-2">
            <label className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">Aura Sillage Cloud</label>
            <div className="flex flex-col gap-1.5 text-xs text-neutral-400">
              {['', 'Intimate', 'Moderate', 'Strong', 'Heavy'].map(sil => (
                <label key={sil} className="flex items-center gap-2 cursor-pointer hover:text-[#D4AF37] transition-colors">
                  <input
                    type="radio"
                    name="sillage"
                    checked={selectedSillage === sil}
                    onChange={() => setSelectedSillage(sil)}
                    className="accent-[#D4AF37] h-3.5 w-3.5"
                  />
                  <span>{sil === '' ? 'Omni projection' : `${sil} projection`}</span>
                </label>
              ))}
            </div>
          </div>

        </div>

        {/* Catalog Results - span 3 */}
        <div className="lg:col-span-3 space-y-8">
          
          {/* Active filter pills */}
          {(selectedGender || selectedCategory || selectedBrand || maxPrice < 12000 || selectedLongevity || selectedSillage || searchTerm) && (
            <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-900 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-neutral-500 font-mono font-bold uppercase text-[9px] tracking-wider">Active Filters:</span>
              
              {selectedGender && (
                <span className="bg-neutral-900 border border-neutral-850 text-neutral-300 rounded px-2.5 py-1 flex items-center gap-1.5">
                  <span>Gender: {selectedGender}</span>
                  <button onClick={() => setSelectedGender('')} className="text-neutral-500 hover:text-rose-500 font-bold">&times;</button>
                </span>
              )}
              {selectedCategory && (
                <span className="bg-neutral-900 border border-neutral-850 text-neutral-300 rounded px-2.5 py-1 flex items-center gap-1.5">
                  <span>Category: {selectedCategory}</span>
                  <button onClick={() => setSelectedCategory('')} className="text-neutral-500 hover:text-rose-500 font-bold">&times;</button>
                </span>
              )}
              {selectedBrand && (
                <span className="bg-neutral-900 border border-neutral-850 text-neutral-300 rounded px-2.5 py-1 flex items-center gap-1.5">
                  <span>House: {selectedBrand}</span>
                  <button onClick={() => setSelectedBrand('')} className="text-neutral-500 hover:text-rose-500 font-bold">&times;</button>
                </span>
              )}
              {maxPrice < 12000 && (
                <span className="bg-neutral-900 border border-neutral-850 text-neutral-300 rounded px-2.5 py-1 flex items-center gap-1.5">
                  <span>Price &lt; Rs. {maxPrice.toLocaleString()}</span>
                  <button onClick={() => setMaxPrice(12000)} className="text-neutral-500 hover:text-rose-500 font-bold">&times;</button>
                </span>
              )}
              {selectedLongevity && (
                <span className="bg-neutral-900 border border-neutral-850 text-neutral-300 rounded px-2.5 py-1 flex items-center gap-1.5">
                  <span>Longevity: {selectedLongevity}</span>
                  <button onClick={() => setSelectedLongevity('')} className="text-neutral-500 hover:text-rose-500 font-bold">&times;</button>
                </span>
              )}
              {selectedSillage && (
                <span className="bg-neutral-900 border border-neutral-850 text-neutral-300 rounded px-2.5 py-1 flex items-center gap-1.5">
                  <span>Sillage: {selectedSillage}</span>
                  <button onClick={() => setSelectedSillage('')} className="text-neutral-500 hover:text-rose-500 font-bold">&times;</button>
                </span>
              )}
              {searchTerm && (
                <span className="bg-neutral-900 border border-neutral-850 text-neutral-300 rounded px-2.5 py-1 flex items-center gap-1.5">
                  <span>Keyword: "{searchTerm}"</span>
                  <button onClick={() => setSearchTerm('')} className="text-neutral-500 hover:text-rose-500 font-bold">&times;</button>
                </span>
              )}
            </div>
          )}

          {/* Results check empty */}
          {sortedProducts.length === 0 ? (
            <div className="bg-neutral-950 border border-neutral-900 rounded-2xl p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-burgundy/10 border border-burgundy/30 flex items-center justify-center mx-auto text-gold text-2xl font-black">
                !
              </div>
              <h4 className="text-xl font-serif text-white font-bold">No Scent Matches Found</h4>
              <p className="text-xs text-neutral-405 font-sans max-w-sm mx-auto">
                No matching perfumes align with your active filters. Try resetting the filters or relaxing the budget cap slider.
              </p>
              <button
                onClick={handleResetFilters}
                className="bg-gold-gradient text-neutral-950 text-xs font-sans font-bold px-5 py-2.5 rounded-xl uppercase tracking-wider"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            /* Results grid / list render */
            <div
              className={`grid gap-6 ${
                viewMode === 'grid'
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                  : 'grid-cols-1'
              }`}
            >
              {sortedProducts.map(prod => (
                <ProductCard key={prod.id} product={prod} viewMode={viewMode} />
              ))}
            </div>
          )}

          {/* Guarantee Seal banner bottom */}
          <div className="bg-maroon-gradient rounded-xl border border-rose-950/20 p-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex gap-3 items-center">
              <span className="w-10 h-10 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold text-lg">🎖️</span>
              <div>
                <h5 className="font-serif font-bold text-white text-sm tracking-widest uppercase">7-Day Fragrance Satisfaction Insurance</h5>
                <p className="text-neutral-400 font-sans text-xs mt-0.5">Not aligning with your skin contact chemistry? Exchange standardly at our boutique.</p>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
