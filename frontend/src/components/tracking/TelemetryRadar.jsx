import React, { useState, useEffect } from 'react';

export default function TelemetryRadar({ provider, request }) {
  const [speed, setSpeed] = useState(34);

  const providerName = provider?.user?.name || provider?.name || 'Mohammad Kabir (Apex Master Tech)';
  const providerRole = provider?.bio || 'Certified Master Technician • 8 Years Experience';
  const vehicle = provider?.vehicle || 'TVS Raider Bike (Dhaka Metro HA-48)';
  const profileImage =
    provider?.user?.profileImage ||
    provider?.profileImage ||
    'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=400&q=80';
  const locationName = request?.location || 'Dhanmondi';
  const providerRating = provider?.rating || 4.9;
  const etaDisplay = request?.status === 'In Progress' ? 0 : request?.status === 'Completed' ? 0 : 12;

  useEffect(() => {
    const interval = setInterval(() => {
      const variation = Math.random() * 4 - 2;
      setSpeed((prev) => Math.max(28, Math.min(44, Math.round(prev + variation))));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6 border-t border-slate-700/60">
      {/* Technician Info Panel (7 Cols) */}
      <div className="lg:col-span-7 bg-[#0A0D12] border border-slate-700 p-6 rounded-2xl flex flex-col justify-between gap-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={profileImage}
                alt={providerName}
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-[#F5A623] shadow-lg"
              />
              <span className="w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#0A0D12] absolute -bottom-1 -right-1"></span>
            </div>
            <div>
              <h4 className="font-heading text-base font-black text-white uppercase tracking-wide">
                {providerName}
              </h4>
              <p className="text-xs text-slate-400 font-medium mt-0.5">{providerRole}</p>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-[11px] bg-[#0B4F6C]/60 text-[#F5A623] font-bold px-2.5 py-0.5 rounded-full border border-[#0B4F6C]">
                  {vehicle}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => alert(`📞 Calling ${providerName} at +880 1711-234567...`)}
              className="w-10 h-10 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center transition-colors shadow-lg cursor-pointer"
              title="Call Technician"
            >
              <span className="material-symbols-outlined text-[20px]">call</span>
            </button>
            <button
              onClick={() => alert(`💬 Secure chat with ${providerName} is active.`)}
              className="w-10 h-10 rounded-xl bg-[#0B4F6C] hover:bg-[#0d5f7a] text-[#F5A623] flex items-center justify-center transition-colors shadow-lg cursor-pointer"
              title="Send Message"
            >
              <span className="material-symbols-outlined text-[20px]">chat</span>
            </button>
          </div>
        </div>

        {/* Status Metrics */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-[#0E1520] p-3 rounded-xl border border-slate-700">
            <span className="text-[10px] font-heading font-black text-slate-500 uppercase tracking-wider block">
              Driving Speed
            </span>
            <p className="font-heading text-base font-black text-white mt-0.5">{speed} km/h</p>
          </div>
          <div className="bg-[#0E1520] p-3 rounded-xl border border-slate-700">
            <span className="text-[10px] font-heading font-black text-slate-500 uppercase tracking-wider block">
              Dhaka Traffic
            </span>
            <p className="font-heading text-sm font-black text-emerald-400 flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Smooth
            </p>
          </div>
          <div className="bg-[#0E1520] p-3 rounded-xl border border-slate-700">
            <span className="text-[10px] font-heading font-black text-slate-500 uppercase tracking-wider block">
              Technician Rating
            </span>
            <p className="font-heading text-base font-black text-[#F5A623] mt-0.5">★ {providerRating}</p>
          </div>
        </div>
      </div>

      {/* Live Map Panel (5 Cols) */}
      <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-slate-700 min-h-[220px] bg-[#0A0D12] flex flex-col justify-between p-4 shadow-xl">
        <img
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          alt="Dhaka map view"
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=600&q=80"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0D12]/60 via-transparent to-[#0A0D12]/80 pointer-events-none"></div>

        <div className="relative z-10 flex items-center justify-between">
          <span className="text-[11px] bg-[#0A0D12]/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[#F5A623] font-heading font-black border border-[#F5A623]/30 shadow-sm flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#F5A623] animate-ping"></span>
            Live GPS Tracking
          </span>
          <span className="text-[11px] text-white bg-[#0A0D12]/90 backdrop-blur-md px-3 py-1.5 rounded-full font-heading font-bold border border-slate-700">
            Zone: {locationName}
          </span>
        </div>

        <div className="relative z-10 bg-[#0E1520]/95 backdrop-blur-md p-4 rounded-xl border border-slate-700 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-heading font-black text-slate-400 uppercase tracking-wider">
              Current Route
            </p>
            <p className="text-xs font-heading font-bold text-white mt-0.5">
              Mirpur Road • Approaching {locationName}
            </p>
          </div>
          <span className="text-xs font-heading font-black text-[#0A0D12] px-3 py-1.5 bg-[#F5A623] rounded-lg shadow-sm">
            {etaDisplay > 0 ? `${etaDisplay} MINS` : 'ARRIVED'}
          </span>
        </div>
      </div>
    </div>
  );
}
