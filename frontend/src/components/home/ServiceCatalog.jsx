import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ServiceCatalog({ services = [] }) {
  const [activeTab, setActiveTab] = useState('ALL');
  const navigate = useNavigate();

  const defaultServices = [
    {
      name: 'AC & Appliance Repair',
      category: 'APPLIANCES',
      icon: 'mode_fan',
      activeTechs: '14 Online',
      desc: 'Compressor check, gas recharge, cooling loss fix, inverter PCB troubleshooting, and deep chemical wash.',
      rate: '৳800+',
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Plumbing & Water Lines',
      category: 'PLUMBING',
      icon: 'water_damage',
      activeTechs: '9 Online',
      desc: 'Motor water pumps, bathroom geyser pipes, drainage blockages, sink repairs, and pressure valves.',
      rate: '৳500+',
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Electrical & Wiring',
      category: 'ELECTRICAL',
      icon: 'bolt',
      activeTechs: '21 Online',
      desc: 'Short circuit isolation, breaker board tuning, IPS inverter setup, smart switches & ceiling wiring.',
      rate: '৳600+',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Deep Home Cleaning',
      category: 'CLEANING',
      icon: 'sanitizer',
      activeTechs: '8 Online',
      desc: 'Full apartment sanitization, kitchen degreasing, bathroom steam cleaning, and floor restoration.',
      rate: '৳1,200+',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Pest Control Protocol',
      category: 'MAINTENANCE',
      icon: 'pest_control',
      activeTechs: '5 Online',
      desc: 'Odorless cockroach gel eradication, bedbug heat treatment, and long-lasting termite protection.',
      rate: '৳1,500+',
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Home Carpentry',
      category: 'MAINTENANCE',
      icon: 'carpenter',
      activeTechs: '11 Online',
      desc: 'Custom furniture assembly, hydraulic door hinges, wardrobe hardware, and wood waterproofing.',
      rate: '৳900+',
      image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const displayServices = services.length > 0 ? services : defaultServices;
  const categories = ['ALL', 'APPLIANCES', 'PLUMBING', 'ELECTRICAL', 'CLEANING', 'MAINTENANCE'];

  const filtered = activeTab === 'ALL'
    ? displayServices
    : displayServices.filter(s => (s.category || '').toUpperCase() === activeTab);

  const handleSelectService = (service) => {
    navigate(`/request?service=${encodeURIComponent(service.name)}`);
  };

  return (
    <section className="py-20 bg-[#0A0D12] text-white border-b border-slate-800" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0B4F6C]/60 border border-[#0B4F6C] text-[#F5A623] text-xs font-heading font-black tracking-widest uppercase mb-3">
              Certified Master Craftsmen
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              DHAKA <span className="text-[#F5A623] italic font-serif lowercase text-4xl sm:text-6xl">home services</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-xl mt-2 font-normal">
              Select any service below to see upfront fixed pricing and available specialists in your area.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
            {categories.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2.5 rounded-lg text-xs font-heading font-black uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === tab
                    ? 'bg-[#F5A623] text-[#0A0D12] shadow-gold-sm'
                    : 'bg-[#0E1520] hover:bg-[#161f2e] border border-slate-800 text-slate-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* 6-Card Services Grid in Dark HomeServiceWebDesign Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filtered.map((s, idx) => {
            const img = s.image || defaultServices[idx % defaultServices.length]?.image;
            const rate = s.rate || (s.basePrice ? `৳${s.basePrice}+` : '৳800+');
            const techs = s.activeTechs || (s.activeTechCount ? `${s.activeTechCount} Online` : '12 Online');

            return (
              <div
                key={s.name || idx}
                className="rounded-2xl overflow-hidden bg-[#0E1520] border-2 border-slate-800 hover:border-[#F5A623] shadow-2xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                {/* Photo Top with Online Badge & Price Tag */}
                <div className="relative h-52 sm:h-56 bg-slate-900 overflow-hidden">
                  <img
                    src={img}
                    alt={s.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E1520] via-transparent to-transparent" />

                  {/* Online Badge */}
                  <div className="absolute top-3.5 right-3.5 bg-[#0A0D12]/95 border border-slate-700 text-[#F5A623] text-[11px] font-heading font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                    <span>{techs}</span>
                  </div>

                  {/* Price Tag Pill */}
                  <div className="absolute bottom-3.5 left-4">
                    <span className="bg-[#F5A623] text-[#0A0D12] text-xs font-heading font-black px-3 py-1 rounded-md uppercase tracking-wider shadow-gold-sm">
                      STARTS FROM {rate}
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="font-heading text-xl font-black uppercase text-white tracking-wide group-hover:text-[#F5A623] transition-colors">
                      {s.name}
                    </h3>
                    <p className="text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed font-normal">
                      {s.desc || s.description}
                    </p>
                  </div>

                  {/* Card Footer with Guarantee & Amber Button */}
                  <div className="pt-5 mt-5 border-t border-slate-800/80 flex items-center justify-between gap-2">
                    <span className="text-[11px] text-emerald-400 font-heading font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">verified</span>
                      30-Day Guarantee
                    </span>

                    <button
                      onClick={() => handleSelectService(s)}
                      className="px-5 py-2.5 rounded-lg bg-[#F5A623] hover:bg-[#E09415] text-[#0A0D12] font-heading font-black text-xs uppercase tracking-wider shadow-gold-sm hover:scale-105 active:scale-98 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                    >
                      <span>Book Service</span>
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
