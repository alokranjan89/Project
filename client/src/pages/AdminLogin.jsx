import React, { useState } from "react";
import toast from "react-hot-toast";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAdmin } from "../context/useAdmin";

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
        <div className="w-8 h-8 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mr-3"></div>
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
        <p className="text-sm font-medium text-pink-600">Admin Access</p>
        <h1 className="mt-2 text-3xl font-bold text-gray-900">
          Sign in to manage products
        </h1>
        <p className="mt-3 text-sm text-gray-500">
          Use an admin account from your backend. Default seed:{" "}
          {adminCredentialsHint.email}
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-pink-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-pink-500"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-pink-600 text-white py-3 rounded-xl hover:bg-pink-700 transition disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Signing In..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
