import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function SosEmergencyBanner() {
  const navigate = useNavigate();

  return (
    <section className="py-8 bg-[#080B0F] border-b border-slate-800" id="sos-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#1A0A0E] via-[#240D14] to-[#121720] border-2 border-red-900/60 p-6 sm:p-8 shadow-2xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-red-600 text-white flex items-center justify-center flex-shrink-0 shadow-lg">
                <span className="material-symbols-outlined text-[36px] animate-pulse">e911_emergency</span>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-heading font-black uppercase bg-red-600 text-white px-2.5 py-0.5 rounded tracking-widest">
                    EMERGENCY PRIORITY DISPATCH
                  </span>
                  <span className="text-xs text-red-400 font-bold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                    24/7 Rapid Response
                  </span>
                </div>
                <h3 className="font-heading text-xl sm:text-2xl font-black uppercase text-white tracking-tight">
                  URGENT HOME EMERGENCY? GAS LEAKS, ELECTRIC SPARKS, BURST PIPES
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 font-normal">
                  Nearest technician dispatched within 180 seconds. Guaranteed 15-minute arrival in Dhaka. Zero surge fees.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 flex-shrink-0 w-full sm:w-auto justify-between sm:justify-end">
              <div className="text-right hidden sm:block">
                <p className="text-[10px] font-heading font-black text-slate-400 uppercase tracking-widest">DIRECT HOTLINE</p>
                <p className="font-heading text-2xl font-black text-[#F5A623]">16800-SOS</p>
              </div>
              <button
                onClick={() => navigate('/request?urgency=emergency')}
                className="px-6 py-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-heading font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg hover:scale-105 active:scale-98 transition-all cursor-pointer flex items-center gap-2 w-full sm:w-auto justify-center"
              >
                <span className="material-symbols-outlined text-[20px]">flash_on</span>
                <span>Request Urgent Dispatch</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
