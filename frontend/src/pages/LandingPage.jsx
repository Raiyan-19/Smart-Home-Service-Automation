import React, { useState, useEffect } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import HeroSection from '../components/home/HeroSection';
import HomeServiceHighlights from '../components/home/HomeServiceHighlights';
import SosEmergencyBanner from '../components/home/SosEmergencyBanner';
import ProgressPipeline from '../components/tracking/ProgressPipeline';
import TelemetryRadar from '../components/tracking/TelemetryRadar';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const [services, setServices] = useState([]);
  const [showSosModal, setShowSosModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/services');
        if (res.data.success) {
          setServices(res.data.data);
        }
      } catch (err) {
        console.warn('Using demo data:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0D12] text-white flex flex-col font-sans selection:bg-[#F5A623] selection:text-[#0A0D12]">
      <Navbar onOpenSosModal={() => setShowSosModal(true)} />

      <main className="flex-grow">
        {/* 1. Hero with Dark Backdrop, Dhaka Area Selector & Quick Service Chips */}
        <HeroSection />

        {/* 2. Signature 3-Column Gold Banner + Split-Screen Master Craftsman Showcase */}
        <HomeServiceHighlights />


        {/* 4. Streamlined Care Pass Callout (Directs to Dedicated /care-pass Page without Duplicate Cards) */}
        <section className="py-14 bg-gradient-to-r from-[#0E1520] via-[#0B4F6C] to-[#0E1520] border-b-2 border-[#F5A623] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5A623] text-[#0A0D12] text-xs font-heading font-black uppercase tracking-wider shadow-sm">
                ★ ALL-INCLUSIVE HOME CARE
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-black uppercase text-white tracking-tight">
                UNLIMITED MONTHLY <span className="text-[#F5A623]">CARE PASS</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-200 max-w-2xl leading-relaxed font-normal">
                Zero labor charges on repairs, unlimited technician visits, and guaranteed 15-minute emergency priority for your Dhaka home.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-5 flex-shrink-0">
              <div className="text-center sm:text-right">
                <span className="text-xs text-slate-300 uppercase font-bold tracking-wider block">Starts From</span>
                <span className="font-heading font-black text-3xl sm:text-4xl text-[#F5A623]">৳1,499</span>
                <span className="text-xs text-slate-300"> / Month</span>
              </div>
              <button
                onClick={() => navigate('/care-pass')}
                className="px-8 py-4 rounded-lg bg-[#F5A623] hover:bg-[#E09415] text-[#0A0D12] font-heading font-black text-xs sm:text-sm uppercase tracking-wider shadow-gold-sm hover:scale-105 active:scale-98 transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <span>Explore Care Pass</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </section>

        {/* 5. Rapid Emergency SOS 16800 Banner */}
        <SosEmergencyBanner />

        {/* 6. Live Service Tracking Demonstration (Single Unified GPS Radar Section) */}
        <section className="py-20 bg-[#0A0D12] border-b border-slate-800" id="tracking">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-xl mx-auto mb-12">
              <span className="text-xs font-heading font-black text-[#F5A623] uppercase tracking-widest block mb-2">
                LIVE STATUS ON YOUR MOBILE
              </span>
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
                REAL-TIME <span className="text-[#F5A623] italic font-serif lowercase text-4xl sm:text-6xl">gps radar</span> TRACKING
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 font-normal">
                See your technician's ETA, phone contact, and driving route live on the Dhaka map.
              </p>
            </div>

            <div className="bg-[#0E1520] border-2 border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8 shadow-2xl max-w-4xl mx-auto">
              <ProgressPipeline status="On The Way" etaMinutes={12} />
              <TelemetryRadar />
            </div>
          </div>
        </section>

        {/* 7. Customer Reviews & 100% Satisfaction Guarantee */}
        <section className="py-20 bg-[#080B0F] border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-xl mx-auto mb-12">
              <span className="text-xs font-heading font-black text-[#F5A623] uppercase tracking-widest block mb-2">
                WHAT DHAKA RESIDENTS SAY
              </span>
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
                TRUSTED BY <span className="text-[#F5A623] italic font-serif lowercase text-4xl sm:text-6xl">18,000+</span> HOMES
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-2">
                Verified reviews from families across Dhanmondi, Gulshan, Banani, Mirpur &amp; Uttara.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-[#0E1520] border border-slate-800 space-y-3 shadow-xl hover:border-[#F5A623] transition-all">
                <div className="text-[#F5A623] font-bold text-lg">★★★★★</div>
                <p className="text-sm text-slate-300 italic leading-relaxed font-normal">
                  "Booked AC servicing for my Dhanmondi apartment. The technician Mohammad Kabir arrived in 18 minutes with full equipment. Cooling is perfect now!"
                </p>
                <div className="pt-3 border-t border-slate-800 flex justify-between items-center">
                  <div>
                    <p className="font-heading font-bold text-xs uppercase text-white">Tanvir Ahmed</p>
                    <p className="text-[11px] text-[#F5A623]">Dhanmondi, Dhaka</p>
                  </div>
                  <span className="text-[10px] text-slate-500 uppercase font-bold">Verified Order</span>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#0E1520] border border-slate-800 space-y-3 shadow-xl hover:border-[#F5A623] transition-all">
                <div className="text-[#F5A623] font-bold text-lg">★★★★★</div>
                <p className="text-sm text-slate-300 italic leading-relaxed font-normal">
                  "Emergency water pipe burst at 9 PM in Gulshan. HomeEase dispatched a plumber in 15 minutes. Upfront rate with no extra charges. Lifesaver!"
                </p>
                <div className="pt-3 border-t border-slate-800 flex justify-between items-center">
                  <div>
                    <p className="font-heading font-bold text-xs uppercase text-white">Farhana Chowdhury</p>
                    <p className="text-[11px] text-[#F5A623]">Gulshan-2, Dhaka</p>
                  </div>
                  <span className="text-[10px] text-slate-500 uppercase font-bold">Verified Order</span>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#0E1520] border border-slate-800 space-y-3 shadow-xl hover:border-[#F5A623] transition-all">
                <div className="text-[#F5A623] font-bold text-lg">★★★★★</div>
                <p className="text-sm text-slate-300 italic leading-relaxed font-normal">
                  "Transparent fixed prices make a huge difference. The monthly care subscription pays for itself after just one AC gas refill."
                </p>
                <div className="pt-3 border-t border-slate-800 flex justify-between items-center">
                  <div>
                    <p className="font-heading font-bold text-xs uppercase text-white">Rashidul Islam</p>
                    <p className="text-[11px] text-[#F5A623]">Uttara Sector 7, Dhaka</p>
                  </div>
                  <span className="text-[10px] text-slate-500 uppercase font-bold">Verified Order</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Clean SOS Emergency Modal in Dark Theme */}
      {showSosModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-[#0E1520] border-2 border-red-700 rounded-2xl max-w-lg w-full p-7 shadow-2xl space-y-5 text-white">
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-xl bg-red-600 text-white flex items-center justify-center flex-shrink-0 shadow-lg">
                <span className="material-symbols-outlined text-[32px] animate-pulse">e911_emergency</span>
              </div>
              <div>
                <h3 className="font-heading text-xl font-black uppercase text-white">Urgent Emergency Dispatch</h3>
                <p className="text-xs font-heading font-bold text-red-400">Guaranteed 15-Minute Response in Dhaka</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              We prioritize urgent gas leaks, electrical sparking, or water pipe breaks. Emergency tickets are automatically routed to nearest online units with zero surge pricing.
            </p>

            <div className="p-4 rounded-xl bg-[#0A0D12] border border-red-900/60 text-xs space-y-2">
              <div className="flex justify-between font-heading font-bold">
                <span className="text-slate-400">24/7 Hotline:</span>
                <span className="text-[#F5A623] text-sm font-black">16800-SOS (Toll-Free)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Available Technicians Nearby:</span>
                <span className="text-emerald-400 font-bold">14 Units Online in Dhaka</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowSosModal(false)}
                className="px-5 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-heading font-bold uppercase transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowSosModal(false);
                  navigate('/request?urgency=emergency');
                }}
                className="px-6 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-heading font-black uppercase tracking-wider shadow-lg transition-all cursor-pointer"
              >
                Request Immediate Help →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
