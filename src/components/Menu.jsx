import React, { useState, useMemo, useRef, useEffect } from 'react';
import { menuCategories, menuSections } from '../data/menuData';
import { Badge } from './lightswind/Badge';
import { ShineButton } from './lightswind/ShineButton';
import { ShoppingBag, Search, Sparkles, Utensils, X } from 'lucide-react';

function Menu() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const chipRefs = useRef({});
  const isFirstCategoryRender = useRef(true);

  // Keep the selected chip fully visible when the pill bar overflows.
  useEffect(() => {
    if (isFirstCategoryRender.current) {
      isFirstCategoryRender.current = false;
      return;
    }
    chipRefs.current[activeCategory]?.scrollIntoView({
      behavior: 'auto',
      inline: 'center',
      block: 'nearest',
    });
  }, [activeCategory]);

  const allItems = useMemo(() => {
    return menuSections.flatMap((section) =>
      section.items.map((item) => ({ ...item, categoryTitle: section.title, categoryId: section.id }))
    );
  }, []);

  const filteredItems = useMemo(() => {
    return allItems.filter((item) => {
      const matchesCategory =
        activeCategory === 'all' ||
        item.categoryId === activeCategory ||
        (activeCategory === 'sandwiches' && item.categoryId === 'burgers');
      
      const matchesSearch =
        searchQuery.trim() === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.categoryTitle.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [allItems, activeCategory, searchQuery]);

  const handleOrder = (itemName, price) => {
    const message = encodeURIComponent(`Hi Bake 'n' More! I would like to order: ${itemName} (${price}). Please let me know the preparation time and takeaway/delivery details.`);
    window.open(`https://wa.me/917571983301?text=${message}`, '_blank');
  };

  return (
    <section id="menu" className="py-20 lg:py-24 bg-white relative">
      <div className="container mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <Badge 
            variant="gold" 
            size="default" 
            withDot={true} 
            dotColor="#E8590C" 
            className="mb-3 font-extrabold uppercase tracking-wider bg-[#FFF2E2] text-[#B34700] border border-[#E8590C]/20"
          >
            Handcrafted Menu
          </Badge>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-[#1F1511] tracking-tight">
            Artisan Bakes & Fresh Bites
          </h2>
          <p className="font-body text-sm sm:text-base text-[#665E58] mt-3 leading-relaxed">
            Prepared fresh to order using pure dairy butter, rich Belgian cocoa, and local farm-fresh ingredients in Kalyanpur.
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="max-w-4xl mx-auto mb-12 space-y-4">
          
          {/* Search bar */}
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#665E58]" />
            <input
              type="text"
              placeholder="Search cakes, pastries, pizzas, burgers, dosas..."
              aria-label="Search menu items"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-10 py-3.5 rounded-2xl bg-[#FAF8F5] border border-[#EEDCCE] text-sm text-[#1F1511] placeholder:text-[#665E58] focus:outline-none focus:ring-2 focus:ring-[#E8590C] focus:bg-white shadow-xs transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#665E58] hover:text-[#1F1511] p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Tabs Pill Bar */}
          {/* Inner w-max wrapper: auto margins center it when it fits, and
              collapse to 0 when it overflows, so scrolling starts at 0 and
              the leftmost chip never gets clipped by justify-center. */}
          <div className="overflow-x-auto py-2 scrollbar-none">
            <div className="flex items-center gap-2 w-max mx-auto px-3">
              <button
                ref={(el) => { chipRefs.current.all = el; }}
                className={`px-5 py-3 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeCategory === 'all'
                    ? 'bg-[#1F1511] text-white shadow-md shadow-[#1F1511]/20'
                    : 'bg-[#FAF8F5] text-[#5C5652] border border-[#EEDCCE] hover:bg-[#F4EFEA] hover:text-[#1F1511]'
                }`}
                onClick={() => setActiveCategory('all')}
              >
                All Delights ({allItems.length})
              </button>
              {menuCategories.map((cat) => (
                <button
                  key={cat.id}
                  ref={(el) => { chipRefs.current[cat.id] = el; }}
                  className={`px-5 py-3 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                    activeCategory === cat.id
                      ? 'bg-[#C2410C] text-white shadow-md shadow-[#C2410C]/25'
                      : 'bg-[#FAF8F5] text-[#5C5652] border border-[#EEDCCE] hover:bg-[#F4EFEA] hover:text-[#1F1511]'
                  }`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Hidden Section Anchors for Categories direct scrolling */}
        <div id="menu-cat-cakes" className="scroll-mt-28" />
        <div id="menu-cat-pastries" className="scroll-mt-28" />
        <div id="menu-cat-pizzas" className="scroll-mt-28" />
        <div id="menu-cat-burgers" className="scroll-mt-28" />
        <div id="menu-cat-noodles-south-indian" className="scroll-mt-28" />

        {/* Filtered Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-[#FAF8F5] rounded-3xl border border-[#EEDCCE] max-w-md mx-auto p-8">
            <div className="w-14 h-14 rounded-2xl bg-[#FFF2E2] flex items-center justify-center text-[#C2410C] mx-auto mb-3">
              <Utensils className="w-7 h-7" />
            </div>
            <h4 className="font-heading text-lg font-black text-[#1F1511]">No matching items found</h4>
            <p className="font-body text-xs text-[#665E58] mt-1">Try searching for cakes, burgers, pizzas, or reset the filters.</p>
            <button
              onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
              className="mt-5 px-5 py-2.5 rounded-xl bg-[#C2410C] text-white text-xs font-bold shadow-md cursor-pointer hover:bg-[#A83508] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group rounded-3xl bg-white border border-[#EEDCCE] overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Food Image Container */}
                <div className="relative h-48 overflow-hidden bg-[#FAF8F5]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  
                  {/* Veg Tag */}
                  {item.isVeg && (
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-white/95 backdrop-blur-xs border border-emerald-500/30 shadow-xs flex items-center gap-1.5 text-[10px] font-black text-emerald-800">
                      <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                      <span>100% VEG</span>
                    </div>
                  )}

                  {/* Price Tag Badge */}
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 rounded-full bg-[#1F1511]/90 backdrop-blur-xs font-black text-xs text-white shadow-xs">
                      {item.price}
                    </span>
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#C2410C]">
                      {item.categoryTitle}
                    </span>
                    <h3 className="font-heading text-base font-bold text-[#1F1511] group-hover:text-[#C2410C] transition-colors mt-0.5 leading-snug">
                      {item.name}
                    </h3>
                    <p className="font-body text-xs text-[#665E58] mt-1.5 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Card Action Footer */}
                  <div className="pt-4 mt-4 border-t border-[#EEDCCE]/60 flex items-center justify-between">
                    <div>
                      <span className="block font-heading text-sm font-black text-[#1F1511]">{item.price}</span>
                      <span className="text-[10px] text-[#665E58]">Freshly prepared</span>
                    </div>

                    <ShineButton
                      size="sm"
                      variant="accent"
                      onClick={() => handleOrder(item.name, item.price)}
                      icon={<ShoppingBag className="w-3.5 h-3.5" />}
                      className="font-bold text-xs px-3.5 py-1.5"
                    >
                      Order
                    </ShineButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Floating WhatsApp Order Notice */}
        <div className="mt-14 text-center">
          <div className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#FAF8F5] border border-[#EEDCCE] shadow-xs text-xs sm:text-sm font-bold text-[#1F1511]">
            <Sparkles className="w-4 h-4 text-[#C2410C]" />
            <span>Need customized cake flavours, party bulk packs, or takeaway counter special?</span>
            <a 
              href="https://wa.me/917571983301?text=Hi%20Bake%20n%20More!%20I%20have%20a%20special%20order%20request." 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#C2410C] underline hover:text-[#B34700]"
            >
              Chat on WhatsApp &rarr;
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Menu;
