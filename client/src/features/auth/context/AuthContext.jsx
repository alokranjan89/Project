import { useEffect, useState } from "react";
import { apiRequest, authRequest } from "../../../shared/lib/api";
import { AuthContext } from "./authContextObject";

const AUTH_SESSION_KEY = "authSession";
const toUserSession = (payload) => {
  if (!payload?.token) {
    return null;
  }

  if (payload.user) {
    return {
      token: payload.token,
      user: payload.user,
    };
  }

  return {
    token: payload.token,
    user: {
      _id: payload._id,
      name: payload.name,
      email: payload.email,
      role: payload.role,
    },
  };
};

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(() => {
    try {
      const saved = localStorage.getItem(AUTH_SESSION_KEY);
      return saved ? toUserSession(JSON.parse(saved)) : null;
    } catch {
      return null;
    }
  });

  const [isAuthReady, setIsAuthReady] = useState(false);
  const [loading, setLoading] = useState(false);

  const token = session?.token;
  const user = session?.user;

  // ✅ Sync session
  useEffect(() => {
    const syncSession = async () => {
      if (!token) {
        setIsAuthReady(true);
        return;
      }

      try {
        const profile = await authRequest("/auth/profile", token);

        setSession((prev) => ({
          ...prev,
          user: profile,
        }));
      } catch {
        setSession(null);
      } finally {
        setIsAuthReady(true);
      }
    };

    syncSession();
  }, [token]);

  // ✅ Persist
  useEffect(() => {
    try {
      if (session) {
        localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
      } else {
        localStorage.removeItem(AUTH_SESSION_KEY);
      }
    } catch (err) {
      console.error("Unable to persist auth session", err);
    }
  }, [session]);

  // 🔐 Login
  const login = async ({ email, password }) => {
    setLoading(true);
    try {
      const res = await apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      const nextSession = toUserSession(res);
      setSession(nextSession);

      return { ok: true, user: nextSession?.user ?? null };
    } catch (error) {
      return { ok: false, message: error?.message || "Login failed" };
    } finally {
      setLoading(false);
    }
  };

  // 🆕 Register
  const register = async ({ name, email, password }) => {
    setLoading(true);
    try {
      const res = await apiRequest("/auth/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
      });

      const nextSession = toUserSession(res);
      setSession(nextSession);

      return { ok: true, user: nextSession?.user ?? null };
    } catch (error) {
      return { ok: false, message: error?.message || "Register failed" };
    } finally {
      setLoading(false);
    }
  };

  // 🚪 Logout
  const logout = async () => {
    try {
      // optional: call backend logout API
      // await authRequest("/auth/logout", token);
    } finally {
      setSession(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthReady,
        isAuthenticated: Boolean(token),
        isAdminAuthenticated: Boolean(token && user?.role === "admin"),
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
