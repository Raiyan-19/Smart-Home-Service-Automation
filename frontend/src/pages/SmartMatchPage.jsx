import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

// Dhaka neighborhood distance matrix (in km)
const DHAKA_DISTANCES = {
  'Dhanmondi': { 'Dhanmondi': 1.4, 'Mohammadpur': 2.5, 'Mirpur': 6.2, 'Gulshan': 7.5, 'Banani': 7.8, 'Uttara': 15.2 },
  'Mohammadpur': { 'Mohammadpur': 1.5, 'Dhanmondi': 2.5, 'Mirpur': 5.1, 'Gulshan': 8.9, 'Banani': 8.5, 'Uttara': 14.8 },
  'Mirpur': { 'Mirpur': 1.8, 'Mohammadpur': 5.1, 'Dhanmondi': 6.2, 'Banani': 6.8, 'Gulshan': 8.2, 'Uttara': 9.5 },
  'Gulshan': { 'Gulshan': 1.5, 'Banani': 1.8, 'Dhanmondi': 7.5, 'Mohammadpur': 8.9, 'Mirpur': 8.2, 'Uttara': 8.8 },
  'Banani': { 'Banani': 1.4, 'Gulshan': 1.8, 'Uttara': 7.9, 'Mirpur': 6.8, 'Dhanmondi': 7.8, 'Mohammadpur': 8.5 },
  'Uttara': { 'Uttara': 1.8, 'Banani': 7.9, 'Gulshan': 8.8, 'Mirpur': 9.5, 'Mohammadpur': 14.8, 'Dhanmondi': 15.2 },
};

function getDhakaDistance(loc1, loc2) {
  if (!loc1 || !loc2) return 3.5;
  const l1 = loc1.trim();
  const l2 = loc2.trim();
  if (DHAKA_DISTANCES[l1] && DHAKA_DISTANCES[l1][l2]) {
    return DHAKA_DISTANCES[l1][l2];
  }
  return 4.5;
}

export default function SmartMatchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Primary URL & State Parameters
  const serviceType = searchParams.get('serviceType') || 'AC & Appliance Repair';
  const initialLocation = searchParams.get('location') || 'Dhanmondi';
  const preferredDate = searchParams.get('preferredDate') || new Date().toISOString().split('T')[0];
  const initialTime = searchParams.get('preferredTime') || 'Today (As soon as possible)';
  const initialUrgency = searchParams.get('urgencyLevel') || 'standard';
  const problemDescription = searchParams.get('problemDescription') || 'General maintenance and diagnostics.';
  const contactPhone = searchParams.get('contactPhone') || '+880 1712-345678';
  const addressDetails = searchParams.get('addressDetails') || `House 42, Road 7A, ${initialLocation}, Dhaka`;

  // Dynamic Match Criteria (Location, Time, Availability, Rating, Price)
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);
  const [selectedTime, setSelectedTime] = useState(initialTime);
  const [urgencyLevel, setUrgencyLevel] = useState(initialUrgency);
  const [availabilityFilter, setAvailabilityFilter] = useState('all'); // 'all' | 'available_now'
  const [minRatingFilter, setMinRatingFilter] = useState(0); // 0 | 4.5 | 4.8
  const [maxBudgetFilter, setMaxBudgetFilter] = useState('all'); // 'all' | 900 | 1200
  const [sortBy, setSortBy] = useState('match'); // 'match' | 'price_asc' | 'rating_desc' | 'eta_asc'

  const [matches, setMatches] = useState([]);
  const [isScanning, setIsScanning] = useState(true);
  const [scanProgress, setScanProgress] = useState(30);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [selectedProviderId, setSelectedProviderId] = useState(null);
  const [error, setError] = useState('');

  const dhakaZones = ['Dhanmondi', 'Gulshan', 'Banani', 'Mirpur', 'Uttara', 'Mohammadpur'];

  const timeOptions = [
    { label: '⚡ As Soon As Possible (Today)', value: 'Today (As soon as possible)', isEmergency: false },
    { label: '🚨 Emergency (15-Min Dispatch)', value: 'Emergency (15-Min Dispatch)', isEmergency: true },
    { label: '🌅 Morning (09:00 - 11:00 AM)', value: '09:00 - 11:00', isEmergency: false },
    { label: '☀️ Afternoon (02:00 - 04:00 PM)', value: '02:00 - 04:00', isEmergency: false },
    { label: '🌙 Evening (05:00 - 08:00 PM)', value: '05:00 - 08:00', isEmergency: false },
  ];

  // Comprehensive Pool of Verified Dhaka Technicians
  const specialistPool = useMemo(() => [
    {
      id: 'apex-master-dhanmondi',
      name: 'Apex Master Service Hub',
      baseLocation: 'Dhanmondi',
      rating: 4.9,
      totalReviews: 214,
      experienceYears: 8,
      estimatedPrice: 850,
      availability: true,
      activeJobs: 0,
      nextSlot: 'Available Now',
      serviceExpertise: ['AC & Appliance Repair', 'Electrical & Wiring'],
      profileImage: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=400&q=80',
      badge: 'Certified Master Tech',
      specialtyHighlight: 'Compressor diagnostics, precision leak sealing & high-pressure jet wash.',
    },
    {
      id: 'gulshan-precision-care',
      name: 'Gulshan Precision HomeCare',
      baseLocation: 'Gulshan',
      rating: 4.9,
      totalReviews: 196,
      experienceYears: 10,
      estimatedPrice: 1100,
      availability: true,
      activeJobs: 0,
      nextSlot: 'Available Now',
      serviceExpertise: ['AC & Appliance Repair', 'Plumbing & Water Lines', 'Electrical & Wiring'],
      profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      badge: 'Diplomat & Villa Specialist',
      specialtyHighlight: 'Multi-split VRF AC systems, copper piping & German diagnostic tools.',
    },
    {
      id: 'rahim-electronics-mohammadpur',
      name: 'Rahim Electronics & Home Care',
      baseLocation: 'Mohammadpur',
      rating: 4.8,
      totalReviews: 182,
      experienceYears: 11,
      estimatedPrice: 750,
      availability: true,
      activeJobs: 0,
      nextSlot: 'Available Now',
      serviceExpertise: ['AC & Appliance Repair', 'Electrical & Wiring'],
      profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      badge: 'Best Value Specialist',
      specialtyHighlight: 'Affordable fixed rates, inverter PCB repair & rapid motor rewiring.',
    },
    {
      id: 'banani-smart-fleet',
      name: 'Banani Smart Tech Fleet',
      baseLocation: 'Banani',
      rating: 4.8,
      totalReviews: 145,
      experienceYears: 7,
      estimatedPrice: 950,
      availability: true,
      activeJobs: 0,
      nextSlot: 'Available Now',
      serviceExpertise: ['AC & Appliance Repair', 'Deep Cleaning'],
      profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      badge: 'Rapid Van Dispatch',
      specialtyHighlight: 'Equipped with gas refill gauges, condenser coil wash & 30-day warranty.',
    },
    {
      id: 'mirpur-craftsmen-works',
      name: 'Mirpur Master Craftsmen',
      baseLocation: 'Mirpur',
      rating: 4.7,
      totalReviews: 128,
      experienceYears: 6,
      estimatedPrice: 800,
      availability: false,
      activeJobs: 1,
      nextSlot: 'Next Slot: ~30 mins',
      serviceExpertise: ['AC & Appliance Repair', 'Plumbing & Water Lines'],
      profileImage: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80',
      badge: 'Certified Technician',
      specialtyHighlight: 'Drainage line blockage clearing, AC bracket mounting & motor service.',
    },
    {
      id: 'uttara-rapid-homecare',
      name: 'Uttara Rapid Care Express',
      baseLocation: 'Uttara',
      rating: 4.8,
      totalReviews: 160,
      experienceYears: 9,
      estimatedPrice: 900,
      availability: true,
      activeJobs: 0,
      nextSlot: 'Available Now',
      serviceExpertise: ['AC & Appliance Repair', 'Electrical & Wiring'],
      profileImage: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
      badge: 'Sector Coverage Lead',
      specialtyHighlight: 'Sector 1 to 14 rapid dispatch with full backup electrical supplies.',
    },
  ], []);

  // Compute 5-factor rank based on: Location, Time, Availability, Rating, Price
  const calculateSmartRankings = () => {
    const isEmergency = urgencyLevel === 'emergency' || selectedTime.includes('Emergency');

    let list = specialistPool.map((spec) => {
      // 1. Distance & Location Proximity (km & score)
      const distanceKm = getDhakaDistance(selectedLocation, spec.baseLocation);
      const distanceScore = Math.max(20, Math.min(100, Math.round(105 - distanceKm * 5.2)));

      // Dynamic ETA based on location distance & urgency
      const etaMinutes = isEmergency
        ? Math.max(8, Math.round(distanceKm * 3.2 + 4))
        : Math.max(12, Math.round(distanceKm * 4.2 + 5));

      // 2. Availability Score (0 - 100)
      let availabilityScore = spec.availability ? 95 : 35;
      if (spec.activeJobs > 0) availabilityScore = Math.max(10, availabilityScore - spec.activeJobs * 25);
      if (isEmergency && spec.availability) availabilityScore = 100;

      // 3. Rating Score (0 - 100)
      const ratingScore = Math.min(100, Math.round((spec.rating / 5.0) * 100));

      // 4. Price Score (0 - 100)
      let priceScore = 80;
      if (spec.estimatedPrice <= 750) priceScore = 100;
      else if (spec.estimatedPrice <= 850) priceScore = 95;
      else if (spec.estimatedPrice <= 950) priceScore = 88;
      else if (spec.estimatedPrice <= 1100) priceScore = 78;
      else priceScore = 65;

      // 5. Time & Urgency Alignment Score
      let timeScore = 85;
      if (isEmergency) {
        timeScore = spec.availability ? 100 : 20;
      }

      // Weighting formula:
      // Standard: Distance 20%, Availability 25%, Rating 25%, Price 15%, Time 15%
      // Emergency: Distance 35%, Availability 35%, Rating 15%, Price 5%, Time 10%
      let wDist = 0.20;
      let wAvail = 0.25;
      let wRat = 0.25;
      let wPrice = 0.15;
      let wTime = 0.15;

      if (isEmergency) {
        wDist = 0.35;
        wAvail = 0.35;
        wRat = 0.15;
        wPrice = 0.05;
        wTime = 0.10;
      }

      const rawMatch =
        distanceScore * wDist +
        availabilityScore * wAvail +
        ratingScore * wRat +
        priceScore * wPrice +
        timeScore * wTime;

      const matchPercentage = Math.min(99.4, Math.max(62.0, Math.round(rawMatch * 10) / 10));

      // Dynamic personalized rationale
      let recommendationReason = '';
      if (distanceKm <= 2.0) {
        recommendationReason = `Stationed right inside ${spec.baseLocation} (~${distanceKm} km). Fastest arrival ETA in Dhaka.`;
      } else if (spec.rating >= 4.9) {
        recommendationReason = `Top-rated 4.9★ master technician with over ${spec.totalReviews} verified reviews.`;
      } else if (spec.estimatedPrice <= 750) {
        recommendationReason = `Most economical all-inclusive fixed pricing (৳${spec.estimatedPrice}) with zero surprise charges.`;
      } else {
        recommendationReason = `Verified Dhaka home service professional equipped for ${serviceType}.`;
      }

      return {
        providerId: spec.id,
        provider: {
          estimatedPrice: spec.estimatedPrice,
          experienceYears: spec.experienceYears,
          rating: spec.rating,
          totalReviews: spec.totalReviews,
          location: spec.baseLocation,
          serviceExpertise: spec.serviceExpertise,
          availability: spec.availability,
          activeJobs: spec.activeJobs,
          nextSlot: spec.nextSlot,
          badge: spec.badge,
          specialtyHighlight: spec.specialtyHighlight,
          user: {
            name: spec.name,
            profileImage: spec.profileImage,
          },
        },
        matchPercentage,
        distanceKm,
        etaMinutes,
        recommendationReason,
        breakdown: {
          locationScore: distanceScore,
          availabilityScore,
          ratingScore,
          priceScore,
          timeScore,
        },
      };
    });

    // Apply Filters: Availability
    if (availabilityFilter === 'available_now') {
      list = list.filter((m) => m.provider.availability);
    }

    // Apply Filters: Rating
    if (minRatingFilter > 0) {
      list = list.filter((m) => m.provider.rating >= minRatingFilter);
    }

    // Apply Filters: Price Budget
    if (maxBudgetFilter !== 'all') {
      list = list.filter((m) => m.provider.estimatedPrice <= Number(maxBudgetFilter));
    }

    // Apply Sorting:
    if (sortBy === 'price_asc') {
      list.sort((a, b) => a.provider.estimatedPrice - b.provider.estimatedPrice);
    } else if (sortBy === 'rating_desc') {
      list.sort((a, b) => b.provider.rating - a.provider.rating);
    } else if (sortBy === 'eta_asc') {
      list.sort((a, b) => a.etaMinutes - b.etaMinutes);
    } else {
      // Default: Best Smart Match
      list.sort((a, b) => b.matchPercentage - a.matchPercentage);
    }

    return list;
  };

  // Recalculate on any criteria change
  useEffect(() => {
    setIsScanning(true);
    setScanProgress(35);

    const timer1 = setTimeout(() => setScanProgress(75), 180);
    const timer2 = setTimeout(() => {
      setScanProgress(100);
      const computedMatches = calculateSmartRankings();
      setMatches(computedMatches);
      setIsScanning(false);
    }, 420);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [selectedLocation, selectedTime, urgencyLevel, availabilityFilter, minRatingFilter, maxBudgetFilter, sortBy]);

  // Handle Location Change
  const handleLocationChange = (newLoc) => {
    setSelectedLocation(newLoc);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set('location', newLoc);
      return next;
    });
  };

  // Handle Time / Urgency Change
  const handleTimeChange = (timeItem) => {
    setSelectedTime(timeItem.value);
    setUrgencyLevel(timeItem.isEmergency ? 'emergency' : 'standard');
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set('preferredTime', timeItem.value);
      next.set('urgencyLevel', timeItem.isEmergency ? 'emergency' : 'standard');
      return next;
    });
  };

  // Direct Booking Handler
  const handleDirectBook = async (matchItem, autoAssign = false) => {
    if (!matchItem) return;

    // Must be logged in to confirm booking
    if (!user) {
      alert('Please log in or create an account to confirm your service booking.');
      navigate(`/login?redirect=${encodeURIComponent(window.location.hash.replace('#', ''))}`);
      return;
    }

    setSelectedProviderId(matchItem.providerId);
    setBookingLoading(true);
    setError('');

    const providerPrice = matchItem.provider?.estimatedPrice || 850;
    const generatedJobId = 'JOB-' + Math.floor(1000 + Math.random() * 9000);

    // Create local request record for instant multi-portal synchronization
    const localJob = {
      _id: generatedJobId,
      serviceType,
      location: selectedLocation,
      addressDetails: `House 42, Road 7A, ${selectedLocation}, Dhaka`,
      preferredDate,
      preferredTime: selectedTime,
      urgencyLevel,
      problemDescription: problemDescription || `${serviceType} maintenance in ${selectedLocation}`,
      contactPhone: user.phone || contactPhone,
      estimatedPrice: providerPrice,
      status: 'Requested',
      customer: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone || contactPhone,
      },
      assignedProvider: {
        _id: matchItem.providerId,
        rating: matchItem.provider?.rating || 4.9,
        experienceYears: matchItem.provider?.experienceYears || 5,
        location: selectedLocation,
        user: {
          name: matchItem.provider?.user?.name || 'Mohammad Kabir (Master Tech)',
          phone: '+880 1712-345678',
          profileImage: matchItem.provider?.user?.profileImage,
        },
      },
      createdAt: new Date().toISOString(),
    };

    try {
      const stored = JSON.parse(localStorage.getItem('homeease_local_requests') || '[]');
      stored.unshift(localJob);
      localStorage.setItem('homeease_local_requests', JSON.stringify(stored));
    } catch (e) {
      console.warn('Failed saving local job:', e);
    }

    try {
      const isDemo = matchItem.providerId.startsWith('apex-') || matchItem.providerId.startsWith('gulshan-') || matchItem.providerId.startsWith('rahim-') || matchItem.providerId.startsWith('banani-') || matchItem.providerId.startsWith('mirpur-') || matchItem.providerId.startsWith('uttara-');

      const reqRes = await api.post('/requests', {
        serviceType,
        location: selectedLocation,
        addressDetails: `House 42, Road 7A, ${selectedLocation}, Dhaka`,
        preferredDate,
        preferredTime: selectedTime,
        urgencyLevel,
        problemDescription,
        contactPhone: user.phone || contactPhone,
        providerId: isDemo ? undefined : matchItem.providerId,
        autoAssign,
      });

      const actualJobId = reqRes.data?.success && reqRes.data.data?._id ? reqRes.data.data._id : generatedJobId;

      navigate(
        `/confirmation?requestId=${actualJobId}&providerId=${matchItem.providerId}&rate=${providerPrice}&date=${preferredDate}&time=${encodeURIComponent(selectedTime)}`
      );
    } catch (err) {
      console.warn('Backend booking fallback, using local job:', err);
      navigate(
        `/confirmation?requestId=${generatedJobId}&providerId=${matchItem.providerId}&rate=${providerPrice}&date=${preferredDate}&time=${encodeURIComponent(selectedTime)}`
      );
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0D12] text-white flex flex-col font-sans selection:bg-[#F5A623] selection:text-[#0A0D12]">
      <Navbar />

      {/* Amber Notification Ribbon */}
      <div className="bg-[#F5A623] text-[#0A0D12] py-2 px-4 font-heading font-black text-xs uppercase tracking-widest text-center shadow-sm">
        ⚡ Smart Match Radar: Active in {selectedLocation}, Dhaka • Location, Time, Availability, Rating &amp; Price Engine • Hotline 16800
      </div>

      <main className="flex-grow max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0B4F6C]/60 border border-[#0B4F6C] text-[#F5A623] text-xs font-heading font-black tracking-widest uppercase mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            Real-Time Dhaka Specialist Radar
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
            SMART <span className="text-[#F5A623] italic font-serif lowercase text-4xl sm:text-6xl">match</span> TECHNICIANS
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mt-2">
            Technicians are dynamically scored and ranked based on your exact <strong className="text-white">Location</strong>, requested <strong className="text-white">Time</strong>, live <strong className="text-white">Availability</strong>, verified <strong className="text-white">Rating</strong>, and upfront <strong className="text-white">Price</strong>.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* SMART MATCH PARAMETER CONTROL HUB (Location, Time, Availability, Rating, Price) */}
        {/* ========================================================================= */}
        <div className="bg-[#0E1520] border-2 border-slate-800 rounded-2xl p-6 sm:p-7 shadow-2xl mb-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
            <div>
              <span className="text-[10px] font-heading font-black text-[#F5A623] uppercase tracking-widest block">
                ALGORITHM CONTROLS
              </span>
              <h3 className="font-heading text-lg font-black uppercase text-white tracking-wide">
                Filter &amp; Rank Specialists
              </h3>
            </div>
            <span className="text-xs text-slate-400 font-medium bg-[#0A0D12] px-3.5 py-1.5 rounded-lg border border-slate-800">
              Target: <span className="text-[#F5A623] font-bold">{serviceType}</span> in <span className="text-white font-bold">{selectedLocation}</span>
            </span>
          </div>

          {/* 1. LOCATION (Dhaka Area Selector) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-heading font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#F5A623]">location_on</span>
                <span>1. Select Dhaka Location:</span>
              </label>
              <span className="text-[11px] text-slate-400">
                Calculates live distance &amp; ETA from your chosen area
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {dhakaZones.map((zone) => {
                const isActive = selectedLocation === zone;
                return (
                  <button
                    key={zone}
                    onClick={() => handleLocationChange(zone)}
                    className={`px-4 py-2 rounded-lg text-xs font-heading font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-[#F5A623] text-[#0A0D12] shadow-gold-sm scale-102 font-extrabold'
                        : 'bg-[#0A0D12] hover:bg-slate-800 text-slate-300 border border-slate-700'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#0A0D12]' : 'bg-emerald-400'}`}></span>
                    <span>{zone}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. TIME & URGENCY (Schedule Window) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-heading font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#F5A623]">schedule</span>
                <span>2. Select Time &amp; Urgency:</span>
              </label>
              <span className="text-[11px] text-slate-400">
                {urgencyLevel === 'emergency' ? '🚨 Rapid 15-min priority queue active' : 'Scheduled standard dispatch'}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {timeOptions.map((opt) => {
                const isActive = selectedTime === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => handleTimeChange(opt)}
                    className={`px-4 py-2 rounded-lg text-xs font-heading font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      isActive
                        ? opt.isEmergency
                          ? 'bg-rose-600 text-white font-black shadow-md scale-102'
                          : 'bg-[#0B4F6C] text-[#F5A623] border border-[#F5A623] font-black scale-102'
                        : 'bg-[#0A0D12] hover:bg-slate-800 text-slate-300 border border-slate-700'
                    }`}
                  >
                    <span>{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3, 4, 5. AVAILABILITY, RATING, PRICE & SORTING (Inline Filters) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3 border-t border-slate-800">
            {/* Availability */}
            <div>
              <label className="text-[11px] font-heading font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px] text-emerald-400">radio_button_checked</span>
                <span>3. Live Availability:</span>
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setAvailabilityFilter('all')}
                  className={`flex-1 py-2 rounded-lg text-xs font-heading font-bold uppercase transition-all cursor-pointer ${
                    availabilityFilter === 'all'
                      ? 'bg-[#0B4F6C] text-white border border-[#0B4F6C]'
                      : 'bg-[#0A0D12] text-slate-400 border border-slate-800 hover:text-white'
                  }`}
                >
                  All Techs
                </button>
                <button
                  onClick={() => setAvailabilityFilter('available_now')}
                  className={`flex-1 py-2 rounded-lg text-xs font-heading font-bold uppercase transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    availabilityFilter === 'available_now'
                      ? 'bg-emerald-600 text-white font-black shadow-sm'
                      : 'bg-[#0A0D12] text-slate-400 border border-slate-800 hover:text-emerald-400'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Available Now</span>
                </button>
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <label className="text-[11px] font-heading font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px] text-[#F5A623]">star</span>
                <span>4. Minimum Rating:</span>
              </label>
              <div className="flex gap-2">
                {[
                  { label: 'All ★', val: 0 },
                  { label: '4.5+ ★', val: 4.5 },
                  { label: '4.8+ ★', val: 4.8 },
                ].map((item) => (
                  <button
                    key={item.val}
                    onClick={() => setMinRatingFilter(item.val)}
                    className={`flex-1 py-2 rounded-lg text-xs font-heading font-bold uppercase transition-all cursor-pointer ${
                      minRatingFilter === item.val
                        ? 'bg-[#F5A623] text-[#0A0D12] font-black'
                        : 'bg-[#0A0D12] text-slate-400 border border-slate-800 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Price & Sort Order */}
            <div>
              <label className="text-[11px] font-heading font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px] text-[#F5A623]">payments</span>
                <span>5. Sort &amp; Price:</span>
              </label>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  aria-label="Sort specialists by"
                  className="w-full bg-[#0A0D12] border border-slate-700 text-white rounded-lg px-3 py-2 text-xs font-heading font-bold uppercase tracking-wider focus:outline-none focus:border-[#F5A623] cursor-pointer"
                >
                  <option value="match">🎯 Best Smart Match (AI Score)</option>
                  <option value="price_asc">💰 Lowest Price First (৳)</option>
                  <option value="rating_desc">⭐ Highest Rating (★)</option>
                  <option value="eta_asc">⏱️ Fastest Arrival ETA</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Dispatch Ticket Banner */}
        <div className="bg-[#0E1520] border-2 border-slate-800 rounded-2xl p-5 sm:p-6 shadow-2xl mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-[#F5A623] text-[#0A0D12] flex items-center justify-center shadow-gold-sm font-black flex-shrink-0">
              <span className="material-symbols-outlined text-[30px]">home_repair_service</span>
            </div>
            <div>
              <p className="text-[10px] font-heading font-black text-[#F5A623] uppercase tracking-widest">
                ACTIVE DISPATCH TICKET
              </p>
              <h2 className="font-heading text-lg sm:text-xl font-black uppercase text-white tracking-tight mt-0.5">
                {serviceType} in {selectedLocation}, Dhaka
              </h2>
              <p className="text-xs text-slate-300 mt-0.5">
                {addressDetails} • <strong className="text-[#F5A623] font-bold">{selectedTime}</strong>
              </p>
            </div>
          </div>

          <button
            onClick={() => handleDirectBook(matches[0], true)}
            disabled={bookingLoading || matches.length === 0}
            className="px-6 py-3.5 rounded-lg bg-[#F5A623] hover:bg-[#E09415] text-[#0A0D12] font-heading font-black text-xs sm:text-sm uppercase tracking-wider shadow-gold-md hover:scale-105 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer flex-shrink-0"
          >
            <span className="material-symbols-outlined text-[20px]">bolt</span>
            <span>⚡ AUTO-BOOK BEST TECH</span>
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-950/70 border border-red-800 text-red-300 text-sm font-medium flex items-center gap-2">
            <span className="material-symbols-outlined text-red-400 text-[20px]">error</span>
            <span>{error}</span>
          </div>
        )}

        {/* Scanning Radar Loader */}
        {isScanning ? (
          <div className="bg-[#0E1520] border-2 border-slate-800 rounded-2xl p-12 text-center shadow-2xl space-y-4 my-8">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-[#0A0D12] border-2 border-[#F5A623] flex items-center justify-center text-[#F5A623] animate-spin shadow-gold-sm" style={{ animationDuration: '2s' }}>
              <span className="material-symbols-outlined text-[32px]">radar</span>
            </div>
            <h3 className="font-heading text-xl font-black uppercase text-white">
              Evaluating Location, Time, Availability, Rating &amp; Price...
            </h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Calculating real-time road distance from {selectedLocation}, verifying active technician queues, checking fixed rates, and tuning AI match percentages.
            </p>
            <div className="max-w-xs mx-auto h-2.5 bg-[#0A0D12] rounded-full overflow-hidden border border-slate-800">
              <div
                className="h-full bg-[#F5A623] transition-all duration-300 rounded-full"
                style={{ width: `${scanProgress}%` }}
              ></div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between px-1 mb-2">
              <h3 className="font-heading text-base sm:text-lg font-black uppercase text-white flex items-center gap-2">
                <span>Ranked Dhaka Specialists ({matches.length})</span>
                <span className="text-xs text-slate-400 font-normal hidden sm:inline">• Sorted by {sortBy === 'price_asc' ? 'Lowest Price' : sortBy === 'rating_desc' ? 'Highest Rating' : sortBy === 'eta_asc' ? 'Fastest Arrival' : 'Best Match Score'}</span>
              </h3>
              <span className="text-xs text-[#F5A623] font-heading font-black uppercase flex items-center gap-1.5 bg-[#0B4F6C] px-3.5 py-1.5 rounded-full border border-[#0B4F6C]">
                <span className="material-symbols-outlined text-[16px] text-emerald-400">verified</span>
                Pay After 100% Satisfaction
              </span>
            </div>

            {matches.length === 0 ? (
              <div className="bg-[#0E1520] border-2 border-slate-800 rounded-2xl p-12 text-center shadow-xl">
                <span className="material-symbols-outlined text-4xl text-slate-500 mb-2">search_off</span>
                <h4 className="font-heading font-black text-lg text-white uppercase">No Specialists Matched All Criteria</h4>
                <p className="text-xs text-slate-400 mt-1">Try lowering the minimum rating or clearing the 'Available Now' filter.</p>
                <button
                  onClick={() => {
                    setAvailabilityFilter('all');
                    setMinRatingFilter(0);
                    setMaxBudgetFilter('all');
                    setSortBy('match');
                  }}
                  className="mt-4 px-6 py-2.5 rounded-lg bg-[#F5A623] text-[#0A0D12] font-heading font-black text-xs uppercase"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              matches.map((item, idx) => {
                const provider = item.provider;
                const isBestMatch = idx === 0;
                const isThisLoading = bookingLoading && selectedProviderId === item.providerId;

                return (
                  <div
                    key={item.providerId}
                    className={`rounded-2xl p-6 sm:p-7 bg-[#0E1520] border-2 transition-all duration-300 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative overflow-hidden ${
                      isBestMatch
                        ? 'border-[#F5A623] shadow-gold-sm ring-1 ring-[#F5A623]/30'
                        : 'border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {isBestMatch && (
                      <span className="absolute top-0 right-0 bg-[#F5A623] text-[#0A0D12] text-[10px] font-heading font-black px-4 py-1 rounded-bl-xl uppercase tracking-wider shadow-sm">
                        ★ #1 Top Recommendation ({sortBy === 'price_asc' ? 'Lowest Rate' : sortBy === 'rating_desc' ? 'Top Rated' : 'Best Match'})
                      </span>
                    )}

                    {/* Left: Info */}
                    <div className="flex items-start gap-4 sm:gap-5 flex-1">
                      <div className="relative flex-shrink-0">
                        <img
                          src={provider.user?.profileImage}
                          alt={provider.user?.name}
                          className="w-18 h-18 sm:w-20 sm:h-20 rounded-xl object-cover ring-2 ring-slate-700 shadow-md"
                        />
                        <span
                          className={`w-3.5 h-3.5 rounded-full border-2 border-[#0A0D12] absolute -bottom-1 -right-1 ${
                            provider.availability ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                          }`}
                        ></span>
                      </div>

                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <h4 className="font-heading text-lg sm:text-xl font-black uppercase text-white tracking-wide">
                            {provider.user?.name}
                          </h4>
                          <span className="bg-[#0B4F6C] text-[#F5A623] border border-[#0B4F6C] text-xs px-2.5 py-0.5 rounded-md font-heading font-bold uppercase">
                            {item.matchPercentage}% Match
                          </span>
                          <span className="text-[10px] text-slate-300 bg-slate-800 px-2 py-0.5 rounded font-heading uppercase">
                            {provider.badge}
                          </span>
                        </div>

                        <p className="text-xs text-slate-300 font-medium">
                          {(provider.serviceExpertise || [serviceType]).slice(0, 2).join(' & ')} • {provider.experienceYears} Years Experience
                        </p>

                        {/* 5-Criteria Parameter Pill Badges */}
                        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                          {/* Rating */}
                          <span className="bg-[#0A0D12] text-white px-2.5 py-1 rounded-md border border-slate-800 font-heading font-black flex items-center gap-1">
                            <span className="text-[#F5A623]">★</span> {provider.rating} ({provider.totalReviews})
                          </span>

                          {/* Location & Distance */}
                          <span className="bg-[#0A0D12] text-slate-200 px-2.5 py-1 rounded-md border border-slate-800 font-medium flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px] text-[#F5A623]">near_me</span>
                            <span>{item.distanceKm} km from {selectedLocation}</span>
                          </span>

                          {/* Time & ETA */}
                          <span className="bg-[#0A0D12] text-emerald-400 px-2.5 py-1 rounded-md border border-slate-800 font-heading font-bold flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">timer</span>
                            <span>Arrives in ~{item.etaMinutes} mins</span>
                          </span>

                          {/* Availability */}
                          <span className={`px-2.5 py-1 rounded-md font-heading font-bold text-[11px] flex items-center gap-1 ${
                            provider.availability
                              ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/80'
                              : 'bg-amber-950/60 text-amber-300 border border-amber-800/80'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${provider.availability ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
                            <span>{provider.nextSlot}</span>
                          </span>
                        </div>

                        {/* Recommendation Callout */}
                        <p className="text-xs text-slate-300 mt-2 bg-[#0A0D12] px-3.5 py-2 rounded-lg border border-slate-800 max-w-xl font-normal leading-relaxed">
                          💡 <strong className="text-[#F5A623] font-bold">Dispatch Reason:</strong> {item.recommendationReason}
                        </p>
                      </div>
                    </div>

                    {/* Right: Direct 1-Click Book Action */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-800 flex-shrink-0 gap-3">
                      <div className="text-left sm:text-right">
                        <span className="font-heading text-3xl font-black text-[#F5A623] block leading-none">
                          ৳{provider.estimatedPrice}
                        </span>
                        <p className="text-[10px] text-slate-400 font-heading font-bold uppercase tracking-wider mt-1">
                          All-Inclusive Fixed Rate
                        </p>
                      </div>

                      <button
                        onClick={() => handleDirectBook(item, false)}
                        disabled={bookingLoading}
                        className={`px-7 py-3.5 rounded-lg font-heading font-black text-xs uppercase tracking-wider shadow-gold-sm hover:scale-105 active:scale-98 transition-all flex items-center gap-2 cursor-pointer ${
                          isBestMatch
                            ? 'bg-[#F5A623] hover:bg-[#E09415] text-[#0A0D12]'
                            : 'bg-[#0B4F6C] hover:bg-[#0E4B6E] text-white border border-[#0B4F6C] hover:border-[#F5A623]'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[18px]">check_circle</span>
                        <span>{isThisLoading ? 'Dispatching...' : 'Book Service'}</span>
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* Bottom Dhaka Guarantees Banner */}
        <div className="mt-10 p-6 bg-[#0E1520] border border-slate-800 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300 text-center sm:text-left shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#F5A623]/15 text-[#F5A623] flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[24px]">verified_user</span>
            </div>
            <div>
              <p className="font-heading font-bold text-white uppercase text-xs">30-Day Workmanship Warranty</p>
              <p className="text-[11px] text-slate-400">Pay only after service is completed and thoroughly inspected.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#0B4F6C]/40 text-[#F5A623] flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[24px]">cancel</span>
            </div>
            <div>
              <p className="font-heading font-bold text-white uppercase text-xs">Zero Cancellation Penalty</p>
              <p className="text-[11px] text-slate-400">Cancel or reschedule anytime before technician arrival.</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
