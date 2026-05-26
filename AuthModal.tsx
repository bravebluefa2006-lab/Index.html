import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Lock, Mail, User, Phone, MapPin, Sparkles, Key } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { loginUser, addToast } = useShop();
  const [view, setView] = useState<'signin' | 'signup' | 'forgot'>('signin');
  
  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Karachi');

  useEffect(() => {
    if (isOpen) {
      setView('signin');
      // Reset fields
      setEmail('');
      setPassword('');
      setFullName('');
      setPhone('');
      setAddress('');
      setCity('Karachi');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      addToast('Please enter both email and password.', 'warning');
      return;
    }

    // Retrieve registered users database
    const saved = localStorage.getItem('ab_credentials_db');
    let users = saved ? JSON.parse(saved) : [];

    // Prepopulate a admin default user for ease of testing
    if (users.length === 0) {
      users.push({
        email: 'bluefa2266@gmail.com',
        password: 'admin',
        name: 'Arzhaar VIP Patron',
        phone: '+92 314 7155873',
        address: 'Orangi Town, Sector 11-A',
        city: 'Karachi'
      });
      localStorage.setItem('ab_credentials_db', JSON.stringify(users));
    }

    const userMatch = users.find((u: any) => u.email.toLowerCase() === email.toLowerCase() && u.password === password);

    if (userMatch) {
      loginUser(userMatch.email, userMatch.name, userMatch.phone, userMatch.address, userMatch.city);
      onClose();
    } else if (email === 'bluefa2266@gmail.com' && password === 'admin') {
      loginUser('bluefa2266@gmail.com', 'Arzhaar Master Patron', '+92 314 7155873', 'Orangi Town, Sector 11-A', 'Karachi');
      onClose();
    } else {
      addToast('Invalid email credentials or password. (Hint: Register, or use email: "bluefa2266@gmail.com" with password: "admin")', 'warning');
    }
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !fullName || !phone || !address) {
      addToast('Please fill out all registration fields.', 'warning');
      return;
    }

    const saved = localStorage.getItem('ab_credentials_db');
    let users = saved ? JSON.parse(saved) : [];

    // Duplicate check
    const duplicate = users.some((u: any) => u.email.toLowerCase() === email.toLowerCase());
    if (duplicate) {
      addToast('Account with this email already exists. Try signing in!', 'warning');
      return;
    }

    // Save new profile card
    const newUser = {
      email,
      password,
      name: fullName,
      phone,
      address,
      city
    };

    users.push(newUser);
    localStorage.setItem('ab_credentials_db', JSON.stringify(users));

    // Send register notification to server to dispatch welcome email
    fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        name: fullName,
        phone,
        address,
        city
      })
    })
    .catch(err => {
      console.warn('Backend registration email skipped:', err);
    });

    addToast('Account created successfully!', 'success');
    loginUser(email, fullName, phone, address, city);
    onClose();
  };

  const handleForgot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      addToast('Please enter your email address.', 'warning');
      return;
    }
    
    // Simulate recovery
    addToast('Password recovery link has been simulated to your email. Under production mode: Your password is reset to "admin"!', 'info');
    
    // Auto reset for sandbox testing convenience
    const saved = localStorage.getItem('ab_credentials_db');
    if (saved) {
      let users = JSON.parse(saved);
      const idx = users.findIndex((u: any) => u.email.toLowerCase() === email.toLowerCase());
      if (idx > -1) {
        users[idx].password = 'admin';
        localStorage.setItem('ab_credentials_db', JSON.stringify(users));
      }
    }
    setView('signin');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/75">
      <div className="relative w-full max-w-md bg-charcoal border border-neutral-800 rounded-2xl shadow-3xl overflow-hidden animate-fade-in flex flex-col max-h-[90vh]">
        
        {/* Banner header visual */}
        <div className="bg-maroon-gradient border-b border-rose-950/20 p-6 flex flex-col justify-end relative overflow-hidden flex-shrink-0">
          <div className="absolute right-4 top-4 z-10">
            <button
              onClick={onClose}
              className="text-neutral-400 hover:text-gold transition-colors p-1.5 bg-black/30 rounded-full focus:outline-none"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-gold animate-pulse" />
            <span className="text-xs uppercase tracking-widest text-gold-light/80 font-mono">Arzhaar Brhave Perfumes</span>
          </div>
          <h3 className="text-2xl font-serif text-white font-bold leading-tight">
            {view === 'signin' && 'Sign In to Your Sanctuary'}
            {view === 'signup' && 'Register VIP Signature Account'}
            {view === 'forgot' && 'Retrieve Scent Credentials'}
          </h3>
          <p className="text-xs text-neutral-400 mt-1">
            {view === 'signin' && 'Unlock order track history, secret formulas, and member rewards.'}
            {view === 'signup' && 'Create your profile card for elegant checkouts and bespoke recommendations.'}
            {view === 'forgot' && 'Enter your premium account email to override security codes.'}
          </p>
        </div>

        {/* Scrollable form body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {view === 'signin' && (
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-neutral-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="e.g. customer@example.com"
                    className="w-full bg-neutral-900 border border-neutral-800 focus:border-gold/50 rounded-xl pl-11 pr-4 py-3 text-sm text-neutral-200 placeholder-neutral-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block">Scent Credentials (Password)</label>
                  <button
                    type="button"
                    onClick={() => setView('forgot')}
                    className="text-xs text-gold hover:text-gold-light transition-colors"
                  >
                    Forgot?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-neutral-500" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-neutral-900 border border-neutral-800 focus:border-gold/50 rounded-xl pl-11 pr-4 py-3 text-sm text-neutral-200 placeholder-neutral-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Tips for test log in */}
              <div className="bg-neutral-950/80 rounded-xl p-3 border border-neutral-800 text-[10px] text-neutral-400 font-mono leading-relaxed">
                <p className="text-gold font-semibold mb-1">💡 QUICK SANDBOX TESTING CREDENTIALS:</p>
                <p>Email: <span className="text-white font-bold select-all">bluefa2266@gmail.com</span></p>
                <p>Password: <span className="text-white font-bold select-all">admin</span></p>
              </div>

              <button
                type="submit"
                className="w-full bg-gold-gradient text-neutral-950 hover:opacity-90 font-sans font-semibold py-3 px-4 rounded-xl shadow-lg transition-transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer text-center text-sm tracking-wider uppercase"
              >
                Sign In
              </button>
            </form>
          )}

          {view === 'signup' && (
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-neutral-500" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    placeholder="e.g. Syed Owais"
                    className="w-full bg-neutral-900 border border-neutral-800 focus:border-gold/50 rounded-xl pl-11 pr-4 py-3 text-sm text-neutral-200 placeholder-neutral-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-neutral-500" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="name@email.com"
                      className="w-full bg-neutral-900 border border-neutral-800 focus:border-gold/50 rounded-xl pl-11 pr-4 py-3 text-sm text-neutral-200 placeholder-neutral-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block">Secured Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-neutral-500" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-neutral-900 border border-neutral-800 focus:border-gold/50 rounded-xl pl-11 pr-4 py-3 text-sm text-neutral-200 placeholder-neutral-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block">Phone (+92)</label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-neutral-500" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="e.g. 03147155873"
                      className="w-full bg-neutral-900 border border-neutral-800 focus:border-gold/50 rounded-xl pl-11 pr-4 py-3 text-sm text-neutral-200 placeholder-neutral-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block">Pakistan City</label>
                  <select
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 focus:border-gold/50 rounded-xl px-4 py-3 text-sm text-neutral-200 focus:outline-none transition-colors"
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
                <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block">Shipping Location address</label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-neutral-500" />
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    placeholder="Street, Sector No, Orangi Town, Karachi"
                    className="w-full bg-neutral-900 border border-neutral-800 focus:border-gold/50 rounded-xl pl-11 pr-4 py-3 text-sm text-neutral-200 placeholder-neutral-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gold-gradient text-neutral-950 hover:opacity-90 font-sans font-semibold py-3 px-4 rounded-xl shadow-lg transition-transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer text-center text-sm tracking-wider uppercase"
              >
                Register Account
              </button>
            </form>
          )}

          {view === 'forgot' && (
            <form onSubmit={handleForgot} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block">Verify Account Email</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-neutral-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="e.g. bluefa2266@gmail.com"
                    className="w-full bg-neutral-900 border border-neutral-800 focus:border-gold/50 rounded-xl pl-11 pr-4 py-3 text-sm text-neutral-200 placeholder-neutral-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gold-gradient text-neutral-950 hover:opacity-90 font-sans font-semibold py-3 px-4 rounded-xl shadow-lg transition-transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer text-center text-sm tracking-wider uppercase"
              >
                Send Scent Recovery Code
              </button>
            </form>
          )}
        </div>

        {/* Auth Footer Toggle */}
        <div className="bg-[#0f0e0f] border-t border-neutral-800 p-4 text-center text-xs text-neutral-400 flex-shrink-0">
          {view === 'signin' && (
            <p>
              New VIP collector?{' '}
              <button
                onClick={() => setView('signup')}
                className="text-gold font-semibold hover:text-gold-light transition-colors"
              >
                Create an account
              </button>
            </p>
          )}
          {view === 'signup' && (
            <p>
              Already Registered?{' '}
              <button
                onClick={() => setView('signin')}
                className="text-gold font-semibold hover:text-gold-light transition-colors"
              >
                Sign In
              </button>
            </p>
          )}
          {view === 'forgot' && (
            <p>
              Back to entry screen?{' '}
              <button
                onClick={() => setView('signin')}
                className="text-gold font-semibold hover:text-gold-light transition-colors"
              >
                Sign In
              </button>
            </p>
          )}
        </div>

      </div>
    </div>
  );
};
