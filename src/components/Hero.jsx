import React from 'react';
import heroFoodImage from '../assets/hero_spread.jpg';
import customCakeImage from '../assets/custom_celebration_cake.jpg';
import { ShineButton } from './lightswind/ShineButton';
import { BorderBeam } from './lightswind/BorderBeam';
import { Badge } from './lightswind/Badge';
import { UtensilsCrossed, Cake, MapPin, Star, Clock, CheckCircle2 } from 'lucide-react';

function Hero() {
  const handleViewMenu = (e) => {
    e?.preventDefault();
    document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleCustomCakes = (e) => {
    e?.preventDefault();
    document.querySelector('#custom-cakes')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="home" className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 bg-gradient-to-b from-[#FFF7EE] via-[#FAF8F5] to-white">
      {/* Ambient background glow orbs */}
      <div className="pointer-events-none absolute -top-24 right-0 w-[550px] h-[550px] rounded-full bg-gradient-to-br from-[#F59F00]/20 via-[#E8590C]/15 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 -left-20 w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-[#E8590C]/15 via-[#1F1511]/5 to-transparent blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Editorial Headlines & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start gap-6">
            
            {/* Top Badges */}
            <div className="flex flex-wrap items-center gap-3">
              <Badge
                variant="gold"
                size="default"
                withDot={true}
                dotColor="#E8590C"
                className="px-4 py-1.5 text-xs font-black shadow-xs tracking-wider uppercase bg-[#FFF2E2] text-[#B34700] border border-[#E8590C]/25"
              >
                <MapPin className="w-3.5 h-3.5 text-[#C2410C]" />
                <span>Kalyanpur, Kanpur</span>
              </Badge>

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-[#EEDCCE] shadow-xs text-xs font-bold text-[#1F1511]">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current" />
                  ))}
                </div>
                <span className="text-[#665E58]">|</span>
                <span>4.9 / 5.0 (15,000+ Guests)</span>
              </div>
            </div>

            {/* Editorial Title */}
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black text-[#1F1511] tracking-tight leading-[1.12]">
              Freshly Baked Daily,<br />
              <span className="font-serif italic font-normal bg-gradient-to-r from-[#E8590C] via-[#F59F00] to-[#B34700] bg-clip-text text-transparent">
                Crafted with Pure Love
              </span>
            </h1>

            {/* Narrative Subtitle */}
            <p className="font-body text-base sm:text-lg text-[#665E58] max-w-xl leading-relaxed">
              Step into Kalyanpur’s favourite artisan bakery and café. Indulge in customized celebration cakes, melt-in-mouth pastries, stone-baked cheesy pizzas, gourmet burgers, and hot crispy South Indian dosas.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-1 w-full sm:w-auto">
              <ShineButton
                id="view-menu-btn"
                size="lg"
                variant="primary"
                onClick={handleViewMenu}
                icon={<UtensilsCrossed className="w-5 h-5" />}
                className="w-full sm:w-auto font-bold shadow-lg shadow-[#1F1511]/15 text-sm sm:text-base py-3.5 px-7"
              >
                Explore Full Menu
              </ShineButton>

              <ShineButton
                size="lg"
                variant="accent"
                onClick={handleCustomCakes}
                icon={<Cake className="w-5 h-5" />}
                className="w-full sm:w-auto font-bold shadow-lg shadow-[#E8590C]/25 text-sm sm:text-base py-3.5 px-7"
              >
                Design Custom Cake
              </ShineButton>
            </div>

            {/* 3 Trust Feature Tags */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-6 border-t border-[#EEDCCE] w-full mt-2">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2.5 text-center sm:text-left">
                <div className="w-10 h-10 rounded-2xl bg-[#FFF2E2] flex items-center justify-center text-[#C2410C] shrink-0 shadow-xs border border-[#E8590C]/15">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-xs sm:text-sm font-bold text-[#1F1511]">Fresh from Oven</span>
                  <span className="text-[11px] text-[#665E58]">Bakes at 9am & 3pm</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2.5 text-center sm:text-left">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-700 shrink-0 shadow-xs border border-emerald-200">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-xs sm:text-sm font-bold text-[#1F1511]">100% Pure Veg</span>
                  <span className="text-[11px] text-[#665E58]">Eggless options ready</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2.5 text-center sm:text-left">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-700 shrink-0 shadow-xs border border-amber-200">
                  <Cake className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-xs sm:text-sm font-bold text-[#1F1511]">Custom Studio</span>
                  <span className="text-[11px] text-[#665E58]">Any theme on order</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Layered Food Presentation with BorderBeam */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="relative w-full max-w-[490px]">
              
              {/* Main Food Showcase Card with BorderBeam */}
              <div className="relative p-3.5 rounded-3xl bg-white shadow-2xl shadow-[#1F1511]/10 border border-white/80 overflow-hidden">
                <BorderBeam
                  size={120}
                  duration={5.5}
                  colorFrom="#E8590C"
                  colorTo="#F59F00"
                  borderThickness={2.5}
                  beamBorderRadius={24}
                />
                
                <div className="overflow-hidden rounded-2xl relative h-[380px] sm:h-[440px] bg-[#FAF8F5]">
                  <img
                    src={heroFoodImage}
                    alt="Freshly baked artisanal spread at Bake 'n' More"
                    className="w-full h-full object-cover rounded-2xl transform hover:scale-105 transition-transform duration-700 ease-out"
                    fetchPriority="high"
                    width="500"
                    height="440"
                  />
                  
                  {/* Bottom Caption Bar */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 sm:bottom-4 sm:left-4 sm:right-4 p-3.5 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg border border-white/80 flex items-center justify-between z-10">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#C2410C] block">
                        Signature Counter
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-[#1F1511]">
                        Cakes • Pastries • Pizzas • Burgers
                      </span>
                    </div>
                    <Badge variant="gold" size="sm" className="font-bold shrink-0 bg-[#FFF2E2] text-[#B34700]">
                      Kalyanpur
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Floating Mini Overlay Card (Custom Cake) */}
              <div className="hidden sm:flex absolute -top-5 -left-6 sm:-left-8 p-3.5 rounded-2xl bg-white/98 backdrop-blur-md shadow-xl border border-[#EEDCCE] items-center gap-3.5 z-20 animate-float">
                <img 
                  src={customCakeImage} 
                  alt="Custom celebration cake" 
                  className="w-14 h-14 rounded-xl object-cover shadow-xs border border-white" 
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="block text-xs font-extrabold text-[#1F1511]">Custom 3D Bakes</span>
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-[#C2410C] text-white">NEW</span>
                  </div>
                  <span className="text-[11px] text-[#C2410C] font-bold">Theme & Photo Cakes</span>
                  <div className="flex text-amber-500 mt-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-2.5 h-2.5 fill-current" />
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;
