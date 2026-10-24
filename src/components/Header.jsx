import React, { useState, useEffect } from 'react';
import { ShineButton } from './lightswind/ShineButton';
import { ShoppingBag, Phone, Menu as MenuIcon, X, Sparkles } from 'lucide-react';

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleOrderOnline = () => {
    window.open('https://www.zomato.com', '_blank');
    closeMobileMenu();
  };

  return (
    <header id="header" className="sticky top-0 z-50 px-3 sm:px-6 py-2.5 sm:py-3.5 transition-all duration-300">
      <div
        className={`max-w-7xl mx-auto rounded-2xl transition-all duration-300 px-4 sm:px-6 py-3 flex items-center justify-between border ${
          scrolled
            ? 'bg-white/92 backdrop-blur-xl border-[#EEDCCE] shadow-[0_12px_32px_rgba(31,21,17,0.08)]'
            : 'bg-white/80 backdrop-blur-md border-[#EEDCCE]/60 shadow-[0_4px_20px_rgba(31,21,17,0.04)]'
        }`}
      >
        {/* Brand Logo */}
        <a
          href="#home"
          className="flex items-center gap-3 group cursor-pointer"
          onClick={closeMobileMenu}
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-[#E8590C] via-[#F4A623] to-[#B34700] flex items-center justify-center text-white shadow-md shadow-[#E8590C]/25 group-hover:scale-105 transition-transform duration-300">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-black text-xl sm:text-2xl tracking-tight text-[#1F1511] group-hover:text-[#E8590C] transition-colors">
              BAKE 'N' MORE
            </span>
            <span className="text-[10px] sm:text-[11px] tracking-[0.2em] font-extrabold text-[#E8590C] uppercase -mt-1">
              Café & Artisan Bakery
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-1.5 2xl:gap-2">
          {[
            { href: '#home', label: 'Home' },
            { href: '#menu', label: 'Menu' },
            { href: '#custom-cakes', label: 'Custom Cakes', highlight: true },
            { href: '#about', label: 'Our Story' },
            { href: '#gallery', label: 'Gallery' },
            { href: '#contact', label: 'Visit Us' },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`px-3.5 py-2 rounded-xl text-xs xl:text-sm font-bold transition-all ${
                link.highlight
                  ? 'text-[#E8590C] bg-[#FFF5EA] hover:bg-[#FFEAD4] border border-[#E8590C]/20 shadow-xs'
                  : 'text-[#5C5652] hover:text-[#1F1511] hover:bg-black/4'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right CTA / Phone Quick Action */}
        <div className="hidden md:flex items-center gap-3 sm:gap-4 shrink-0">
          <a
            href="tel:+917571983301"
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold text-[#1F1511] hover:text-[#E8590C] hover:bg-[#FAF8F5] transition-colors"
          >
            <div className="w-7 h-7 rounded-lg bg-[#FAF8F5] border border-[#EEDCCE] flex items-center justify-center text-[#E8590C]">
              <Phone className="w-3.5 h-3.5" />
            </div>
            <span className="hidden lg:inline">+91 75719 83301</span>
          </a>

          <ShineButton
            size="sm"
            variant="accent"
            onClick={handleOrderOnline}
            icon={<ShoppingBag className="w-4 h-4" />}
            className="shadow-md shadow-[#E8590C]/25 font-bold px-4 py-2"
          >
            Order Online
          </ShineButton>
        </div>

        {/* Mobile / Tablet Toggle Button */}
        <button
          className="xl:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-[#FAF8F5] border border-[#EEDCCE] text-[#1F1511] cursor-pointer shrink-0 hover:bg-[#F4EFEA] transition-colors"
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5 text-[#E8590C]" /> : <MenuIcon className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden mt-2 p-5 rounded-3xl bg-white/95 backdrop-blur-2xl border border-[#EEDCCE] shadow-2xl space-y-4">
          <div className="flex flex-col gap-1">
            {[
              { href: '#home', label: 'Home' },
              { href: '#menu', label: 'Artisan Menu' },
              { href: '#custom-cakes', label: 'Design Custom Cake' },
              { href: '#about', label: 'About & Quality' },
              { href: '#gallery', label: 'Photo Gallery' },
              { href: '#contact', label: 'Location & Contact' },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMobileMenu}
                className="px-4 py-3 rounded-xl text-sm font-bold text-[#1F1511] hover:bg-[#FAF8F5] hover:text-[#E8590C] transition-colors border-b border-black/4 last:border-none"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-2.5">
            <ShineButton
              size="md"
              variant="accent"
              onClick={handleOrderOnline}
              icon={<ShoppingBag className="w-4 h-4" />}
              className="w-full font-bold shadow-md justify-center py-3"
            >
              Order Online (Zomato)
            </ShineButton>

            <a
              href="tel:+917571983301"
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#EEDCCE] text-xs font-bold text-[#1F1511]"
            >
              <Phone className="w-3.5 h-3.5 text-[#E8590C]" />
              <span>Call Counter: +91 75719 83301</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
