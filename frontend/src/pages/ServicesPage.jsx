import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import api from '../services/api';

const DEMO_SERVICES = [
  { _id: 's1', name: 'AC & Appliance Repair', category: 'APPLIANCES', basePrice: 650, description: 'Complete AC diagnostics, gas refill, compressor repair, and all major home appliance servicing by certified technicians.', warrantyInfo: '30-Day Guarantee', activeTechCount: 14 },
  { _id: 's2', name: 'Plumbing & Water Lines', category: 'PLUMBING', basePrice: 400, description: 'Pipe leak detection, drain blockage clearing, water pump installation, overhead tank cleaning, and bathroom fixture repairs.', warrantyInfo: '7-Day Guarantee', activeTechCount: 9 },
  { _id: 's3', name: 'Electrical & Wiring', category: 'MAINTENANCE', basePrice: 350, description: 'Switchboard repairs, wiring upgrades, circuit breaker servicing, MCB installation, and safety compliance checks.', warrantyInfo: '30-Day Guarantee', activeTechCount: 11 },
  { _id: 's4', name: 'Deep Cleaning', category: 'MAINTENANCE', basePrice: 800, description: 'Full home deep sanitization including kitchen degreasing, bathroom tile scrubbing, sofa steam-cleaning, and floor polishing.', warrantyInfo: 'Satisfaction Guaranteed', activeTechCount: 7 },
  { _id: 's5', name: 'Pest Control Protocol', category: 'MAINTENANCE', basePrice: 500, description: 'Cockroach, ant, termite, rodent, and mosquito elimination using WHO-approved non-toxic treatments safe for children.', warrantyInfo: '3-Month Guarantee', activeTechCount: 5 },
  { _id: 's6', name: 'Home Carpentry', category: 'MAINTENANCE', basePrice: 600, description: 'Furniture assembly, door hinge repairs, cabinet installations, false ceiling work, and custom wooden fixture fitting.', warrantyInfo: '14-Day Guarantee', activeTechCount: 6 },
  { _id: 's7', name: 'Wall Painting & Waterproofing', category: 'MAINTENANCE', basePrice: 1200, description: 'Premium interior/exterior wall painting, roof waterproofing, anti-mold treatment, and damp wall plastering.', warrantyInfo: '1-Year Guarantee', activeTechCount: 8 },
  { _id: 's8', name: 'Generator & IPS Maintenance', category: 'APPLIANCES', basePrice: 700, description: 'Generator tune-up, IPS battery replacement, AVR servicing, and emergency power backup installation for homes.', warrantyInfo: '30-Day Guarantee', activeTechCount: 4 },
];

export default function ServicesPage() {
  const [services, setServices] = useState(DEMO_SERVICES);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.get('/services');
        if (res.data.success && res.data.data?.length > 0) {
          setServices(res.data.data);
        }
      } catch (err) {
        console.warn('Using default demo services data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const categories = ['ALL', 'APPLIANCES', 'PLUMBING', 'MAINTENANCE', 'LOGISTICS', 'AUTOMOTIVE'];

  const serviceImages = {
    'AC & Appliance Repair': 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
    'Plumbing & Water Lines': 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=800&q=80',
    'Electrical & Wiring': 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    'Deep Cleaning': 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
    'Pest Control Protocol': 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
    'Home Carpentry': 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80',
    'Wall Painting & Waterproofing': 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80',
    'Generator & IPS Maintenance': 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80',
  };

  const filtered = services.filter((s) => {
    const matchCategory = selectedCategory === 'ALL' || (s.category || '').toUpperCase() === selectedCategory;
    const matchSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#0A0D12] text-white flex flex-col font-sans selection:bg-[#F5A623] selection:text-[#0A0D12]">
      <Navbar />

      {/* Signature Amber Gold Sub-Bar */}
      <div className="bg-[#F5A623] text-[#0A0D12] py-2.5 px-4 font-heading font-black text-xs uppercase tracking-widest text-center">
        ⚡ 15-Minute Guaranteed Dispatch in Dhanmondi, Gulshan, Banani, Mirpur &amp; Uttara • Call 16800
      </div>

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* Header (HomeServiceWebDesign Style) */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0B4F6C]/60 border border-[#0B4F6C] text-[#F5A623] text-xs font-heading font-black tracking-widest uppercase mb-4">
            Dhaka Master Technicians
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
            DHAKA <span className="text-[#F5A623] italic font-serif lowercase text-4xl sm:text-6xl">home services</span> CATALOG
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mt-3 max-w-2xl mx-auto">
            Book pre-screened master specialists with transparent fixed rates and 30-day workmanship warranties.
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="relative flex-grow">
            <span className="material-symbols-outlined absolute left-4 top-3.5 text-[20px] text-slate-400">
              search
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search services (e.g. AC Repair, Plumbing, Electrician, Cleaning)..."
              className="w-full bg-[#121720] border border-slate-700 rounded-xl pl-11 pr-4 py-3.5 text-white text-sm focus:border-[#F5A623] focus:outline-none transition-all placeholder:text-slate-400"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-3 rounded-xl text-xs font-heading font-black uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#F5A623] text-[#0A0D12] shadow-gold-sm'
                    : 'bg-[#121720] hover:bg-[#1a212e] border border-slate-700 text-slate-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid (Dark Teal Banner Cards with Amber Action Buttons) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((service) => {
            const imgUrl =
              serviceImages[service.name] ||
              'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=800&q=80';

            return (
              <div
                key={service._id || service.slug}
                className="rounded-xl overflow-hidden border border-slate-800 bg-[#0E1520] flex flex-col justify-between shadow-xl group hover:border-[#F5A623] transition-all duration-300"
              >
                <div>
                  {/* Photo Header */}
                  <div className="relative h-48 overflow-hidden bg-slate-900">
                    <img
                      src={imgUrl}
                      alt={service.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0E1520] via-transparent to-transparent" />
                    <div className="absolute top-3 right-3 bg-[#0A0D12]/90 border border-slate-700 text-[#F5A623] text-[11px] font-heading font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                      <span>{service.activeTechCount || 12} Techs Online</span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-heading font-bold text-[#F5A623] uppercase tracking-widest bg-[#F5A623]/10 px-2 py-0.5 rounded border border-[#F5A623]/20">
                        {service.category || 'HOME CARE'}
                      </span>
                    </div>

                    <h3 className="font-heading font-black text-xl text-white uppercase tracking-wide group-hover:text-[#F5A623] transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed font-normal">
                      {service.description}
                    </p>

                    <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                      <span>Warranty:</span>
                      <span className="text-emerald-400 font-bold">{service.warrantyInfo || '30-Day Guarantee'}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Dark Teal Banner with Price & Amber Button */}
                <div className="bg-[#0B4F6C] p-4 sm:p-5 flex items-center justify-between border-t border-[#0B4F6C]">
                  <div>
                    <span className="text-[10px] text-slate-300 font-bold uppercase tracking-wider block">
                      Starts From
                    </span>
                    <p className="font-heading font-black text-2xl text-[#F5A623] leading-none">
                      ৳{service.basePrice}+
                    </p>
                  </div>

                  <button
                    onClick={() => navigate(`/request?service=${encodeURIComponent(service.name)}`)}
                    className="px-5 py-2.5 rounded-lg bg-[#F5A623] hover:bg-[#E09415] text-[#0A0D12] font-heading font-black text-xs uppercase tracking-wider shadow-gold-sm hover:scale-105 active:scale-98 transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <span>Book Service</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
