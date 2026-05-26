import React from 'react';
import { useShop } from './context/ShopContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { PageHome } from './components/PageHome';
import { PageCatalog } from './components/PageCatalog';
import { PageCart } from './components/PageCart';
import { PageCheckout } from './components/PageCheckout';
import { PageWishlist } from './components/PageWishlist';
import { PageAccount } from './components/PageAccount';
import { PageBlog } from './components/PageBlog';
import { PageAbout } from './components/PageAbout';
import { PageTracker } from './components/PageTracker';
import { FeedbackToasts } from './components/FeedbackToasts';
import { WhatsAppButton } from './components/WhatsAppButton';
import { LiveChat } from './components/LiveChat';
import { ProductDetailModal } from './components/ProductDetailModal';

export default function App() {
  const { currentRoute, activeProductId, setActiveProductId } = useShop();

  // Determine current active subview component
  const renderCurrentView = () => {
    switch (currentRoute) {
      case 'home':
        return <PageHome />;
      case 'catalog':
        return <PageCatalog />;
      case 'cart':
        return <PageCart />;
      case 'checkout':
        return <PageCheckout />;
      case 'wishlist':
        return <PageWishlist />;
      case 'account':
        return <PageAccount />;
      case 'blog':
        return <PageBlog />;
      case 'about':
        return <PageAbout />;
      case 'tracker':
        return <PageTracker />;
      default:
        return <PageHome />;
    }
  };

  return (
    <div className="min-h-screen bg-dark flex flex-col justify-between text-neutral-100 overflow-x-hidden selection:bg-gold selection:text-neutral-950 font-sans">
      
      {/* Top Banner Navigation Header */}
      <div>
        <Header />
        
        {/* Main Content Render Box */}
        <main className="flex-grow">
          {renderCurrentView()}
        </main>
      </div>

      {/* Corporate footer coordinates */}
      <Footer />

      {/* FLOATING ACTION PANELS */}
      
      {/* Dynamic notifications alerts */}
      <FeedbackToasts />

      {/* Floating immediate WhatsApp helpline icon */}
      <WhatsAppButton />

      {/* Interactive AI consulting chatbot */}
      <LiveChat />

      {/* Global Product Detail Modal */}
      {activeProductId && (
        <ProductDetailModal
          productId={activeProductId}
          onClose={() => setActiveProductId(null)}
        />
      )}

    </div>
  );
}
