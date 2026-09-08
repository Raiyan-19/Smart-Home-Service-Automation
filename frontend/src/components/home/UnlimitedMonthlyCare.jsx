import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function UnlimitedMonthlyCare() {
  const navigate = useNavigate();

  const benefits = [
    {
      title: 'UNLIMITED SERVICE VISITS',
      desc: 'Need an AC checkup today, a plumbing fix tomorrow, or electrical wiring next week? Request as many technician visits as your home needs with zero limits.',
      icon: 'all_inclusive',
    },
    {
      title: 'ZERO LABOR CHARGES',
      desc: 'Never pay hourly inspection fees or unexpected technician labor costs again. All standard diagnostics, repairs, and servicing labor are 100% included.',
      icon: 'money_off',
    },
    {
      title: '15-MIN PRIORITY DISPATCH',
      desc: 'Skip regular customer queues. Member requests are automatically dispatched to Dhaka’s top-rated field specialists with guaranteed 15-minute response.',
      icon: 'bolt',
    },
    {
      title: 'NO LONG-TERM CONTRACTS',
      desc: 'Our subscription is billed on a month-to-month basis. You have full freedom to pause, upgrade, or cancel anytime in 1 tap with zero cancellation fees.',
      icon: 'event_available',
    },
  ];

  return (
    <section className="py-20 bg-[#0A0D12] text-white border-b-4 border-[#F5A623] relative overflow-hidden" id="monthly-care">
      {/* Subtle Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A0D12] via-[#0E4B6E]/30 to-[#0A0D12] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="inline-block bg-[#F5A623] text-[#0A0D12] px-4 py-1 rounded-full text-xs font-heading font-black uppercase tracking-widest shadow-md">
            ALL-INCLUSIVE SUBSCRIPTION
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl font-black uppercase text-white tracking-tight leading-tight">
            UNLIMITED MONTHLY <br />
            <span className="text-[#F5A623]">HOME CARE PASS</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            Take the stress out of home maintenance. Enjoy unlimited repairs, zero labor charges, and priority technician dispatch for your Dhaka apartment under one simple monthly subscription.
          </p>
        </div>

        {/* 4 Feature Columns in the Signature Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {benefits.map((b, i) => (
            <div
              key={i}
              className="p-7 rounded-2xl bg-slate-900/90 border-2 border-slate-800 hover:border-[#F5A623] transition-all duration-300 flex flex-col justify-between space-y-4 hover:-translate-y-1 shadow-lg"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#0E4B6E] text-[#F5A623] flex items-center justify-center font-bold mb-4 shadow-md">
                  <span className="material-symbols-outlined text-[28px]">{b.icon}</span>
                </div>
                <h3 className="font-heading text-lg font-black uppercase text-white tracking-tight leading-snug">
                  {b.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-2.5 leading-relaxed">
                  {b.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center gap-1.5 text-xs font-bold text-[#F5A623]">
                <span className="material-symbols-outlined text-[16px]">check_circle</span>
                <span>Included in Plan</span>
              </div>
            </div>
          ))}
        </div>

        {/* Highlighted Pricing & CTA Box (Exact Style of HomeServiceWebDesign) */}
        <div className="bg-gradient-to-br from-[#0E4B6E] to-[#0A3854] border-2 border-[#166088] rounded-3xl p-8 sm:p-12 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center lg:text-left">
            <span className="text-xs font-heading font-black text-[#F5A623] uppercase tracking-widest block">
              MONTH-TO-MONTH PEACE OF MIND
            </span>
            <h3 className="font-heading text-2xl sm:text-4xl font-black uppercase text-white">
              Ready for Hassle-Free Home Care?
            </h3>
            <p className="text-sm sm:text-base text-slate-200 max-w-xl leading-relaxed">
              Covers your entire home in Dhaka: AC units, plumbing valves, electrical breaker panels, water pumps, and routine preventive checkups.
            </p>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 text-xs font-bold text-slate-300">
              <span className="flex items-center gap-1">✓ No Setup Fees</span>
              <span className="flex items-center gap-1">✓ Cancel Anytime</span>
              <span className="flex items-center gap-1">✓ Covers 1 Complete Home</span>
            </div>
          </div>

          <div className="bg-[#0A0D12] p-8 rounded-2xl border-2 border-[#F5A623] text-center flex-shrink-0 w-full sm:w-80 shadow-gold">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Dhaka Resident Rate</p>
            <div className="my-2">
              <span className="font-heading text-4xl sm:text-5xl font-black text-[#F5A623]">৳1,499</span>
              <span className="text-xs text-slate-400 uppercase font-bold block mt-1">/ Month (All-Inclusive)</span>
            </div>
            <button
              onClick={() => navigate('/request?service=Unlimited%20Monthly%20Care%20Pass')}
              className="w-full mt-4 py-3.5 rounded-lg bg-[#F5A623] hover:bg-[#E09415] text-[#0A0D12] font-heading font-black text-xs uppercase tracking-wider shadow-md hover:scale-102 active:scale-98 transition-all cursor-pointer"
            >
              Get Started Today
            </button>
            <p className="text-[10px] text-slate-400 mt-2 font-medium">Billed monthly • Instant activation</p>
          </div>
        </div>
      </div>
    </section>
  );
}
