import React from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

export default function BookingConfirmationPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const requestId = searchParams.get('requestId') || 'JOB-8821';
  const rate = searchParams.get('rate') || '850';
  const date = searchParams.get('date') || new Date().toISOString().split('T')[0];
  const time = searchParams.get('time') || '11:00 AM - 01:00 PM';

  return (
    <div className="min-h-screen bg-[#0A0D12] text-white flex flex-col font-sans selection:bg-[#F5A623] selection:text-[#0A0D12]">
      <Navbar />

      <main className="flex-grow flex items-center justify-center p-4 py-16 relative">
        <div className="max-w-lg w-full bg-[#0E1520] border-2 border-slate-800 rounded-2xl p-8 sm:p-10 shadow-2xl text-center space-y-6">
          {/* Amber Gold Checkmark */}
          <div className="w-20 h-20 mx-auto rounded-full bg-[#F5A623] text-[#0A0D12] flex items-center justify-center shadow-gold-md animate-bounce">
            <span className="material-symbols-outlined text-[46px] font-black">check</span>
          </div>

          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B4F6C] text-[#F5A623] text-xs font-heading font-black uppercase tracking-wider">
              Booking Confirmed
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-black text-white uppercase tracking-tight mt-2.5">
              YOUR TECHNICIAN IS <span className="text-[#F5A623] italic font-serif lowercase text-3xl sm:text-4xl">scheduled</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Order #{requestId.slice(-6).toUpperCase()} has been accepted and dispatched to your local Dhaka specialist.
            </p>
          </div>

          {/* Dark Teal Summary Box */}
          <div className="p-5 rounded-xl bg-[#0B4F6C]/80 border border-[#0B4F6C] text-left space-y-2.5 text-xs text-slate-200">
            <div className="flex justify-between">
              <span className="text-slate-300">Scheduled Date:</span>
              <span className="font-heading font-bold text-white">{date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">Arrival Window:</span>
              <span className="font-heading font-bold text-white">{time}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">Estimated Rate:</span>
              <span className="font-heading font-black text-[#F5A623] text-sm">৳{rate}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-slate-700/60">
              <span className="text-slate-300">Payment Status:</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                Pay on Service Completion
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              onClick={() => navigate(`/tracking/${requestId}`)}
              className="w-full py-4 rounded-xl bg-[#F5A623] hover:bg-[#E09415] text-[#0A0D12] font-heading font-black text-xs sm:text-sm uppercase tracking-wider shadow-gold-sm hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">near_me</span>
              <span>Track Technician Live</span>
            </button>
            <Link
              to="/customer-dashboard"
              className="w-full py-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-heading font-bold text-xs sm:text-sm uppercase tracking-wider text-center transition-all"
            >
              Customer Portal
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
