import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

export default function UnlimitedMonthlyPage() {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [subscribedSuccess, setSubscribedSuccess] = useState(false);
  const [subscribing, setSubscribing] = useState(false);
  const [address, setAddress] = useState('House 42, Road 7A, Dhanmondi, Dhaka');
  const [phone, setPhone] = useState('+880 1712-345678');

  const handleSubscribe = (planName) => {
    setSelectedPlan(planName);
  };

  const handleConfirmSubscription = (e) => {
    e.preventDefault();
    setSubscribing(true);
    setTimeout(() => {
      setSubscribing(false);
      setSubscribedSuccess(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#0A0D12] text-white flex flex-col font-sans selection:bg-[#F5A623] selection:text-[#0A0D12]">
      <Navbar />

      <main className="flex-grow">
        {/* ========================================================================= */}
        {/* 1. HERO SECTION - Modeled directly on homeservicewebdesign.com/unlimited */}
        {/* ========================================================================= */}
        <section className="relative pt-20 pb-24 md:pt-28 md:pb-32 overflow-hidden border-b border-slate-800">
          {/* Dark textured backdrop with subtle ambient teal/gold glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0D12] via-[#0E1B29]/70 to-[#0A0D12] pointer-events-none" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#0B4F6C]/25 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-[#F5A623]/15 blur-[90px] rounded-full pointer-events-none" />

          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0B4F6C]/60 border border-[#0B4F6C] text-[#F5A623] text-xs font-heading font-black tracking-widest uppercase mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#F5A623] animate-ping"></span>
              DHAKA HOME CARE SUBSCRIPTION
            </div>

            {/* Main Signature Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight uppercase">
              <span className="text-[#F5A623] italic font-serif block sm:inline mr-3 normal-case text-4xl sm:text-6xl lg:text-7xl drop-shadow-[0_2px_15px_rgba(245,166,35,0.4)]">
                Unlimited
              </span>
              <span className="font-heading font-black text-white">
                Monthly Home Care Visits
              </span>
            </h1>

            {/* Subhead */}
            <p className="mt-5 text-base sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
              All Our HomeEase Subscriptions Include <strong className="text-white font-bold">Unlimited Monthly Service Visits, Routine Maintenance &amp; Emergency Repair Requests</strong> Across Dhaka.
            </p>

            {/* Action CTA Button */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#pricing-plans"
                className="w-full sm:w-auto px-9 py-4 rounded-lg bg-[#F5A623] hover:bg-[#E09415] text-[#0A0D12] font-heading font-black text-sm uppercase tracking-wider shadow-gold-md hover:scale-105 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Get Started</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </a>
              <button
                onClick={() => navigate('/request')}
                className="w-full sm:w-auto px-8 py-4 rounded-lg bg-[#0B4F6C] hover:bg-[#0E4B6E] text-white font-heading font-black text-sm uppercase tracking-wider border border-[#0B4F6C] hover:border-[#F5A623] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>One-Time Service</span>
                <span className="material-symbols-outlined text-[18px]">home_repair_service</span>
              </button>
            </div>

            {/* Pillar Trust Badges */}
            <div className="mt-12 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#0B4F6C]/40 border border-[#0B4F6C] flex items-center justify-center text-[#F5A623]">
                  <span className="material-symbols-outlined text-[20px]">all_inclusive</span>
                </div>
                <div>
                  <p className="text-xs font-heading font-black text-white uppercase">Unlimited Calls</p>
                  <p className="text-[11px] text-slate-400">Zero visit surcharges</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#0B4F6C]/40 border border-[#0B4F6C] flex items-center justify-center text-[#F5A623]">
                  <span className="material-symbols-outlined text-[20px]">money_off</span>
                </div>
                <div>
                  <p className="text-xs font-heading font-black text-white uppercase">Zero Labor Fees</p>
                  <p className="text-[11px] text-slate-400">Standard fixes included</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#0B4F6C]/40 border border-[#0B4F6C] flex items-center justify-center text-[#F5A623]">
                  <span className="material-symbols-outlined text-[20px]">speed</span>
                </div>
                <div>
                  <p className="text-xs font-heading font-black text-white uppercase">15-Min Dispatch</p>
                  <p className="text-[11px] text-slate-400">Dhaka priority queue</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#0B4F6C]/40 border border-[#0B4F6C] flex items-center justify-center text-[#F5A623]">
                  <span className="material-symbols-outlined text-[20px]">cancel</span>
                </div>
                <div>
                  <p className="text-xs font-heading font-black text-white uppercase">No Contract</p>
                  <p className="text-[11px] text-slate-400">Cancel anytime freely</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. 50/50 SPLIT-SCREEN FEATURE CARD (Signature HomeServiceWebDesign Style) */}
        {/* ========================================================================= */}
        <section className="py-16 md:py-24 bg-[#0A0D12]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
              {/* Left Side: High-res technician/craftsman photo */}
              <div className="relative min-h-[380px] lg:min-h-[480px] bg-slate-900 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80"
                  alt="Dhaka Home Care Technician"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D12]/80 via-transparent to-transparent lg:hidden" />
                <div className="absolute top-4 left-4 bg-[#F5A623] text-[#0A0D12] text-xs font-heading font-black px-3 py-1 rounded uppercase tracking-wider">
                  ★ Master Tech on Call
                </div>
              </div>

              {/* Right Side: Solid Dark Teal/Navy Blue Container (#0B4F6C) */}
              <div className="bg-[#0B4F6C] p-8 sm:p-12 flex flex-col justify-center text-white">
                <span className="text-[#F5A623] text-xs font-heading font-black tracking-widest uppercase mb-2 block">
                  Peace Of Mind Maintenance
                </span>
                <h2 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tight leading-tight mb-5">
                  DHAKA HOME SERVICE CARE PASS
                </h2>
                <p className="text-slate-200 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                  The pace of modern life in Dhaka is rapidly accelerating, and your home maintenance should keep up effortlessly. Here at HomeEase, we keep your home running smoothly through our monthly care subscription program, allowing you to request repairs, inspections, and preventative servicing with a simple tap or quick phone call to our dispatch team.
                </p>
                <p className="text-slate-200 text-sm sm:text-base leading-relaxed mb-8 font-normal">
                  Guaranteed priority response ensures your family is never left sweating through a summer power cut, struggling with an overflowing water tank, or waiting days for an honest electrician.
                </p>

                <div>
                  <a
                    href="#pricing-plans"
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-[#F5A623] hover:bg-[#E09415] text-[#0A0D12] font-heading font-black text-xs sm:text-sm uppercase tracking-wider shadow-gold-sm hover:scale-105 active:scale-98 transition-all cursor-pointer"
                  >
                    <span>Get Started</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* ========================================================================= */}
        {/* 4. PRICING & SUBSCRIPTION PACKAGES                                        */}
        {/* ========================================================================= */}
        <section id="pricing-plans" className="py-20 bg-[#0A0D12]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-[#F5A623] text-xs font-heading font-black tracking-widest uppercase block mb-2">
                TRANSPARENT DHAKA PRICING
              </span>
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
                SELECT YOUR <span className="text-[#F5A623] italic font-serif lowercase text-4xl sm:text-6xl">care plan</span>
              </h2>
              <p className="mt-3 text-slate-300 text-sm sm:text-base">
                Zero Hidden Costs. Zero Diagnostic Fees. Unlimited Monthly Calls.
              </p>
            </div>

            {/* Plan Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Plan 1: Standard Apartment Care */}
              <div className="rounded-2xl border-2 border-[#0B4F6C] bg-[#0E1520] p-8 flex flex-col justify-between relative shadow-xl hover:border-[#F5A623] transition-all">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-heading font-black text-[#F5A623] uppercase tracking-wider bg-[#F5A623]/10 px-3 py-1 rounded-full border border-[#F5A623]/30">
                      Standard Care Pass
                    </span>
                    <span className="text-xs text-slate-400">1 to 3 Bed Apartments</span>
                  </div>

                  <h3 className="font-heading font-black text-2xl text-white uppercase">
                    DHAKA RESIDENCE PLAN
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Ideal for families in Dhanmondi, Gulshan, Mirpur, Uttara
                  </p>

                  <div className="mt-6 flex items-baseline gap-2">
                    <span className="font-heading font-black text-4xl sm:text-5xl text-[#F5A623]">৳1,499</span>
                    <span className="text-sm text-slate-400">/ Month</span>
                  </div>
                  <p className="text-[11px] text-emerald-400 font-bold mt-1">
                    ✓ Billed month-to-month • Cancel anytime
                  </p>

                  <ul className="mt-8 space-y-3.5 text-xs sm:text-sm text-slate-300">
                    <li className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-[#F5A623] text-[18px]">check_circle</span>
                      <span><strong>Unlimited</strong> repair and inspection visits</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-[#F5A623] text-[18px]">check_circle</span>
                      <span><strong>Zero Labor Charges</strong> on standard household fixes</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-[#F5A623] text-[18px]">check_circle</span>
                      <span><strong>15-Minute</strong> priority dispatch SLA in Dhaka</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-[#F5A623] text-[18px]">check_circle</span>
                      <span><strong>Covers:</strong> AC, Plumbing, Electrical, Fans, Switches</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-[#F5A623] text-[18px]">check_circle</span>
                      <span><strong>30-Day</strong> guaranteed repair warranty</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-800">
                  <button
                    onClick={() => handleSubscribe('Dhaka Residence Plan')}
                    className="w-full py-4 rounded-lg bg-[#F5A623] hover:bg-[#E09415] text-[#0A0D12] font-heading font-black text-sm uppercase tracking-wider shadow-gold-sm hover:scale-102 active:scale-98 transition-all cursor-pointer"
                  >
                    ACTIVATE ৳1,499 / MO PASS
                  </button>
                </div>
              </div>

              {/* Plan 2: Premium Villa / Executive */}
              <div className="rounded-2xl border-2 border-[#F5A623] bg-[#0E1520] p-8 flex flex-col justify-between relative shadow-2xl">
                <div className="absolute -top-3.5 right-6 bg-[#F5A623] text-[#0A0D12] text-[10px] font-heading font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                  ★ MOST POPULAR FOR LARGE HOMES
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-heading font-black text-white uppercase tracking-wider bg-[#0B4F6C] px-3 py-1 rounded-full border border-[#0B4F6C]">
                      Executive Care Pass
                    </span>
                    <span className="text-xs text-slate-400">Duplexes &amp; Multi-Story</span>
                  </div>

                  <h3 className="font-heading font-black text-2xl text-white uppercase">
                    VILLA &amp; DUPLEX PLAN
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Complete coverage for large duplexes &amp; office spaces
                  </p>

                  <div className="mt-6 flex items-baseline gap-2">
                    <span className="font-heading font-black text-4xl sm:text-5xl text-[#F5A623]">৳2,799</span>
                    <span className="text-sm text-slate-400">/ Month</span>
                  </div>
                  <p className="text-[11px] text-emerald-400 font-bold mt-1">
                    ✓ All-inclusive coverage • Dedicated master technician
                  </p>

                  <ul className="mt-8 space-y-3.5 text-xs sm:text-sm text-slate-300">
                    <li className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-[#F5A623] text-[18px]">check_circle</span>
                      <span><strong>Unlimited</strong> multi-unit visits &amp; diagnostics</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-[#F5A623] text-[18px]">check_circle</span>
                      <span><strong>Includes 4 AC Jet Washes</strong> per quarter free</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-[#F5A623] text-[18px]">check_circle</span>
                      <span><strong>Generator &amp; IPS</strong> monthly health checkup</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-[#F5A623] text-[18px]">check_circle</span>
                      <span><strong>Overnight 24/7</strong> emergency hotline access</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-[#F5A623] text-[18px]">check_circle</span>
                      <span><strong>60-Day</strong> extended workmanship warranty</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-800">
                  <button
                    onClick={() => handleSubscribe('Villa & Duplex Plan')}
                    className="w-full py-4 rounded-lg bg-[#F5A623] hover:bg-[#E09415] text-[#0A0D12] font-heading font-black text-sm uppercase tracking-wider shadow-gold-sm hover:scale-102 active:scale-98 transition-all cursor-pointer"
                  >
                    ACTIVATE ৳2,799 / MO PASS
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. PROCESS & EMAIL / WHATSAPP REQUEST EXPLANATION                         */}
        {/* ========================================================================= */}
        <section className="py-16 bg-[#080B0F] border-t border-slate-800">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-heading font-black uppercase text-white tracking-wide">
                HOW UNLIMITED MONTHLY CHANGES WORK
              </h2>
              <p className="text-slate-400 text-sm mt-2">
                Simple 3-step workflow designed for zero friction
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#0A0D12] border border-slate-800 p-6 rounded-xl relative">
                <div className="w-10 h-10 rounded-lg bg-[#F5A623] text-[#0A0D12] font-heading font-black flex items-center justify-center text-lg mb-4">
                  1
                </div>
                <h3 className="font-heading font-bold text-white uppercase text-base">
                  Tap or Call Anytime
                </h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Notice an AC leak, broken light, or clogged sink? Simply submit a request in the app or send an alert to our Dhaka dispatch desk.
                </p>
              </div>

              <div className="bg-[#0A0D12] border border-slate-800 p-6 rounded-xl relative">
                <div className="w-10 h-10 rounded-lg bg-[#0B4F6C] text-white font-heading font-black flex items-center justify-center text-lg mb-4">
                  2
                </div>
                <h3 className="font-heading font-bold text-white uppercase text-base">
                  15-Minute Dispatch
                </h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Our system routes your ticket immediately to the nearest verified master technician in your neighborhood (Dhanmondi, Gulshan, Uttara, etc.).
                </p>
              </div>

              <div className="bg-[#0A0D12] border border-slate-800 p-6 rounded-xl relative">
                <div className="w-10 h-10 rounded-lg bg-[#F5A623] text-[#0A0D12] font-heading font-black flex items-center justify-center text-lg mb-4">
                  3
                </div>
                <h3 className="font-heading font-bold text-white uppercase text-base">
                  Fixed with Zero Labor Bill
                </h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Your technician resolves the problem, conducts safety tests, and signs off. No surprise labor invoice—it’s 100% covered by your Care Pass.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ========================================================================= */}
      {/* SUBSCRIPTION ACTIVATION MODAL                                              */}
      {/* ========================================================================= */}
      {selectedPlan && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0E1520] border border-slate-700 rounded-2xl max-w-md w-full p-6 text-white shadow-2xl relative">
            <button
              onClick={() => {
                setSelectedPlan(null);
                setSubscribedSuccess(false);
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-lg"
            >
              ✕
            </button>

            {subscribedSuccess ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#F5A623] text-[#0A0D12] flex items-center justify-center mx-auto shadow-gold-md">
                  <span className="material-symbols-outlined text-[36px]">verified</span>
                </div>
                <h3 className="font-heading font-black text-2xl text-white uppercase">
                  Care Pass Activated!
                </h3>
                <p className="text-xs text-slate-300">
                  Welcome to HomeEase Unlimited Care! Your <strong>{selectedPlan}</strong> is now active. Your dedicated emergency line is now active at <strong>16800</strong>.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setSelectedPlan(null);
                      navigate('/customer-dashboard');
                    }}
                    className="w-full py-3.5 rounded-lg bg-[#F5A623] text-[#0A0D12] font-heading font-black text-xs uppercase tracking-wider shadow-gold-sm"
                  >
                    View My Care Pass Dashboard
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <span className="text-[#F5A623] text-[10px] font-heading font-black uppercase tracking-wider">
                  Instant Activation
                </span>
                <h3 className="font-heading font-black text-xl text-white uppercase mt-1">
                  Activate {selectedPlan}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Confirm your Dhaka home address to start your unlimited care membership.
                </p>

                <form onSubmit={handleConfirmSubscription} className="mt-5 space-y-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                      Home Address in Dhaka
                    </label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-[#0A0D12] border border-slate-700 rounded-lg px-3.5 py-2.5 text-xs text-white focus:border-[#F5A623] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                      Mobile / WhatsApp Number
                    </label>
                    <input
                      type="text"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#0A0D12] border border-slate-700 rounded-lg px-3.5 py-2.5 text-xs text-white focus:border-[#F5A623] focus:outline-none"
                    />
                  </div>

                  <div className="p-3 bg-[#0A0D12] rounded-lg border border-slate-800 text-xs text-slate-300 space-y-1">
                    <div className="flex justify-between">
                      <span>Monthly Fee:</span>
                      <span className="font-bold text-[#F5A623]">
                        {selectedPlan.includes('Villa') ? '৳2,799/mo' : '৳1,499/mo'}
                      </span>
                    </div>
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>Labor fee on all calls:</span>
                      <span className="text-emerald-400 font-bold">FREE (৳0)</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={subscribing}
                    className="w-full py-3.5 rounded-lg bg-[#F5A623] hover:bg-[#E09415] text-[#0A0D12] font-heading font-black text-xs uppercase tracking-wider shadow-gold-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {subscribing ? (
                      <>
                        <span className="w-4 h-4 rounded-full border-2 border-[#0A0D12] border-t-transparent animate-spin"></span>
                        <span>Activating...</span>
                      </>
                    ) : (
                      <>
                        <span>Confirm &amp; Start Unlimited Pass</span>
                        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
