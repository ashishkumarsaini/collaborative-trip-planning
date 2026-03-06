"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import { User } from "../types";
import { loginUser, logoutUser } from "../services";
import { toast } from "sonner";

interface AuthContextValue {
  user: User | null,
  onLoginUser: (email: string, password: string) => Promise<void> | null,
  onLogoutUser: () => Promise<void> | null;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  onLoginUser: () => null,
  onLogoutUser: () => null
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const handleLoginUser = async (email: string, password: string) => {
    const toastPromise = loginUser({
      body: { email, password }
    });

    toast.promise(
      toastPromise,
      {
        loading: "Loading...",
        error: (data) => data.message || 'Unable to register',
      }
    );

    toastPromise.then(({ data }) => {
      const { user } = data;
      setUser(user);
    });
  };

  const handleLogoutUser = async () => {
    const toastPromise = logoutUser();

    toast.promise(
      toastPromise,
      {
        loading: "Loading...",
        error: (data) => data.message || 'Unable to register',
      }
    );

    toastPromise.then(({ data }) => {
      const { user } = data;
      setUser(user);
    });
  }

  const authValue: AuthContextValue = {
    user,
    onLoginUser: handleLoginUser,
    onLogoutUser: handleLogoutUser
  }

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);