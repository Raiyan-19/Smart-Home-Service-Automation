import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

export default function ComparisonEngine({ providers = [] }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [selectedProvider, setSelectedProvider] = useState(null);
  const [urgency, setUrgency] = useState('standard');
  const [location, setLocation] = useState('Dhanmondi');
  const [problemDescription, setProblemDescription] = useState(
    'Inverter AC cooling stopped and indoor unit making screeching sound.'
  );
  const [loading, setLoading] = useState(false);

  const defaultProviders = [
    {
      _id: 'provider_1',
      name: 'Rahim Electronics & HVAC',
      matchScore: 95,
      rating: 4.9,
      totalReviews: 420,
      experience: 'Master Technician • 12 Years Experience • 420+ Verified Jobs',
      distance: '2.3 km (18 min ETA)',
      guarantee: '30-Day Money-back Guarantee',
      rate: 1000,
      icon: 'verified_user',
    },
    {
      _id: 'provider_2',
      name: 'Apex Home Coolers Hub',
      matchScore: 89,
      rating: 4.8,
      totalReviews: 185,
      experience: 'Authorized Multi-Brand Partner • 8 Years Team Experience',
      distance: '3.8 km (25 min ETA)',
      guarantee: '15-Day Free Warranty',
      rate: 1150,
      icon: 'construction',
    },
    {
      _id: 'provider_3',
      name: 'Dhaka Precision Mechanics',
      matchScore: 82,
      rating: 4.7,
      totalReviews: 310,
      experience: 'Fast Local Responder • 300+ Verified Service Calls',
      distance: '4.1 km (30 min ETA)',
      guarantee: '7-Day Service Warranty',
      rate: 950,
      icon: 'build',
    },
  ];

  const displayList = providers.length > 0 ? providers : defaultProviders;

  useEffect(() => {
    if (displayList.length > 0 && !selectedProvider) {
      setSelectedProvider(displayList[0]);
    }
  }, [displayList]);

  const handleAutoAssign = () => {
    if (displayList.length > 0) {
      setSelectedProvider(displayList[0]);
    }
  };

  const handleConfirmDispatch = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!user) {
        navigate('/login?redirect=/request');
        return;
      }

      const res = await api.post('/requests', {
        serviceType: 'AC & Appliance Repair',
        location,
        preferredDate: new Date().toISOString().split('T')[0],
        preferredTime: '11:00 - 01:00',
        urgencyLevel: urgency,
        problemDescription,
        providerId: selectedProvider?._id,
        autoAssign: false,
      });

      if (res.data.success) {
        navigate(`/tracking/${res.data.data._id}`);
      }
    } catch (err) {
      console.error(err);
      navigate(`/smart-match?service=AC%20%26%20Appliance%20Repair&location=${location}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200" id="comparison-engine">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
            SMART MATCHING SYSTEM
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
            Compare Top Providers or Auto-Assign the Best
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-1">
            We calculate real-time match scores based on expertise, location proximity, customer ratings, and upfront rates.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Top 3 Rated Providers (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-base font-bold text-slate-900 flex items-center gap-2">
                <span className="material-symbols-outlined text-blue-600">military_tech</span>
                Best Matched Technicians in Your Area
              </h3>
              <button
                onClick={handleAutoAssign}
                className="px-3.5 py-1.5 rounded-xl gradient-primary text-white text-xs font-bold hover:opacity-95 transition-all flex items-center gap-1.5 shadow-soft-sm cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">bolt</span>
                Auto-Assign Best Match
              </button>
            </div>

            {displayList.map((p, idx) => {
              const isSelected = selectedProvider?._id === p._id || (!selectedProvider && idx === 0);
              const pName = p.name || (p.provider?.user ? p.provider.user.name : 'Dhaka Specialist');
              const match = p.matchScore || p.matchPercentage || (95 - idx * 6);
              const rate = p.rate || p.provider?.estimatedPrice || p.estimatedPrice || 1000;
              const rating = p.rating || p.provider?.rating || 4.8;
              const distance = p.distance || `${p.distanceKm || (2 + idx * 1.5)} km (${15 + idx * 6} min ETA)`;

              return (
                <div
                  key={p._id || idx}
                  onClick={() => setSelectedProvider(p)}
                  className={`p-5 rounded-3xl transition-all duration-200 cursor-pointer bg-white border ${
                    isSelected
                      ? 'border-blue-600 ring-2 ring-blue-500/20 shadow-soft-md'
                      : 'border-slate-200 hover:border-blue-300 hover:shadow-soft-sm'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                        isSelected ? 'bg-blue-600 text-white shadow-soft-sm' : 'bg-slate-100 text-slate-600'
                      }`}>
                        <span className="material-symbols-outlined text-[24px]">
                          {p.icon || 'verified_user'}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-display text-base font-bold text-slate-900">
                            {pName}
                          </h4>
                          <span className="bg-blue-50 text-blue-700 font-bold text-[11px] px-2.5 py-0.5 rounded-full">
                            {match}% Match
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">
                          {p.experience || `${p.provider?.experienceYears || 8} Years Experience • 200+ Verified Jobs`}
                        </p>
                        <div className="flex items-center gap-2 mt-2 text-xs">
                          <span className="font-bold text-slate-800 flex items-center gap-1">
                            ⭐ {rating}
                          </span>
                          <span className="text-slate-300">•</span>
                          <span className="text-blue-600 font-semibold">{distance}</span>
                          <span className="text-slate-300">•</span>
                          <span className="text-emerald-600 font-medium">30-Day Guarantee</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <span className="font-display text-xl font-extrabold text-slate-900">৳{rate}</span>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Fixed Rate</p>
                      <button
                        className={`mt-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                          isSelected
                            ? 'gradient-primary text-white shadow-soft-sm'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        {isSelected ? '✓ Selected' : 'Choose'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Quick Easy Booking Card (5 Cols) */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-soft-lg">
            <h3 className="font-display text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="material-symbols-outlined text-blue-600">tune</span>
              Fast-Track Service Booking
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Select your urgency and location to confirm instant dispatch.
            </p>

            <form onSubmit={handleConfirmDispatch} className="mt-5 space-y-4">
              {/* Urgency Buttons */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-2">
                  Urgency Level
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'low', label: '🟢 Low', sub: 'Flexible' },
                    { id: 'standard', label: '🟡 Standard', sub: 'Today' },
                    { id: 'high', label: '🟠 High', sub: '<2 Hours' },
                    { id: 'emergency', label: '🔴 Urgent', sub: '15 Mins' },
                  ].map((u) => (
                    <button
                      key={u.id}
                      type="button"
                      onClick={() => setUrgency(u.id)}
                      className={`px-3 py-2 rounded-xl text-left border transition-all cursor-pointer ${
                        urgency === u.id
                          ? 'bg-blue-50 border-blue-500 text-blue-800 font-bold ring-2 ring-blue-500/20'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <p className="text-xs font-bold">{u.label}</p>
                      <p className="text-[10px] text-slate-500">{u.sub}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Location Select */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Dhaka Area
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 text-xs font-medium focus:border-blue-500 focus:bg-white focus:outline-none transition-colors"
                >
                  <option value="Dhanmondi">House 42, Road 7A, Dhanmondi, Dhaka</option>
                  <option value="Gulshan">Road 11, Block D, Gulshan 1, Dhaka</option>
                  <option value="Banani">Block B, Road 8, Banani, Dhaka</option>
                  <option value="Mirpur">Section 11, Block C, Mirpur, Dhaka</option>
                  <option value="Uttara">Sector 7, Road 3, Uttara, Dhaka</option>
                  <option value="Mohammadpur">Salimullah Road, Mohammadpur, Dhaka</option>
                </select>
              </div>

              {/* Problem Description */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Describe the Issue
                </label>
                <textarea
                  value={problemDescription}
                  onChange={(e) => setProblemDescription(e.target.value)}
                  rows="3"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 text-xs focus:border-blue-500 focus:bg-white focus:outline-none transition-colors"
                  placeholder="E.g. Inverter AC cooling stopped, indoor unit making noise..."
                ></textarea>
              </div>

              {/* Price Summary */}
              <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    Total Estimated Tariff
                  </p>
                  <p className="font-display text-xl font-extrabold text-blue-600">
                    ৳{selectedProvider?.rate || 1000}{' '}
                    <span className="text-xs font-semibold text-slate-500">(Escrow Protected)</span>
                  </p>
                </div>
                <span className="material-symbols-outlined text-[32px] text-emerald-600">
                  shield
                </span>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-2xl gradient-primary text-white font-display text-sm font-bold shadow-soft-md hover:opacity-95 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                <span>{loading ? 'Confirming...' : 'Confirm & Request Technician'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
