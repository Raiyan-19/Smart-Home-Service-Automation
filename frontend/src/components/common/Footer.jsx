import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#0A0D12] text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row justify-between items-center w-full gap-8">
        <div className="flex flex-col gap-2">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-[#F5A623] flex items-center justify-center text-[#0A0D12] font-black text-sm shadow-gold-sm">
              <span className="material-symbols-outlined text-[20px]">home_repair_service</span>
            </div>
            <span className="font-heading text-xl font-black uppercase tracking-tight text-white">
              HOME<span className="text-[#F5A623]">EASE</span>
            </span>
          </Link>
          <p className="text-xs text-slate-400 max-w-md leading-relaxed">
            Dhaka's leading home service and repair network. Verified technicians, upfront fixed rates, and 30-day satisfaction guarantee across Dhanmondi, Gulshan, Banani, Mirpur, and Uttara.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center md:justify-end gap-6 text-xs font-bold text-slate-300 uppercase tracking-wider">
          <Link to="/services" className="hover:text-[#F5A623] transition-colors">
            Services
          </Link>
          <Link to="/request" className="hover:text-[#F5A623] transition-colors">
            Book Tech
          </Link>
          <Link to="/smart-match" className="hover:text-[#F5A623] transition-colors">
            Smart Match
          </Link>
          <Link to="/request?urgency=emergency" className="text-rose-500 hover:text-rose-400 transition-colors font-black">
            SOS 16800
          </Link>
        </div>
      </div>

      <div className="border-t border-slate-900 py-4 text-center text-[11px] text-slate-500">
        © 2026 HomeEase Bangladesh. Built with pride for Dhaka homeowners.
      </div>
    </footer>
  );
}
