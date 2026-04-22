import React from "react";
import { Link, NavLink, Navigate, Outlet, useNavigate } from "react-router-dom";
import {
  ArrowUpRight,
  LayoutDashboard,
  LogOut,
  Package,
  PlusSquare,
  ShieldCheck,
  Store,
} from "lucide-react";

import { useAdmin } from "../hooks/useAdmin";

const linkClassName = ({ isActive }) =>
  `group flex items-center gap-3 rounded-2xl px-4 py-3 transition ${
    isActive
      ? "bg-slate-900 text-white shadow-[0_18px_30px_rgba(15,23,42,0.18)]"
      : "text-slate-600 hover:bg-white/80 hover:text-slate-900"
  }`;

const AdminLayout = () => {
  const navigate = useNavigate();
  const { adminUser, logout } = useAdmin();

  if (!adminUser) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f5f7fb_0%,#eef2ff_48%,#f8fafc_100%)]">
      <div className="mx-auto max-w-7xl px-4 py-5 md:px-6 lg:px-8 lg:py-8">
        <div className="flex flex-col gap-6 lg:flex-row">
          <aside className="w-full lg:w-72 xl:w-80">
            <div className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/75 p-5 shadow-[0_24px_60px_rgba(15,23,42,0.08)] backdrop-blur lg:sticky lg:top-6">
              <div className="rounded-[1.75rem] bg-[linear-gradient(135deg,#0f172a_0%,#1e293b_45%,#ec4899_100%)] p-5 text-white">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-white/15 p-3 backdrop-blur-sm">
                      <ShieldCheck size={22} />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-white/70">
                        MyStore
                      </p>
                      <Link to="/admin" className="text-2xl font-semibold tracking-tight">
                        Admin Studio
                      </Link>
                    </div>
                  </div>
                  <Link
                    to="/"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-white/85 transition hover:bg-white/15"
                    title="Back to storefront"
                  >
                    <Store size={18} />
                  </Link>
                </div>

                <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                    Signed in as
                  </p>
                  <p className="mt-2 text-lg font-semibold">
                    {adminUser?.name || "Admin"}
                  </p>
                  <p className="mt-1 text-sm text-white/72">
                    {adminUser?.email || "admin@example.com"}
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-between rounded-[1.5rem] border border-white/10 bg-black/10 px-4 py-3 text-sm text-white/78">
                  <span>Operations status</span>
                  <span className="inline-flex items-center gap-2 font-medium text-emerald-200">
                    <span className="h-2 w-2 rounded-full bg-emerald-300" />
                    Live
                  </span>
                </div>
              </div>

              <nav className="mt-5 flex flex-col gap-2">
                <NavLink end to="/admin" className={linkClassName}>
                  <LayoutDashboard size={18} />
                  Dashboard
                </NavLink>

                <NavLink to="/admin/products" className={linkClassName}>
                  <Package size={18} />
                  Products
                </NavLink>

                <NavLink to="/admin/products/new" className={linkClassName}>
                  <PlusSquare size={18} />
                  Add Product
                </NavLink>
              </nav>

              <div className="mt-5 rounded-[1.75rem] border border-slate-200/70 bg-slate-50/80 p-4">
                <p className="text-sm font-medium text-slate-900">Quick focus</p>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Keep the catalog fresh, monitor low-stock items, and ship edits fast.
                </p>

                <div className="mt-4 flex gap-3">
                  <Link
                    to="/admin/products/new"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
                  >
                    New Product
                    <ArrowUpRight size={16} />
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                    aria-label="Logout"
                  >
                    <LogOut size={16} />
                  </button>
                </div>
              </div>
            </div>
          </aside>

          <main className="min-w-0 flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
