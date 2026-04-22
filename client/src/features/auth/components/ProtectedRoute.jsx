import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ requiredRole }) => {
  const location = useLocation();
  const { isAuthenticated, isAuthReady, user } = useAuth();

  // ✅ Better loader UI
  if (!isAuthReady) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <div className="w-10 h-10 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500 text-sm">Checking session...</p>
      </div>
    );
  }

  // ❌ Not logged in
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname + location.search }}
      />
    );
  }

  // 🔒 Role-based protection (optional)
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;