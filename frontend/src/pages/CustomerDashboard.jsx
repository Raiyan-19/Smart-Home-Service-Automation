import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

export default function CustomerDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [requests, setRequests] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const defaultCustomerRequests = [
    {
      _id: 'JOB-8821',
      serviceType: 'AC & Appliance Repair',
      status: 'On The Way',
      problemDescription: 'Inverter AC master diagnostics & full high-pressure coil wash.',
      preferredDate: new Date().toISOString().split('T')[0],
      preferredTime: 'Today (Immediate)',
      location: 'Dhanmondi, Dhaka',
      estimatedPrice: 850,
    },
    {
      _id: 'JOB-7412',
      serviceType: 'Plumbing & Water Lines',
      status: 'Completed',
      problemDescription: 'Geyser hot water line leakage fix and brass gate valve replacement.',
      preferredDate: '2026-09-02',
      preferredTime: '11:00 AM',
      location: 'Dhanmondi, Dhaka',
      estimatedPrice: 650,
    },
    {
      _id: 'JOB-6920',
      serviceType: 'Electrical & Wiring',
      status: 'Completed',
      problemDescription: 'Smart breaker installation and master distribution panel check.',
      preferredDate: '2026-08-25',
      preferredTime: '04:00 PM',
      location: 'Dhanmondi, Dhaka',
      estimatedPrice: 1100,
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [reqRes, bookRes] = await Promise.allSettled([
          api.get('/requests'),
          api.get('/bookings'),
        ]);

        if (reqRes.status === 'fulfilled' && reqRes.value.data.success && reqRes.value.data.data?.length > 0) {
          setRequests(reqRes.value.data.data);
        } else {
          setRequests(defaultCustomerRequests);
        }
        if (bookRes.status === 'fulfilled' && bookRes.value.data.success) {
          setBookings(bookRes.value.data.data);
        }
      } catch (err) {
        console.warn('API error, using demo customer requests:', err);
        setRequests(defaultCustomerRequests);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const activeRequests = requests.filter((r) => r.status !== 'Completed' && r.status !== 'Cancelled');
  const pastRequests = requests.filter((r) => r.status === 'Completed' || r.status === 'Cancelled');

  return (
    <div className="min-h-screen bg-[#0A0D12] text-white flex flex-col font-sans selection:bg-[#F5A623] selection:text-[#0A0D12]">
      <Navbar />

      {/* Amber Sub-Header */}
      <div className="bg-[#F5A623] text-[#0A0D12] py-2 px-4 font-heading font-black text-xs uppercase tracking-widest text-center">
        ★ Dhaka Customer Portal • Active Coverage • 24/7 Hotline: 16800
      </div>

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0B4F6C] border border-[#0B4F6C] text-[#F5A623] text-xs font-heading font-black uppercase tracking-wider mb-2">
              Verified Member
            </div>
            <h1 className="text-2xl sm:text-4xl font-heading font-black text-white uppercase tracking-tight">
              WELCOME BACK, <span className="text-[#F5A623] italic font-serif lowercase text-3xl sm:text-5xl">{user?.name || 'Tanvir Ahmed'}</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Primary Area: <span className="font-heading font-bold text-white">{user?.address || 'Dhanmondi, Dhaka'}</span> • Dhaka Coverage Active
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/care-pass"
              className="px-4 py-3 rounded-lg bg-[#0B4F6C] hover:bg-[#0E4B6E] text-white font-heading font-black text-xs uppercase tracking-wider border border-[#0B4F6C] hover:border-[#F5A623] transition-all flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px] text-[#F5A623]">all_inclusive</span>
              Care Pass
            </Link>
            <Link
              to="/request"
              className="px-5 py-3 rounded-lg bg-[#F5A623] hover:bg-[#E09415] text-[#0A0D12] font-heading font-black text-xs uppercase tracking-wider shadow-gold-sm hover:scale-102 active:scale-98 transition-all flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">add_circle</span>
              Book New Service
            </Link>
          </div>
        </div>

        {/* Overview Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <div className="p-6 rounded-xl bg-[#0E1520] border border-slate-800 shadow-xl">
            <span className="text-xs font-heading font-black text-[#F5A623] uppercase tracking-wider">ACTIVE ORDERS</span>
            <p className="font-heading font-black text-4xl text-white mt-1">
              {activeRequests.length}
            </p>
          </div>
          <div className="p-6 rounded-xl bg-[#0E1520] border border-slate-800 shadow-xl">
            <span className="text-xs font-heading font-black text-slate-400 uppercase tracking-wider">CONFIRMED SLOTS</span>
            <p className="font-heading font-black text-4xl text-white mt-1">
              {bookings.length}
            </p>
          </div>
          <div className="p-6 rounded-xl bg-[#0E1520] border border-slate-800 shadow-xl">
            <span className="text-xs font-heading font-black text-slate-400 uppercase tracking-wider">COMPLETED JOBS</span>
            <p className="font-heading font-black text-4xl text-white mt-1">
              {pastRequests.length}
            </p>
          </div>
          <div className="p-6 rounded-xl bg-[#0B4F6C] border border-[#0B4F6C] shadow-xl">
            <span className="text-xs font-heading font-black text-slate-200 uppercase tracking-wider">DHAKA WARRANTY</span>
            <p className="font-heading font-black text-2xl text-[#F5A623] mt-2 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[24px]">verified</span>
              100% COVERED
            </p>
          </div>
        </div>

        {/* Active Requests List */}
        <div className="mb-12">
          <h2 className="font-heading font-black text-xl uppercase tracking-wider text-white mb-4 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F5A623] animate-ping"></span>
            ACTIVE SERVICES ({activeRequests.length})
          </h2>

          {activeRequests.length === 0 ? (
            <div className="p-8 rounded-2xl bg-[#0E1520] border border-slate-800 text-center text-slate-400 shadow-xl">
              <span className="material-symbols-outlined text-[44px] mb-2 text-[#F5A623]">home_repair_service</span>
              <p className="text-sm font-heading font-bold text-white uppercase">No active service requests right now.</p>
              <Link to="/request" className="mt-3 inline-block font-heading font-black text-[#F5A623] hover:underline text-xs uppercase tracking-wider">
                Need something fixed? Book a service →
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeRequests.map((req) => (
                <div
                  key={req._id}
                  className="p-6 rounded-2xl bg-[#0E1520] border border-slate-800 shadow-xl hover:border-[#F5A623] transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-heading font-black text-lg text-white uppercase">
                        {req.serviceType}
                      </span>
                      <span className="bg-[#0B4F6C] text-[#F5A623] border border-[#0B4F6C] text-xs px-3 py-1 rounded-full font-heading font-bold uppercase">
                        {req.status}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      {req.problemDescription}
                    </p>

                    <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                      <span>{req.preferredDate} ({req.preferredTime})</span>
                      <span className="font-heading font-bold text-white">{req.location}</span>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between pt-3 border-t border-slate-800">
                    <span className="font-heading font-black text-2xl text-[#F5A623]">
                      ৳{req.estimatedPrice} <span className="text-[10px] text-slate-400 font-normal">Fixed Rate</span>
                    </span>
                    <button
                      onClick={() => navigate(`/tracking/${req._id}`)}
                      className="px-4 py-2.5 rounded-lg bg-[#F5A623] hover:bg-[#E09415] text-[#0A0D12] font-heading font-black text-xs uppercase tracking-wider shadow-gold-sm transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Track Live</span>
                      <span className="material-symbols-outlined text-[16px]">near_me</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Past Service History Table */}
        <div>
          <h2 className="font-heading font-black text-xl uppercase tracking-wider text-white mb-4">
            PAST SERVICE HISTORY
          </h2>

          <div className="bg-[#0E1520] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-[#0A0D12] text-[11px] font-heading font-black text-[#F5A623] uppercase tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="px-6 py-4">Order ID</th>
                    <th className="px-6 py-4">Service</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Area</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {pastRequests.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-8 text-center text-slate-500 font-medium">
                        No past completed services yet.
                      </td>
                    </tr>
                  ) : (
                    pastRequests.map((req) => (
                      <tr key={req._id} className="hover:bg-slate-900/60 transition-colors">
                        <td className="px-6 py-4 font-mono font-bold text-[#F5A623]">
                          #{req._id.slice(-6).toUpperCase()}
                        </td>
                        <td className="px-6 py-4 font-heading font-bold text-white uppercase">{req.serviceType}</td>
                        <td className="px-6 py-4">{req.preferredDate}</td>
                        <td className="px-6 py-4">{req.location}</td>
                        <td className="px-6 py-4 font-heading font-black text-[#F5A623]">৳{req.estimatedPrice}</td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 rounded-full bg-[#0B4F6C] text-emerald-400 border border-[#0B4F6C] text-[11px] font-heading font-bold uppercase">
                            {req.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
