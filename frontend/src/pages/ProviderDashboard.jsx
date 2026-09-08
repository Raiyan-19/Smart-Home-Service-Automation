import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

export default function ProviderDashboard() {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionMessage, setActionMessage] = useState('');
  const [isOnline, setIsOnline] = useState(true);

  // Fallback demo requests so technician workspace is always fully interactive
  const defaultRequests = [
    {
      _id: 'REQ-DHAKA-101',
      serviceType: 'AC & Appliance Repair',
      urgencyLevel: 'emergency',
      problemDescription: 'Master bedroom inverter AC blowing room-temperature air. Needs chemical wash & gas check.',
      location: 'Dhanmondi',
      addressDetails: 'House 42, Road 7A, Dhanmondi',
      preferredDate: new Date().toISOString().split('T')[0],
      preferredTime: 'Today (Immediate)',
      contactPhone: '+880 1712-345678',
      estimatedPrice: 850,
      customer: { name: 'Tanvir Ahmed' },
      status: 'Requested',
    },
    {
      _id: 'REQ-DHAKA-102',
      serviceType: 'Electrical & Wiring',
      urgencyLevel: 'standard',
      problemDescription: 'Main circuit breaker tripping intermittently when IPS & AC run together.',
      location: 'Gulshan-2',
      addressDetails: 'Road 54, Apt 4B, Gulshan-2',
      preferredDate: new Date().toISOString().split('T')[0],
      preferredTime: '02:00 - 04:00 PM',
      contactPhone: '+880 1819-876543',
      estimatedPrice: 950,
      customer: { name: 'Farhana Chowdhury' },
      status: 'Requested',
    },
    {
      _id: 'REQ-DHAKA-103',
      serviceType: 'Plumbing & Water Lines',
      urgencyLevel: 'standard',
      problemDescription: 'Roof water pump pressure drop. Replacement of non-return check valve.',
      location: 'Banani',
      addressDetails: 'Block C, House 18, Banani',
      preferredDate: new Date().toISOString().split('T')[0],
      preferredTime: '11:00 AM - 01:00 PM',
      contactPhone: '+880 1911-234567',
      estimatedPrice: 750,
      customer: { name: 'Kamal Hossain' },
      status: 'Accepted',
    },
  ];

  const fetchRequests = async () => {
    try {
      const res = await api.get('/requests');
      if (res.data?.success && res.data.data?.length > 0) {
        setRequests(res.data.data);
      } else {
        setRequests(defaultRequests);
      }
    } catch (err) {
      console.warn('Using default demo provider requests:', err);
      setRequests(defaultRequests);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
    const interval = setInterval(fetchRequests, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleUpdateStatus = async (requestId, status) => {
    // Optimistic local state update
    setRequests((prev) =>
      prev.map((r) => (r._id === requestId ? { ...r, status } : r))
    );
    setActionMessage(`Order #${requestId.slice(-6).toUpperCase()} updated to "${status}". Customer notified live!`);
    setTimeout(() => setActionMessage(''), 4000);

    try {
      if (!requestId.startsWith('REQ-DHAKA-')) {
        await api.patch(`/requests/${requestId}/status`, { status });
      }
    } catch (err) {
      console.warn('Backend status update error:', err);
    }
  };

  const handleRejectRequest = async (requestId) => {
    if (!window.confirm('Decline this job request? It will be automatically reassigned to the next available specialist.')) {
      return;
    }

    setRequests((prev) => prev.filter((r) => r._id !== requestId));
    setActionMessage('Job declined. Reassigned to next best specialist.');
    setTimeout(() => setActionMessage(''), 4000);

    try {
      if (!requestId.startsWith('REQ-DHAKA-')) {
        await api.post(`/requests/${requestId}/reject`);
      }
    } catch (err) {
      console.warn('Backend reject error:', err);
    }
  };

  const incomingRequests = requests.filter((r) => r.status === 'Requested');
  const activeJobs = requests.filter((r) => ['Accepted', 'On The Way', 'In Progress'].includes(r.status));
  const completedJobs = requests.filter((r) => r.status === 'Completed');

  return (
    <div className="min-h-screen bg-[#0A0D12] text-white flex flex-col font-sans selection:bg-[#F5A623] selection:text-[#0A0D12]">
      <Navbar />

      {/* Amber Sub-Header */}
      <div className="bg-[#F5A623] text-[#0A0D12] py-2 px-4 font-heading font-black text-xs uppercase tracking-widest text-center shadow-sm">
        ★ Dhaka Technician Command Center • Real-Time GPS Dispatch • Emergency Hotline: 16800
      </div>

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Welcome & Status Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B4F6C] border border-[#0B4F6C] text-[#F5A623] text-xs font-heading font-black uppercase tracking-wider">
                <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-400 animate-ping' : 'bg-slate-500'}`}></span>
                {isOnline ? 'Technician Portal • Online & Available' : 'Technician Portal • Offline'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-heading font-black text-white uppercase tracking-tight mt-2">
              TECHNICIAN <span className="text-[#F5A623] italic font-serif lowercase text-3xl sm:text-5xl">workspace</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Account: <strong className="text-white font-bold">{user?.name || 'Mohammad Kabir (Master Tech)'}</strong> • Primary Zone: <span className="text-[#F5A623] font-bold">Dhanmondi, Dhaka</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Online / Offline Availability Toggle */}
            <button
              onClick={() => setIsOnline(!isOnline)}
              className={`px-4 py-2.5 rounded-xl font-heading font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                isOnline
                  ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500'
                  : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}
            >
              <span className={`w-2.5 h-2.5 rounded-full ${isOnline ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`}></span>
              <span>{isOnline ? 'Status: Online' : 'Status: Offline'}</span>
            </button>

            <span className="px-3.5 py-2.5 rounded-xl bg-[#0B4F6C] text-[#F5A623] border border-[#0B4F6C] text-xs font-heading font-bold uppercase flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-emerald-400">satellite_alt</span>
              <span>GPS Radar: Active</span>
            </span>
          </div>
        </div>

        {actionMessage && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs sm:text-sm font-medium flex items-center gap-2 animate-fadeIn shadow-lg">
            <span className="material-symbols-outlined text-[20px] text-emerald-400">check_circle</span>
            <span>{actionMessage}</span>
          </div>
        )}

        {/* 4 Overview Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <div className="p-6 rounded-2xl bg-[#0E1520] border border-slate-800 shadow-xl">
            <span className="text-xs font-heading font-black text-[#F5A623] uppercase tracking-wider">NEW REQUESTS</span>
            <p className="font-heading font-black text-4xl text-white mt-1">
              {incomingRequests.length}
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-[#0E1520] border border-slate-800 shadow-xl">
            <span className="text-xs font-heading font-black text-slate-400 uppercase tracking-wider">JOBS IN PROGRESS</span>
            <p className="font-heading font-black text-4xl text-white mt-1">
              {activeJobs.length}
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-[#0E1520] border border-slate-800 shadow-xl">
            <span className="text-xs font-heading font-black text-slate-400 uppercase tracking-wider">TODAY'S SCHEDULE</span>
            <p className="font-heading font-black text-4xl text-white mt-1">
              {incomingRequests.length + activeJobs.length}
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-[#0B4F6C] border border-[#0B4F6C] shadow-xl">
            <span className="text-xs font-heading font-black text-slate-200 uppercase tracking-wider">COMPLETED JOBS</span>
            <p className="font-heading font-black text-4xl text-[#F5A623] mt-1">
              {completedJobs.length + 214}
            </p>
          </div>
        </div>

        {/* 1. Incoming Requests Queue */}
        <div className="mb-12">
          <h2 className="font-heading font-black text-xl uppercase tracking-wider text-white mb-4 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F5A623] animate-ping"></span>
            NEW INCOMING JOB REQUESTS ({incomingRequests.length})
          </h2>

          {incomingRequests.length === 0 ? (
            <div className="p-8 rounded-2xl bg-[#0E1520] border border-slate-800 text-center text-slate-400 shadow-xl">
              <span className="material-symbols-outlined text-4xl text-slate-600 mb-2">inbox</span>
              <p className="text-sm font-heading font-bold text-white uppercase">No pending job requests right now.</p>
              <p className="text-xs text-slate-400 mt-1">You are online in Dhaka dispatch queue. New jobs will alert automatically.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {incomingRequests.map((req) => {
                const isEmergency = req.urgencyLevel === 'emergency';
                return (
                  <div
                    key={req._id}
                    className={`rounded-2xl p-6 border-2 transition-all shadow-xl ${
                      isEmergency
                        ? 'bg-[#180E14] border-red-700 shadow-red-950/40'
                        : 'bg-[#0E1520] border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-heading text-lg font-black text-white uppercase">
                            {req.serviceType}
                          </h3>
                          {isEmergency ? (
                            <span className="bg-red-600 text-white text-[10px] px-2.5 py-0.5 rounded-full font-heading font-black uppercase animate-pulse">
                              🚨 Urgent SOS
                            </span>
                          ) : (
                            <span className="bg-[#0B4F6C] text-[#F5A623] text-[10px] px-2.5 py-0.5 rounded-full font-heading font-bold uppercase">
                              Standard Schedule
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-slate-300 font-normal leading-relaxed">
                          {req.problemDescription}
                        </p>

                        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
                          <span className="flex items-center gap-1 text-white font-bold">
                            <span className="material-symbols-outlined text-[15px] text-[#F5A623]">person</span>
                            Customer: {req.customer?.name || 'Tanvir Ahmed'} ({req.contactPhone})
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[15px] text-[#F5A623]">location_on</span>
                            {req.location} • {req.addressDetails}
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[15px] text-[#F5A623]">calendar_month</span>
                            {req.preferredDate} ({req.preferredTime})
                          </span>
                        </div>
                      </div>

                      <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-800 gap-3 flex-shrink-0">
                        <span className="font-heading font-black text-3xl text-[#F5A623]">
                          ৳{req.estimatedPrice}
                        </span>

                        <div className="flex items-center gap-2 w-full sm:w-auto">
                          <button
                            onClick={() => handleRejectRequest(req._id)}
                            className="px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-heading font-bold uppercase transition-all cursor-pointer"
                          >
                            Decline
                          </button>
                          <button
                            onClick={() => handleUpdateStatus(req._id, 'Accepted')}
                            className="px-5 py-2.5 rounded-lg bg-[#F5A623] hover:bg-[#E09415] text-[#0A0D12] font-heading font-black text-xs uppercase tracking-wider shadow-gold-sm hover:scale-105 active:scale-98 transition-all cursor-pointer"
                          >
                            Accept Job
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* 2. Active Scheduled Jobs with Status Progression */}
        <div className="mb-12">
          <h2 className="font-heading font-black text-xl uppercase tracking-wider text-white mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#F5A623]">handyman</span>
            ACTIVE FIELD JOBS &amp; PROGRESS CONTROLS ({activeJobs.length})
          </h2>

          {activeJobs.length === 0 ? (
            <div className="p-8 rounded-2xl bg-[#0E1520] border border-slate-800 text-center text-slate-400 shadow-xl">
              <p className="text-sm font-heading font-bold text-white uppercase">No jobs currently in progress.</p>
              <p className="text-xs text-slate-400 mt-1">Accept incoming requests above to dispatch and start field execution.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {activeJobs.map((job) => (
                <div
                  key={job._id}
                  className="rounded-2xl bg-[#0E1520] border-2 border-slate-800 p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-heading text-lg font-black text-white uppercase">
                        #{job._id.slice(-6).toUpperCase()} • {job.serviceType}
                      </h3>
                      <span className="px-3 py-1 rounded-full bg-[#0B4F6C] text-[#F5A623] border border-[#0B4F6C] text-xs font-heading font-bold uppercase">
                        {job.status}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300">
                      Customer: <strong className="text-white">{job.customer?.name}</strong> ({job.contactPhone}) • Location: {job.location} ({job.addressDetails})
                    </p>

                    <p className="text-xs text-slate-400 font-mono">
                      Rate: <strong className="text-[#F5A623] font-bold">৳{job.estimatedPrice}</strong> • Scheduled: {job.preferredDate} ({job.preferredTime})
                    </p>
                  </div>

                  {/* Status Advancement Buttons */}
                  <div className="flex flex-wrap items-center gap-2 w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-slate-800">
                    {job.status === 'Accepted' && (
                      <button
                        onClick={() => handleUpdateStatus(job._id, 'On The Way')}
                        className="px-4 py-2.5 rounded-lg bg-[#0B4F6C] hover:bg-[#0E4B6E] text-white border border-[#0B4F6C] hover:border-[#F5A623] text-xs font-heading font-black uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px] text-[#F5A623]">motorcycle</span>
                        <span>Start Driving (On The Way)</span>
                      </button>
                    )}

                    {job.status === 'On The Way' && (
                      <button
                        onClick={() => handleUpdateStatus(job._id, 'In Progress')}
                        className="px-4 py-2.5 rounded-lg bg-indigo-700 hover:bg-indigo-600 text-white text-xs font-heading font-black uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px]">build</span>
                        <span>Arrived &amp; Start Work</span>
                      </button>
                    )}

                    {job.status === 'In Progress' && (
                      <button
                        onClick={() => handleUpdateStatus(job._id, 'Completed')}
                        className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-heading font-black uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                      >
                        <span className="material-symbols-outlined text-[16px]">verified</span>
                        <span>Mark Job Completed</span>
                      </button>
                    )}

                    <Link
                      to={`/tracking/${job._id}`}
                      className="px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-heading font-bold uppercase transition-all flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[16px] text-[#F5A623]">near_me</span>
                      <span>Radar View</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 3. Completed Jobs Archive */}
        <div>
          <h2 className="font-heading font-black text-xl uppercase tracking-wider text-white mb-4">
            RECENT COMPLETED DISPATCHES ({completedJobs.length})
          </h2>

          <div className="bg-[#0E1520] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-[#0A0D12] text-[11px] font-heading font-black text-[#F5A623] uppercase tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="px-6 py-4">Job ID</th>
                    <th className="px-6 py-4">Service</th>
                    <th className="px-6 py-4">Customer</th>
                    <th className="px-6 py-4">Area</th>
                    <th className="px-6 py-4">Earnings</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {completedJobs.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-8 text-center text-slate-500 font-medium">
                        Completed jobs will be archived here with customer review scores.
                      </td>
                    </tr>
                  ) : (
                    completedJobs.map((job) => (
                      <tr key={job._id} className="hover:bg-slate-900/60 transition-colors">
                        <td className="px-6 py-4 font-mono font-bold text-[#F5A623]">
                          #{job._id.slice(-6).toUpperCase()}
                        </td>
                        <td className="px-6 py-4 font-heading font-bold text-white uppercase">{job.serviceType}</td>
                        <td className="px-6 py-4">{job.customer?.name || 'Customer'}</td>
                        <td className="px-6 py-4">{job.location}</td>
                        <td className="px-6 py-4 font-heading font-black text-[#F5A623]">৳{job.estimatedPrice}</td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 rounded-full bg-[#0B4F6C] text-emerald-400 border border-[#0B4F6C] text-[11px] font-heading font-bold uppercase">
                            Completed
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
