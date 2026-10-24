import React, { useState } from 'react';
import cakeImage from '../assets/custom_celebration_cake.jpg';
import { ShineButton } from './lightswind/ShineButton';
import { BorderBeam } from './lightswind/BorderBeam';
import { Badge } from './lightswind/Badge';
import { MessageCircle, CheckCircle2, ShieldCheck, Cake, Heart, PartyPopper, Baby, Briefcase } from 'lucide-react';

const occasionsList = [
  { id: 'Birthday', icon: Cake, label: 'Birthday' },
  { id: 'Anniversary', icon: Heart, label: 'Anniversary' },
  { id: 'Wedding', icon: PartyPopper, label: 'Wedding' },
  { id: 'Baby Shower', icon: Baby, label: 'Baby Shower' },
  { id: 'Corporate', icon: Briefcase, label: 'Office Party' },
];

const flavoursList = [
  { id: 'chocolate', name: 'Belgian Dark Truffle', desc: '70% Dutch dark ganache & cocoa sponge', basePrice: 450 },
  { id: 'butterscotch', name: 'Butterscotch Crunch', desc: 'Caramelized praline crunch with vanilla cream', basePrice: 400 },
  { id: 'blackforest', name: 'Black Forest Classic', desc: 'Layered chocolate sponge, red cherries & cream', basePrice: 420 },
  { id: 'fruit', name: 'Exotic Fresh Fruit', desc: 'Seasonal fruit slices & pineapple crush glaze', basePrice: 480 },
  { id: 'redvelvet', name: 'Red Velvet Cream Cheese', desc: 'Crimson cocoa sponge with velvety frosting', basePrice: 550 },
];

const sizesList = [
  { id: '0.5kg', name: '½ KG', serves: '4 - 6 Guests', multiplier: 1 },
  { id: '1kg', name: '1 KG', serves: '8 - 12 Guests', multiplier: 1.9 },
  { id: '1.5kg', name: '1.5 KG', serves: '14 - 18 Guests', multiplier: 2.8 },
  { id: '2kg', name: '2 KG', serves: '20 - 25 Guests', multiplier: 3.6 },
];

function CustomCakes() {
  const [selectedOccasion, setSelectedOccasion] = useState('Birthday');
  const [selectedFlavour, setSelectedFlavour] = useState(flavoursList[0]);
  const [selectedSize, setSelectedSize] = useState(sizesList[1]);
  const [isEggless, setIsEggless] = useState(true);
  const [cakeMessage, setCakeMessage] = useState('Happy Birthday! 🎂');

  // Dynamic estimate calculation
  const estimatedPrice = Math.round(selectedFlavour.basePrice * selectedSize.multiplier);

  const handleWhatsAppOrder = () => {
    const text =
      `*CUSTOM CAKE ORDER INQUIRY - Bake 'n' More*\n\n` +
      `• *Occasion:* ${selectedOccasion}\n` +
      `• *Flavour:* ${selectedFlavour.name}\n` +
      `• *Size:* ${selectedSize.name} (${selectedSize.serves})\n` +
      `• *Dietary:* ${isEggless ? '100% Eggless Pure Vegetarian' : 'Regular Sponge'}\n` +
      `• *Message on Cake:* "${cakeMessage || 'To be decided'}"\n` +
      `• *Estimated Price:* ₹${estimatedPrice}\n\n` +
      `Hi! I would like to book this cake. Please confirm delivery slot and theme reference picture.`;

    window.open(`https://wa.me/917571983301?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="custom-cakes" className="py-20 lg:py-24 bg-gradient-to-b from-[#FAF8F5] via-white to-[#FAF8F5] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-10 -right-20 w-[450px] h-[450px] rounded-full bg-gradient-to-br from-[#E8590C]/10 via-[#F59F00]/10 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute -bottom-10 -left-20 w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-[#E8590C]/10 via-[#FAF8F5] to-transparent blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <Badge 
            variant="gold" 
            size="default" 
            withDot={true} 
            dotColor="#E8590C" 
            className="mb-3 font-extrabold uppercase tracking-wider bg-[#FFF2E2] text-[#B34700] border border-[#E8590C]/20"
          >
            The Cake Atelier • Signature Feature
          </Badge>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-[#1F1511] tracking-tight">
            Design Your Celebration Cake
          </h2>
          <p className="font-body text-sm sm:text-base text-[#665E58] mt-3 leading-relaxed">
            Configure your dream cake in seconds with live price estimation, custom message preview, and instant WhatsApp booking with our master baker in Kalyanpur.
          </p>
        </div>

        {/* Atelier Interactive Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start max-w-6xl mx-auto">
          
          {/* Left Column: Multi-Step Interactive Builder */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-9 rounded-3xl border border-[#EEDCCE] shadow-lg shadow-[#1F1511]/4 space-y-7">
            
            {/* Step 1: Occasion */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black text-[#C2410C] uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-[#FFF2E2] text-[#C2410C] inline-flex items-center justify-center text-[11px] font-black">1</span>
                  Select Occasion
                </span>
                <span className="text-[11px] font-bold text-[#665E58]">Custom theme available</span>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                {occasionsList.map((occ) => {
                  const isSelected = selectedOccasion === occ.id;
                  return (
                    <button
                      key={occ.id}
                      type="button"
                      onClick={() => setSelectedOccasion(occ.id)}
                      className={`px-3 py-2.5 rounded-2xl text-xs font-bold transition-all flex flex-col items-center justify-center gap-1 cursor-pointer border ${
                        isSelected
                          ? 'bg-[#1F1511] text-white border-[#1F1511] shadow-md shadow-[#1F1511]/15 scale-[1.02]'
                          : 'bg-[#FAF8F5] text-[#1F1511] border-[#EEDCCE] hover:bg-[#F4EFEA] hover:border-[#E8590C]/40'
                      }`}
                    >
                      <occ.icon className="w-5 h-5" aria-hidden="true" />
                      <span className="truncate">{occ.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Flavour */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black text-[#C2410C] uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-[#FFF2E2] text-[#C2410C] inline-flex items-center justify-center text-[11px] font-black">2</span>
                  Choose Flavour & Cream
                </span>
                <span className="text-[11px] font-bold text-[#665E58]">Freshly whipped daily</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {flavoursList.map((flavour) => {
                  const isSelected = selectedFlavour.id === flavour.id;
                  return (
                    <button
                      key={flavour.id}
                      type="button"
                      onClick={() => setSelectedFlavour(flavour)}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#E8590C] bg-[#FFF8F4] shadow-md shadow-[#E8590C]/10 ring-2 ring-[#E8590C]/20'
                          : 'border-[#EEDCCE] bg-white hover:border-[#E8590C]/40 hover:bg-[#FAF8F5]'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-black text-[#1F1511]">{flavour.name}</span>
                        <span className="text-[11px] font-black text-[#C2410C] bg-[#FFF2E2] px-2 py-0.5 rounded-md">
                          ₹{flavour.basePrice}/½kg
                        </span>
                      </div>
                      <span className="text-[11px] text-[#665E58] block mt-1 line-clamp-1 font-body">
                        {flavour.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Size & Dietary Preference */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black text-[#C2410C] uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-[#FFF2E2] text-[#C2410C] inline-flex items-center justify-center text-[11px] font-black">3</span>
                  Select Size & Servings
                </span>
                <span className="text-[11px] font-bold text-[#665E58]">Tiered options available</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {sizesList.map((size) => {
                  const isSelected = selectedSize.id === size.id;
                  return (
                    <button
                      key={size.id}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#C2410C] bg-[#C2410C] text-white shadow-md shadow-[#C2410C]/25 scale-[1.02]'
                          : 'border-[#EEDCCE] bg-[#FAF8F5] text-[#1F1511] hover:border-[#E8590C]/40 hover:bg-[#F4EFEA]'
                      }`}
                    >
                      <span className="block text-sm font-black">{size.name}</span>
                      <span className={`block text-[10px] font-medium mt-0.5 ${isSelected ? 'text-white/90' : 'text-[#665E58]'}`}>
                        {size.serves}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Eggless Preference & Live Cake Message */}
            <div className="pt-4 border-t border-[#EEDCCE] space-y-4">
              
              {/* Pure Veg / Eggless Switch */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200 shadow-xs">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <span className="text-xs font-black text-emerald-950 block">100% Eggless Pure Vegetarian</span>
                    <span className="text-[10px] text-emerald-800">Baked in certified vegetarian section</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsEggless(!isEggless)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-black cursor-pointer transition-all ${
                    isEggless
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {isEggless ? 'Eggless ✓' : 'Regular'}
                </button>
              </div>

              {/* Message on Cake Input */}
              <div>
                <label className="block text-xs font-black text-[#1F1511] mb-1.5">
                  Message Written on Cake (Live Preview on Right)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Happy 5th Birthday Aarav! 🎂"
                  value={cakeMessage}
                  onChange={(e) => setCakeMessage(e.target.value)}
                  maxLength={40}
                  className="w-full px-4 py-3 rounded-2xl border border-[#EEDCCE] bg-[#FAF8F5] text-xs sm:text-sm text-[#1F1511] placeholder:text-[#665E58] focus:outline-none focus:ring-2 focus:ring-[#E8590C] focus:bg-white shadow-xs transition-all font-body"
                />
              </div>

            </div>

          </div>

          {/* Right Column: Live Visual Quote Preview with BorderBeam */}
          <div className="lg:col-span-5 relative">
            <div className="relative p-3.5 rounded-3xl bg-white shadow-2xl shadow-[#1F1511]/10 border border-white/90 overflow-hidden">
              <BorderBeam
                size={110}
                duration={5}
                colorFrom="#E8590C"
                colorTo="#F59F00"
                borderThickness={2.5}
                beamBorderRadius={24}
              />

              {/* Visual Cake Canvas with Live Ribbon Overlay */}
              <div className="relative rounded-2xl overflow-hidden h-[260px] sm:h-[280px] bg-[#FAF8F5]">
                <img
                  src={cakeImage}
                  alt="Custom celebration cake live preview"
                  className="w-full h-full object-cover rounded-2xl transition-transform duration-700 hover:scale-105"
                />
                
                {/* Occasion Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <Badge variant="gold" size="sm" className="shadow-md font-black bg-[#FFF2E2] text-[#B34700]">
                    {selectedOccasion} Theme
                  </Badge>
                </div>

                {/* Dietary Badge */}
                <div className="absolute top-3 right-3 z-10">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-emerald-600 text-white shadow-md flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    {isEggless ? '100% Eggless' : 'Regular'}
                  </span>
                </div>

                {/* LIVE CAKE MESSAGE FONDANT RIBBON OVERLAY */}
                {cakeMessage && (
                  <div className="absolute bottom-4 left-4 right-4 z-10">
                    <div className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#1F1511]/90 via-[#2B211C]/95 to-[#1F1511]/90 backdrop-blur-md border border-amber-300/40 shadow-xl text-center">
                      <span className="text-[9px] font-black uppercase tracking-widest text-[#F59F00] block">
                        Piped Message on Cake
                      </span>
                      <p className="font-serif italic text-sm sm:text-base font-bold text-white tracking-wide truncate">
                        "{cakeMessage}"
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Live Price Estimation & WhatsApp Booking */}
              <div className="p-5 space-y-4">
                
                <div className="flex items-baseline justify-between pt-1">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#665E58] block">
                      Instant Estimate Quote
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="font-heading text-3xl sm:text-4xl font-black text-[#C2410C]">
                        ₹{estimatedPrice}
                      </span>
                      <span className="text-[11px] text-[#665E58] font-bold">approx. total</span>
                    </div>
                  </div>
                  <Badge variant="secondary" size="sm" className="font-bold bg-[#FAF8F5] border border-[#EEDCCE] text-[#1F1511]">
                    {selectedSize.name} • {selectedFlavour.name.split(' ')[0]}
                  </Badge>
                </div>

                {/* Specs Review List */}
                <div className="space-y-1.5 text-xs text-[#665E58] border-y border-[#EEDCCE] py-3 font-body">
                  <div className="flex justify-between">
                    <span>Selected Flavour:</span>
                    <strong className="text-[#1F1511]">{selectedFlavour.name}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Weight & Servings:</span>
                    <strong className="text-[#1F1511]">{selectedSize.name} ({selectedSize.serves})</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Dietary Sponge:</span>
                    <strong className="text-emerald-700">{isEggless ? 'Pure Vegetarian (Eggless)' : 'Regular'}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Occasion:</span>
                    <strong className="text-[#1F1511]">{selectedOccasion}</strong>
                  </div>
                </div>

                {/* WhatsApp Action Button */}
                <ShineButton
                  size="lg"
                  variant="accent"
                  onClick={handleWhatsAppOrder}
                  icon={<MessageCircle className="w-5 h-5" />}
                  className="w-full font-bold shadow-lg shadow-[#E8590C]/25 justify-center py-3.5 text-sm sm:text-base"
                >
                  Book Cake on WhatsApp
                </ShineButton>

                <div className="flex items-center justify-center gap-1.5 text-[10px] text-center text-[#665E58] pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Direct WhatsApp chat with our baker in Kalyanpur to confirm theme photo & pickup slot.</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default CustomCakes;
