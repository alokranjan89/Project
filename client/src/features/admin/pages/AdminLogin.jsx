import React, { useState } from "react";
import toast from "react-hot-toast";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, LockKeyhole, ShieldCheck, Sparkles } from "lucide-react";

import { useAdmin } from "../hooks/useAdmin";

const AdminLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAdminAuthenticated, isAuthReady, adminCredentialsHint } =
    useAdmin();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  if (!isAuthReady) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center text-gray-500">
        <div className="mr-3 h-8 w-8 animate-spin rounded-full border-4 border-pink-500 border-t-transparent" />
        Checking admin session...
      </div>
    );
  }

  if (isAdminAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setIsSubmitting(true);

      const result = await login(form);

      if (!result?.ok) {
        toast.error(result?.message || "Login failed");
        return;
      }

      toast.success("Admin signed in");
      navigate(location.state?.from || "/admin", { replace: true });
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#e0e7ff_0%,#f8fafc_38%,#ffe4f1_100%)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-[2rem] border border-white/70 bg-white/85 shadow-[0_30px_90px_rgba(15,23,42,0.12)] backdrop-blur md:grid-cols-[1.02fr_0.98fr]">
          <div className="relative hidden min-h-full overflow-hidden bg-slate-900 p-8 text-white md:flex md:flex-col md:justify-between lg:p-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(236,72,153,0.45),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.35),transparent_32%),linear-gradient(135deg,#020617_0%,#0f172a_45%,#1e293b_100%)]" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white/85 backdrop-blur-sm">
                <ShieldCheck size={16} />
                Admin workspace
              </div>

              <h1 className="mt-8 max-w-sm text-4xl font-semibold leading-tight">
                Run your storefront from a calmer, sharper control panel.
              </h1>
              <p className="mt-4 max-w-md text-sm leading-6 text-white/72">
                Review inventory, edit catalog details, and keep the shopping
                experience polished without jumping between cluttered screens.
              </p>
            </div>

            <div className="relative z-10 grid gap-4">
              <div className="rounded-[1.5rem] border border-white/12 bg-white/10 p-4 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <Sparkles size={18} className="text-pink-200" />
                  <div>
                    <p className="font-medium">Modern dashboard workflow</p>
                    <p className="mt-1 text-sm text-white/65">
                      Product edits, stock checks, and quick actions in one place.
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-[1.5rem] border border-white/12 bg-white/10 p-4 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <LockKeyhole size={18} className="text-pink-200" />
                  <div>
                    <p className="font-medium">Secure admin-only access</p>
                    <p className="mt-1 text-sm text-white/65">
                      Sign in with your backend-seeded admin credentials.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 lg:px-10 lg:py-12">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-pink-600">
              Admin Access
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Sign in to manage the store
            </h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
              Use the admin account seeded by your backend. Default email:{" "}
              <span className="font-medium text-slate-700">
                {adminCredentialsHint.email}
              </span>
            </p>

            <div className="mt-6 rounded-[1.5rem] border border-pink-100 bg-pink-50 px-4 py-3 text-sm text-slate-600">
              If admin access was just enabled, restart the backend once so the
              default admin account is created or promoted properly.
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="admin@mystore.com"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 outline-none transition focus:border-pink-500 focus:bg-white focus:ring-4 focus:ring-pink-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter admin password"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 outline-none transition focus:border-pink-500 focus:bg-white focus:ring-4 focus:ring-pink-100"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 py-3.5 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Signing In..." : "Enter Admin Studio"}
                {!isSubmitting && <ArrowRight size={16} />}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
