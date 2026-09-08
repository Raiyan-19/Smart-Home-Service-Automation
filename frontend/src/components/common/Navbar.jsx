import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';

export default function Navbar({ onOpenSosModal }) {
  const { user, logout, isAuthenticated } = useAuth();
  const { notifications, unreadCount } = useNotifications();
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedZone, setSelectedZone] = useState('Dhanmondi');
  const [showZoneDropdown, setShowZoneDropdown] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const zones = ['Dhanmondi', 'Gulshan', 'Banani', 'Mirpur', 'Uttara', 'Mohammadpur'];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-[#0A0D12] text-white sticky top-0 z-50 border-b border-slate-800 shadow-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20 w-full">
        {/* Left: Brand Logo + Dhaka Area Selector */}
        <div className="flex items-center gap-3 lg:gap-6">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F5A623] to-[#D98207] flex items-center justify-center text-[#0A0D12] shadow-gold-sm group-hover:scale-105 transition-transform font-black">
              <span className="material-symbols-outlined text-[24px]">home_repair_service</span>
            </div>
            <div>
              <span className="font-heading text-xl sm:text-2xl font-black tracking-tight text-white block leading-tight">
                HOME<span className="text-[#F5A623]">EASE</span>
              </span>
              <span className="text-[10px] text-slate-400 font-bold tracking-widest uppercase block -mt-0.5">
                Dhaka Service Hub
              </span>
            </div>
          </Link>

          {/* Dhaka Area Selector */}
          <div className="relative hidden lg:block">
            <button
              onClick={() => setShowZoneDropdown(!showZoneDropdown)}
              className="flex items-center gap-2 bg-slate-900/90 hover:bg-slate-800 px-3.5 py-1.5 rounded-full border border-slate-700 text-left transition-all text-slate-200 cursor-pointer text-xs font-semibold"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="material-symbols-outlined text-[15px] text-[#F5A623]">location_on</span>
              <span>{selectedZone}, Dhaka</span>
              <span className="material-symbols-outlined text-[15px] text-slate-400">expand_more</span>
            </button>

            {showZoneDropdown && (
              <div className="absolute left-0 mt-2 w-52 bg-white text-slate-900 border border-slate-200 rounded-2xl shadow-xl py-2 z-50 animate-fadeIn">
                <p className="px-3.5 py-1.5 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                  SELECT DHAKA AREA
                </p>
                {zones.map((zone) => (
                  <button
                    key={zone}
                    onClick={() => {
                      setSelectedZone(zone);
                      setShowZoneDropdown(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between transition-colors ${
                      selectedZone === zone
                        ? 'text-[#0E4B6E] font-extrabold bg-blue-50'
                        : 'text-slate-700 hover:bg-slate-50 font-medium'
                    }`}
                  >
                    <span>{zone}</span>
                    {selectedZone === zone && (
                      <span className="material-symbols-outlined text-[14px] text-[#F5A623]">check</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Center Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-7">
          <Link
            to="/"
            className={`font-bold text-xs uppercase tracking-wider transition-colors ${
              isActive('/') ? 'text-[#F5A623]' : 'text-slate-200 hover:text-[#F5A623]'
            }`}
          >
            Home
          </Link>
          <Link
            to="/services"
            className={`font-bold text-xs uppercase tracking-wider transition-colors ${
              isActive('/services') ? 'text-[#F5A623]' : 'text-slate-200 hover:text-[#F5A623]'
            }`}
          >
            Services
          </Link>
          <Link
            to="/smart-match"
            className={`font-bold text-xs uppercase tracking-wider transition-colors ${
              isActive('/smart-match') ? 'text-[#F5A623]' : 'text-slate-200 hover:text-[#F5A623]'
            }`}
          >
            Smart Match
          </Link>
          <Link
            to="/care-pass"
            className={`font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1 ${
              isActive('/care-pass') ? 'text-[#F5A623]' : 'text-[#F5A623] hover:text-white'
            }`}
          >
            ★ Care Pass
          </Link>
          {isAuthenticated && user?.role === 'customer' && (
            <Link
              to="/customer-dashboard"
              className={`font-bold text-xs uppercase tracking-wider flex items-center gap-1 ${
                isActive('/customer-dashboard') ? 'text-[#F5A623]' : 'text-slate-200 hover:text-[#F5A623]'
              }`}
            >
              My Bookings
            </Link>
          )}
          {isAuthenticated && user?.role === 'provider' && (
            <Link
              to="/provider-dashboard"
              className={`font-bold text-xs uppercase tracking-wider flex items-center gap-1 ${
                isActive('/provider-dashboard') ? 'text-[#F5A623]' : 'text-slate-200 hover:text-[#F5A623]'
              }`}
            >
              Tech Portal
            </Link>
          )}
        </nav>

        {/* Right Actions: Auth, SOS, Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Emergency SOS Button */}
          <button
            onClick={() => (onOpenSosModal ? onOpenSosModal() : navigate('/request?urgency=emergency'))}
            className="px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-full bg-gradient-to-r from-red-600 to-rose-600 text-white text-xs font-extrabold flex items-center gap-1.5 shadow-md hover:brightness-110 transition-all cursor-pointer"
            title="Emergency Hotline"
          >
            <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
            <span>SOS 16800</span>
          </button>

          {/* When User IS Authenticated */}
          {isAuthenticated ? (
            <div className="relative flex items-center gap-2">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 px-2 py-1 rounded-xl bg-slate-900 border border-slate-700 hover:border-[#F5A623] transition-all cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg overflow-hidden ring-2 ring-[#F5A623]">
                  <img
                    src={user?.profileImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                    alt={user?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-left hidden xl:block pr-1">
                  <p className="text-xs font-bold text-white leading-tight">{user?.name?.split(' ')[0]}</p>
                  <p className="text-[10px] text-[#F5A623] capitalize leading-none font-semibold">{user?.role}</p>
                </div>
                <span className="material-symbols-outlined text-[16px] text-slate-400 hidden sm:block">expand_more</span>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 top-12 mt-2 w-56 bg-[#0E1520] text-white border border-slate-700 rounded-2xl shadow-2xl py-2 z-50 animate-fadeIn">
                  <div className="px-4 py-2.5 border-b border-slate-800">
                    <p className="text-sm font-bold text-white truncate">{user?.name}</p>
                    <p className="text-xs text-slate-400 truncate">{user?.email}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-[#F5A623]/20 text-[#F5A623] border border-[#F5A623]/30">
                      {user?.role === 'provider' ? 'Certified Technician' : 'Verified Resident'}
                    </span>
                  </div>

                  <Link
                    to={user?.role === 'provider' ? '/provider-dashboard' : '/customer-dashboard'}
                    onClick={() => setShowUserMenu(false)}
                    className="w-full text-left px-4 py-2 text-xs text-slate-200 hover:bg-slate-800/80 flex items-center gap-2 font-medium"
                  >
                    <span className="material-symbols-outlined text-[18px] text-[#F5A623]">dashboard</span>
                    Dashboard
                  </Link>

                  <Link
                    to="/profile"
                    onClick={() => setShowUserMenu(false)}
                    className="w-full text-left px-4 py-2 text-xs text-slate-200 hover:bg-slate-800/80 flex items-center gap-2 font-medium"
                  >
                    <span className="material-symbols-outlined text-[18px] text-blue-400">person</span>
                    Edit Profile
                  </Link>

                  <div className="border-t border-slate-800 mt-1 pt-1">
                    <button
                      onClick={() => {
                        logout();
                        setShowUserMenu(false);
                        navigate('/');
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-rose-400 hover:bg-rose-950/40 flex items-center gap-2 cursor-pointer font-bold"
                    >
                      <span className="material-symbols-outlined text-[18px]">logout</span>
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* When User is NOT Authenticated: Show Log In & Register */
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-3.5 py-1.5 rounded-full text-slate-200 hover:text-white hover:bg-slate-800/90 text-xs font-bold transition-all flex items-center gap-1 border border-slate-700/80 hover:border-slate-500"
              >
                <span className="material-symbols-outlined text-[16px] text-[#F5A623]">login</span>
                <span>Log In</span>
              </Link>

              <Link
                to="/register"
                className="px-4 py-1.5 rounded-full bg-gradient-to-r from-[#F5A623] to-[#E09415] hover:brightness-110 text-slate-950 text-xs font-black transition-all flex items-center gap-1 shadow-gold-sm"
              >
                <span className="material-symbols-outlined text-[16px]">person_add</span>
                <span>Register</span>
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Slide-down Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-[#0A0D12]/98 backdrop-blur-xl px-4 pt-3 pb-6 space-y-4 animate-fadeIn">
          {/* Mobile Nav Links */}
          <div className="flex flex-col space-y-2">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-2 rounded-xl text-sm font-bold transition-colors flex items-center gap-2.5 ${
                isActive('/') ? 'bg-[#F5A623]/15 text-[#F5A623]' : 'text-slate-200 hover:bg-slate-900'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">home</span>
              Home
            </Link>
            <Link
              to="/services"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-2 rounded-xl text-sm font-bold transition-colors flex items-center gap-2.5 ${
                isActive('/services') ? 'bg-[#F5A623]/15 text-[#F5A623]' : 'text-slate-200 hover:bg-slate-900'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">construction</span>
              Services
            </Link>
            <Link
              to="/smart-match"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-2 rounded-xl text-sm font-bold transition-colors flex items-center gap-2.5 ${
                isActive('/smart-match') ? 'bg-[#F5A623]/15 text-[#F5A623]' : 'text-slate-200 hover:bg-slate-900'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">psychology</span>
              Smart Match Dispatch
            </Link>
            <Link
              to="/care-pass"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-2 rounded-xl text-sm font-bold transition-colors flex items-center gap-2.5 ${
                isActive('/care-pass') ? 'bg-[#F5A623]/15 text-[#F5A623]' : 'text-[#F5A623] hover:bg-slate-900'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">star</span>
              Care Pass Unlimited
            </Link>
          </div>

          {/* Area Selector in Mobile */}
          <div className="pt-2 border-t border-slate-800">
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">
              Dhaka Service Area:
            </p>
            <div className="grid grid-cols-3 gap-1.5">
              {zones.map((zone) => (
                <button
                  key={zone}
                  onClick={() => setSelectedZone(zone)}
                  className={`px-2 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedZone === zone
                      ? 'bg-[#F5A623] text-slate-950 font-bold'
                      : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  {zone}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Auth Actions */}
          <div className="pt-3 border-t border-slate-800 space-y-2">
            {isAuthenticated ? (
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <img
                    src={user?.profileImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                    alt={user?.name}
                    className="w-10 h-10 rounded-lg object-cover ring-2 ring-[#F5A623]"
                  />
                  <div>
                    <p className="text-sm font-bold text-white">{user?.name}</p>
                    <p className="text-xs text-slate-400">{user?.email}</p>
                  </div>
                </div>

                <Link
                  to={user?.role === 'provider' ? '/provider-dashboard' : '/customer-dashboard'}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 text-slate-200 hover:text-white text-xs font-bold flex items-center justify-center gap-2 border border-slate-800"
                >
                  <span className="material-symbols-outlined text-[18px] text-[#F5A623]">dashboard</span>
                  Open Dashboard
                </Link>

                <Link
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 text-slate-200 hover:text-white text-xs font-bold flex items-center justify-center gap-2 border border-slate-800"
                >
                  <span className="material-symbols-outlined text-[18px] text-blue-400">person</span>
                  Edit Profile
                </Link>

                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                    navigate('/');
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-rose-950/30 border border-rose-900/50 text-rose-300 text-xs font-bold flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">logout</span>
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 px-4 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-slate-800"
                >
                  <span className="material-symbols-outlined text-[18px] text-[#F5A623]">login</span>
                  Log In
                </Link>

                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#F5A623] to-[#E09415] text-slate-950 text-xs font-black flex items-center justify-center gap-1.5 shadow-gold-sm"
                >
                  <span className="material-symbols-outlined text-[18px]">person_add</span>
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
