import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useAdmin } from "../context/useAdmin";

const AdminProtectedRoute = () => {
  const location = useLocation();
  const { isAdminAuthenticated, isAuthReady } = useAdmin();

  if (!isAuthReady) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center text-gray-500">
        <div className="w-8 h-8 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mb-3"></div>
        Checking admin session...
      </div>
    );
  }

  if (!isAdminAuthenticated) {
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{ from: location }}
      />
    );
  }

  return <Outlet />;
};

export default AdminProtectedRoute;