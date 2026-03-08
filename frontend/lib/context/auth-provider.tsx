"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "../types";
import { loginUser, logoutUser, getProfile } from "../services";
import { getAccessToken, setAccessToken, clearAccessToken } from "../storage";
import { toast } from "sonner";
import { ROLE } from "../types/user";

enum AUTH_STATUS {
  "loading",
  "authenticated",
  "unauthenticated"
}

interface AuthContextValue {
  user: User | null;
  status: AUTH_STATUS;
  onLoginUser: (email: string, password: string) => Promise<void>;
  onLogoutUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  status: AUTH_STATUS.loading,
  onLoginUser: async () => { },
  onLogoutUser: async () => { },
});

function apiUserToUser(apiUser: {
  _id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  role?: ROLE;
}): User | null {
  if (!apiUser?._id) return null;
  return {
    _id: apiUser._id,
    firstName: apiUser.firstName || "",
    lastName: apiUser.lastName || "",
    email: apiUser.email || "",
    role: (apiUser.role) || ROLE.user,
  };
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<AUTH_STATUS>(AUTH_STATUS.loading);

  useEffect(() => {
    const restoreSession = async () => {
      const token = getAccessToken();

      if (!token) {
        setStatus(AUTH_STATUS.unauthenticated);
        setUser(null);
        return;
      }

      const { success, data } = await getProfile();

      if (success && data?.user) {
        setUser(apiUserToUser(data.user));
        setStatus(AUTH_STATUS.authenticated);
      } else {
        clearAccessToken();
        setUser(null);
        setStatus(AUTH_STATUS.unauthenticated);
      };

    }

    restoreSession();
  }, []);

  const handleLoginUser = async (email: string, password: string) => {

    const { success, data, message } = await loginUser({ body: { email, password } });

    if (!success || !data?.user) {
      toast.error(message || "Login failed");
    } else {
      const { accessToken } = data;
      if (accessToken) {
        setAccessToken(accessToken);
      }

      setUser(apiUserToUser(data.user));
      setStatus(AUTH_STATUS.authenticated);

      toast.success(message || "Logged in successfully!");
      router.replace("/");
    }
  };

  const handleLogoutUser = async () => {

    const { message } = await logoutUser();

    toast.message(message);
    clearAccessToken();
    setUser(null);
    setStatus(AUTH_STATUS.unauthenticated);
    router.replace("/login");
  };

  const authValue: AuthContextValue = {
    user,
    status,
    onLoginUser: handleLoginUser,
    onLogoutUser: handleLogoutUser,
  };

  return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
