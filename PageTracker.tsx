import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { Compass, Search, Calendar, Truck, CheckCircle2, RotateCcw } from 'lucide-react';

interface TrackingStatusNode {
  title: string;
  location: string;
  desc: string;
  stepIdx: number;
}

export const PageTracker: React.FC = () => {
  const { orders } = useShop();
  const [trackInput, setTrackInput] = useState('');
  const [activeTrackingNum, setActiveTrackingNum] = useState<string>('');
  const [searchError, setSearchError] = useState(false);

  // Monitor cross-component triggers
  useEffect(() => {
    const handleTrigger = (e: Event) => {
      const trackId = (e as CustomEvent).detail;
      if (trackId) {
        setTrackInput(trackId);
        setActiveTrackingNum(trackId);
        setSearchError(false);
      }
    };
    window.addEventListener('trackingTrigger', handleTrigger);
    return () => window.removeEventListener('trackingTrigger', handleTrigger);
  }, []);

  // Sandbox demo numbers if no order exists
  const demoTrackingNums = [
    { tracker: 'AB-OOD902', name: 'Demo Order #1: Scent Sealing' },
    { tracker: 'AB-KHM589', name: 'Demo Order #2: Out for Delivery in Clifton' }
  ];

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = trackInput.toUpperCase().trim();
    if (!query) return;

    // Check if the query matches the mock order or demo codes
    const matchedRealOrder = orders.find(o => o.trackingNumber.toUpperCase() === query || o.orderNumber.toUpperCase() === query);
    const matchedDemo = demoTrackingNums.some(d => d.tracker === query);

    if (matchedRealOrder || matchedDemo) {
      setActiveTrackingNum(query);
      setSearchError(false);
    } else {
      setSearchError(true);
      setActiveTrackingNum('');
    }
  };

  const handleSelectDemo = (tracker: string) => {
    setTrackInput(tracker);
    setActiveTrackingNum(tracker);
    setSearchError(false);
  };

  // Find real order info
  const realOrder = orders.find(o => o.trackingNumber.toUpperCase() === activeTrackingNum || o.orderNumber.toUpperCase() === activeTrackingNum);

  // Determine current progression index based on tracking number seed
  let currentStepIndex = 3; // Clifton Depot routing transit default
  if (activeTrackingNum === 'AB-OOD902') currentStepIndex = 1; // Assembly stage
  if (activeTrackingNum === 'AB-KHM589') currentStepIndex = 4; // Out for delivery
  if (realOrder) {
    if (realOrder.status === 'Processing') currentStepIndex = 1;
    if (realOrder.status === 'Shipped') currentStepIndex = 3;
    if (realOrder.status === 'Delivered') currentStepIndex = 5;
  }

  const trackingTimeline: TrackingStatusNode[] = [
    { stepIdx: 0, title: 'Boutique Order Secured', location: 'Orangi Town Office, Karachi', desc: 'Order logged and verified successfully. VIP black-maroon perfume box allocated.' },
    { stepIdx: 1, title: 'Cured Scent Sealing', location: 'Fragrance Lab, Karachi', desc: 'Scent molecules matured, verified, and sealed with golden wax. Tester scent strips added.' },
    { stepIdx: 2, title: 'Avenue Handover Dispatch', location: 'Karachi Central Logistics Hub', desc: 'Sealed package handed over to boutique carrier courier partners.' },
    { stepIdx: 3, title: 'Logistics Depot Routing Transit', location: 'Clifton Sorting Terminal, Karachi', desc: 'Routing scan complete. Prepared for home delivery dispatch lanes.' },
    { stepIdx: 4, title: 'Out For Scent Delivery', location: 'Local Destination Postal Sector', desc: 'Courier rider is en-route in your area. Keep contact phone active.' },
    { stepIdx: 5, title: 'Signature Delivered', location: 'Recipient coordinates', desc: 'Enjoy your artisan fragrance. Let your aura project!' }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8 text-neutral-200">
      
      {/* Paths */}
      <div className="flex items-center gap-1.5 text-[11px] font-mono tracking-wider text-neutral-550 uppercase">
        <span>Arzhaar Brhave</span>
        <span>/</span>
        <span className="text-gold">Scent Logistics tracking</span>
      </div>

      <div className="bg-charcoal border border-neutral-900 rounded-2xl p-6 sm:p-8 space-y-6">
        
        {/* Header summary logs */}
        <div className="text-center space-y-2 max-w-sm mx-auto">
          <Compass className="w-10 h-10 text-gold mx-auto animate-spin" />
          <h2 className="text-2xl font-serif text-white font-bold tracking-wide">Live Scent Tracking Radar</h2>
          <p className="text-xs text-neutral-400 font-sans leading-relaxed">
            Enter your active Order Number or Tracking ID to monitor packaging curation states and courier transport steps.
          </p>
        </div>

        {/* Input box form */}
        <form onSubmit={handleTrackSubmit} className="max-w-md mx-auto relative flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              required
              value={trackInput}
              onChange={e => setTrackInput(e.target.value)}
              placeholder="e.g. AB-OOD902"
              className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pl-4 pr-10 py-3 text-xs text-neutral-200 placeholder-neutral-600 focus:outline-none uppercase font-mono tracking-wide"
            />
            <button type="submit" className="absolute right-3 top-3 text-neutral-405 hover:text-gold block">
              <Search className="w-4 h-4" />
            </button>
          </div>

          <button
            type="submit"
            className="bg-gold-gradient text-neutral-950 px-5 rounded-xl font-sans text-xs font-bold uppercase transition"
          >
            Track Scent
          </button>
        </form>

        {/* Search Error warning */}
        {searchError && (
          <p className="text-center text-xs text-rose-500 font-sans">
            Reference code not found. If search fails, please use sandbox simulations shown below.
          </p>
        )}

        {/* Sandbox list links always available if no active tracking matches */}
        {!activeTrackingNum && (
          <div className="bg-neutral-950 p-4 border border-rose-950/20 rounded-xl leading-normal max-w-md mx-auto text-xs text-neutral-400 space-y-2 text-center">
            <p className="text-gold font-serif font-bold">🧪 DEMO SANDBOX RADAR CODES:</p>
            <p>Select a mock code below to experience real-time courier statuses:</p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              {demoTrackingNums.map((d, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSelectDemo(d.tracker)}
                  className="bg-neutral-900 border border-neutral-850 hover:border-gold/30 p-2 text-gold rounded font-mono text-[10px]"
                >
                  {d.tracker}
                </button>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* RENDER TRAVEL TIMELINE STEPS */}
      {activeTrackingNum && (
        <div className="bg-charcoal border border-neutral-900 rounded-2xl p-6 sm:p-8 space-y-8 animate-fade-in shadow-xl">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline border-b border-neutral-900 pb-4 gap-2">
            <div>
              <p className="text-[10px] font-mono text-neutral-500 uppercase">ACTIVE RADAR MONITOR</p>
              <h3 className="text-xl font-serif text-white font-bold">Track ID: {activeTrackingNum}</h3>
            </div>
            
            <button
              onClick={() => {
                setActiveTrackingNum('');
                setTrackInput('');
              }}
              className="text-[10px] text-neutral-400 hover:text-rose-500 font-mono uppercase flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear tracker</span>
            </button>
          </div>

          {/* Timeline chart */}
          <div className="relative pl-6 sm:pl-8 space-y-6 border-l border-neutral-850">
            {trackingTimeline.map((node) => {
              const isChecked = node.stepIdx < currentStepIndex;
              const isCurrent = node.stepIdx === currentStepIndex;

              return (
                <div key={node.stepIdx} className="relative leading-relaxed">
                  
                  {/* Circle locator dot */}
                  <div className={`absolute -left-[30px] sm:-left-[39px] w-5 h-5 rounded-full flex items-center justify-center border-2 ${
                    isChecked
                      ? 'bg-gold border-neutral-950 text-neutral-950 text-[10px] font-black'
                      : (isCurrent
                          ? 'bg-neutral-950 border-gold text-gold text-[10px] font-extrabold animate-pulse'
                          : 'bg-neutral-950 border-neutral-800 text-neutral-500 text-[10.5px]')
                  }`}>
                    {isChecked ? '✓' : '●'}
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-baseline gap-2 text-xs">
                      <h4 className={`text-sm font-serif font-bold ${isCurrent ? 'text-gold text-shadow-gold' : (isChecked ? 'text-neutral-300 font-semibold' : 'text-neutral-500')}`}>
                        {node.title}
                      </h4>
                      <span className="text-[10px] font-mono text-neutral-500">({node.location})</span>
                    </div>
                    <p className={`text-xs ${isCurrent ? 'text-neutral-305' : 'text-neutral-450'} font-sans leading-relaxed max-w-xl`}>
                      {node.desc}
                    </p>
                  </div>

                </div>
              );
            })}
          </div>

          {/* If the order matches a real receipt log, display items lists */}
          {realOrder && (
            <div className="bg-neutral-950 p-4 border border-neutral-880/60 rounded-xl leading-normal space-y-3.5 font-sans">
              <h4 className="font-serif font-bold text-neutral-200 text-xs uppercase flex items-center gap-1.5 border-b border-neutral-900 pb-2">
                <Truck className="w-4 h-4 text-gold" />
                <span>Tracked Fragrances</span>
              </h4>
              <div className="space-y-2">
                {realOrder.items.map((it, n) => (
                  <div key={n} className="flex justify-between text-xs text-neutral-300">
                    <span>{it.product.name} ({it.selectedSize}) <strong className="text-neutral-500 font-mono text-[9px]">x{it.quantity}</strong></span>
                    <span className="font-mono text-neutral-400">Rs. {(it.price * it.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-maroon-gradient/10 border border-rose-950/20 rounded-xl p-4 flex gap-3 text-xs text-neutral-400 leading-normal">
            <span className="text-gold text-lg">💡</span>
            <p>
              Couriers nationwide standardly require your active phone number coordinates to finalize routing drops safely. Keep your matching mobile terminal turned on!
            </p>
          </div>

        </div>
      )}

    </div>
  );
};
