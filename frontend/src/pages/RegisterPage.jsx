import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

export default function RegisterPage() {
  const [role, setRole] = useState('customer');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('+880 17');
  const [location, setLocation] = useState('Dhanmondi');
  const [selectedExpertise, setSelectedExpertise] = useState(['AC & Appliance Repair']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const expertiseOptions = [
    'AC & Appliance Repair',
    'Plumbing & Water Lines',
    'Electrical & Wiring',
    'Deep Cleaning',
    'Pest Control Protocol',
    'Home Carpentry',
    'Moving & Shifting',
    'Car Care & Detailing',
  ];

  const toggleExpertise = (item) => {
    if (selectedExpertise.includes(item)) {
      if (selectedExpertise.length > 1) {
        setSelectedExpertise(selectedExpertise.filter((e) => e !== item));
      }
    } else {
      setSelectedExpertise([...selectedExpertise, item]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await register({
        name,
        email,
        password,
        role,
        phone,
        location,
        serviceExpertise: selectedExpertise,
      });

      if (data.user.role === 'provider') {
        navigate('/provider-dashboard');
      } else {
        navigate('/customer-dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to register. Please check your inputs.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0D12] text-white flex flex-col font-sans selection:bg-[#F5A623] selection:text-[#0A0D12]">
      <Navbar />

      <main className="flex-grow flex items-center justify-center p-4 py-16 relative">
        <div className="max-w-lg w-full bg-[#0E1520] border-2 border-slate-800 rounded-2xl p-8 sm:p-10 shadow-2xl">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0B4F6C] border border-[#0B4F6C] text-[#F5A623] text-[10px] font-heading font-black uppercase tracking-wider mb-2">
              Dhaka Home Automation
            </div>
            <h2 className="font-heading font-black text-2xl uppercase tracking-tight text-white">
              CREATE YOUR <span className="text-[#F5A623]">ACCOUNT</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Join HomeEase for instant, reliable home services across Dhaka
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3.5 rounded-xl bg-red-950/70 border border-red-800 text-red-300 text-xs font-medium flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-red-400">error</span>
              <span>{error}</span>
            </div>
          )}

          {/* Role Selection Tabs */}
          <div className="mb-6">
            <label className="block text-xs font-heading font-black text-[#F5A623] uppercase tracking-wider mb-2">
              I WANT TO SIGN UP AS A:
            </label>
            <div className="grid grid-cols-2 gap-2 p-1.5 rounded-xl bg-[#0A0D12] border border-slate-800">
              <button
                type="button"
                onClick={() => setRole('customer')}
                className={`py-2.5 rounded-lg font-heading text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  role === 'customer'
                    ? 'bg-[#F5A623] text-[#0A0D12] shadow-gold-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">person</span>
                Customer
              </button>
              <button
                type="button"
                onClick={() => setRole('provider')}
                className={`py-2.5 rounded-lg font-heading text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  role === 'provider'
                    ? 'bg-[#0B4F6C] text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">engineering</span>
                Technician
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-heading font-black text-slate-300 uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tanvir Ahmed"
                className="w-full bg-[#0A0D12] border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:border-[#F5A623] focus:outline-none transition-all placeholder:text-slate-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-heading font-black text-slate-300 uppercase tracking-wider mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@email.com"
                  className="w-full bg-[#0A0D12] border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:border-[#F5A623] focus:outline-none transition-all placeholder:text-slate-500"
                />
              </div>
              <div>
                <label className="block text-xs font-heading font-black text-slate-300 uppercase tracking-wider mb-1.5">
                  Phone
                </label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+880 1712-345678"
                  className="w-full bg-[#0A0D12] border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:border-[#F5A623] focus:outline-none transition-all placeholder:text-slate-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-heading font-black text-slate-300 uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full bg-[#0A0D12] border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:border-[#F5A623] focus:outline-none transition-all placeholder:text-slate-500"
                />
              </div>
              <div>
                <label className="block text-xs font-heading font-black text-slate-300 uppercase tracking-wider mb-1.5">
                  Dhaka Area
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-[#0A0D12] border border-slate-700 rounded-xl px-4 py-3 text-white text-sm font-semibold focus:border-[#F5A623] focus:outline-none transition-all cursor-pointer"
                >
                  <option value="Dhanmondi">Dhanmondi</option>
                  <option value="Gulshan">Gulshan</option>
                  <option value="Banani">Banani</option>
                  <option value="Mirpur">Mirpur</option>
                  <option value="Uttara">Uttara</option>
                  <option value="Mohammadpur">Mohammadpur</option>
                </select>
              </div>
            </div>

            {/* Provider-Specific Fields */}
            {role === 'provider' && (
              <div className="pt-3 border-t border-slate-800">
                <label className="block text-xs font-heading font-black text-[#F5A623] uppercase tracking-wider mb-2">
                  Select Your Skills &amp; Services
                </label>
                <div className="flex flex-wrap gap-2">
                  {expertiseOptions.map((exp) => {
                    const isSelected = selectedExpertise.includes(exp);
                    return (
                      <button
                        key={exp}
                        type="button"
                        onClick={() => toggleExpertise(exp)}
                        className={`px-3 py-1.5 rounded-full text-xs font-heading font-bold uppercase border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#F5A623] text-[#0A0D12] border-[#F5A623] shadow-gold-sm'
                            : 'bg-[#0A0D12] hover:bg-slate-900 border-slate-700 text-slate-300'
                        }`}
                      >
                        {isSelected && '✓ '}
                        {exp}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-[#F5A623] hover:bg-[#E09415] text-[#0A0D12] font-heading font-black text-xs sm:text-sm uppercase tracking-wider shadow-gold-sm hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
            >
              <span className="material-symbols-outlined text-[18px]">how_to_reg</span>
              <span>{loading ? 'Creating Account...' : `Register as ${role === 'provider' ? 'Technician' : 'Customer'}`}</span>
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="text-[#F5A623] font-bold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
