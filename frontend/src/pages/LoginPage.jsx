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

  const { login } = useAuth();
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
        navigate(redirect === '/login' ? '/customer-dashboard' : redirect);
      }
    } catch (err) {
      setError(err.message || err.response?.data?.message || 'Invalid email or password.');
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
            <div className="mb-4 p-4 rounded-xl bg-red-950/80 border border-red-700 text-red-200 text-xs font-medium space-y-2 animate-fadeIn">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-red-400">error</span>
                <span>{error}</span>
              </div>
              {error.toLowerCase().includes('register') && (
                <div className="pt-1">
                  <Link
                    to="/register"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#F5A623] text-slate-950 font-black text-[11px] hover:brightness-110"
                  >
                    <span>Click here to Register Now</span>
                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </Link>
                </div>
              )}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-heading font-black text-[#F5A623] uppercase tracking-wider mb-1.5">
                Registered Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full bg-[#0A0D12] border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:border-[#F5A623] focus:outline-none transition-all placeholder:text-slate-600"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-heading font-black text-[#F5A623] uppercase tracking-wider">
                  Password
                </label>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#0A0D12] border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:border-[#F5A623] focus:outline-none transition-all placeholder:text-slate-600"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#F5A623] to-[#E09415] hover:brightness-110 text-slate-950 font-heading font-black text-xs sm:text-sm uppercase tracking-wider shadow-gold-sm transition-all flex items-center justify-center gap-2 cursor-pointer mt-3"
            >
              <span className="material-symbols-outlined text-[18px]">login</span>
              <span>{loading ? 'Verifying Account...' : 'Sign In'}</span>
            </button>
          </form>

          <div className="mt-8 pt-5 border-t border-slate-800 text-center">
            <p className="text-xs text-slate-400">
              Don't have an account yet?{' '}
              <Link to="/register" className="text-[#F5A623] font-bold hover:underline">
                Create Free Account
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
