import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ServicesPage from './pages/ServicesPage';
import RequestServicePage from './pages/RequestServicePage';
import SmartMatchPage from './pages/SmartMatchPage';
import BookingConfirmationPage from './pages/BookingConfirmationPage';
import ServiceTrackingPage from './pages/ServiceTrackingPage';
import CustomerDashboard from './pages/CustomerDashboard';
import ProviderDashboard from './pages/ProviderDashboard';
import ProfilePage from './pages/ProfilePage';
import UnlimitedMonthlyPage from './pages/UnlimitedMonthlyPage';
import ProtectedRoute from './components/common/ProtectedRoute';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/request" element={<RequestServicePage />} />
      <Route path="/smart-match" element={<SmartMatchPage />} />
      <Route path="/confirmation" element={<BookingConfirmationPage />} />
      <Route path="/tracking/:id" element={<ServiceTrackingPage />} />
      <Route path="/unlimited-monthly-web-changes" element={<UnlimitedMonthlyPage />} />
      <Route path="/care-pass" element={<UnlimitedMonthlyPage />} />
      <Route path="/monthly-care" element={<UnlimitedMonthlyPage />} />

      {/* Protected Routes */}
      <Route
        path="/customer-dashboard"
        element={
          <ProtectedRoute role="customer">
            <CustomerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/provider-dashboard"
        element={
          <ProtectedRoute role="provider">
            <ProviderDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
