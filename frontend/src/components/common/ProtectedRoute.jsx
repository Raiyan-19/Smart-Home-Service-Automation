import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function ProtectedRoute({ children, role }) {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0D12] flex items-center justify-center">
        <div className="flex items-center gap-3 text-[#F5A623] font-heading font-black text-sm uppercase tracking-wider">
          <span className="material-symbols-outlined text-[22px] animate-spin">sync</span>
          <span>Verifying Session...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (role && user?.role !== role) {
    return <Navigate to={user?.role === 'provider' ? '/provider-dashboard' : '/customer-dashboard'} replace />;
  }

  return children;
}
