import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, quickDemoLogin } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await login(email, password);
      if (data.user.role === 'provider') {
        navigate('/provider-dashboard');
      } else {
        navigate(redirect);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (role) => {
    setError('');
    setLoading(true);
    try {
      const data = await quickDemoLogin(role);
      if (role === 'provider') {
        navigate('/provider-dashboard');
      } else {
        navigate(redirect);
      }
    } catch (err) {
      setError('Failed demo login. Please make sure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0D12] text-white flex flex-col font-sans selection:bg-[#F5A623] selection:text-[#0A0D12]">
      <Navbar />

      <main className="flex-grow flex items-center justify-center p-4 py-16 relative">
        <div className="max-w-md w-full bg-[#0E1520] border-2 border-slate-800 rounded-2xl p-8 sm:p-10 shadow-2xl">
          <div className="text-center mb-6">
            <div className="w-12 h-12 mx-auto rounded-xl bg-[#F5A623] flex items-center justify-center text-[#0A0D12] shadow-gold-sm mb-3">
              <span className="material-symbols-outlined text-[24px] font-black">lock</span>
            </div>
            <h2 className="font-heading font-black text-2xl uppercase tracking-tight text-white">
              SIGN IN TO <span className="text-[#F5A623]">HOMEEASE</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Dhaka's #1 Smart Home Service Automation Platform
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3.5 rounded-xl bg-red-950/70 border border-red-800 text-red-300 text-xs font-medium flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-red-400">error</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-heading font-black text-[#F5A623] uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="customer@homeease.com"
                className="w-full bg-[#0A0D12] border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:border-[#F5A623] focus:outline-none transition-all placeholder:text-slate-500"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-heading font-black text-[#F5A623] uppercase tracking-wider">
                  Password
                </label>
                <span className="text-xs text-slate-400 hover:text-white cursor-pointer">
                  Forgot?
                </span>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#0A0D12] border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:border-[#F5A623] focus:outline-none transition-all placeholder:text-slate-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-[#F5A623] hover:bg-[#E09415] text-[#0A0D12] font-heading font-black text-xs sm:text-sm uppercase tracking-wider shadow-gold-sm hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer mt-3"
            >
              <span className="material-symbols-outlined text-[18px]">lock_open</span>
              <span>{loading ? 'Signing in...' : 'Sign In'}</span>
            </button>
          </form>

          {/* Quick 1-Click Demo Accounts */}
          <div className="mt-6 pt-5 border-t border-slate-800 text-center">
            <p className="text-[11px] text-slate-400 font-heading font-bold uppercase tracking-wider mb-3">
              ⚡ Instant 1-Click Demo Access
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleDemoLogin('customer')}
                className="px-3 py-2.5 rounded-xl bg-[#0A0D12] hover:bg-slate-900 border border-slate-700 text-[#F5A623] text-xs font-heading font-bold uppercase flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">person</span>
                Customer
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('provider')}
                className="px-3 py-2.5 rounded-xl bg-[#0B4F6C] hover:bg-[#0E4B6E] border border-[#0B4F6C] text-white text-xs font-heading font-bold uppercase flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">engineering</span>
                Technician
              </button>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-slate-400">
            Don't have an account yet?{' '}
            <Link to="/register" className="text-[#F5A623] font-bold hover:underline">
              Create Free Account
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
