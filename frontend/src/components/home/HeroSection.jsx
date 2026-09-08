import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function HeroSection() {
  const navigate = useNavigate();

  const popularServices = [
    { name: 'AC & Appliance Repair', label: 'AC Repair', emoji: '❄️' },
    { name: 'Plumbing & Water Lines', label: 'Plumbing', emoji: '💧' },
    { name: 'Electrical & Wiring', label: 'Electrician', emoji: '⚡' },
    { name: 'Deep Cleaning', label: 'Deep Cleaning', emoji: '🧹' },
  ];

  return (
    <section className="relative bg-[#0A0D12] text-white overflow-hidden py-16 sm:py-24 border-b border-slate-800">
      {/* Background Image with Dark Vignette Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1920&q=80"
          alt="Home service technician working"
          className="w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0D12] via-[#0A0D12]/90 to-[#0E4B6E]/75"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Big Bold Headlines & CTAs */}
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-[#F5A623] text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#F5A623] animate-ping"></span>
              <span>Dhaka's #1 Rated Home Service Network</span>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-[1.08]">
              WE PROVIDE{' '}
              <span className="text-[#F5A623] italic font-serif lowercase tracking-normal">
                trusted
              </span>{' '}
              <br className="hidden sm:inline" />
              SERVICES FOR DHAKA HOMES
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-normal">
              Book verified AC technicians, electricians, plumbers, and home cleaners across Dhanmondi, Gulshan, Banani, Mirpur, and Uttara. Upfront fixed rates, 15-minute rapid response, and 100% satisfaction guarantee.
            </p>

            {/* Signature Dual CTAs (Exact Style of HomeServiceWebDesign) */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/request"
                className="px-8 py-4 rounded-lg bg-[#F5A623] hover:bg-[#E09415] text-[#0A0D12] font-heading font-black text-sm uppercase tracking-wider shadow-gold hover:scale-102 active:scale-98 transition-all flex items-center gap-2"
              >
                <span>Get Started</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>

              <Link
                to="/services"
                className="px-8 py-4 rounded-lg bg-[#0E4B6E] hover:bg-[#0A3854] text-white font-heading font-bold text-sm uppercase tracking-wider border border-[#166088] hover:scale-102 active:scale-98 transition-all flex items-center gap-2"
              >
                <span>Our Services</span>
                <span className="material-symbols-outlined text-[18px]">grid_view</span>
              </Link>
            </div>

            {/* Quick 1-Tap Category Filter Chips */}
            <div className="pt-4">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                Popular Services in Dhaka:
              </p>
              <div className="flex flex-wrap items-center gap-2">
                {popularServices.map((srv) => (
                  <button
                    key={srv.name}
                    onClick={() => navigate(`/request?service=${encodeURIComponent(srv.name)}`)}
                    className="px-4 py-2 rounded-lg bg-slate-900/90 hover:bg-[#F5A623] hover:text-[#0A0D12] border border-slate-700 text-slate-200 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>{srv.emoji}</span>
                    <span>{srv.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Hero Preview Video / Card */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="relative group cursor-pointer" onClick={() => navigate('/smart-match')}>
              <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-full bg-slate-800/80 border-4 border-[#F5A623] flex flex-col items-center justify-center p-6 text-center shadow-gold hover:scale-105 transition-all relative overflow-hidden backdrop-blur-md">
                <div className="w-16 h-16 rounded-full bg-[#F5A623] text-[#0A0D12] flex items-center justify-center shadow-md mb-3 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[36px] ml-1">play_arrow</span>
                </div>
                <h4 className="font-heading font-black text-white text-base sm:text-lg uppercase leading-tight">
                  Instant Auto-Match
                </h4>
                <p className="text-xs text-slate-300 mt-1">
                  1-Click Dispatch in Dhaka
                </p>
                <span className="mt-2 text-[10px] font-extrabold uppercase bg-emerald-500 text-slate-950 px-2.5 py-0.5 rounded-full">
                  14 Techs Online
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
