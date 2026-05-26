import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { User, ClipboardList, Settings, Lock, Package, Truck, Compass, CheckCircle } from 'lucide-react';

export const PageAccount: React.FC = () => {
  const { currentUser, logoutUser, updateUserProfile, orders, navigateTo, addToast } = useShop();

  // Profile forms
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Karachi');

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setPhone(currentUser.phone);
      setAddress(currentUser.address);
      setCity(currentUser.city);
    }
  }, [currentUser]);

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !address || !city) {
      addToast('Please input all profile parameters.', 'warning');
      return;
    }
    updateUserProfile(name, phone, address, city);
  };

  const handleTrackDirect = (trackId: string) => {
    navigateTo('tracker');
    setTimeout(() => {
      const ev = new CustomEvent('trackingTrigger', { detail: trackId });
      window.dispatchEvent(ev);
    }, 100);
  };

  if (!currentUser || !currentUser.isLoggedIn) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 bg-neutral-950 border border-neutral-900 rounded-full flex items-center justify-center mx-auto text-gold">
          <Lock className="w-10 h-10 animate-pulse" />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-serif text-white font-bold leading-tight tracking-wide">
            VIP Patron Account Lobby
          </h2>
          <p className="text-xs text-neutral-400 font-sans leading-relaxed">
            Please log in or register your account to view your purchase histories, track shipping live-steps, and modify recipient billing directions.
          </p>
        </div>

        <div className="bg-neutral-950 p-4 border border-rose-950/20 rounded-xl text-left text-xs text-neutral-400 space-y-1 block leading-normal">
          <p className="text-gold font-bold mb-1">💡 DEV DEMO PATRON PATHWAYS:</p>
          <p>Click <strong className="text-white">"VIP Lounge"</strong> on the top bar and enter default coordinates:</p>
          <p className="font-mono text-white select-all">Email: bluefa2266@gmail.com</p>
          <p className="font-mono text-white select-all">Password: admin</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 text-neutral-200">
      
      {/* Account top profile hero */}
      <div className="bg-maroon-gradient rounded-2xl p-6 sm:p-8 border border-rose-950/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 blur-3xl rounded-full"></div>
        
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-16 h-16 rounded-full bg-gold-gradient text-neutral-950 font-serif font-black text-2xl flex items-center justify-center border border-dark">
            {currentUser.name.charAt(0)}
          </div>
          <div>
            <span className="text-[10px] font-mono tracking-widest text-gold uppercase">PATRON PORTAL</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-wide">{currentUser.name}</h2>
            <p className="text-xs text-neutral-400 font-mono mt-0.5">{currentUser.email}</p>
          </div>
        </div>

        <button
          onClick={logoutUser}
          className="bg-neutral-950 border border-neutral-850 text-neutral-400 hover:text-rose-500 hover:border-rose-950 px-5 py-2 rounded-xl text-xs font-sans font-bold uppercase transition-colors select-none cursor-pointer relative z-10"
        >
          Disconnect Account
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left columnist profile editor - span 5 */}
        <form onSubmit={handleProfileUpdate} className="lg:col-span-5 bg-charcoal border border-neutral-900 rounded-2xl p-6 space-y-4">
          <h3 className="text-lg font-serif font-bold text-white tracking-wide border-b border-neutral-900 pb-3 flex items-center gap-2">
            <Settings className="w-5 h-5 text-gold-dark" />
            <span>Profile Directions settings</span>
          </h3>

          <div className="space-y-3.5 text-xs font-sans">
            <div className="space-y-1.5">
              <label className="text-neutral-400 font-mono text-[10px]">Patron Display Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-850 rounded-lg p-2.5 text-neutral-200 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-neutral-400 font-mono text-[10px]">Registry Phone coordinates</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-850 rounded-lg p-2.5 text-neutral-200 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-neutral-400 font-mono text-[10px]">Pakistan Delivery City</label>
              <select
                value={city}
                onChange={e => setCity(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-855 rounded-lg p-2.5 text-neutral-200 focus:outline-none"
              >
                <option value="Karachi">Karachi</option>
                <option value="Lahore">Lahore</option>
                <option value="Islamabad">Islamabad</option>
                <option value="Rawalpindi">Rawalpindi</option>
                <option value="Faisalabad">Faisalabad</option>
                <option value="Multan">Multan</option>
                <option value="Peshawar">Peshawar</option>
                <option value="Quetta">Quetta</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-neutral-400 font-mono text-[10px]">Default Street Delivery Address</label>
              <input
                type="text"
                required
                value={address}
                onChange={e => setAddress(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-855 rounded-lg p-2.5 text-neutral-200 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gold-gradient text-neutral-950 font-sans text-xs font-bold uppercase py-3 rounded-lg hover:opacity-90 transition-all cursor-pointer shadow"
            >
              Update Vault Records
            </button>
          </div>
        </form>

        {/* Right columnist Order history - span 7 */}
        <div className="lg:col-span-7 space-y-5">
          <h3 className="text-lg font-serif font-bold text-white tracking-wide border-b border-neutral-900 pb-3 flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-gold-dark" />
            <span>Scent Purchase Histories ({orders.length})</span>
          </h3>

          {orders.length === 0 ? (
            <div className="bg-neutral-950 border border-neutral-900 rounded-2xl p-8 text-center space-y-4">
              <Package className="w-12 h-12 text-neutral-600 mx-auto" />
              <h4 className="text-base font-serif text-white font-bold">No Scent Placements Yet</h4>
              <p className="text-xs text-neutral-500 font-sans leading-relaxed max-w-xs mx-auto">
                Any orders you secure will register automatically in this visual ledger for easy tracking histories.
              </p>
              <button
                onClick={() => navigateTo('catalog')}
                className="bg-gold text-neutral-950 font-sans text-xs font-bold px-4 py-2 rounded-lg"
              >
                Assemble Select Scent
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map(ord => (
                <div key={ord.id} className="bg-[#100E0E] border border-neutral-900 rounded-xl p-4 sm:p-5 space-y-3.5 shadow">
                  
                  {/* Row Top headings */}
                  <div className="flex flex-wrap items-center justify-between border-b border-neutral-950 pb-2.5 text-[11px] font-mono gap-2 text-neutral-400">
                    <div>Order No: <strong className="text-white font-semibold select-all">{ord.orderNumber}</strong></div>
                    <div>Placed On: <strong className="text-neutral-300">{ord.date}</strong></div>
                    <div className="flex items-center gap-1.5 font-bold">
                      <span className="w-2 h-2 rounded-full bg-gold animate-ping"></span>
                      <span className="text-gold uppercase text-[10px]">{ord.status}</span>
                    </div>
                  </div>

                  {/* Summary of items in order */}
                  <div className="space-y-2 text-xs">
                    {ord.items.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between font-sans">
                        <span className="text-neutral-300 font-serif font-bold">{item.product.name} ({item.selectedSize}) <span className="text-neutral-500 font-mono text-[10px]">x{item.quantity}</span></span>
                        <span className="font-mono text-neutral-400">Rs. {(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>

                  {/* Address coordinates mini box */}
                  <div className="p-3 bg-neutral-950/80 rounded border border-neutral-900 text-[11px] text-zinc-400 space-y-1 font-sans">
                    <p className="text-neutral-200 font-semibold flex items-center gap-1"><Truck className="w-3.5 h-3.5 text-gold-dark" /> Shipping Registry address:</p>
                    <p>{ord.shippingAddress.fullName} • Phone: {ord.shippingAddress.phone}</p>
                    <p>{ord.shippingAddress.address}, {ord.shippingAddress.city}</p>
                  </div>

                  {/* Subtotal + link triggers */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-2.5 border-t border-neutral-950 gap-3">
                    <div className="text-xs sm:text-sm font-sans text-neutral-400">
                      Settled Total: <strong className="text-gold font-serif text-base sm:text-lg">Rs. {ord.total.toLocaleString()}</strong>
                    </div>

                    <button
                      onClick={() => handleTrackDirect(ord.trackingNumber)}
                      className="bg-neutral-900 hover:bg-neutral-800 border border-neutral-850 px-4 py-2 rounded-lg text-xs font-mono text-gold font-semibold tracking-wide flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Compass className="w-3.5 h-3.5" />
                      <span>Track {ord.trackingNumber.split('-')[1]}</span>
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
