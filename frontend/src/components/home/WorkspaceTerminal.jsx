import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function WorkspaceTerminal() {
  const [activeTab, setActiveTab] = useState('customer');
  const navigate = useNavigate();
  const { quickDemoLogin } = useAuth();

  return (
    <section className="py-16 bg-white border-b border-slate-200" id="workspaces">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
              TWO EASY PORTALS
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
              Built for Both Customers & Service Technicians
            </h2>
          </div>

          {/* Simple Tab Switcher */}
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-100 border border-slate-200 shadow-soft-sm">
            <button
              onClick={() => setActiveTab('customer')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'customer'
                  ? 'bg-white text-blue-600 shadow-soft-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              For Customers
            </button>
            <button
              onClick={() => setActiveTab('provider')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'provider'
                  ? 'bg-white text-blue-600 shadow-soft-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              For Technicians
            </button>
          </div>
        </div>

        {/* Customer Panel */}
        {activeTab === 'customer' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3 shadow-soft-sm">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                <span className="material-symbols-outlined text-[22px]">receipt_long</span>
              </div>
              <h4 className="font-display text-base font-bold text-slate-900">Track Active Requests</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Watch your technician approach in real time on a live map with accurate ETA and verified phone contact.
              </p>
              <button
                onClick={() => navigate('/customer-dashboard')}
                className="text-xs font-bold text-blue-600 hover:underline pt-2 flex items-center gap-1"
              >
                <span>View Dashboard</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3 shadow-soft-sm">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                <span className="material-symbols-outlined text-[22px]">verified_user</span>
              </div>
              <h4 className="font-display text-base font-bold text-slate-900">100% Escrow Protection</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Your payment is held safely in escrow and only released after you inspect and approve the completed job.
              </p>
              <span className="text-xs font-bold text-emerald-600 block pt-2">
                Guaranteed Quality
              </span>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3 shadow-soft-sm">
              <div className="w-10 h-10 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center font-bold">
                <span className="material-symbols-outlined text-[22px]">repeat</span>
              </div>
              <h4 className="font-display text-base font-bold text-slate-900">Re-Book Your Favorites</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Loved a particular electrician or plumber? Save them to your favorites and re-book with a single click.
              </p>
              <button
                onClick={() => {
                  quickDemoLogin('customer');
                  navigate('/customer-dashboard');
                }}
                className="text-xs font-bold text-violet-600 hover:underline pt-2 flex items-center gap-1"
              >
                <span>Try Demo Account</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>
          </div>
        )}

        {/* Provider Panel */}
        {activeTab === 'provider' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3 shadow-soft-sm">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                <span className="material-symbols-outlined text-[22px]">notifications_active</span>
              </div>
              <h4 className="font-display text-base font-bold text-slate-900">Instant Job Alerts</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Receive notifications when customers nearby request your specific service specialty in your Dhaka zone.
              </p>
              <button
                onClick={() => {
                  quickDemoLogin('provider');
                  navigate('/provider-dashboard');
                }}
                className="text-xs font-bold text-blue-600 hover:underline pt-2 flex items-center gap-1"
              >
                <span>Open Technician Terminal</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3 shadow-soft-sm">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                <span className="material-symbols-outlined text-[22px]">account_balance_wallet</span>
              </div>
              <h4 className="font-display text-base font-bold text-slate-900">Guaranteed Fast Payouts</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Receive instant bKash or Nagad payouts as soon as the client marks the job complete.
              </p>
              <span className="text-xs font-bold text-emerald-600 block pt-2">
                Daily Payout Settlement
              </span>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3 shadow-soft-sm">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold">
                <span className="material-symbols-outlined text-[22px]">tune</span>
              </div>
              <h4 className="font-display text-base font-bold text-slate-900">Manage Availability</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Set your working hours, toggle your online/offline status, and control which Dhaka sectors you cover.
              </p>
              <button
                onClick={() => {
                  quickDemoLogin('provider');
                  navigate('/provider-dashboard');
                }}
                className="text-xs font-bold text-amber-600 hover:underline pt-2 flex items-center gap-1"
              >
                <span>Try Provider Demo</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
