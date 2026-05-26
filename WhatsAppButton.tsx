import React from 'react';
import { MessageSquareCode } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const phoneNumber = '+923147155873';
  const textMessage = 'Assalam-o-Alaikum Arzhaar Brhave! I am visiting your premium fragrance store and would like to inquire about your scents.';
  const encodedMsg = encodeURIComponent(textMessage);
  const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}?text=${encodedMsg}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24 right-6 z-40 bg-[#25D366] hover:bg-[#20ba5a] text-white p-3.5 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all group flex items-center justify-center"
      title="Chat on WhatsApp"
    >
      {/* Wave animation */}
      <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75 animate-ping -z-10 group-hover:block hidden"></span>
      
      {/* Customized SVG because we are requested to use Lucide-React or look extremely professional. Wait, lucide has icon MessageSquareCode or we can use custom inline standard or just beautiful styling. We'll style it! */}
      <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.968C16.388 1.97 13.914.945 11.99.945c-5.442 0-9.87 4.372-9.874 9.802-.002 1.992.518 3.938 1.503 5.642l-1.002 3.663 3.754-.984zm11.383-7.53c-.3-.149-1.774-.875-2.048-.975-.274-.1-.474-.149-.674.15-.2.3-.775.975-.95 1.174-.175.2-.35.224-.65.075-.3-.15-1.263-.465-2.403-1.485-.888-.79-1.487-1.77-1.663-2.07-.174-.3-.019-.461.13-.61.135-.133.3-.349.45-.523.15-.174.2-.3.3-.499.1-.2.05-.375-.025-.524-.075-.15-.675-1.625-.925-2.224-.244-.589-.493-.51-.675-.519-.174-.009-.374-.01-.574-.01-.2 0-.525.075-.8.374-.275.3-1.05 1.024-1.05 2.5 0 1.475 1.075 2.9 1.225 3.1.15.2 2.11 3.22 5.11 4.52.714.31 1.27.495 1.703.633.717.227 1.37.195 1.887.118.575-.085 1.774-.724 2.024-1.424.25-.7.25-1.3 1.175-1.425.075-.124.075-.249.025-.374z"/>
      </svg>
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-out text-sm font-medium whitespace-nowrap group-hover:ml-2">
        WhatsApp Order
      </span>
    </a>
  );
};
