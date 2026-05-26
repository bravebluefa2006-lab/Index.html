import React from 'react';
import { useShop } from '../context/ShopContext';
import { ShieldCheck, MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo } = useShop();

  const handleFooterNav = (route: any) => {
    navigateTo(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050505] border-t border-[#D4AF37]/30 font-serif text-neutral-30 relative overflow-hidden">
      
      {/* Background glow branding */}
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#4a0404]/15 blur-3xl rounded-full"></div>

      {/* Main grids */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10 text-xs sm:text-sm">
        
        {/* Brand identity column */}
        <div className="space-y-4 md:col-span-1 leading-relaxed">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleFooterNav('home')}>
            <div className="w-8 h-8 bg-burgundy border border-[#D4AF37]/45 rounded-lg flex items-center justify-center font-bold text-rose-50 font-serif">
              <span className="text-[#D4AF37] text-xs font-black">AB</span>
            </div>
            <div>
              <h4 className="font-bold tracking-widest text-[#D4AF37] uppercase">Arzhaar Brhave</h4>
              <span className="text-[9px] text-[#B76E79] uppercase font-mono block tracking-wider mt-0.5">Signature Scent House</span>
            </div>
          </div>

          <p className="text-zinc-400 font-sans text-xs leading-relaxed">
            Bespoke craft house in Karachi compiling high loyalty extraits de parfum, pure alcohol-free attars, and Arabian oil blends that project beautifully.
          </p>

          <div className="flex items-center gap-3 text-neutral-400">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-gold transition-colors p-2 bg-[#0a0a0a] border border-[#D4AF37]/25 rounded-lg">
              <Instagram className="w-4 h-4 text-[#D4AF37]" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-gold transition-colors p-2 bg-[#0a0a0a] border border-[#D4AF37]/25 rounded-lg">
              <Facebook className="w-4 h-4 text-[#D4AF37]" />
            </a>
          </div>
        </div>

        {/* Directory links column */}
        <div className="space-y-3 font-sans uppercase tracking-wider text-xs">
          <h5 className="font-bold font-serif text-[#D4AF37] tracking-widest text-[11px] border-b border-[#D4AF37]/20 pb-2">Store Directories</h5>
          <ul className="space-y-2 text-neutral-400 font-semibold text-[11px]">
            <li>
              <button onClick={() => handleFooterNav('catalog')} className="hover:text-gold cursor-pointer">Scent Catalog</button>
            </li>
            <li>
              <button onClick={() => handleFooterNav('catalog')} className="hover:text-gold cursor-pointer">Best Sellers</button>
            </li>
            <li>
              <button onClick={() => handleFooterNav('blog')} className="hover:text-gold cursor-pointer">Fragrance Almanac Book</button>
            </li>
            <li>
              <button onClick={() => handleFooterNav('about')} className="hover:text-gold cursor-pointer">House History</button>
            </li>
          </ul>
        </div>

        {/* Support helper links */}
        <div className="space-y-3 font-sans uppercase tracking-wider text-xs">
          <h5 className="font-bold font-serif text-[#D4AF37] tracking-widest text-[11px] border-b border-[#D4AF37]/20 pb-2">Help &amp; Logistics</h5>
          <ul className="space-y-2 text-neutral-400 font-semibold text-[11px]">
            <li>
              <button onClick={() => handleFooterNav('tracker')} className="hover:text-gold cursor-pointer">Track order</button>
            </li>
            <li>
              <button onClick={() => handleFooterNav('cart')} className="hover:text-gold cursor-pointer">Review cart</button>
            </li>
            <li>
              <button onClick={() => handleFooterNav('account')} className="hover:text-gold cursor-pointer">VIP account</button>
            </li>
            <li>
              <button onClick={() => handleFooterNav('about')} className="hover:text-gold cursor-pointer">Consultation FAQ</button>
            </li>
          </ul>
        </div>

        {/* Location coordinates info column */}
        <div className="space-y-3 text-xs">
          <h5 className="font-bold font-serif text-[#D4AF37] tracking-widest text-[11px] border-b border-[#D4AF37]/20 pb-2 uppercase font-sans">Scent Sanctuary</h5>
          <ul className="space-y-2.5 text-neutral-400 font-sans text-xs">
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
              <span>Sector 11, Orangi Town, Karachi, Pakistan.</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
              <a href="tel:+923147155873" className="hover:text-white transition-colors">+92 314 7155873</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
              <a href="mailto:bluefa2266@gmail.com" className="hover:text-white transition-colors">bluefa2266@gmail.com</a>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Legal, Trust indicators, and payment logo blocks */}
      <div className="bg-[#050505] border-t border-[#D4AF37]/25 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 font-sans text-xs text-neutral-500">
          
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left leading-relaxed">
            <span className="tracking-wide">© 2011-{new Date().getFullYear()} ARZHAAR BRHAVE PERFUMERS. All Rights Protected.</span>
            <span className="hidden sm:inline text-neutral-700">•</span>
            <span className="flex items-center gap-1 text-[#D4AF37]"><ShieldCheck className="w-4 h-4 text-[#D4AF37]" /> <span>Original Premium Sealed Imports</span></span>
            <span className="hidden sm:inline text-neutral-700">•</span>
            <div className="flex flex-col sm:flex-row items-center gap-1.5">
              <a 
                href="/api/download-zip" 
                target="_blank"
                rel="noopener noreferrer"
                download="arzhaar-perfumes-source.zip"
                className="inline-flex items-center gap-1.5 text-[#050505] bg-[#D4AF37] hover:bg-white hover:text-[#050505] transition-colors duration-200 px-3 py-1 rounded font-bold text-[10px] uppercase tracking-wider shadow-lg shadow-[#D4AF37]/10"
                title="Download full project source code archive as a ZIP file"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Download Source (.ZIP)</span>
              </a>
              <span className="text-[9px] text-neutral-500 font-sans block sm:inline">
                (Click or right-click &amp; open in new tab)
              </span>
            </div>
          </div>

          {/* Payment badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-[9px] font-mono uppercase text-neutral-400 tracking-wider">
            <span className="bg-[#0a0a0a] border border-[#D4AF37]/20 px-2 py-0.5 rounded">EasyPaisa</span>
            <span className="bg-[#0a0a0a] border border-[#D4AF37]/20 px-2 py-0.5 rounded">JazzCash</span>
            <span className="bg-[#0a0a0a] border border-[#D4AF37]/20 px-2 py-0.5 rounded">HBL METRO BANK</span>
            <span className="bg-[#0a0a0a] border border-[#D4AF37]/20 px-2 py-0.5 rounded">Cash on Delivery</span>
          </div>

        </div>
      </div>

    </footer>
  );
};
