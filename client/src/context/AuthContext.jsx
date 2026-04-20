import { useEffect, useState } from "react";

import { apiRequest, authRequest } from "../lib/api";
import { AuthContext } from "./authContextObject";

const AUTH_SESSION_KEY = "authSession";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedSession = localStorage.getItem(AUTH_SESSION_KEY);
      return savedSession ? JSON.parse(savedSession) : null;
    } catch {
      return null;
    }
  });
  const [isAuthReady, setIsAuthReady] = useState(false);
  const token = user?.token;

  useEffect(() => {
    const syncSession = async () => {
      if (!token) {
        setIsAuthReady(true);
        return;
      }

      try {
        const profile = await authRequest("/auth/profile", token);
        setUser((prev) => ({
          ...prev,
          ...profile,
        }));
      } catch {
        setUser(null);
      } finally {
        setIsAuthReady(true);
      }
    };

    syncSession();
  }, [token]);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(AUTH_SESSION_KEY);
      }
    } catch (err) {
      console.error("Unable to persist auth session", err);
    }
  }, [user]);

  const login = async ({ email, password }) => {
    try {
      const nextUser = await apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      setUser(nextUser);
      return { ok: true, user: nextUser };
    } catch (error) {
      return { ok: false, message: error.message };
    }
  };

  const register = async ({ name, email, password }) => {
    try {
      const nextUser = await apiRequest("/auth/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
      });

      setUser(nextUser);
      return { ok: true, user: nextUser };
    } catch (error) {
      return { ok: false, message: error.message };
    }
  };

  const logout = async () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
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
