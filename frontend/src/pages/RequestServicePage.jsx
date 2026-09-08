import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { useAuth } from '../context/AuthContext';

export default function RequestServicePage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [serviceType, setServiceType] = useState(searchParams.get('service') || 'AC & Appliance Repair');
  const [location, setLocation] = useState(searchParams.get('location') || 'Dhanmondi');
  const [addressDetails, setAddressDetails] = useState('House 42, Road 7A, Dhanmondi, Dhaka');
  const [timeChoice, setTimeChoice] = useState('Today (As soon as possible)');
  const [problemDescription, setProblemDescription] = useState('');
  const [contactPhone, setContactPhone] = useState(user?.phone || '+880 1712-345678');
  const [error, setError] = useState('');

  const quickServices = [
    { name: 'AC & Appliance Repair', icon: 'mode_fan' },
    { name: 'Plumbing & Water Lines', icon: 'water_damage' },
    { name: 'Electrical & Wiring', icon: 'bolt' },
    { name: 'Deep Cleaning', icon: 'sanitizer' },
    { name: 'Pest Control Protocol', icon: 'pest_control' },
    { name: 'Home Carpentry', icon: 'carpenter' },
  ];

  const timeOptions = [
    'Today (As soon as possible)',
    'Today (Evening 4 PM - 7 PM)',
    'Tomorrow (Morning 9 AM - 12 PM)',
    'Tomorrow (Afternoon 2 PM - 5 PM)',
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!contactPhone.trim()) {
      setError('Please provide a contact phone number.');
      return;
    }

    const params = new URLSearchParams({
      serviceType,
      location,
      addressDetails,
      preferredDate: new Date().toISOString().split('T')[0],
      preferredTime: timeChoice,
      urgencyLevel: timeChoice.includes('possible') ? 'emergency' : 'standard',
      problemDescription: problemDescription.trim() || `${serviceType} requested in ${location}.`,
      contactPhone,
    });

    navigate(`/smart-match?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-[#0A0D12] text-white flex flex-col font-sans selection:bg-[#F5A623] selection:text-[#0A0D12]">
      <Navbar />

      {/* Amber Sub-Header Banner */}
      <div className="bg-[#F5A623] text-[#0A0D12] py-2 px-4 font-heading font-black text-xs uppercase tracking-widest text-center">
        ★ Fast 1-Minute Booking • Verified Dhaka Master Technicians • Zero Prepayment Needed
      </div>

      <main className="flex-grow max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0B4F6C]/60 border border-[#0B4F6C] text-[#F5A623] text-xs font-heading font-black tracking-widest uppercase mb-4">
            Dhaka Home Service Request
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
            BOOK <span className="text-[#F5A623] italic font-serif lowercase text-4xl sm:text-6xl">trusted</span> EXPERTS
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mt-2">
            Select your service, choose your Dhaka neighborhood, and instantly match with top-rated technicians.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-950/60 border border-red-800 text-red-300 text-sm font-medium flex items-center gap-2">
            <span className="material-symbols-outlined text-red-400 text-[20px]">error</span>
            <span>{error}</span>
          </div>
        )}

        {/* Booking Form (Dark Slate Container with Amber Accents) */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#0E1520] border-2 border-slate-800 rounded-2xl p-6 sm:p-10 shadow-2xl space-y-8"
        >
          {/* Step 1: Service Type */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-heading font-black text-[#F5A623] uppercase tracking-wider">
                1. SELECT REQUIRED SERVICE
              </label>
              <span className="text-[11px] text-slate-400">Fixed rate quote guaranteed</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {quickServices.map((s) => {
                const isSelected = serviceType === s.name;
                return (
                  <button
                    key={s.name}
                    type="button"
                    onClick={() => setServiceType(s.name)}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-2 border-[#F5A623] bg-[#F5A623]/15 shadow-gold-sm'
                        : 'border-slate-800 bg-[#0A0D12] hover:bg-slate-900 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className={`material-symbols-outlined text-[26px] ${isSelected ? 'text-[#F5A623]' : 'text-slate-400'}`}>
                        {s.icon}
                      </span>
                      {isSelected && (
                        <span className="material-symbols-outlined text-[18px] text-[#F5A623]">
                          check_circle
                        </span>
                      )}
                    </div>
                    <span className={`text-xs font-heading font-black uppercase leading-tight ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                      {s.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Location & Address */}
          <div className="pt-4 border-t border-slate-800 space-y-3">
            <label className="block text-xs font-heading font-black text-[#F5A623] uppercase tracking-wider">
              2. SERVICE LOCATION IN DHAKA
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-[#0A0D12] border border-slate-700 rounded-xl px-4 py-3.5 text-white font-semibold text-xs sm:text-sm focus:border-[#F5A623] focus:outline-none transition-all cursor-pointer"
                >
                  <option value="Dhanmondi">📍 Dhanmondi, Dhaka</option>
                  <option value="Gulshan">📍 Gulshan, Dhaka</option>
                  <option value="Banani">📍 Banani, Dhaka</option>
                  <option value="Mirpur">📍 Mirpur, Dhaka</option>
                  <option value="Uttara">📍 Uttara, Dhaka</option>
                  <option value="Mohammadpur">📍 Mohammadpur, Dhaka</option>
                </select>
              </div>

              <div>
                <input
                  type="text"
                  required
                  value={addressDetails}
                  onChange={(e) => setAddressDetails(e.target.value)}
                  placeholder="Flat No, House, Road details..."
                  className="w-full bg-[#0A0D12] border border-slate-700 rounded-xl px-4 py-3.5 text-white text-xs sm:text-sm focus:border-[#F5A623] focus:outline-none transition-all placeholder:text-slate-500"
                />
              </div>
            </div>
          </div>

          {/* Step 3: Preferred Arrival Time */}
          <div className="pt-4 border-t border-slate-800 space-y-3">
            <label className="block text-xs font-heading font-black text-[#F5A623] uppercase tracking-wider">
              3. TECHNICIAN ARRIVAL WINDOW
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {timeOptions.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTimeChoice(t)}
                  className={`px-4 py-3 rounded-xl text-xs font-heading font-bold uppercase border text-left transition-all cursor-pointer flex items-center justify-between ${
                    timeChoice === t
                      ? 'bg-[#0B4F6C] text-white border-[#F5A623] shadow-gold-sm'
                      : 'bg-[#0A0D12] hover:bg-slate-900 border-slate-800 text-slate-300'
                  }`}
                >
                  <span>{t}</span>
                  {timeChoice === t && <span className="material-symbols-outlined text-[16px] text-[#F5A623]">check</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Step 4: Contact & Problem Note */}
          <div className="pt-4 border-t border-slate-800 space-y-3">
            <label className="block text-xs font-heading font-black text-[#F5A623] uppercase tracking-wider">
              4. CONTACT &amp; BRIEF ISSUE DESCRIPTION
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <input
                  type="text"
                  required
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  placeholder="Mobile: +880 1712-345678"
                  className="w-full bg-[#0A0D12] border border-slate-700 rounded-xl px-4 py-3.5 text-white font-semibold text-xs sm:text-sm focus:border-[#F5A623] focus:outline-none transition-all"
                />
              </div>

              <div>
                <input
                  type="text"
                  value={problemDescription}
                  onChange={(e) => setProblemDescription(e.target.value)}
                  placeholder="Brief issue (e.g. AC not cooling, pipe leaking)"
                  className="w-full bg-[#0A0D12] border border-slate-700 rounded-xl px-4 py-3.5 text-white text-xs sm:text-sm focus:border-[#F5A623] focus:outline-none transition-all placeholder:text-slate-500"
                />
              </div>
            </div>
          </div>

          {/* Action Button: Signature Amber Gold */}
          <div className="pt-6 border-t border-slate-800">
            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-[#F5A623] hover:bg-[#E09415] text-[#0A0D12] font-heading font-black text-sm uppercase tracking-wider shadow-gold-md hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>SEE AVAILABLE TECHNICIANS &amp; RATES</span>
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>
            <p className="text-center text-xs text-slate-400 mt-3 flex items-center justify-center gap-1.5 font-normal">
              <span className="material-symbols-outlined text-[#F5A623] text-[16px]">verified</span>
              Zero advance payment • Pay in cash or bKash after work is inspected
            </p>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}
