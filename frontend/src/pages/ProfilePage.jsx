import React from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
  const { user, logout, quickDemoLogin } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0A0D12] text-white flex flex-col font-sans selection:bg-[#F5A623] selection:text-[#0A0D12]">
      <Navbar />

      {/* Amber Sub-Header */}
      <div className="bg-[#F5A623] text-[#0A0D12] py-2 px-4 font-heading font-black text-xs uppercase tracking-widest text-center shadow-sm">
        ★ HomeEase Account &amp; Verification Hub • Dhaka 24/7 Hotline: 16800
      </div>

      <main className="flex-grow max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="bg-[#0E1520] border-2 border-slate-800 rounded-2xl p-8 sm:p-10 shadow-2xl space-y-7">
          {/* User Header */}
          <div className="flex items-center gap-5 pb-6 border-b border-slate-800">
            <div className="relative">
              <img
                src={
                  user?.profileImage ||
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
                }
                alt={user?.name}
                className="w-20 h-20 rounded-2xl object-cover ring-2 ring-[#F5A623] shadow-gold-sm"
              />
              <span className="w-4 h-4 rounded-full bg-emerald-400 border-2 border-[#0E1520] absolute -bottom-1 -right-1 animate-pulse"></span>
            </div>
            <div>
              <h2 className="font-heading font-black text-2xl text-white uppercase tracking-tight">
                {user?.name || 'Dhaka Resident'}
              </h2>
              <p className="text-xs text-slate-300 font-mono mt-0.5">{user?.email}</p>
              <span className="inline-block mt-2 text-[10px] uppercase font-heading font-black bg-[#0B4F6C] text-[#F5A623] border border-[#0B4F6C] px-3 py-1 rounded-full tracking-wider">
                {user?.role === 'provider' ? '★ Verified Master Specialist' : '★ Verified Home Customer'}
              </span>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#0A0D12] border border-slate-800 space-y-1">
              <span className="text-[10px] font-heading font-bold text-slate-400 uppercase tracking-wider block">
                Contact Phone
              </span>
              <p className="font-heading font-black text-white text-sm">
                {user?.phone || '+880 1712-345678'}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[#0A0D12] border border-slate-800 space-y-1">
              <span className="text-[10px] font-heading font-bold text-slate-400 uppercase tracking-wider block">
                Dhaka Service Area
              </span>
              <p className="font-heading font-black text-[#F5A623] text-sm">
                {user?.address || 'Dhanmondi, Dhaka'}
              </p>
            </div>
          </div>

          {/* Quick Demo Role Switcher */}
          <div className="p-6 rounded-2xl bg-[#0A0D12] border border-slate-800 space-y-4">
            <div>
              <span className="text-xs font-heading font-black text-[#F5A623] uppercase tracking-wider flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">swap_horiz</span>
                <span>Instant Demo Account Switcher</span>
              </span>
              <p className="text-xs text-slate-400 mt-1">
                Toggle between the Customer booking experience and the Technician dispatch workspace with 1 tap.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={async () => {
                  await quickDemoLogin('customer');
                  navigate('/customer-dashboard');
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-[#0B4F6C] hover:bg-[#0E4B6E] text-white border border-[#0B4F6C] hover:border-[#F5A623] font-heading font-black text-xs uppercase tracking-wider transition-all cursor-pointer text-center"
              >
                Switch to Customer (Tanvir Ahmed)
              </button>
              <button
                onClick={async () => {
                  await quickDemoLogin('provider');
                  navigate('/provider-dashboard');
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-[#F5A623] hover:bg-[#E09415] text-[#0A0D12] font-heading font-black text-xs uppercase tracking-wider shadow-gold-sm transition-all cursor-pointer text-center"
              >
                Switch to Provider (Mohammad Kabir)
              </button>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={() => {
                if (user?.role === 'provider') {
                  navigate('/provider-dashboard');
                } else {
                  navigate('/customer-dashboard');
                }
              }}
              className="text-xs font-heading font-bold text-slate-300 hover:text-white uppercase tracking-wider flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              <span>Back to Dashboard</span>
            </button>

            <button
              onClick={() => {
                logout();
                navigate('/');
              }}
              className="px-5 py-2.5 rounded-xl bg-red-950/60 hover:bg-red-900/60 text-red-300 hover:text-white border border-red-800/80 font-heading font-black text-xs uppercase tracking-wider transition-all cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
