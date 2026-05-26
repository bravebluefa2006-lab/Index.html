import React from 'react';
import { useShop } from '../context/ShopContext';
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';

export const FeedbackToasts: React.FC = () => {
  const { toasts, removeToast } = useShop();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map(toast => {
        let bgColor = 'bg-charcoal/95 border-neutral-800';
        let icon = <Info className="w-5 h-5 text-gold" />;

        if (toast.type === 'success') {
          bgColor = 'bg-[#150D0E]/95 border-rose-950';
          icon = <CheckCircle2 className="w-5 h-5 text-rose-500" />;
        } else if (toast.type === 'warning') {
          bgColor = 'bg-dark/95 border-[#AA7C11]/50';
          icon = <AlertTriangle className="w-5 h-5 text-gold-dark" />;
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-lg border shadow-xl backdrop-blur-md transition-all duration-300 animate-fade-in ${bgColor}`}
          >
            <div className="flex-shrink-0 mt-0.5">{icon}</div>
            <div className="flex-1 text-sm font-sans text-neutral-200">
              {toast.message}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="flex-shrink-0 text-neutral-400 hover:text-gold transition-colors focus:outline-none"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
