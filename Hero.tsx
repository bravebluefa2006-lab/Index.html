import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { Sparkles, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  id: string;
  productId?: string;
  categoryFilter?: string;
  image: string;
  title: string;
  tagline: string;
  description: string;
  btnText: string;
}

export const Hero: React.FC = () => {
  const { setActiveProductId, navigateTo } = useShop();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: Slide[] = [
    {
      id: 'slide-01',
      productId: 'arz-01',
      image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1200&h=600&q=80',
      title: 'Oud Al Karachi',
      tagline: 'GOLDEN ROYAL AMBER & CAMBODIAN AGARWOOD',
      description: 'Our flagship masterpiece blends dense, warm ocean breezes with premium saffron and raw Cambodian wood extracts. Crafted elegantly for Karachi’s elite nights.',
      btnText: 'Acquire Signature Scent'
    },
    {
      id: 'slide-02',
      productId: 'arz-07',
      image: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=1200&h=600&q=80',
      title: 'Khamrah Divine by Lattafa',
      tagline: 'THE VIRAL GOURMAND SENSATION',
      description: 'An intoxicating dessert-like bouquet enveloping sweet dates, cinnamon, warm baked brown pralines, and Madagascar vanilla pod absolute.',
      btnText: 'Experience Khamrah'
    },
    {
      id: 'slide-03',
      productId: 'arz-04',
      image: 'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=1200&h=600&q=80',
      title: 'Hawas for Him',
      tagline: 'UNFILTERED AQUATIC DOMINANCE',
      description: 'The global summer champion. Blends green apple, fresh melon, and salt-laden grey ambergris for infinite cooling projection outdoors.',
      btnText: 'Shop Best Seller'
    },
    {
      id: 'slide-04',
      categoryFilter: 'Attar',
      image: 'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&w=1200&h=600&q=80',
      title: 'Majestic Jasmine Attar',
      tagline: '100% PURE ALCOHOL-FREE CONCENTRATED OILS',
      description: 'Experience standard organic distillation. Non-volatile Indian Sandalwood oil binds floral jasmine compounds safely on skin for day-long aura projection.',
      btnText: 'Browse Attar Collection'
    },
    {
      id: 'slide-05',
      productId: 'arz-23',
      image: 'https://images.unsplash.com/photo-1590156546746-c58d048d8440?auto=format&fit=crop&w=1200&h=600&q=80',
      title: 'Velvet Gold Limited Release',
      tagline: 'ELITE ORANGE BLOSSOM & FRENCH CHOCOLATE',
      description: 'A sumptuous, sweet-floral-oriental formula of radiant orange blossoms, orchids, caramel, and heavy molten dark white chocolate blocks.',
      btnText: 'Explore Limited Volume'
    }
  ];

  // Auto rotate slides every 7s
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleCTA = (slide: Slide) => {
    if (slide.productId) {
      setActiveProductId(slide.productId);
    } else if (slide.categoryFilter) {
      navigateTo('catalog');
      setTimeout(() => {
        const e = new CustomEvent('catSelect', { detail: slide.categoryFilter });
        window.dispatchEvent(e);
      }, 100);
    } else {
      navigateTo('catalog');
    }
  };

  const handlePrev = () => {
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentSlide(prev => (prev + 1) % slides.length);
  };

  return (
    <section className="relative w-full h-[400px] sm:h-[500px] md:h-[580px] bg-[#050505] overflow-hidden border-b border-[#D4AF37]/25">
      
      {/* Slide Images */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* Lazy-loaded styled image */}
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />

          {/* Deep dark gradient overlay to ensure highest text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>

          {/* Content panel */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 space-y-4 sm:space-y-6">
              
              <div className="inline-flex items-center gap-1.5 bg-[#4a0404]/80 backdrop-blur-md border border-[#D4AF37]/35 text-[#D4AF37] px-3.5 py-1.5 rounded-full text-[10px] md:text-xs font-mono uppercase tracking-widest leading-none">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{slide.tagline}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-white font-extrabold tracking-wide leading-none max-w-2xl text-shadow-gold">
                {slide.title}
              </h2>

              <p className="text-sm md:text-base text-neutral-300 font-sans max-w-xl leading-relaxed hidden sm:block">
                {slide.description}
              </p>

              <div>
                <button
                  onClick={() => handleCTA(slide)}
                  className="bg-[#D4AF37] text-[#050505] px-6 sm:px-8 py-3 rounded-full font-sans font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#B76E79] hover:text-white transition-all duration-300 cursor-pointer shadow-xl hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>{slide.btnText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>

        </div>
      ))}

      {/* Slide Navigation Left/Right Arrows */}
      <button
        type="button"
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 bg-black/50 hover:bg-[#4a0404] border border-[#D4AF37]/30 text-[#D4AF37] hover:text-white rounded-full transition-all duration-200 focus:outline-none cursor-pointer"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        type="button"
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 bg-black/50 hover:bg-[#4a0404] border border-[#D4AF37]/30 text-[#D4AF37] hover:text-white rounded-full transition-all duration-200 focus:outline-none cursor-pointer"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Navigation Dot Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2.5 z-10 bg-[#0a0a0a]/80 backdrop-blur px-3.5 py-1.5 rounded-full border border-[#D4AF37]/25">
        {slides.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setCurrentSlide(idx)}
            className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
              idx === currentSlide ? 'bg-[#D4AF37]' : 'bg-neutral-605 hover:bg-neutral-500'
            }`}
          ></button>
        ))}
      </div>

    </section>
  );
};
