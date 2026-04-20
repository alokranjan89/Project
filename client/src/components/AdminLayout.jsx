import React from "react";
import { Link, NavLink, Outlet, useNavigate, Navigate } from "react-router-dom";
import { LayoutDashboard, Package, PlusSquare, LogOut } from "lucide-react";
import { useAdmin } from "../context/useAdmin";

const linkClassName = ({ isActive }) =>
  `flex items-center gap-2 px-4 py-3 rounded-xl transition ${
    isActive
      ? "bg-pink-600 text-white shadow-sm border-l-4 border-pink-800"
      : "text-gray-700 hover:bg-pink-50 hover:text-pink-600"
  }`;

const AdminLayout = () => {
  const navigate = useNavigate();
  const { adminUser, logout } = useAdmin();

  // 🔐 Protect route
  if (!adminUser) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          
          <aside className="lg:w-72 w-full bg-white rounded-3xl shadow-sm border border-gray-100 p-5 h-fit">
            
            <Link
              to="/admin"
              className="text-2xl font-bold text-pink-600 tracking-tight"
            >
              Admin Panel
            </Link>

            <div className="mt-6 rounded-2xl bg-gray-50 px-4 py-3">
              <p className="text-sm text-gray-500">Signed in as</p>
              <p className="font-semibold text-gray-900">
                {adminUser?.name || "Admin"}
              </p>
              <p className="text-sm text-gray-500">
                {adminUser?.email || "admin@example.com"}
              </p>
            </div>

            <nav className="mt-6 flex flex-col gap-2">
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

            <div className="mt-6">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </aside>

          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;