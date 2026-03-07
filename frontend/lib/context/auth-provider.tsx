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
    await loginUser({
      body: { email, password }
    }).then((response) => {
      toast(response.message);
      if (response.data?.user) {
        setUser(response.data.user);
      }
    }).catch((error) => {
      toast("Error in login");
      console.log(error);
    });
  };

  const handleLogoutUser = async () => {
    await logoutUser()
      .then((response) => {
        if (response.success) {
          toast("Logout Successfully!", {
            description: response.message,
          });
          if (response.data?.user) {
            setUser(response.data.user);
          }
        } else {
          toast("Unable to logout.", {
            description: response.message,
          });
        }
      }).catch((error) => {
        toast("Error in logout");
        console.log(error);
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