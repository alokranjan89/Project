import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { BadgeCheck, Gift, Sparkles } from "lucide-react";

import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const navigate = useNavigate();
  const { register, isAuthenticated } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  if (isAuthenticated) {
    return <Navigate to="/profile" replace />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
      toast.error("Please fill all fields");
      return;
    }

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsSubmitting(true);
    const result = await register({
      name: form.name,
      email: form.email,
      password: form.password,
    });
    setIsSubmitting(false);

    if (!result.ok) {
      toast.error(result.message);
      return;
    }

    toast.success("Account created successfully");
    navigate("/profile", { replace: true });
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#ffe4f1_0%,#f8fafc_38%,#eef2ff_100%)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-[2rem] border border-white/70 bg-white/90 shadow-[0_30px_80px_rgba(15,23,42,0.10)] backdrop-blur md:grid-cols-[0.98fr_1.02fr]">
          <div className="relative hidden min-h-full flex-col justify-between overflow-hidden bg-slate-900 p-8 text-white md:flex lg:p-10">
            <img
              src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80"
              alt="Modern shopping style"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950/80 via-pink-700/45 to-orange-400/30" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur">
                <Sparkles size={16} />
                Join the MyStore experience
              </div>

              <h2 className="mt-8 max-w-sm text-4xl font-bold leading-tight">
                Create your account and make every visit feel curated.
              </h2>
              <p className="mt-4 max-w-md text-sm leading-6 text-white/80">
                Save favorites, speed through checkout, and keep your personal
                shopping space ready whenever inspiration strikes.
              </p>
            </div>

            <div className="relative z-10 grid gap-4">
              <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <Gift size={18} className="text-pink-100" />
                  <p className="font-medium">Save products you want to revisit later</p>
                </div>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <BadgeCheck size={18} className="text-pink-100" />
                  <p className="font-medium">Access a cleaner and faster checkout flow</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 lg:px-10 lg:py-12">
            <p className="text-sm font-medium text-pink-600">Create Account</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
              Register to get started
            </h1>
            <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
              Create your account to save products, checkout faster, and manage
              your profile.
            </p>

            <div className="mt-6 rounded-2xl border border-pink-100 bg-pink-50 px-4 py-3 text-sm text-slate-600 md:hidden">
              Your wishlist, cart, and account details stay ready whenever you come
              back.
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 outline-none transition focus:border-pink-500 focus:bg-white focus:ring-4 focus:ring-pink-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 outline-none transition focus:border-pink-500 focus:bg-white focus:ring-4 focus:ring-pink-100"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Create password"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 outline-none transition focus:border-pink-500 focus:bg-white focus:ring-4 focus:ring-pink-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="Repeat password"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 outline-none transition focus:border-pink-500 focus:bg-white focus:ring-4 focus:ring-pink-100"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-2xl bg-pink-600 py-3.5 text-white shadow-lg shadow-pink-200 transition hover:bg-pink-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Creating Account..." : "Register"}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-slate-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-pink-600 hover:text-pink-700"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
