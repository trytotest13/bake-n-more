import React from 'react';
import { MagicCard } from './lightswind/MagicCard';
import { Badge } from './lightswind/Badge';
import { ArrowUpRight } from 'lucide-react';

import cakeImg from '../assets/menu_strawberry_cake.jpg';
import pastryImg from '../assets/menu_butterscotch_pastry.jpg';
import pizzaImg from '../assets/menu_pizza.jpg';
import burgerImg from '../assets/menu_burger.jpg';
import dosaImg from '../assets/menu_south_indian.jpg';

const categories = [
  { 
    id: 'cakes', 
    name: 'Celebration Cakes', 
    image: cakeImg,
    tag: 'Custom Bakes',
    desc: 'Artisan truffle, fresh cream & designer tiered cakes' 
  },
  { 
    id: 'pastries', 
    name: 'Fresh Pastries', 
    image: pastryImg,
    tag: 'Baked Daily',
    desc: 'Butterscotch praline, brownies & delicate pastries' 
  },
  { 
    id: 'pizzas', 
    name: 'Stone-Baked Pizzas', 
    image: pizzaImg,
    tag: 'Extra Cheesy',
    desc: 'Golden crusts, bubbling mozzarella & herb toppings' 
  },
  { 
    id: 'burgers', 
    name: 'Gourmet Burgers', 
    image: burgerImg,
    tag: 'Student Favourite',
    desc: 'Crispy veggie patties, brioche buns & signature dips' 
  },
  { 
    id: 'dosa', 
    name: 'South Indian Specials', 
    image: dosaImg,
    tag: 'Hot & Authentic',
    desc: 'Crispy golden dosas, steamed idlis & aromatic sambhar' 
  },
];

function Categories() {
  const handleCategoryClick = (catId) => {
    const targetMap = {
      cakes: 'menu-cat-cakes',
      pastries: 'menu-cat-pastries',
      pizzas: 'menu-cat-pizzas',
      burgers: 'menu-cat-burgers',
      dosa: 'menu-cat-noodles-south-indian',
    };
    const element = document.getElementById(targetMap[catId]);
    if (element) {
      const headerOffset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    } else {
      document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 lg:py-24 bg-[#FAF8F5] relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <Badge 
            variant="gold" 
            size="default" 
            withDot={true} 
            dotColor="#E8590C" 
            className="mb-3 font-extrabold uppercase tracking-wider bg-[#FFF2E2] text-[#B34700] border border-[#E8590C]/20"
          >
            Curated Specialities
          </Badge>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-[#1F1511] tracking-tight">
            Popular Categories
          </h2>
          <p className="font-body text-sm sm:text-base text-[#665E58] mt-3 leading-relaxed">
            Every dish is freshly prepared daily with premium ingredients at student- and family-friendly prices in Kalyanpur.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {categories.map((cat) => (
            <MagicCard 
              key={cat.id} 
              className="group cursor-pointer rounded-3xl overflow-hidden border border-[#EEDCCE] shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col justify-between h-[370px] relative bg-[#1F1511]"
              glowColor="rgba(232, 89, 12, 0.45)"
              borderColor="rgba(232, 89, 12, 0.65)"
              onClick={() => handleCategoryClick(cat.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter') handleCategoryClick(cat.id); }}
            >
              {/* Appetizing Photo Background */}
              <img 
                src={cat.image} 
                alt={cat.name} 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out z-0 brightness-95 group-hover:brightness-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F1511] via-[#1F1511]/45 to-transparent z-1 pointer-events-none" />

              {/* Top Tag */}
              <div className="relative z-10 p-5 flex justify-between items-center">
                <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#1F1511] text-xs font-extrabold shadow-md">
                  {cat.tag}
                </span>
                <div className="w-8 h-8 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-[#E8590C] transition-colors duration-300">
                  <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>

              {/* Bottom Details */}
              <div className="relative z-10 p-5 text-white">
                <h3 className="font-heading text-xl font-black leading-snug group-hover:text-[#F59F00] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-white/85 mt-1 line-clamp-2 leading-relaxed font-body">
                  {cat.desc}
                </p>
                <div className="mt-3.5 pt-3 border-t border-white/20 flex items-center justify-between text-xs font-bold text-white/90">
                  <span>Explore Menu</span>
                  <span className="text-[#F59F00] font-black group-hover:translate-x-1 transition-transform">View items &rarr;</span>
                </div>
              </div>
            </MagicCard>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Categories;
