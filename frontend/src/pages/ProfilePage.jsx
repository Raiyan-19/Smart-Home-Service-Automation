import React, { useState, useEffect } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
  const { user, updateProfile, logout } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '+880 17');
  const [location, setLocation] = useState(user?.location || user?.address || 'Dhanmondi');
  const [bio, setBio] = useState(user?.bio || '');
  const [profileImage, setProfileImage] = useState(user?.profileImage || '');
  const [selectedExpertise, setSelectedExpertise] = useState(
    user?.serviceExpertise || ['AC & Appliance Repair']
  );
  const [newPassword, setNewPassword] = useState('');

  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const dhakaZones = ['Dhanmondi', 'Gulshan', 'Banani', 'Mirpur', 'Uttara', 'Mohammadpur'];

  const allExpertise = [
    'AC & Appliance Repair',
    'Plumbing & Water Lines',
    'Electrical & Wiring',
    'Deep Cleaning',
    'Pest Control Protocol',
    'Home Carpentry',
    'Moving & Shifting',
    'Car Care & Detailing',
  ];

  // Preset avatar choices
  const avatarPresets = [
    {
      label: 'Specialist 1',
      url: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=400&q=80',
    },
    {
      label: 'Specialist 2',
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    },
    {
      label: 'Resident 1',
      url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    },
    {
      label: 'Resident 2',
      url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    },
    {
      label: 'Engineer',
      url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    },
    {
      label: 'Professional',
      url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    },
  ];

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setPhone(user.phone || '+880 17');
      setLocation(user.location || user.address || 'Dhanmondi');
      setBio(user.bio || '');
      setProfileImage(user.profileImage || '');
      if (user.serviceExpertise) {
        setSelectedExpertise(user.serviceExpertise);
      }
    }
  }, [user]);

  const toggleExpertise = (item) => {
    if (selectedExpertise.includes(item)) {
      if (selectedExpertise.length > 1) {
        setSelectedExpertise(selectedExpertise.filter((e) => e !== item));
      }
    } else {
      setSelectedExpertise([...selectedExpertise, item]);
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setSaving(true);

    try {
      const updateData = {
        name: name.trim(),
        phone: phone.trim(),
        location,
        address: `${location}, Dhaka`,
        bio: bio.trim(),
        profileImage,
        serviceExpertise: selectedExpertise,
      };

      if (newPassword.trim()) {
        if (newPassword.trim().length < 6) {
          throw new Error('New password must be at least 6 characters long.');
        }
        updateData.password = newPassword.trim();
      }

      await updateProfile(updateData);
      setSuccessMessage('Profile updated successfully! All changes are now live.');
      setNewPassword('');
      setTimeout(() => setSuccessMessage(''), 4000);
    } catch (err) {
      setErrorMessage(err.message || 'Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0D12] text-white flex flex-col font-sans selection:bg-[#F5A623] selection:text-[#0A0D12]">
      <Navbar />

      {/* Amber Sub-Header */}
      <div className="bg-[#F5A623] text-[#0A0D12] py-2 px-4 font-heading font-black text-xs uppercase tracking-widest text-center shadow-sm">
        ★ HomeEase Account Management • Dhaka 24/7 Hotline: 16800
      </div>

      <main className="flex-grow max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B4F6C] border border-[#0B4F6C] text-[#F5A623] text-[10px] font-heading font-black uppercase tracking-wider mb-2">
              {user?.role === 'provider' ? '★ Technician Profile' : '★ Customer Profile'}
            </div>
            <h1 className="font-heading font-black text-3xl sm:text-4xl uppercase tracking-tight text-white">
              EDIT <span className="text-[#F5A623]">PROFILE</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Manage your personal credentials, contact info, and Dhaka service settings.
            </p>
          </div>

          <button
            onClick={() => {
              if (user?.role === 'provider') {
                navigate('/provider-dashboard');
              } else {
                navigate('/customer-dashboard');
              }
            }}
            className="self-start sm:self-auto px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">dashboard</span>
            <span>Return to Dashboard</span>
          </button>
        </div>

        {/* Success / Error Alerts */}
        {successMessage && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-950/80 border border-emerald-700 text-emerald-300 text-sm font-bold flex items-center gap-2 animate-fadeIn">
            <span className="material-symbols-outlined text-emerald-400 text-[20px]">check_circle</span>
            <span>{successMessage}</span>
          </div>
        )}

        {errorMessage && (
          <div className="mb-6 p-4 rounded-xl bg-red-950/80 border border-red-700 text-red-300 text-sm font-bold flex items-center gap-2 animate-fadeIn">
            <span className="material-symbols-outlined text-red-400 text-[20px]">error</span>
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Profile Edit Form Container */}
        <form
          onSubmit={handleSaveProfile}
          className="bg-[#0E1520] border-2 border-slate-800 rounded-2xl p-6 sm:p-10 shadow-2xl space-y-8"
        >
          {/* Avatar Preview & Selection */}
          <div>
            <label className="block text-xs font-heading font-black text-[#F5A623] uppercase tracking-wider mb-3">
              PROFILE PHOTO / AVATAR
            </label>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative flex-shrink-0">
                <img
                  src={
                    profileImage ||
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
                  }
                  alt={name}
                  className="w-24 h-24 rounded-2xl object-cover ring-2 ring-[#F5A623] shadow-gold-sm"
                />
                <span className="w-4 h-4 rounded-full bg-emerald-400 border-2 border-[#0E1520] absolute -bottom-1 -right-1"></span>
              </div>

              <div className="w-full space-y-2">
                <p className="text-xs text-slate-400 font-medium">Choose a preset avatar:</p>
                <div className="flex flex-wrap gap-2.5">
                  {avatarPresets.map((av, idx) => (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => setProfileImage(av.url)}
                      className={`w-10 h-10 rounded-xl overflow-hidden border-2 transition-transform hover:scale-105 ${
                        profileImage === av.url
                          ? 'border-[#F5A623] ring-2 ring-[#F5A623]/50 scale-105'
                          : 'border-slate-700 opacity-70 hover:opacity-100'
                      }`}
                      title={av.label}
                    >
                      <img src={av.url} alt={av.label} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>

                <div className="pt-2">
                  <input
                    type="url"
                    value={profileImage}
                    onChange={(e) => setProfileImage(e.target.value)}
                    placeholder="Or enter custom image URL (https://...)"
                    className="w-full bg-[#0A0D12] border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:border-[#F5A623] focus:outline-none placeholder:text-slate-600"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4 border-t border-slate-800">
            <div>
              <label className="block text-xs font-heading font-black text-[#F5A623] uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Tanvir Ahmed"
                className="w-full bg-[#0A0D12] border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:border-[#F5A623] focus:outline-none transition-all placeholder:text-slate-600"
              />
            </div>

            <div>
              <label className="block text-xs font-heading font-black text-[#F5A623] uppercase tracking-wider mb-1.5">
                Email Address (Registered)
              </label>
              <input
                type="email"
                disabled
                value={user?.email || ''}
                className="w-full bg-[#0A0D12]/60 border border-slate-800 rounded-xl px-4 py-3 text-slate-400 text-sm cursor-not-allowed"
                title="Registered email cannot be changed"
              />
            </div>

            <div>
              <label className="block text-xs font-heading font-black text-[#F5A623] uppercase tracking-wider mb-1.5">
                Contact Phone
              </label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+880 1712-345678"
                className="w-full bg-[#0A0D12] border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:border-[#F5A623] focus:outline-none transition-all placeholder:text-slate-600"
              />
            </div>

            <div>
              <label className="block text-xs font-heading font-black text-[#F5A623] uppercase tracking-wider mb-1.5">
                Dhaka Service Area / Zone
              </label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-[#0A0D12] border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:border-[#F5A623] focus:outline-none transition-all cursor-pointer"
              >
                {dhakaZones.map((zone) => (
                  <option key={zone} value={zone} className="bg-[#0A0D12] text-white">
                    {zone}, Dhaka
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Bio / Description */}
          <div className="pt-2">
            <label className="block text-xs font-heading font-black text-[#F5A623] uppercase tracking-wider mb-1.5">
              About / Bio
            </label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Add a brief note about yourself or your home requirements..."
              className="w-full bg-[#0A0D12] border border-slate-700 rounded-xl p-3.5 text-white text-sm focus:border-[#F5A623] focus:outline-none transition-all placeholder:text-slate-600"
            />
          </div>

          {/* Service Expertise (Only visible for Technicians / Providers) */}
          {user?.role === 'provider' && (
            <div className="pt-4 border-t border-slate-800">
              <label className="block text-xs font-heading font-black text-[#F5A623] uppercase tracking-wider mb-2">
                TECHNICIAN SERVICE EXPERTISE
              </label>
              <p className="text-xs text-slate-400 mb-3">
                Select the service categories you are verified to deliver in Dhaka:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {allExpertise.map((item) => {
                  const isChecked = selectedExpertise.includes(item);
                  return (
                    <button
                      type="button"
                      key={item}
                      onClick={() => toggleExpertise(item)}
                      className={`px-3.5 py-2.5 rounded-xl border text-xs font-bold text-left flex items-center justify-between transition-all ${
                        isChecked
                          ? 'bg-[#0B4F6C] border-[#F5A623] text-white shadow-sm'
                          : 'bg-[#0A0D12] border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <span>{item}</span>
                      <span className="material-symbols-outlined text-[16px] text-[#F5A623]">
                        {isChecked ? 'check_box' : 'check_box_outline_blank'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Security / Password Change */}
          <div className="pt-4 border-t border-slate-800">
            <label className="block text-xs font-heading font-black text-[#F5A623] uppercase tracking-wider mb-1.5">
              Update Password (Optional)
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Leave blank to keep your current password"
              className="w-full sm:w-1/2 bg-[#0A0D12] border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:border-[#F5A623] focus:outline-none transition-all placeholder:text-slate-600"
            />
          </div>

          {/* Form Actions */}
          <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              type="submit"
              disabled={saving}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#F5A623] to-[#E09415] hover:brightness-110 text-slate-950 font-heading font-black text-xs uppercase tracking-wider shadow-gold-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">save</span>
              <span>{saving ? 'Saving Changes...' : 'Save Profile Changes'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                logout();
                navigate('/');
              }}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-red-950/50 hover:bg-red-900/60 text-red-300 hover:text-white border border-red-800/80 font-heading font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">logout</span>
              <span>Sign Out</span>
            </button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}
