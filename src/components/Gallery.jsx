import React, { useState } from 'react';
import { StylishCarousel } from './lightswind/StylishCarousel';
import { Badge } from './lightswind/Badge';
import { ShineButton } from './lightswind/ShineButton';
import { MessageCircle, Eye, X, Sparkles } from 'lucide-react';

// Import real photos
import cakeImg from '../assets/custom_celebration_cake.jpg';
import pastryImg from '../assets/menu_butterscotch_pastry.jpg';
import pizzaImg from '../assets/menu_pizza.jpg';
import burgerImg from '../assets/menu_burger.jpg';
import dosaImg from '../assets/menu_south_indian.jpg';
import ambienceImg from '../assets/bakery_cafe_interior.jpg';

const galleryItems = [
  {
    id: 'cakes',
    category: 'cakes',
    categoryName: 'Cakes',
    title: 'Signature Truffle Cakes',
    desc: 'Oven-fresh chocolate truffle and celebration cakes handcrafted with rich ganache.',
    image: cakeImg,
    tag: 'Celebrations',
  },
  {
    id: 'pastries',
    category: 'pastries',
    categoryName: 'Pastries',
    title: 'Butterscotch & Fruit Pastries',
    desc: 'Individual cut slices layered with caramelized praline and delicate sponge.',
    image: pastryImg,
    tag: 'Fresh Daily',
  },
  {
    id: 'pizza',
    category: 'fast-food',
    categoryName: 'Stone-Baked Pizza',
    title: 'Farmhouse Cheesy Pizzas',
    desc: 'Golden crusts topped with bubbling mozzarella, bell peppers, corn and herbs.',
    image: pizzaImg,
    tag: 'Cheesy Delight',
  },
  {
    id: 'burgers',
    category: 'fast-food',
    categoryName: 'Burgers & Rolls',
    title: 'Crisp Burgers & Wraps',
    desc: 'Crispy veggie patties, toasted buns, cheese slices and house-made tangy dips.',
    image: burgerImg,
    tag: 'Student Favourite',
  },
  {
    id: 'dosa',
    category: 'south-indian',
    categoryName: 'South Indian',
    title: 'Golden Masala Dosa',
    desc: 'Crispy fermented rice crepes with spiced potato filling, coconut chutney and sambar.',
    image: dosaImg,
    tag: 'Hot & Authentic',
  },
  {
    id: 'ambience',
    category: 'ambience',
    categoryName: 'Café Ambience',
    title: 'Warm & Cozy Café Ambience',
    desc: 'Relaxed neighbourhood seating in Kalyanpur, ideal for family outings and catching up.',
    image: ambienceImg,
    tag: 'Kalyanpur, Kanpur',
  },
];

const carouselSlides = galleryItems.map((item) => ({
  src: item.image,
  title: item.title,
  alt: item.title,
}));

const filterTabs = [
  { id: 'all', label: 'All Favourites' },
  { id: 'cakes', label: 'Cakes' },
  { id: 'pastries', label: 'Pastries' },
  { id: 'fast-food', label: 'Pizza & Burgers' },
  { id: 'south-indian', label: 'South Indian' },
  { id: 'ambience', label: 'Café Ambience' },
];

function Gallery() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Close the lightbox with Escape for keyboard users
  React.useEffect(() => {
    if (!selectedPhoto) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedPhoto(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedPhoto]);

  const filteredItems = activeFilter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter);

  const handleOpenPhoto = (item) => {
    setSelectedPhoto(item);
  };

  const handleCloseModal = () => {
    setSelectedPhoto(null);
  };

  const handleInquire = (title) => {
    const message = encodeURIComponent(`Hi Bake 'n' More! I saw your ${title} in the gallery and would like to order or enquire.`);
    window.open(`https://wa.me/917571983301?text=${message}`, '_blank');
  };

  return (
    <section id="gallery" className="py-20 lg:py-24 bg-white relative">
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
            Visual Showcase
          </Badge>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-[#1F1511] tracking-tight">
            A Taste of Bake 'n' More
          </h2>
          <p className="font-body text-sm sm:text-base text-[#665E58] mt-3 leading-relaxed">
            Handcrafted bakery delights, savory hot snacks, and our cozy café atmosphere in Kalyanpur, Kanpur.
          </p>
        </div>

        {/* 3D Perspective Showcase Carousel from Lightswind UI (tuned for elegance) */}
        <div className="mb-16 px-2">
          <div className="text-center mb-3">
            <span className="text-xs font-bold text-[#C2410C] uppercase tracking-wider flex items-center justify-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              Interactive Showcase • Swipe or Use Arrow Controls
            </span>
          </div>
          <StylishCarousel
            items={carouselSlides}
            rotationDegrees={5}
            inactiveScale={0.82}
            yOffsetPercent={8}
            autoPlay={4500}
            slideSize="clamp(220px, 42vmin, 330px)"
          />
        </div>

        {/* Category Filters */}
        <div className="flex justify-center mb-10">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none px-2">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeFilter === tab.id
                    ? 'bg-[#1F1511] text-white shadow-md shadow-[#1F1511]/15'
                    : 'bg-[#FAF8F5] text-[#5C5652] border border-[#EEDCCE] hover:bg-[#F4EFEA] hover:text-[#1F1511]'
                }`}
                onClick={() => setActiveFilter(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 6-Card Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {filteredItems.map((item) => (
            <div 
              key={item.id} 
              className="group rounded-3xl bg-white border border-[#EEDCCE] overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between"
              onClick={() => handleOpenPhoto(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter') handleOpenPhoto(item); }}
              aria-label={`View ${item.title}`}
            >
              <div className="relative h-60 overflow-hidden bg-[#FAF8F5]">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out" 
                  loading="lazy" 
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur-xs text-xs font-black text-[#1F1511] shadow-xs">
                  {item.tag}
                </span>
                <div className="absolute inset-0 bg-[#1F1511]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="px-4 py-2 rounded-2xl bg-white text-[#1F1511] text-xs font-black shadow-lg flex items-center gap-2">
                    <Eye className="w-4 h-4 text-[#C2410C]" />
                    View Full Photo
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#C2410C]">
                    {item.categoryName}
                  </span>
                  <h3 className="font-heading text-lg font-bold text-[#1F1511] group-hover:text-[#C2410C] transition-colors mt-0.5">
                    {item.title}
                  </h3>
                  <p className="font-body text-xs text-[#665E58] mt-1.5 line-clamp-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#EEDCCE]/60 flex items-center justify-between text-xs font-bold text-[#C2410C]">
                  <span>Tap to view & order</span>
                  <span>&rarr;</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#FFF5EA] via-[#FFF9F2] to-[#FFF5EA] border border-[#EEDCCE] shadow-sm max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <h4 className="font-heading text-xl sm:text-2xl font-black text-[#1F1511]">Craving fresh bakery bites right now?</h4>
            <p className="font-body text-xs sm:text-sm text-[#665E58] mt-1">Chat directly on WhatsApp or visit our bakery counter in Kalyanpur.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <ShineButton
              variant="secondary"
              onClick={() => document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' })}
              className="font-bold text-xs sm:text-sm px-5 py-2.5"
            >
              View Full Menu
            </ShineButton>
            <ShineButton
              variant="accent"
              onClick={() => handleInquire("Bakery Treats")}
              icon={<MessageCircle className="w-4 h-4" />}
              className="font-bold text-xs sm:text-sm px-5 py-2.5 shadow-md shadow-[#E8590C]/25"
            >
              Order on WhatsApp
            </ShineButton>
          </div>
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200" 
          onClick={handleCloseModal}
        >
          <div 
            className="relative max-w-xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-white/20" 
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors cursor-pointer"
              onClick={handleCloseModal} 
              aria-label="Close photo preview"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="h-72 sm:h-96 overflow-hidden bg-[#FAF8F5]">
              <img src={selectedPhoto.image} alt={selectedPhoto.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-6 sm:p-7">
              <span className="inline-block px-3 py-1 rounded-full bg-[#FFF2E2] text-xs font-black text-[#C2410C] mb-2">
                {selectedPhoto.tag}
              </span>
              <h3 className="font-heading text-2xl font-black text-[#1F1511]">{selectedPhoto.title}</h3>
              <p className="font-body text-xs sm:text-sm text-[#665E58] mt-2 leading-relaxed">{selectedPhoto.desc}</p>
              <div className="mt-6 flex justify-end">
                <ShineButton
                  variant="accent"
                  onClick={() => handleInquire(selectedPhoto.title)}
                  icon={<MessageCircle className="w-4 h-4" />}
                  className="font-bold shadow-md shadow-[#E8590C]/25"
                >
                  Inquire on WhatsApp
                </ShineButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Gallery;
