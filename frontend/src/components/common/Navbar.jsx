import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';

export default function Navbar({ onOpenSosModal }) {
  const { user, logout, quickDemoLogin, isAuthenticated } = useAuth();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const navigate = useNavigate();

  const [selectedZone, setSelectedZone] = useState('Dhanmondi');
  const [showZoneDropdown, setShowZoneDropdown] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const zones = ['Dhanmondi', 'Gulshan', 'Banani', 'Mirpur', 'Uttara', 'Mohammadpur'];

  return (
    <header className="bg-[#0A0D12] text-white sticky top-0 z-50 border-b border-slate-800 shadow-lg transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-18 w-full">
        {/* Left: Brand Logo + Dhaka Area Selector */}
        <div className="flex items-center gap-4 lg:gap-6">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-[#F5A623] flex items-center justify-center text-[#0A0D12] shadow-gold-sm group-hover:scale-105 transition-transform font-black">
              <span className="material-symbols-outlined text-[24px]">home_repair_service</span>
            </div>
            <div>
              <span className="font-heading text-2xl font-black tracking-tight text-white block leading-tight">
                HOME<span className="text-[#F5A623]">EASE</span>
              </span>
              <span className="text-[10px] text-slate-400 font-bold tracking-widest uppercase block -mt-1">
                Dhaka Home Services
              </span>
            </div>
          </Link>

          {/* Dhaka Area Selector */}
          <div className="relative hidden md:block">
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

        {/* Center Navigation Links */}
        <nav className="hidden md:flex items-center gap-7">
          <Link
            to="/"
            className="text-slate-200 hover:text-[#F5A623] font-bold text-xs uppercase tracking-wider transition-colors"
          >
            Home
          </Link>
          <Link
            to="/services"
            className="text-slate-200 hover:text-[#F5A623] font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1"
          >
            Services
          </Link>
          <Link
            to="/smart-match"
            className="text-slate-200 hover:text-[#F5A623] font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1"
          >
            Smart Match
          </Link>
          <Link
            to="/care-pass"
            className="text-[#F5A623] hover:text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1"
          >
            ★ Care Pass
          </Link>
          {isAuthenticated && user?.role === 'customer' && (
            <Link
              to="/customer-dashboard"
              className="text-[#F5A623] font-bold text-xs uppercase tracking-wider flex items-center gap-1"
            >
              My Bookings
            </Link>
          )}
          {isAuthenticated && user?.role === 'provider' && (
            <Link
              to="/provider-dashboard"
              className="text-[#F5A623] font-bold text-xs uppercase tracking-wider flex items-center gap-1"
            >
              Tech Portal
            </Link>
          )}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Emergency SOS Button */}
          <button
            onClick={() => (onOpenSosModal ? onOpenSosModal() : navigate('/request?urgency=emergency'))}
            className="px-3.5 py-1.5 rounded-full gradient-rose text-white text-xs font-bold flex items-center gap-1.5 shadow-md hover:opacity-90 transition-all cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
            <span>SOS 16800</span>
          </button>

          {/* User / Demo Login */}
          <div className="relative pl-1">
            {isAuthenticated ? (
              <div>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="w-9 h-9 rounded-lg overflow-hidden ring-2 ring-[#F5A623] cursor-pointer"
                >
                  <img
                    src={user?.profileImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                    alt={user?.name}
                    className="w-full h-full object-cover"
                  />
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white text-slate-900 border border-slate-200 rounded-2xl shadow-xl py-2 z-50 animate-fadeIn">
                    <div className="px-4 py-2.5 border-b border-slate-100">
                      <p className="text-sm font-bold text-slate-900">{user?.name}</p>
                      <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                    </div>

                    <Link
                      to={user?.role === 'provider' ? '/provider-dashboard' : '/customer-dashboard'}
                      onClick={() => setShowUserMenu(false)}
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 font-medium"
                    >
                      <span className="material-symbols-outlined text-[18px] text-[#0E4B6E]">dashboard</span>
                      Dashboard
                    </Link>

                    <div className="border-t border-slate-100 mt-1 pt-1">
                      <button
                        onClick={() => {
                          logout();
                          setShowUserMenu(false);
                          navigate('/');
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 cursor-pointer font-bold"
                      >
                        <span className="material-symbols-outlined text-[18px]">logout</span>
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => quickDemoLogin('customer')}
                className="hidden sm:inline-flex px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-colors cursor-pointer"
              >
                Demo
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
