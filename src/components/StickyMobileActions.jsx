import React from 'react';
import { Phone, MessageCircle, ShoppingBag } from 'lucide-react';

function StickyMobileActions() {
  const phoneNumber = '+917571983301';

  const handleOrderClick = () => {
    const menuSection = document.getElementById('menu');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.open('https://www.zomato.com', '_blank');
    }
  };

  return (
    <div 
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 p-2.5 bg-white/95 backdrop-blur-xl border-t border-[#EEDCCE] shadow-[0_-8px_24px_rgba(31,21,17,0.08)] flex items-center gap-2" 
      aria-label="Mobile quick actions"
    >
      <a 
        href={`tel:${phoneNumber}`} 
        className="flex-1 py-3 px-2 rounded-2xl bg-[#1F1511] text-white flex items-center justify-center gap-2 text-xs font-bold tracking-wider active:scale-95 transition-transform"
      >
        <Phone className="w-4 h-4 text-[#C2410C]" />
        <span>CALL</span>
      </a>

      <a 
        href="https://wa.me/917571983301?text=Hi%20Bake%20n%20More!%20I%20would%20like%20to%20order." 
        target="_blank" 
        rel="noopener noreferrer" 
        className="flex-1 py-3 px-2 rounded-2xl bg-emerald-600 text-white flex items-center justify-center gap-2 text-xs font-bold tracking-wider shadow-sm active:scale-95 transition-transform"
      >
        <MessageCircle className="w-4 h-4" />
        <span>WHATSAPP</span>
      </a>

      <button 
        onClick={handleOrderClick} 
        className="flex-1 py-3 px-2 rounded-2xl bg-[#C2410C] text-white flex items-center justify-center gap-2 text-xs font-bold tracking-wider shadow-sm active:scale-95 transition-transform cursor-pointer"
      >
        <ShoppingBag className="w-4 h-4" />
        <span>MENU</span>
      </button>
    </div>
  );
}

export default StickyMobileActions;
