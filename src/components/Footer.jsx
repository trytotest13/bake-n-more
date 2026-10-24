import React from 'react';
import { Sparkles, Heart, MapPin, Phone, Clock } from 'lucide-react';

function Footer() {
  const scrollToSection = (e, id) => {
    e.preventDefault();
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <footer id="footer" className="bg-[#1F1511] text-white pt-16 pb-24 md:pb-16 border-t border-white/10">
      <div className="container mx-auto px-4 sm:px-6">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="md:col-span-5 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E8590C] to-[#F59F00] flex items-center justify-center text-white shadow-md shadow-[#E8590C]/20">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-black text-2xl tracking-tight text-white">
                  BAKE 'N' MORE
                </span>
                <span className="text-[10px] tracking-[0.2em] font-extrabold text-[#E8590C] uppercase -mt-1">
                  Café & Artisan Bakery
                </span>
              </div>
            </div>
            
            <p className="font-body text-xs sm:text-sm text-white/70 max-w-sm leading-relaxed mt-1">
              Kalyanpur’s beloved neighbourhood bakery & café. Crafting custom celebration cakes, melt-in-mouth pastries, and fresh savouries with uncompromised love.
            </p>

            <div className="mt-4 flex flex-col gap-2 text-xs text-white/60 font-body">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#E8590C] shrink-0" />
                <span>Keshav Puram, Kalyanpur, Kanpur, UP 208019</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#E8590C] shrink-0" />
                <span>+91 75719 83301</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Open Daily: 10:00 AM – 10:00 PM</span>
              </div>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-4 flex flex-col items-start">
            <span className="font-heading text-xs font-black uppercase tracking-widest text-[#E8590C] mb-4">
              Explore
            </span>
            <div className="grid grid-cols-2 gap-y-2.5 gap-x-6 text-xs sm:text-sm font-bold text-white/80 font-body">
              <a href="#home" onClick={(e) => scrollToSection(e, '#home')} className="hover:text-[#F59F00] transition-colors">Home</a>
              <a href="#menu" onClick={(e) => scrollToSection(e, '#menu')} className="hover:text-[#F59F00] transition-colors">Artisan Menu</a>
              <a href="#custom-cakes" onClick={(e) => scrollToSection(e, '#custom-cakes')} className="hover:text-[#F59F00] transition-colors">Cake Atelier</a>
              <a href="#about" onClick={(e) => scrollToSection(e, '#about')} className="hover:text-[#F59F00] transition-colors">Our Story</a>
              <a href="#gallery" onClick={(e) => scrollToSection(e, '#gallery')} className="hover:text-[#F59F00] transition-colors">Photo Gallery</a>
              <a href="#contact" onClick={(e) => scrollToSection(e, '#contact')} className="hover:text-[#F59F00] transition-colors">Visit & Contact</a>
            </div>
          </div>

          {/* Online Ordering Links */}
          <div className="md:col-span-3 flex flex-col items-start">
            <span className="font-heading text-xs font-black uppercase tracking-widest text-[#E8590C] mb-4">
              Instant Ordering
            </span>
            <p className="font-body text-xs text-white/60 mb-4 leading-relaxed">
              Order directly online or chat with our counter on WhatsApp for instant delivery across Kalyanpur.
            </p>
            <div className="flex flex-col gap-2.5 w-full">
              <a
                href="https://wa.me/917571983301?text=Hi%20Bake%20n%20More!%20I%20would%20like%20to%20order."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <span>Chat on WhatsApp</span>
              </a>
              <a
                href="https://www.zomato.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors border border-white/10"
              >
                <span>Order on Zomato</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50 text-center sm:text-left font-body">
          <p>© {new Date().getFullYear()} Bake 'n' More, Kalyanpur, Kanpur. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <span>Freshly Baked Daily, Made with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-current inline" />
            <span>in Kanpur.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
