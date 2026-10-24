import React, { useState } from 'react';
import { Badge } from './lightswind/Badge';
import { ShineButton } from './lightswind/ShineButton';
import { Phone, MessageCircle, MapPin, Clock, Send, Navigation, CheckCircle2 } from 'lucide-react';

function Contact() {
  const phoneNumber = '+917571983301';
  const displayPhone = '+91 75719 83301';
  const fullAddress = "1, Adarsh Complex, O/PR-4, Chowk, near Maharana Pratap, Awas Vikas Keshav Puram, Kalyanpur, Kanpur, UP 208019";
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Bake n More, " + fullAddress)}`;

  const [messageForm, setMessageForm] = useState({
    name: '',
    phone: '',
    message: '',
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setMessageForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `*WEBSITE INQUIRY - Bake 'n' More*\n\n` +
      `• Name: ${messageForm.name || 'Visitor'}\n` +
      `• Phone: ${messageForm.phone || 'Not provided'}\n` +
      `• Message: ${messageForm.message || 'Hi, please call me back regarding your menu and cakes.'}`
    );
    window.open(`https://wa.me/917571983301?text=${text}`, '_blank');
  };

  return (
    <section id="contact" className="py-20 lg:py-24 bg-[#FAF8F5] relative">
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
            Visit & Connect
          </Badge>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-[#1F1511] tracking-tight">
            We’d Love to Serve You
          </h2>
          <p className="font-body text-sm sm:text-base text-[#665E58] mt-3 leading-relaxed">
            Whether you are ordering online, planning a custom celebration cake, or visiting our warm bakery café in Kalyanpur.
          </p>
        </div>

        {/* 3 Quick Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-14">
          
          {/* Card 1: WhatsApp */}
          <div className="p-7 rounded-3xl bg-white border border-[#EEDCCE] shadow-xs hover:shadow-lg transition-all flex flex-col justify-between">
            <div>
              <div className="w-13 h-13 rounded-2xl bg-[#FFF2E2] flex items-center justify-center text-[#E8590C] mb-4 border border-[#E8590C]/15">
                <MessageCircle className="w-7 h-7" />
              </div>
              <Badge variant="accent" size="sm" className="mb-2 font-black bg-[#E8590C] text-white">
                FASTEST RESPONSE
              </Badge>
              <h3 className="font-heading text-lg font-black text-[#1F1511]">WhatsApp Direct</h3>
              <p className="font-body text-xs text-[#665E58] mt-1.5 leading-relaxed">
                Send cake theme pictures, confirm delivery times, or ask for today's hot counter special.
              </p>
              <span className="block font-heading text-sm font-black text-[#1F1511] mt-3.5">{displayPhone}</span>
            </div>
            <div className="mt-6">
              <ShineButton
                variant="accent"
                size="sm"
                onClick={() => window.open(`https://wa.me/917571983301?text=Hi%20Bake%20n%20More!`, '_blank')}
                icon={<MessageCircle className="w-4 h-4" />}
                className="w-full font-bold justify-center shadow-md shadow-[#E8590C]/20 py-2.5"
              >
                Chat on WhatsApp
              </ShineButton>
            </div>
          </div>

          {/* Card 2: Phone Line */}
          <div className="p-7 rounded-3xl bg-white border border-[#EEDCCE] shadow-xs hover:shadow-lg transition-all flex flex-col justify-between">
            <div>
              <div className="w-13 h-13 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 mb-4 border border-amber-200">
                <Phone className="w-7 h-7" />
              </div>
              <Badge variant="gold" size="sm" className="mb-2 font-black bg-[#FFF2E2] text-[#B34700]">
                DIRECT COUNTER
              </Badge>
              <h3 className="font-heading text-lg font-black text-[#1F1511]">Call Bakery Counter</h3>
              <p className="font-body text-xs text-[#665E58] mt-1.5 leading-relaxed">
                Speak directly with our team for immediate takeaway prep, inquiries, or table reservations.
              </p>
              <span className="block font-heading text-sm font-black text-[#1F1511] mt-3.5">{displayPhone}</span>
            </div>
            <div className="mt-6">
              <a
                href={`tel:${phoneNumber}`}
                className="w-full py-2.5 px-4 rounded-xl border border-[#EEDCCE] bg-[#FAF8F5] text-xs font-bold text-[#1F1511] hover:bg-[#1F1511] hover:text-white hover:border-[#1F1511] transition-all flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#E8590C]" />
                <span>Call +91 75719 83301</span>
              </a>
            </div>
          </div>

          {/* Card 3: Store & Hours */}
          <div className="p-7 rounded-3xl bg-white border border-[#EEDCCE] shadow-xs hover:shadow-lg transition-all flex flex-col justify-between">
            <div>
              <div className="w-13 h-13 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-4 border border-emerald-200">
                <Clock className="w-7 h-7" />
              </div>
              <Badge variant="success" size="sm" className="mb-2 font-black bg-emerald-600 text-white">
                OPEN DAILY
              </Badge>
              <h3 className="font-heading text-lg font-black text-[#1F1511]">Store Timings</h3>
              <p className="font-body text-xs text-[#665E58] mt-1.5 leading-relaxed">
                Open every day for hot dine-in snacks, fresh coffee, cake pickups, and local takeaway.
              </p>
              <span className="block font-heading text-sm font-black text-emerald-700 mt-3.5">10:00 AM – 10:00 PM</span>
            </div>
            <div className="mt-6">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl border border-[#EEDCCE] bg-[#FAF8F5] text-xs font-bold text-[#1F1511] hover:bg-[#1F1511] hover:text-white hover:border-[#1F1511] transition-all flex items-center justify-center gap-2"
              >
                <Navigation className="w-4 h-4 text-[#E8590C]" />
                <span>Get Directions</span>
              </a>
            </div>
          </div>

        </div>

        {/* Address & Quick Message Bento */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto items-stretch">
          
          {/* Address Card */}
          <div className="lg:col-span-6 p-7 sm:p-9 rounded-3xl bg-white border border-[#EEDCCE] shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-[#E8590C] mb-3">
                <MapPin className="w-5 h-5" />
                <span className="text-xs font-black uppercase tracking-wider">Bakery Location</span>
              </div>
              <h4 className="font-heading text-2xl font-black text-[#1F1511] mb-2">Bake 'n' More Kalyanpur</h4>
              <p className="font-body text-xs sm:text-sm text-[#665E58] leading-relaxed">
                {fullAddress}
              </p>
              
              <div className="mt-5 p-4 rounded-2xl bg-[#FAF8F5] border border-[#EEDCCE] text-xs text-[#665E58] space-y-1.5">
                <div className="flex items-center gap-2 text-[#1F1511] font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Landmark: Near Maharana Pratap Chowk</span>
                </div>
                <p className="pl-6 text-[11px] text-[#665E58]">
                  Keshav Puram, Awas Vikas, Kalyanpur. Ample customer parking available.
                </p>
              </div>
            </div>

            <div className="mt-7">
              <ShineButton
                variant="primary"
                size="md"
                onClick={() => window.open(mapsUrl, '_blank')}
                icon={<MapPin className="w-4 h-4" />}
                className="w-full font-bold justify-center py-3 shadow-md shadow-[#1F1511]/15"
              >
                Open in Google Maps
              </ShineButton>
            </div>
          </div>

          {/* Quick Message Box */}
          <div className="lg:col-span-6 p-7 sm:p-9 rounded-3xl bg-white border border-[#EEDCCE] shadow-md">
            <h4 className="font-heading text-xl font-black text-[#1F1511] mb-1">Send a Quick Note</h4>
            <p className="font-body text-xs text-[#665E58] mb-5">Leave your details and your inquiry will open directly on WhatsApp.</p>
            
            <form onSubmit={handleFormSubmit} className="space-y-3.5">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Full Name"
                  aria-label="Your full name"
                  value={messageForm.name}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-3 rounded-2xl border border-[#EEDCCE] bg-[#FAF8F5] text-xs sm:text-sm text-[#1F1511] focus:outline-none focus:ring-2 focus:ring-[#E8590C] focus:bg-white transition-all font-body"
                />
              </div>
              <div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Your Phone Number"
                  aria-label="Your phone number"
                  value={messageForm.phone}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-3 rounded-2xl border border-[#EEDCCE] bg-[#FAF8F5] text-xs sm:text-sm text-[#1F1511] focus:outline-none focus:ring-2 focus:ring-[#E8590C] focus:bg-white transition-all font-body"
                />
              </div>
              <div>
                <textarea
                  name="message"
                  rows="3"
                  placeholder="How can we assist? (e.g. Birthday cake theme query, party catering...)"
                  aria-label="How can we assist?"
                  value={messageForm.message}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 rounded-2xl border border-[#EEDCCE] bg-[#FAF8F5] text-xs sm:text-sm text-[#1F1511] focus:outline-none focus:ring-2 focus:ring-[#E8590C] focus:bg-white transition-all font-body"
                ></textarea>
              </div>
              <ShineButton
                type="submit"
                variant="accent"
                size="md"
                icon={<Send className="w-4 h-4" />}
                className="w-full font-bold justify-center py-3 shadow-md shadow-[#E8590C]/25"
              >
                Send to WhatsApp
              </ShineButton>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Contact;
