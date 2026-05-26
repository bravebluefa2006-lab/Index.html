import React, { useState } from 'react';
import { Mail, Phone, MapPin, Sparkles, Star, ChevronDown, Award, Users, Heart } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
}

export const PageAbout: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      q: 'Do you offer Cash on Delivery (COD) inside Karachi and nationwide?',
      a: 'Yes, absolutely. We support standard Cash on Delivery (COD) throughout Karachi, Lahore, Islamabad, and all major packaging nodes of Pakistan. Delivery takes 1-2 days within Karachi and 3-4 days nationwide.'
    },
    {
      q: 'Where is your physical boutique situated, and what are the timings?',
      a: 'Our physical scent laboratory sanctuary is located in Orangi Town, Karachi, Pakistan. We welcome clients standardly from Monday to Saturday, between 2:00 PM and 11:00 PM. Sunday is reserved for pure extraction.'
    },
    {
      q: 'How do you guarantee 12h+ perfume longevity in Karachi s humid summer?',
      a: 'Karachi’s humid coastal temperatures degrade regular perfumes rapidly. We solve this by compiling highly concentrated Extraits de Parfum (30% to 40% pure oil ratio binders). We standardly load heavy organic agarwood and musk resins that anchor fragrance compounds firmly to fabric and skin.'
    },
    {
      q: 'Are your Attars entirely alcohol-free?',
      a: 'Yes. Our traditional concentrated oil rollers (Attars) are 100% pure, non-volatile natural concentrates distilled organically. They contain absolutely zero synthetic or chemical alcohol additives, making them fully compliant for religious observations.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 text-neutral-200 font-sans">
      
      {/* Path headers */}
      <div className="flex items-center gap-1.5 text-[11px] font-mono tracking-wider text-neutral-550 uppercase">
        <span>Arzhaar Brhave</span>
        <span>/</span>
        <span className="text-gold">Our Legacy Story</span>
      </div>

      {/* Hero Brand heading logs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-neutral-900 pb-12">
        <div className="lg:col-span-7 space-y-5 leading-relaxed">
          <div className="inline-flex items-center gap-1.5 bg-burgundy/50 border border-rose-900/30 text-gold px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ESTABLISHED 2011</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white font-extrabold tracking-wide leading-tight">
            The Dynasty of Arzhaar Brhave Perfumery
          </h2>

          <div className="w-20 h-0.5 bg-gold"></div>

          <p className="text-neutral-300 text-sm sm:text-base">
            Born in the vibrant, historical alleys of Karachi, <strong className="text-white">Arzhaar Brhave</strong> is a testament to the timeless heritage of authentic Eastern aromatherapy. Founded by master blender Sufyan Brhave, we set out with a simple promise: to bridge Cambodian royal amberwood resins with modern French floral oils.
          </p>

          <p className="text-xs sm:text-sm text-neutral-400">
            Every formula we curate is produced standardly using traditional steam extraction inside our Orangi Town facility. We balance dense oud extracts alongside cooling aquatic freshness, resulting in specialized scent profiles engineered perfectly for Karachi climate conditions.
          </p>
        </div>

        <div className="lg:col-span-5 h-[340px] rounded-2xl overflow-hidden border border-neutral-850 relative shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&h=800&q=85"
            alt="Sourcing liquid lavender raw oils and premium agarwood block extracts"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          
          <div className="absolute bottom-6 left-6 right-6 p-4 bg-black/80 backdrop-blur-md rounded-xl border border-neutral-900 text-xs text-center">
            <p className="text-gold font-serif font-bold text-sm">"The signature of Karachi patrons."</p>
            <p className="text-neutral-400 font-mono text-[10px] mt-1">— Sufyan Brhave, Founder</p>
          </div>
        </div>
      </div>

      {/* Core Brand statistics blocks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="bg-charcoal border border-neutral-900 rounded-xl p-6 space-y-2">
          <Award className="w-8 h-8 text-gold mx-auto" />
          <h4 className="text-2xl font-serif font-bold text-white tracking-widest">30% to 40%</h4>
          <p className="text-xs text-neutral-400 uppercase tracking-widest font-mono">Oil Extrait Concentration</p>
        </div>

        <div className="bg-charcoal border border-neutral-900 rounded-xl p-6 space-y-2">
          <Users className="w-8 h-8 text-gold mx-auto" />
          <h4 className="text-2xl font-serif font-bold text-white tracking-widest">14,500+</h4>
          <p className="text-xs text-neutral-400 uppercase tracking-widest font-mono">Elite Pakistan Patrons Secured</p>
        </div>

        <div className="bg-charcoal border border-neutral-900 rounded-xl p-6 space-y-2">
          <Heart className="w-8 h-8 text-gold mx-auto" />
          <h4 className="text-2xl font-serif font-bold text-white tracking-widest">26+ Elite</h4>
          <p className="text-xs text-neutral-400 uppercase tracking-widest font-mono">Masterpiece Fragrance Recipes</p>
        </div>
      </div>

      {/* Legacy FAQS Dropdowns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-t border-neutral-900 pt-12">
        
        {/* Left side static query details */}
        <div className="lg:col-span-5 space-y-4">
          <span className="text-[10px] font-mono tracking-widest text-gold uppercase">PATRON ALIGNMENT FAQ</span>
          <h3 className="text-2xl sm:text-3xl font-serif text-white font-bold leading-tight">
            Consultation Essentials &amp; Scent Knowledge
          </h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Standard customer alignment queries regarding pure oils extraction, sillage, shipping timelines inside Pakistan, and custom blending processes.
          </p>
        </div>

        {/* Right side interactive drop panel */}
        <div className="lg:col-span-7 space-y-3.5">
          {faqs.map((f, idx) => (
            <div
              key={idx}
              className="bg-charcoal border border-neutral-900 rounded-xl overflow-hidden shadow-sm"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full text-left p-4 flex items-center justify-between gap-4 font-sans text-xs sm:text-sm font-bold text-neutral-200 hover:text-gold transition-colors focus:outline-none focus:bg-neutral-950/40"
              >
                <span>{f.q}</span>
                <ChevronDown className={`w-4 h-4 text-neutral-400 transition-transform ${openFaq === idx ? 'rotate-180 text-gold' : ''}`} />
              </button>

              {openFaq === idx && (
                <div className="px-4 pb-4 font-sans text-xs text-neutral-400 leading-relaxed border-t border-neutral-905 pt-3">
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>

      {/* Customer Acclaim Grid */}
      <div className="border-t border-neutral-900 pt-12 space-y-6">
        <div className="text-center space-y-1">
          <span className="text-[10px] font-mono text-gold uppercase tracking-widest">PATRON COMMENDATIONS</span>
          <h3 className="text-2xl font-serif text-white font-bold">Verifiable Boutique Reviews</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: 'Dr. Faisal Naqvi', r: 5, date: '12 Jan 2026', comment: 'Oud Al Karachi is a marvel. I wore it to an outdoor evening corporate ceremony in Clifton, and even under Karachi ocean humidity, the Cambodian Amberwood projection stood dense and royal for 14 hours.' },
            { name: 'Hina Siddiqui', r: 5, date: '04 Feb 2026', comment: 'I was skeptical ordering Lattafa Khamrah online, but Arzhaar Brhave delivered 100% original packaging safely in under 24 hours. The added tester scent strips were an elite boutique touch.' },
            { name: 'Zeeshan Shah', r: 5, date: '19 Apr 2026', comment: 'Their alcohol-free Majestic Jasmine Attar oil is incredibly smooth and creamy. It lacks any chemical volatility. Highly recommended for daily office and religious wear.' }
          ].map((item, i) => (
            <div key={i} className="bg-neutral-950 border border-neutral-900 rounded-xl p-5 space-y-3 shadow">
              <div className="flex justify-between items-center text-[10px] text-zinc-500 font-mono">
                <span className="font-bold text-neutral-300">{item.name}</span>
                <span>{item.date}</span>
              </div>
              <div className="flex gap-0.5 text-gold">
                {[...Array(item.r)].map((_, st) => <Star key={st} className="w-3.5 h-3.5 fill-gold" />)}
              </div>
              <p className="text-xs text-neutral-405 leading-relaxed font-sans italic">
                "{item.comment}"
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
