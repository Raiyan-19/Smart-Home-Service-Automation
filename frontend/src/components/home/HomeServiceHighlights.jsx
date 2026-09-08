import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomeServiceHighlights() {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      {/* 1. Signature Full-Width Amber Gold 3-Column Banner */}
      <section className="bg-[#F5A623] text-[#0A0D12] py-12 px-4 sm:px-6 lg:px-8 border-b-4 border-[#0B4F6C] relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[32px] text-[#0A0D12] font-black">bolt</span>
              <h3 className="font-heading text-xl sm:text-2xl font-black uppercase tracking-tight text-[#0A0D12]">
                15-Minute Dispatch
              </h3>
            </div>
            <p className="text-sm font-semibold text-slate-950 leading-relaxed">
              Fastest technician response in Dhaka. We route the closest certified master specialist directly to your doorstep.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[32px] text-[#0A0D12] font-black">verified_user</span>
              <h3 className="font-heading text-xl sm:text-2xl font-black uppercase tracking-tight text-[#0A0D12]">
                Verified Master Techs
              </h3>
            </div>
            <p className="text-sm font-semibold text-slate-950 leading-relaxed">
              Every pro is background-checked, equipped with industrial diagnostic tools, and backed by a 30-day warranty.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[32px] text-[#0A0D12] font-black">payments</span>
              <h3 className="font-heading text-xl sm:text-2xl font-black uppercase tracking-tight text-[#0A0D12]">
                Transparent Fixed Rates
              </h3>
            </div>
            <p className="text-sm font-semibold text-slate-950 leading-relaxed">
              Know your exact price before booking. Zero surge fees, zero hidden diagnosis charges, and pay after completion.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Signature 50/50 Split-Screen Showcase (Craftsman Left + Dark Teal Container Right) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 w-full overflow-hidden border-b border-slate-800">
        {/* Left Side: High-res Master Craftsman / Technician Photo */}
        <div className="lg:col-span-5 relative min-h-[380px] lg:min-h-[460px] bg-slate-900 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80"
            alt="Dhaka Master Technician"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D12]/80 via-transparent to-transparent lg:hidden" />
          <div className="absolute top-5 left-5 bg-[#F5A623] text-[#0A0D12] text-xs font-heading font-black px-3.5 py-1 rounded uppercase tracking-wider shadow-md">
            ★ VERIFIED DHAKA MASTER PRO
          </div>
        </div>

        {/* Right Side: Deep Navy Blue / Dark Teal Container (#0B4F6C) with Bold White Rubik Typography */}
        <div className="lg:col-span-7 bg-[#0B4F6C] text-white p-8 sm:p-14 lg:p-16 flex flex-col justify-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0E4B6E] text-[#F5A623] text-xs font-heading font-black uppercase tracking-wider w-fit border border-[#0E4B6E]">
            <span>SMART SERVICE DISPATCH</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-tight">
            DHAKA'S SMARTEST <br />
            <span className="text-[#F5A623]">HOME SERVICE NETWORK</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
            No more waiting for unreliable handymen or haggling over unpredictable prices. HomeEase automatically matches your repair ticket with certified field specialists near your neighborhood with guaranteed arrival windows and upfront fixed rates.
          </p>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            From urgent AC diagnostics to plumbing repairs, electrical wiring, and deep home cleaning—we provide pre-screened home service backed by a 30-day workmanship warranty.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={() => navigate('/smart-match')}
              className="px-8 py-4 rounded-lg bg-[#F5A623] hover:bg-[#E09415] text-[#0A0D12] font-heading font-black text-xs sm:text-sm uppercase tracking-wider shadow-gold-sm hover:scale-105 active:scale-98 transition-all cursor-pointer flex items-center gap-2"
            >
              <span>See Available Specialists</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>

            <button
              onClick={() => navigate('/services')}
              className="px-7 py-4 rounded-lg bg-[#0E4B6E] hover:bg-[#0A3854] text-white font-heading font-bold text-xs sm:text-sm uppercase tracking-wider border border-[#0E4B6E] hover:border-[#F5A623] transition-all cursor-pointer"
            >
              <span>Explore Services</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
