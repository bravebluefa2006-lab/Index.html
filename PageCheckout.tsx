import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { Order } from '../types';
import { Check, ClipboardList, MapPin, CreditCard, Sparkles, Building2, Smartphone, Receipt, ArrowRight, ArrowLeft } from 'lucide-react';

export const PageCheckout: React.FC = () => {
  const {
    cart,
    currentUser,
    placeOrder,
    couponDiscount,
    activeCouponCode,
    navigateTo,
    addToast
  } = useShop();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

  // Address entries
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Karachi');
  const [instructions, setInstructions] = useState('');

  // Payment choice selector
  const [paymentMethod, setPaymentMethod] = useState<Order['paymentMethod']>('Cash on Delivery');

  // Autofill if logged in and enforce login gate
  useEffect(() => {
    if (currentUser && currentUser.isLoggedIn) {
      setFullName(currentUser.name);
      setPhone(currentUser.phone);
      setAddress(currentUser.address);
      setCity(currentUser.city);
    } else {
      navigateTo('cart');
      addToast('Sign-In is strictly required before making a purchase. Welcoming you to the VIP Lounge!', 'warning');
      window.dispatchEvent(new CustomEvent('openAuthModal'));
    }
  }, [currentUser]);

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const promoFreeShip = activeCouponCode.toUpperCase().trim() === 'FREESHIP';
  const isFreeShip = subtotal > 8000 || promoFreeShip;
  const deliveryCharges = subtotal === 0 ? 0 : (isFreeShip ? 0 : 250);
  const discountAmount = Math.round(subtotal * (couponDiscount / 100));
  const grandTotal = subtotal - discountAmount + deliveryCharges;

  const handleNextStep = () => {
    if (step === 1) {
      if (cart.length === 0) return;
      setStep(2);
    } else if (step === 2) {
      if (!fullName || !phone || !address || !city) {
        alert('Please fill out all required shipping details.');
        return;
      }
      setStep(3);
    }
  };

  const handlePrevStep = () => {
    if (step === 2) setStep(1);
    if (step === 3) setStep(2);
  };

  const handlePlaceOrderSubmit = () => {
    const shipping = {
      fullName,
      phone,
      address,
      city,
      optionalInstructions: instructions
    };
    
    const results = placeOrder(shipping, paymentMethod, activeCouponCode || undefined);
    if (results) {
      setPlacedOrder(results);
    }
  };

  // If order placed successfully, show beautiful success overlay
  if (placedOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 animate-fade-in text-neutral-200">
        <div className="bg-charcoal border border-rose-950/20 rounded-2xl p-6 sm:p-10 shadow-3xl text-center space-y-8 relative overflow-hidden">
          
          {/* Ambient background glows */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-gold/5 blur-3xl rounded-full"></div>
          
          <div className="w-20 h-20 bg-gold/10 border border-gold/40 rounded-full flex items-center justify-center mx-auto text-gold text-3xl animate-bounce shadow-xl relative z-10">
            ✓
          </div>

          <div className="space-y-2 relative z-10">
            <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase">Scent Transaction Complete</span>
            <h2 className="text-3xl font-serif text-white font-black leading-tight tracking-wide">
              Barakah! Order Placed Successfully
            </h2>
            <p className="text-xs text-neutral-400 font-sans max-w-md mx-auto">
              Your aromatic journey has begun. Our perfume experts in Karachi are preparing your olfactory seals.
            </p>
          </div>

          {/* Reference numbers receipt metadata */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-neutral-950 p-4 border border-neutral-900 rounded-xl max-w-xl mx-auto text-center font-mono">
            <div>
              <span className="text-[9px] text-neutral-500 block uppercase">Order Number</span>
              <span className="text-xs text-neutral-200 font-bold select-all">{placedOrder.orderNumber}</span>
            </div>
            <div>
              <span className="text-[9px] text-neutral-500 block uppercase">Tracking ID</span>
              <span className="text-xs text-neutral-200 font-bold select-all">{placedOrder.trackingNumber}</span>
            </div>
            <div>
              <span className="text-[9px] text-neutral-500 block uppercase">Amount Settled</span>
              <span className="text-xs text-gold font-extrabold">Rs. {placedOrder.total.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-[9px] text-neutral-500 block uppercase">Method selection</span>
              <span className="text-[11px] text-[#E2C39B] font-semibold">{placedOrder.paymentMethod}</span>
            </div>
          </div>

          {/* Step actions depending on chosen payment method */}
          <div className="bg-neutral-950/50 p-6 rounded-xl border border-neutral-900 text-left max-w-xl mx-auto space-y-4 text-xs sm:text-sm">
            <h4 className="font-serif font-bold text-gold text-sm tracking-wide border-b border-neutral-900 pb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>Scent Settle Instructions ({placedOrder.paymentMethod})</span>
            </h4>

            {placedOrder.paymentMethod === 'Cash on Delivery' && (
              <p className="text-neutral-300 leading-relaxed font-sans">
                Our logistics couriers will deliver to address: <strong className="text-white">{placedOrder.shippingAddress.address}</strong>. Please ensure cash amount of <strong className="text-white">Rs. {placedOrder.total.toLocaleString()}</strong> is prepared upon contact coordination.
              </p>
            )}

            {placedOrder.paymentMethod === 'Bank Transfer' && (
              <div className="space-y-2.5 leading-relaxed font-sans text-neutral-300">
                <p>Please initiate transfer to our verified brand accounts in Karachi:</p>
                <div className="bg-neutral-950 p-3 rounded border border-neutral-900 font-mono text-xs space-y-1 block text-neutral-200">
                  <p>Bank Name: <strong className="text-white">HMBL Habib Metropolitan Bank</strong></p>
                  <p>Account Title: <strong className="text-white">BLUEFA PERFUMES AGENCY</strong></p>
                  <p>Account Number: <strong className="text-white">1204-7155-8730-019</strong></p>
                  <p>IBAN Pakistan: <strong className="text-white select-all">PK19HMBL120471558730019</strong></p>
                </div>
                <p className="text-[11px] text-neutral-400">Kindly email screenshot verification to <strong className="text-neutral-200">bluefa2266@gmail.com</strong> or WhatsApp <strong className="text-neutral-200">+92 314 7155873</strong> detailing Order Number {placedOrder.orderNumber} for instant confirmation.</p>
              </div>
            )}

            {placedOrder.paymentMethod === 'EasyPaisa' && (
              <div className="space-y-2.5 leading-relaxed font-sans text-neutral-300">
                <p>Transfer to our direct commerce wallet:</p>
                <div className="bg-neutral-950 p-3 rounded border border-neutral-900 font-mono text-xs space-y-1 block text-neutral-200">
                  <p>Wallet Brand: <strong className="text-white">EasyPaisa (Telenor Microfinance Bank)</strong></p>
                  <p>Account Title: <strong className="text-white">Arzhaar Brhave Fragrance</strong></p>
                  <p>Till Number Code: <strong className="text-white select-all">923147155873</strong></p>
                </div>
                <p className="text-[11px] text-neutral-400">Screenshot submission coordinates: WhatsApp <strong className="text-neutral-200">+92 314 7155873</strong>.</p>
              </div>
            )}

            {placedOrder.paymentMethod === 'JazzCash' && (
              <div className="space-y-2.5 leading-relaxed font-sans text-neutral-300">
                <p>Transfer to our secure Mobilink JazzCash commerce portal:</p>
                <div className="bg-neutral-950 p-3 rounded border border-neutral-900 font-mono text-xs space-y-1 block text-neutral-200">
                  <p>Wallet Brand: <strong className="text-white">JazzCash (Mobilink Bank)</strong></p>
                  <p>Account Title: <strong className="text-white">Arzhaar Fragrances Inc</strong></p>
                  <p>Merchant Till ID: <strong className="text-white select-all">3147155873</strong></p>
                </div>
                <p className="text-[11px] text-neutral-400">Screenshot verification: WhatsApp <strong className="text-neutral-200">+92 314 7155873</strong>.</p>
              </div>
            )}
          </div>

          <p className="text-xs text-neutral-500 font-mono italic">
            A confirmation receipt summary has been logged within your profile tracker. Enjoy your signature scents!
          </p>

          <button
            onClick={() => {
              // Direct navigation to tracking Order list
              setPlacedOrder(null);
              setStep(1);
              // Set tracking search value in window custom events or navigate. Let's redirect beautifully.
              navigateTo('tracker');
              setTimeout(() => {
                const e = new CustomEvent('trackingTrigger', { detail: placedOrder.trackingNumber });
                window.dispatchEvent(e);
              }, 100);
            }}
            className="bg-gold-gradient text-neutral-950 px-8 py-3.5 rounded-xl font-sans font-bold text-xs uppercase shadow-md cursor-pointer inline-block"
          >
            Track My Scent Logistics
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Page Breadcrumbs */}
      <div className="flex items-center gap-1.5 text-[11px] font-mono tracking-wider text-neutral-500 uppercase">
        <span>Arzhaar Brhave</span>
        <span>/</span>
        <span className="text-gold">Scent transaction checkout</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left column: Steps forms - span 8 */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Step Timeline tracker indicator block */}
          <div className="bg-charcoal border border-neutral-900 rounded-2xl p-4 flex justify-between items-center text-xs text-neutral-400 font-sans">
            <div className="flex items-center gap-2">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold font-mono text-[11px] ${
                step === 1 ? 'bg-gold text-neutral-950 font-extrabold' : 'bg-neutral-900 text-neutral-500 border border-neutral-800'
              }`}>1</span>
              <span className={step === 1 ? 'font-bold text-neutral-200' : ''}>Cart Review</span>
            </div>
            
            <div className="h-px bg-neutral-900 flex-1 mx-4"></div>

            <div className="flex items-center gap-2">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold font-mono text-[11px] ${
                step === 2 ? 'bg-gold text-neutral-950 font-extrabold' : 'bg-neutral-900 text-neutral-500 border border-neutral-800'
              }`}>2</span>
              <span className={step === 2 ? 'font-bold text-neutral-200' : ''}>Recipient Address</span>
            </div>

            <div className="h-px bg-neutral-900 flex-1 mx-4"></div>

            <div className="flex items-center gap-2">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold font-mono text-[11px] ${
                step === 3 ? 'bg-gold text-neutral-950 font-extrabold' : 'bg-neutral-900 text-neutral-500 border border-neutral-800'
              }`}>3</span>
              <span className={step === 3 ? 'font-bold text-neutral-200' : ''}>Payment settlement</span>
            </div>
          </div>

          {/* Checkout Steps execution */}
          <div className="bg-charcoal border border-neutral-900 rounded-2xl p-6 shadow-xl space-y-6">
            
            {/* STEP 1: Verify Cart items list */}
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-serif font-bold text-white tracking-wide border-b border-neutral-900 pb-3 flex items-center gap-2">
                  <ClipboardList className="w-5 h-5 text-gold" />
                  <span>Verify Scent Selection List</span>
                </h3>

                {cart.length === 0 ? (
                  <p className="text-sm text-neutral-500">Your cart has zero products. Add items before checking out!</p>
                ) : (
                  <div className="divide-y divide-neutral-900/60 font-sans text-neutral-300">
                    {cart.map(item => (
                      <div key={item.id} className="flex gap-4 items-center justify-between py-3">
                        <div className="flex items-center gap-3">
                          <img src={item.product.image} alt={item.product.name} referrerPolicy="no-referrer" className="w-8 h-10 object-cover rounded" />
                          <div>
                            <h4 className="text-xs font-bold text-neutral-250">{item.product.name}</h4>
                            <span className="text-[10px] font-mono text-neutral-500 uppercase">{item.selectedSize} • Qty {item.quantity}</span>
                          </div>
                        </div>
                        <span className="text-xs font-serif font-bold text-gold">Rs. {(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={handleNextStep}
                    disabled={cart.length === 0}
                    className="bg-gold-gradient text-neutral-950 px-6 py-3 rounded-lg font-sans font-bold text-xs uppercase flex items-center gap-2 disabled:opacity-50 cursor-pointer shadow-md"
                  >
                    <span>Proceed to Address</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Address entry form */}
            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-serif font-bold text-white tracking-wide border-b border-neutral-900 pb-3 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-gold" />
                  <span>Recipient Shipping Address</span>
                </h3>

                {!currentUser && (
                  <div className="bg-neutral-950 p-3 rounded-lg border border-neutral-900 text-xs text-neutral-400 leading-normal flex items-center justify-between mb-2">
                    <span>Registered Arzhaar VIP? Sign In to auto-fill.</span>
                    <button
                      onClick={() => {
                        // Prompt login trigger
                        addToast('Click "VIP Lounge" on top bar to authenticate!', 'info');
                      }}
                      className="text-gold font-bold underline"
                    >
                      Authenticate Now
                    </button>
                  </div>
                )}

                <div className="space-y-4 text-xs font-sans">
                  
                  <div className="space-y-1.5">
                    <label className="text-neutral-400 block font-mono text-[10px]">Recipient Full Name *</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      placeholder="e.g. Syed Owais"
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-3 text-neutral-200 placeholder-neutral-600 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-neutral-400 block font-mono text-[10px]">Contact Mobile Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder="e.g. 03147155873"
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-3 text-neutral-200 placeholder-neutral-600 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-neutral-400 block font-mono text-[10px]">Pakistan Shipping City *</label>
                      <select
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        className="w-full bg-neutral-900 border border-neutral-805 rounded-lg p-3 text-neutral-200 focus:outline-none"
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
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-neutral-400 block font-mono text-[10px]">Detailed Delivery Street Address *</label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={e => setAddress(e.target.value)}
                      placeholder="Sector Number, Street coordinates, House, Orangi Town, Karachi"
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-3 text-neutral-200 placeholder-neutral-600 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-neutral-400 block font-mono text-[10px]">Courier Timings or Specific Instructions (Optional)</label>
                    <textarea
                      rows={2}
                      value={instructions}
                      onChange={e => setInstructions(e.target.value)}
                      placeholder="e.g. Provide scent strip test strips, leave code at gate, call after 4 PM..."
                      className="w-full bg-neutral-900 border border-neutral-805 rounded-lg p-3 text-neutral-200 placeholder-neutral-600 focus:outline-none"
                    />
                  </div>

                </div>

                <div className="pt-4 flex justify-between border-t border-neutral-900/60 mt-4">
                  <button
                    onClick={handlePrevStep}
                    className="border border-neutral-800 hover:border-gold/30 text-neutral-400 hover:text-white px-5 py-3 rounded-lg text-xs font-sans font-semibold flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>

                  <button
                    onClick={handleNextStep}
                    className="bg-gold-gradient text-neutral-950 px-6 py-3 rounded-lg font-sans font-bold text-xs uppercase flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>Proceed to Payment</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Payment settlement choice */}
            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-serif font-bold text-white tracking-wide border-b border-neutral-900 pb-3 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-gold" />
                  <span>Choose Settle Payment Channel</span>
                </h3>

                <div className="flex flex-col gap-3 font-sans text-neutral-300">
                  
                  {/* CoD */}
                  <label className={`border rounded-xl p-4 flex items-start gap-3.5 cursor-pointer transition-all ${
                    paymentMethod === 'Cash on Delivery'
                      ? 'bg-burgundy/15 border-rose-950 text-neutral-205 shadow'
                      : 'bg-neutral-900/50 border-neutral-850 hover:border-neutral-800'
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'Cash on Delivery'}
                      onChange={() => setPaymentMethod('Cash on Delivery')}
                      className="accent-gold mt-1"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <strong className="text-white text-sm font-bold">Standard Cash on Delivery (COD)</strong>
                        <span className="bg-neutral-950 border border-neutral-800 text-gold text-[9px] font-mono px-1.5 py-0.5 rounded tracking-wider">Fastest</span>
                      </div>
                      <p className="text-xs text-neutral-405 leading-relaxed mt-1">Settle cash total upon receipt of order from courier driver. Available across entire Pakistan.</p>
                    </div>
                  </label>

                  {/* EasyPaisa */}
                  <label className={`border rounded-xl p-4 flex items-start gap-3.5 cursor-pointer transition-all ${
                    paymentMethod === 'EasyPaisa'
                      ? 'bg-burgundy/15 border-rose-950 text-neutral-205 shadow'
                      : 'bg-neutral-900/50 border-neutral-850 hover:border-neutral-800'
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'EasyPaisa'}
                      onChange={() => setPaymentMethod('EasyPaisa')}
                      className="accent-gold mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-1.5">
                        <strong className="text-white text-sm font-bold flex items-center gap-1.5">
                          <Smartphone className="w-4 h-4 text-emerald-500" />
                          <span>EasyPaisa Wallet</span>
                        </strong>
                        <span className="text-[10px] text-zinc-500 font-mono">Automatic Instructions</span>
                      </div>
                      <p className="text-xs text-neutral-405 leading-relaxed mt-1">Make direct transfers easily to our merchant till digits shown on completion receipt screen.</p>
                    </div>
                  </label>

                  {/* JazzCash */}
                  <label className={`border rounded-xl p-4 flex items-start gap-3.5 cursor-pointer transition-all ${
                    paymentMethod === 'JazzCash'
                      ? 'bg-burgundy/15 border-rose-950 text-neutral-205 shadow'
                      : 'bg-neutral-900/50 border-neutral-850 hover:border-neutral-800'
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'JazzCash'}
                      onChange={() => setPaymentMethod('JazzCash')}
                      className="accent-gold mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-1.5">
                        <strong className="text-white text-sm font-bold flex items-center gap-1.5">
                          <Smartphone className="w-4 h-4 text-orange-500" />
                          <span>JazzCash Mobile Account</span>
                        </strong>
                        <span className="text-[10px] text-zinc-500 font-mono">Automatic Instructions</span>
                      </div>
                      <p className="text-xs text-neutral-405 leading-relaxed mt-1">Quick transfer using Mobilink wallet numbers. Direct instructions printed on confirmation step.</p>
                    </div>
                  </label>

                  {/* Direct Bank Transfer */}
                  <label className={`border rounded-xl p-4 flex items-start gap-3.5 cursor-pointer transition-all ${
                    paymentMethod === 'Bank Transfer'
                      ? 'bg-burgundy/15 border-rose-950 text-neutral-205 shadow'
                      : 'bg-neutral-900/50 border-neutral-850 hover:border-neutral-800'
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'Bank Transfer'}
                      onChange={() => setPaymentMethod('Bank Transfer')}
                      className="accent-gold mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-1.5">
                        <strong className="text-white text-sm font-bold flex items-center gap-1.5">
                          <Building2 className="w-4 h-4 text-gold-dark" />
                          <span>Direct Wire Bank Transfer</span>
                        </strong>
                        <span className="text-[10px] text-zinc-500 font-mono">IBAN Available</span>
                      </div>
                      <p className="text-xs text-neutral-405 leading-relaxed mt-1">Transfer straight using any bank app. Account details generated on completion block.</p>
                    </div>
                  </label>

                </div>

                <div className="pt-4 flex justify-between border-t border-neutral-900/60 mt-4">
                  <button
                    onClick={handlePrevStep}
                    className="border border-neutral-800 hover:border-gold/30 text-neutral-400 hover:text-white px-5 py-3 rounded-lg text-xs font-sans font-semibold flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>

                  <button
                    onClick={handlePlaceOrderSubmit}
                    disabled={cart.length === 0}
                    className="bg-gold-gradient text-neutral-950 font-sans font-bold px-7 py-3 rounded-lg shadow-lg text-xs uppercase flex items-center gap-2 cursor-pointer transition-transform hover:-translate-y-0.5"
                  >
                    <Check className="w-4 h-4" />
                    <span>Conclude &amp; Register Order</span>
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>

        {/* Right column: Order Total Sum Ledger - span 4 */}
        <div className="lg:col-span-4">
          <div className="bg-charcoal border border-neutral-900 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-lg font-serif font-bold text-white tracking-wide border-b border-neutral-900 pb-3 flex items-center gap-1.5">
              <Receipt className="w-4.5 h-4.5 text-gold-dark" />
              <span>Checkout Ledger</span>
            </h3>

            <div className="space-y-3.5 text-xs sm:text-sm font-sans text-neutral-300">
              <div className="flex justify-between">
                <span>Total Fragrances:</span>
                <span className="font-semibold text-neutral-200">Rs. {subtotal.toLocaleString()}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-rose-450 font-medium">
                  <span>Coupon Deduction ({activeCouponCode}):</span>
                  <span>- Rs. {discountAmount.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Shipping Delivery Fee:</span>
                <span>
                  {deliveryCharges === 0 ? <strong className="text-green-500 text-xs font-mono">FREE SHIPPING</strong> : `Rs. ${deliveryCharges}`}
                </span>
              </div>

              <div className="border-t border-neutral-900/65 pt-3.5 flex justify-between items-baseline">
                <span className="font-bold text-neutral-250">Final Total Sum:</span>
                <span className="text-2xl font-serif text-gold font-extrabold text-shadow-gold">Rs. {grandTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Delivery warnings */}
            <div className="bg-neutral-950/80 p-3 rounded-lg border border-neutral-900/50 text-[11px] leading-relaxed text-neutral-400">
              <p className="font-semibold text-neutral-300 mb-1">🎁 VIP GIFT BOX ENVELOPE:</p>
              <p>Every transaction triggers our luxury black-maroon gold-seal perfume box with complimentary scent-strips! Prepared with artisan love in Karachi.</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
