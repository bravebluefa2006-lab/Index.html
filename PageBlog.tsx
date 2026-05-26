import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { BLOG_ARTICLES } from '../data/blog';
import { Article } from '../types';
import { BookOpen, Calendar, Clock, ArrowLeft, Send, Sparkles, Star } from 'lucide-react';

export const PageBlog: React.FC = () => {
  const { activeBlogId, setActiveBlogId } = useShop();
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  // Monitor context active blogs trigger
  useEffect(() => {
    if (activeBlogId) {
      const art = BLOG_ARTICLES.find(a => a.id === activeBlogId);
      if (art) {
        setSelectedArticle(art);
      }
    } else {
      setSelectedArticle(null);
    }
  }, [activeBlogId]);

  const handleSelectArticle = (art: Article) => {
    setActiveBlogId(art.id);
    setSelectedArticle(art);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReturnToDirectory = () => {
    setActiveBlogId(null);
    setSelectedArticle(null);
  };

  // If reading deep article state
  if (selectedArticle) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8 animate-fade-in text-neutral-200">
        
        {/* Back navigation */}
        <button
          onClick={handleReturnToDirectory}
          className="flex items-center gap-2 text-gold hover:text-gold-light text-xs font-mono font-bold uppercase cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Scent Almanac</span>
        </button>

        {/* Editorial headers */}
        <div className="space-y-4">
          <span className="bg-burgundy border border-rose-950 text-gold text-[10px] font-mono uppercase px-3 py-1 rounded-full tracking-widest leading-none">
            {selectedArticle.category}
          </span>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white font-extrabold tracking-wide leading-tight text-shadow-gold">
            {selectedArticle.title}
          </h2>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-500">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-gold-dark" />
              <span>{selectedArticle.date}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-gold-dark" />
              <span>{selectedArticle.readTime} Reading Time</span>
            </span>
            <span>•</span>
            <span>Author: Master Perfumer Sufyan Brhave</span>
          </div>
        </div>

        {/* Main large illustration photo */}
        <div className="h-[260px] sm:h-[380px] rounded-2xl overflow-hidden border border-neutral-900 shadow-2xl relative">
          <img src={selectedArticle.image} alt={selectedArticle.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>

        {/* Dense Article text layout in serif */}
        <article className="prose prose-invert max-w-full font-serif text-sm sm:text-base leading-relaxed space-y-6 text-neutral-350 select-text border-b border-neutral-900 pb-10">
          
          {/* Custom paragraph splits by checking standard blog article structure */}
          <div className="bg-charcoal px-6 py-5 border border-rose-950/20 rounded-xl font-sans italic text-neutral-350 text-xs sm:text-sm shadow-inner">
            "{selectedArticle.excerpt}"
          </div>

          <div className="space-y-6">
            {selectedArticle.content.split('\n\n').map((para, idx) => {
              if (para.startsWith('###')) {
                return (
                  <h3 key={idx} className="text-lg sm:text-xl font-bold font-serif text-white tracking-wide pt-4 mb-2 flex items-center gap-2 text-shadow-gold">
                    <Sparkles className="w-4 h-4 text-gold flex-shrink-0" />
                    <span>{para.replace('###', '').trim()}</span>
                  </h3>
                );
              }
              return (
                <p key={idx} className="font-serif leading-relaxed text-sm sm:text-base text-neutral-300">
                  {para}
                </p>
              );
            })}
          </div>

        </article>

        {/* Article consultation recommendation banner feedback */}
        <div className="bg-charcoal border border-neutral-900 p-6 rounded-2xl text-center space-y-3 max-w-xl mx-auto">
          <BookOpen className="w-8 h-8 text-gold mx-auto" />
          <h4 className="font-serif font-bold text-white text-base">Seek Custom Perfume Consulting?</h4>
          <p className="text-xs text-neutral-400 font-sans leading-relaxed">
            Every patron's skin is distinct. Contact Master Perfumer Sufyan Brhave via WhatsApp to configure your concentration ratios safely.
          </p>
          <a
            href="https://wa.me/923147155873"
            target="_blank"
            rel="noreferrer"
            className="inline-block bg-emerald-600 hover:bg-emerald-500 text-white font-sans text-xs font-bold px-5 py-2.5 rounded-xl uppercase tracking-wider"
          >
            WhatsApp Consultation Inquiry
          </a>
        </div>

      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-neutral-200">
      
      {/* Breadcrumb paths */}
      <div className="flex items-center gap-1.5 text-[11px] font-mono tracking-wider text-neutral-500 uppercase">
        <span>Arzhaar Brhave</span>
        <span>/</span>
        <span className="text-gold">Scent Almanac Portal</span>
      </div>

      <div className="text-center space-y-2 max-w-xl mx-auto mb-10">
        <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase">The Arzhaar Chronicles</span>
        <h2 className="text-3xl md:text-4xl font-serif text-white font-extrabold tracking-wide leading-none">
          Odor-Logs &amp; Scent Knowledge
        </h2>
        <div className="w-20 h-0.5 bg-gold mx-auto mt-2"></div>
        <p className="text-xs text-neutral-400">
          Professional essays on Cambodia agarwood distilling, perfume layering, and humidity resilience standardly configured.
        </p>
      </div>

      {/* Grid of articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {BLOG_ARTICLES.map(art => (
          <div
            key={art.id}
            onClick={() => handleSelectArticle(art)}
            className="bg-charcoal border border-neutral-900 rounded-2xl overflow-hidden cursor-pointer group hover:border-gold/30 hover:shadow-2xl transition-all flex flex-col justify-between"
          >
            {/* Visual crop banner */}
            <div className="relative h-64 bg-zinc-950 overflow-hidden">
              <img src={art.image} alt={art.title} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-104" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              
              <span className="absolute bottom-4 left-4 bg-[#7A1E29] border border-rose-950 text-gold text-[9px] font-mono uppercase px-3 py-1 rounded-full tracking-widest font-bold">
                {art.category}
              </span>
            </div>

            {/* Typography metadata */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-550">
                  <span>{art.date}</span>
                  <span>•</span>
                  <span>{art.readTime} reading time</span>
                </div>
                <h3 className="text-xl font-serif font-bold text-neutral-200 group-hover:text-gold transition-colors leading-snug">
                  {art.title}
                </h3>
                <p className="text-xs text-neutral-400 font-sans leading-relaxed line-clamp-3">
                  {art.excerpt}
                </p>
              </div>

              {/* CTAs */}
              <div className="border-t border-neutral-900 pt-4 flex justify-between items-center text-xs font-mono">
                <span className="text-neutral-500">Author: S. Brhave</span>
                <span className="text-gold uppercase tracking-widest font-bold flex items-center gap-1 group-hover:gap-2.5 transition-all">
                  <span>Unfurl essay</span>
                  <span>&rarr;</span>
                </span>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
