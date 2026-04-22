import React from "react";
import { Link, Navigate } from "react-router-dom";
import { Heart, ShoppingCart, ShieldCheck, UserRound } from "lucide-react";

import { useAuth } from "../hooks/useAuth";

const Profile = () => {
  const { user, logout, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 sm:py-12">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-sm font-medium text-pink-600">Account</p>
            <h1 className="mt-2 text-3xl font-bold text-gray-900">My Profile</h1>
            <p className="mt-3 max-w-2xl text-sm text-gray-500">
              Manage your account details and quickly jump back to your saved products
              and shopping cart.
            </p>
          </div>

          <div className="rounded-2xl bg-pink-50 border border-pink-100 px-5 py-4 min-w-[220px]">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-pink-600 shadow-sm">
                <UserRound size={20} />
              </span>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-pink-500">
                  Signed In
                </p>
                <p className="mt-1 text-base font-semibold text-gray-900">
                  {user?.name}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-[1.35fr_0.95fr]">
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="rounded-2xl bg-gray-50 px-5 py-5">
              <p className="text-sm text-gray-500">Name</p>
              <p className="mt-2 text-lg font-semibold text-gray-900 break-words">
                {user?.name}
              </p>
            </div>

            <div className="rounded-2xl bg-gray-50 px-5 py-5">
              <p className="text-sm text-gray-500">Email</p>
              <p className="mt-2 text-lg font-semibold text-gray-900 break-all">
                {user?.email}
              </p>
            </div>

            <div className="rounded-2xl bg-gray-50 px-5 py-5 sm:col-span-2">
              <p className="text-sm text-gray-500">Role</p>
              <div className="mt-2 flex items-center gap-2">
                <ShieldCheck size={18} className="text-pink-600" />
                <p className="text-lg font-semibold text-gray-900 capitalize">
                  {user?.role}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-gray-50/70 px-5 py-5">
            <p className="text-sm font-medium text-gray-900">Quick Actions</p>
            <p className="mt-2 text-sm text-gray-500">
              Continue shopping from where you left off.
            </p>

            <div className="mt-5 grid gap-3">
              <Link
                to="/wishlist"
                className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white px-4 py-3 text-gray-700 hover:bg-gray-50 transition"
              >
                <span className="flex items-center gap-3">
                  <Heart size={18} className="text-pink-600" />
                  My Wishlist
                </span>
                <span className="text-sm text-gray-400">Open</span>
              </Link>

              <Link
                to="/cart"
                className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white px-4 py-3 text-gray-700 hover:bg-gray-50 transition"
              >
                <span className="flex items-center gap-3">
                  <ShoppingCart size={18} className="text-pink-600" />
                  My Cart
                </span>
                <span className="text-sm text-gray-400">Open</span>
              </Link>

              {user?.role === "admin" && (
                <Link
                  to="/admin"
                  className="flex items-center justify-between rounded-2xl bg-pink-600 px-4 py-3 text-white hover:bg-pink-700 transition"
                >
                  <span className="flex items-center gap-3">
                    <ShieldCheck size={18} />
                    Admin Dashboard
                  </span>
                  <span className="text-sm text-pink-100">Open</span>
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-start">
          <button
            type="button"
            onClick={logout}
            className="px-5 py-3 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
