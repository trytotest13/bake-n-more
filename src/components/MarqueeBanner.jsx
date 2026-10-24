import React from "react";
import { TextScrollMarquee } from "./lightswind/TextScrollMarquee";
import { Sparkles, Clock, Heart, ShieldCheck, Truck, Award, Cake } from "lucide-react";

export function MarqueeBanner() {
  const highlights = [
    { icon: <Sparkles className="w-4 h-4 text-[#C2410C]" />, label: "Freshly Baked Every Morning" },
    { icon: <Heart className="w-4 h-4 text-emerald-600" />, label: "100% Pure Veg & Eggless Options" },
    { icon: <Cake className="w-4 h-4 text-[#F59F00]" />, label: "Custom 3D & Celebration Cakes" },
    { icon: <Clock className="w-4 h-4 text-amber-600" />, label: "Stone-Baked Pizzas & Hot Burgers" },
    { icon: <Award className="w-4 h-4 text-[#C2410C]" />, label: "Rated 4.9 ★ by Kalyanpur Foodies" },
    { icon: <ShieldCheck className="w-4 h-4 text-emerald-600" />, label: "Hygienic Kitchen & Pure Dairy Butter" },
    { icon: <Truck className="w-4 h-4 text-blue-600" />, label: "Fast Takeaway & Local Kanpur Delivery" },
  ];

  const marqueeElements = highlights.map((item, index) => (
    <div
      key={index}
      className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/95 border border-[#EEDCCE] shadow-xs text-xs sm:text-sm font-bold text-[#1F1511] hover:border-[#E8590C] transition-colors"
    >
      {item.icon}
      <span>{item.label}</span>
      <span className="text-[#C2410C] font-black ml-1.5">•</span>
    </div>
  ));

  return (
    <div className="w-full bg-gradient-to-r from-[#FFF5EA] via-[#FFF9F2] to-[#FFF5EA] border-y border-[#EEDCCE] py-3 overflow-hidden shadow-xs">
      <TextScrollMarquee items={marqueeElements} speed="normal" pauseOnHover={true} />
    </div>
  );
}

export default MarqueeBanner;
