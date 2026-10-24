import React from 'react';
import { CountUp } from './lightswind/CountUp';
import { Badge } from './lightswind/Badge';
import { MagicCard } from './lightswind/MagicCard';
import cafeInteriorImg from '../assets/bakery_cafe_interior.jpg';
import { ShieldCheck, Heart, Users, Cake, Utensils } from 'lucide-react';

const stats = [
  { value: 15000, suffix: '+', label: 'Happy Foodies', desc: 'Satisfied guests across Kalyanpur' },
  { value: 100, suffix: '%', label: 'Pure Veg Ready', desc: 'Eggless options baked fresh daily' },
  { value: 50, suffix: '+', label: 'Artisan Flavours', desc: 'Cakes, pastries & hot savouries' },
  { value: 4.9, suffix: '★', label: 'Google Rating', desc: 'Top-rated bakery & café in Kanpur', decimals: 1 },
];

const trustHighlights = [
  {
    icon: <Cake className="w-5 h-5 text-[#E8590C]" />,
    title: 'Freshly Made Daily',
    desc: 'Baking rounds start every morning at 9am so you always get warm, fragrant cakes, breads, and buns.',
  },
  {
    icon: <Utensils className="w-5 h-5 text-[#F59F00]" />,
    title: 'Student & Family Friendly',
    desc: 'Honest, accessible pricing with generous portions and uncompromised food quality.',
  },
  {
    icon: <Users className="w-5 h-5 text-emerald-600" />,
    title: 'Comfortable Café Seating',
    desc: 'A calm, welcoming air-conditioned café for coffee dates, birthday celebrations, and evening snacks.',
  },
  {
    icon: <Heart className="w-5 h-5 text-rose-500" />,
    title: 'Personalized Custom Bakes',
    desc: 'Our bakers work with you on WhatsApp to handcraft customized designs for your special milestones.',
  },
];

function About() {
  return (
    <section id="about" className="py-20 lg:py-24 bg-[#FAF8F5] relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <Badge 
            variant="gold" 
            size="default" 
            withDot={true} 
            dotColor="#E8590C" 
            className="mb-3 font-extrabold uppercase tracking-wider bg-[#FFF2E2] text-[#B34700] border border-[#E8590C]/20"
          >
            Our Story & Heritage
          </Badge>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-[#1F1511] tracking-tight">
            The Heart of Bake 'n' More
          </h2>
          <p className="font-body text-sm sm:text-base text-[#665E58] mt-3 leading-relaxed">
            More than just a bakery — a neighbourhood gathering place founded on love, warmth, and irresistible treats in Kalyanpur, Kanpur.
          </p>
        </div>

        {/* Bento Story Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto mb-12">
          
          {/* Left Column: Interior Photo & Ambience */}
          <div className="lg:col-span-6 relative rounded-3xl overflow-hidden shadow-xl border border-[#EEDCCE] group min-h-[360px] bg-[#FAF8F5]">
            <img 
              src={cafeInteriorImg} 
              alt="Bake 'n' More café interior and cozy seating" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1F1511]/90 via-[#1F1511]/40 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="px-3 py-1 rounded-full bg-white/25 backdrop-blur-md text-xs font-black uppercase tracking-wider mb-2.5 inline-block border border-white/30">
                Warm & Welcoming
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl font-black leading-tight text-white">
                Cozy Café Seating in Kalyanpur
              </h3>
              <p className="font-body text-xs sm:text-sm text-white/85 mt-2 leading-relaxed">
                Step inside for a peaceful coffee, warm pastry, or celebrate birthdays with friends in our welcoming, air-conditioned café.
              </p>
            </div>
          </div>

          {/* Right Column: Live CountUp Numbers & Commitment */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-6">
            
            {/* Live CountUp Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, idx) => (
                <div 
                  key={idx} 
                  className="p-5 sm:p-6 rounded-3xl bg-white border border-[#EEDCCE] shadow-xs hover:shadow-md transition-shadow flex flex-col justify-center"
                >
                  <CountUp
                    to={stat.value}
                    suffix={stat.suffix}
                    decimals={stat.decimals || 0}
                    duration={2.5}
                    className="font-heading text-3xl sm:text-4xl font-black text-[#E8590C]"
                  />
                  <span className="font-heading text-sm font-bold text-[#1F1511] mt-1">{stat.label}</span>
                  <span className="font-body text-[11px] text-[#665E58] mt-0.5">{stat.desc}</span>
                </div>
              ))}
            </div>

            {/* Quality Commitment Card */}
            <div className="p-6 rounded-3xl bg-white border border-[#EEDCCE] shadow-xs flex items-center gap-4">
              <div className="w-13 h-13 rounded-2xl bg-[#FFF2E2] flex items-center justify-center text-[#E8590C] shrink-0 border border-[#E8590C]/15">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div>
                <h4 className="font-heading text-base font-black text-[#1F1511]">100% Quality & Hygiene Assurance</h4>
                <p className="font-body text-xs text-[#665E58] mt-1 leading-relaxed">
                  Sanitized prep counters, pure dairy butter, premium cocoa, and farm-fresh ingredients in every preparation.
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* 4 Trust Cards Grid with MagicCard Hover Glow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {trustHighlights.map((block) => (
            <MagicCard
              key={block.title}
              className="p-6 flex flex-col items-start rounded-3xl bg-white border border-[#EEDCCE] shadow-xs hover:shadow-lg transition-all"
              glowColor="rgba(232, 89, 12, 0.2)"
              borderColor="rgba(232, 89, 12, 0.4)"
            >
              <div className="w-11 h-11 rounded-2xl bg-[#FAF8F5] border border-[#EEDCCE] flex items-center justify-center mb-4 shadow-xs">
                {block.icon}
              </div>
              <h4 className="font-heading font-black text-base text-[#1F1511]">{block.title}</h4>
              <p className="font-body text-xs text-[#665E58] mt-2 leading-relaxed">{block.desc}</p>
            </MagicCard>
          ))}
        </div>

      </div>
    </section>
  );
}

export default About;
