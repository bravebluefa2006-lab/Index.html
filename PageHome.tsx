import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Hero } from './Hero';
import { ProductCard } from './ProductCard';
import { BLOG_ARTICLES } from '../data/blog';
import { Star, Shield, Clock, MapPin, Sparkles, Send, Gift, Flame } from 'lucide-react';
import { ThreeDPerfume } from './ThreeDPerfume';

export const PageHome: React.FC = () => {
  const { products, navigateTo, addToast, setActiveBlogId, setActiveProductId, addToRecentlyViewed } = useShop();
  
  // Contact Form state
  const [cName, setCName] = useState('');
  const [cEmail, setCEmail] = useState('');
  const [cMsg, setCMsg] = useState('');

  // Newsletter state
  const [newsEmail, setNewsEmail] = useState('');

  const bestSellers = products.filter(p => p.category === 'Best Sellers' || p.rating >= 4.8).slice(0, 4);
  const featuredAttars = products.filter(p => p.category === 'Attar').slice(0, 4);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cName || !cEmail || !cMsg) {
      addToast('Please complete all contact query fields.', 'warning');
      return;
    }
    addToast(`Thank you ${cName}! Your inquiry was recorded successfully. We will contact you back under 24 hours.`, 'success');
    setCName('');
    setCEmail('');
    setCMsg('');
  };

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsEmail) return;
    addToast('Subscribed! Welcome to the exclusive Arzhaar VIP fragrance circle.', 'success');
    setNewsEmail('');
  };

  const handleBlogClick = (id: string) => {
    setActiveBlogId(id);
    navigateTo('blog');
  };

  const handleCategoryClClick = (catName: string) => {
    navigateTo('catalog');
    setTimeout(() => {
      const eV = new CustomEvent('catSelect', { detail: catName });
      window.dispatchEvent(eV);
    }, 100);
  };

  return (
    <div className="space-y-16 pb-12">
      {/* Slideshow hero */}
      <Hero />

      {/* Brand values banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-charcoal border border-neutral-900 rounded-2xl p-6 md:p-8 text-center text-sm">
          <div className="flex flex-col items-center space-y-3 p-4">
            <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-gold" />
            </div>
            <h4 className="font-serif font-bold text-white text-base tracking-wide">Elite House Blends</h4>
            <p className="text-xs text-neutral-400 font-sans leading-relaxed">Artisanal formulas refined standardly inside Karachi under absolute premium ingredient compliance.</p>
          </div>

          <div className="flex flex-col items-center space-y-3 p-4 border-t md:border-t-0 md:border-l border-neutral-910">
            <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center">
              <Shield className="w-6 h-6 text-gold" />
            </div>
            <h4 className="font-serif font-bold text-white text-base tracking-wide">100% Authentic Quality</h4>
            <p className="text-xs text-neutral-400 font-sans leading-relaxed">We supply pure certified fragrances imported directly from Lattafa, Ajmal, Al Haramain, &amp; Rasasi.</p>
          </div>

          <div className="flex flex-col items-center space-y-3 p-4 border-t md:border-t-0 md:border-l border-neutral-910">
            <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center">
              <Clock className="w-6 h-6 text-gold" />
            </div>
            <h4 className="font-serif font-bold text-white text-base tracking-wide">Heavy 12h+ Longevity</h4>
            <p className="text-xs text-neutral-400 font-sans leading-relaxed">Engineered using rich, oily concentrated extraits that stand resilient in humid maritime Pakistani heat.</p>
          </div>

          <div className="flex flex-col items-center space-y-3 p-4 border-t md:border-t-0 md:border-l border-neutral-910">
            <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center">
              <Gift className="w-6 h-6 text-gold" />
            </div>
            <h4 className="font-serif font-bold text-white text-base tracking-wide">Luxury Member Perks</h4>
            <p className="text-xs text-neutral-400 font-sans leading-relaxed">Member-only coupon codes, complimentary sample vials, and velvet gift wrap ribbons.</p>
          </div>
        </div>
      </div>

      {/* Collection Quick Category Buttons links */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-10">
          <span className="text-[10px] font-mono tracking-widest text-gold uppercase">Curated Portfolios</span>
          <h2 className="text-3xl md:text-4xl font-serif text-white font-bold tracking-wide leading-none">
            Browse Scent Masterworks
          </h2>
          <div className="w-24 h-0.5 bg-gold mx-auto mt-2.5"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { name: 'Men', label: 'Men Scent', desc: 'Bold, dry wood & spicy leather', bg: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=400&q=80' },
            { name: 'Women', label: 'Women Scent', desc: 'Velvet orchids, vanilla & sweet rose', bg: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=400&q=80' },
            { name: 'Unisex', label: 'Unisex', desc: 'Balanced structural harmonies', bg: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=400&q=80' },
            { name: 'Attar', label: 'Pure Attar', desc: 'Traditional alcohol-free oils', bg: 'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&w=400&q=80' },
            { name: 'Luxury', label: 'Luxury series', desc: 'Precious oud resin extracts', bg: 'https://images.unsplash.com/photo-1512303500371-55536e95a535?auto=format&fit=crop&w=400&q=80' }
          ].map((cat, i) => (
            <div
              key={i}
              onClick={() => handleCategoryClClick(cat.name)}
              className="group relative cursor-pointer overflow-hidden rounded-xl h-56 border border-neutral-900 group hover:border-gold/30 transition-all flex flex-col justify-end p-4"
            >
              <img
                src={cat.bg}
                alt={cat.name}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent transition-opacity duration-300 group-hover:via-black/55"></div>
              
              <div className="relative z-10 leading-tight">
                <h4 className="font-serif font-bold text-lg text-white group-hover:text-gold transition-colors">{cat.label}</h4>
                <p className="text-[10px] text-neutral-400 font-mono mt-1 hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity duration-300">{cat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Hero Deals banner */}
      <section className="bg-maroon-gradient py-12 border-t border-b border-rose-950/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-xl text-center lg:text-left">
              <div className="inline-flex items-center gap-1 bg-burgundy/60 border border-gold/20 text-gold px-3.5 py-1 rounded-full text-xs font-mono font-semibold uppercase">
                <Flame className="w-3.5 h-3.5 animate-bounce" />
                <span>Midnight Deals</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-serif text-white font-extrabold tracking-wide">
                Special Karachi Boutique Discounts
              </h3>
              <p className="text-sm text-neutral-300 leading-relaxed font-sans">
                Save an extra 10% on already reduced pricing code-wide. Enjoy free premium velvet pouch packaging, direct home deliveries, and high concentration luxury scent strips.
              </p>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 w-full max-w-sm flex flex-col items-center justify-center text-center space-y-4 shadow-2xl">
              <p className="text-[10px] font-mono tracking-widest uppercase text-neutral-400">Arzhaar VIP Coupon Code</p>
              <div className="border border-dashed border-gold/40 text-gold bg-neutral-950/80 px-6 py-3 rounded-lg text-2xl font-mono font-black select-all tracking-widest text-shadow-gold shadow-md">
                KARACHI10
              </div>
              <p className="text-[11px] text-neutral-400 leading-normal">
                Enter code during cart calculation to enjoy extra discounts. Valid across entire catalog!
              </p>
              <button
                onClick={() => navigateTo('catalog')}
                className="w-full bg-gold-gradient text-neutral-950 p-2.5 rounded-xl font-sans font-bold text-xs uppercase"
              >
                Redeem Code Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Scent Studio 3D Customizer */}
      <ThreeDPerfume />

      {/* Trending Series: Best Sellers Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-neutral-200">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-8 pb-4 border-b border-neutral-905">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-gold uppercase">Best Sellers Portfolio</span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-wide">Trending Arab Favorites</h3>
          </div>
          <button
            onClick={() => navigateTo('catalog')}
            className="text-xs text-gold hover:text-gold-light mt-2 sm:mt-0 font-sans tracking-wide font-semibold flex items-center gap-1"
          >
            <span>View Full Catalog</span>
            <span>&rarr;</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map(prod => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* Featured Perfume Oils Attar slider */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-8 pb-4 border-b border-neutral-905">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-gold uppercase">Traditional Concentrates</span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-wide">Pure Concentrated Oils (Attar)</h3>
          </div>
          <button
            onClick={() => handleCategoryClClick('Attar')}
            className="text-xs text-gold hover:text-gold-light mt-2 sm:mt-0 font-sans tracking-wide font-semibold flex items-center gap-1"
          >
            <span>Browse All Attars</span>
            <span>&rarr;</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredAttars.map(prod => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* Blog Guides section cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-10">
          <span className="text-[10px] font-mono tracking-widest text-gold uppercase">Fragrance Guides</span>
          <h2 className="text-2xl md:text-3xl font-serif text-white font-bold tracking-wide">
            The Scent Master School
          </h2>
          <p className="text-xs text-neutral-400 font-sans">Educating perfume collection patrons in Karachi since 2011.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_ARTICLES.slice(0, 3).map(art => (
            <div
              key={art.id}
              onClick={() => handleBlogClick(art.id)}
              className="bg-charcoal border border-neutral-900 rounded-xl overflow-hidden cursor-pointer group hover:border-gold/20 transition-all flex flex-col justify-between"
            >
              <div className="relative h-48 overflow-hidden bg-neutral-900">
                <img src={art.image} alt={art.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <span className="absolute bottom-3 left-3 bg-black/85 text-gold text-[9px] font-mono uppercase px-2 py-0.5 rounded tracking-widest border border-neutral-800">
                  {art.category}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="text-[10px] font-mono text-neutral-500">{art.date} • {art.readTime}</span>
                  <h4 className="text-base font-serif font-bold text-neutral-200 line-clamp-1 group-hover:text-gold transition-colors">
                    {art.title}
                  </h4>
                  <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>

                <div className="border-t border-neutral-900 mt-4 pt-3 text-right">
                  <span className="text-[10px] text-gold uppercase tracking-widest font-sans font-bold flex items-center justify-end gap-1 group-hover:gap-2.5 transition-all">
                    <span>Read Article</span>
                    <span>&rarr;</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Store Location with customized darkened Google Maps embed details */}
      <section className="bg-[#09090a] py-14 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Info panel */}
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-[10px] font-mono tracking-widest text-gold uppercase">KARACHI SANCTUARY</span>
                <h3 className="text-3xl font-serif text-white font-extrabold tracking-wide">
                  Physical Store Fragrance Sanctuary
                </h3>
                <div className="w-16 h-0.5 bg-gold mt-2"></div>
              </div>

              <p className="text-sm text-neutral-300 font-sans leading-relaxed">
                We invite luxury scent hunters to physical consultations. Experience raw ingredients, evaluate top notes directly on skin test-beds, and configure custom ratios with our boutique specialists.
              </p>

              <div className="space-y-3 pt-2 text-xs sm:text-sm text-neutral-400 font-sans">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-neutral-200 font-semibold block mb-0.5">Physical Address Location:</strong>
                    <span>Orangi Town, Karachi, Pakistan.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-neutral-200 font-semibold block mb-0.5">Phone Contacts:</strong>
                    <span>+92 314 7155873</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-neutral-200 font-semibold block mb-0.5">Customer Support:</strong>
                    <span>bluefa2266@gmail.com</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-maroon-gradient border border-rose-950/20 rounded-xl max-w-sm">
                <h5 className="font-serif font-semibold text-gold text-xs uppercase mb-1">⏰ VISITATION TIMINGS:</h5>
                <p className="text-[11px] text-neutral-300">Mon - Sat: 2:00 PM to 11:00 PM<br />Sunday: Closed for custom blending</p>
              </div>
            </div>

            {/* Map Frame Embed */}
            <div className="rounded-xl border border-neutral-800 overflow-hidden relative shadow-2xl h-[330px]">
              {/* Google Maps Embed with Karachi Orangi coordinates pin */}
              <iframe
                title="Arzhaar Brhave Perfumes physical store map locator"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m2!1m3!1d14470.932973146436!2d67.01429813580552!3d24.95726210352233!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33f90119de7cd%3A0xe53ee6637e6f8819!2sOrangi%20Town%2C%20Karachi%20City%2C%20Sindh%2C%20Pakistan!5e0!3m2!1sen!2s!4v1703649662121!5m2!1sen!2s"
                width="100%"
                height="100%"
                className="border-0 grayscale filter contrast-125 brightness-75"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

          </div>
        </div>
      </section>

      {/* Interactive Contact Us sheet Form layout */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-charcoal border border-neutral-900 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-mono tracking-widest text-gold uppercase">Scent consultations</span>
            <h3 className="text-2xl font-serif text-white font-bold">Inquire &amp; Order Custom Formulas</h3>
            <p className="text-xs text-neutral-400">Specify scent types, budget preferences, or order details.</p>
          </div>

          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-wide">Patron Name</label>
                <input
                  type="text"
                  required
                  value={cName}
                  onChange={e => setCName(e.target.value)}
                  placeholder="e.g. Adeel Farooqi"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-gold/40"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-wide">Email Coordinates</label>
                <input
                  type="email"
                  required
                  value={cEmail}
                  onChange={e => setCEmail(e.target.value)}
                  placeholder="e.g. adeel@gmail.com"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-gold/40"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-wide">Consultation Context / Details</label>
              <textarea
                required
                rows={4}
                value={cMsg}
                onChange={e => setCMsg(e.target.value)}
                placeholder="What type of fragrances do you like? e.g. Spicy Woody, Sweet vanilla, French floral, or concentrated winter Oudh..."
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-gold/40"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gold-gradient text-neutral-950 font-sans font-bold py-3 rounded-xl uppercase tracking-wider text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Scent Inquiry</span>
            </button>
          </form>
        </div>
      </section>

      {/* Newsletter Signup bar */}
      <section className="bg-neutral-950 p-8 text-center max-w-7xl mx-auto rounded-xl border border-neutral-900">
        <div className="max-w-xl mx-auto space-y-4">
          <h4 className="text-xl font-serif font-bold text-white tracking-wide">
            Enlist in the Exclusive VIP Scent Portal
          </h4>
          <p className="text-xs text-neutral-400 font-sans leading-relaxed">
            Register your email coordinates to receive custom fragrance logs, first access to limited seasonal extracts, and secret discount coupons sent standardly.
          </p>
          <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row items-center gap-2 max-w-md mx-auto pt-2">
            <input
              type="email"
              required
              value={newsEmail}
              onChange={e => setNewsEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-1 w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-gold/40"
            />
            <button
              type="submit"
              className="bg-gold hover:opacity-90 text-neutral-950 font-sans text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-xl w-full sm:w-auto"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

    </div>
  );
};
