import { useCallback, useMemo } from "react";

import { AdminContext } from "./adminContextObject";
import { useAuth } from "../../auth/hooks/useAuth";

export const AdminProvider = ({ children }) => {
  const {
    user,
    isAuthReady,
    isAdminAuthenticated,
    login: authLogin,
    logout,
  } = useAuth();

  const login = useCallback(async (credentials) => {
    const result = await authLogin(credentials);

    if (!result?.ok) {
      return result;
    }

    if (result.user?.role !== "admin") {
      await logout();
      return { ok: false, message: "This account is not an admin account" };
    }

    return result;
  }, [authLogin, logout]);

  const value = useMemo(
    () => ({
      adminUser: isAdminAuthenticated ? user : null,
      isAdminAuthenticated,
      isAuthReady,
      login,
      logout,
      adminCredentialsHint: {
        email: "admin@mystore.com",
        password: "admin123",
      },
    }),
    [isAdminAuthenticated, isAuthReady, login, logout, user]
  );

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};
