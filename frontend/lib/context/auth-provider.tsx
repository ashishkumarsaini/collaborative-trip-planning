"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import { User } from "../types";

interface AuthContextValue {
  user: User | null, onUpdateUser: (user: User | null) => void
}

const AuthContext = createContext<AuthContextValue>({ user: null, onUpdateUser: () => null });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const authValue: AuthContextValue = {
    user,
    onUpdateUser: (user) => setUser(user)
  }

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);