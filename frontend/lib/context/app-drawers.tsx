'use client';
import { createContext, ReactNode, useContext, useState } from "react";

interface AddDrawersContextType {
  createTripDrawerOpened: boolean
  onCreateTripDrawerToggle: (shouldOpen: boolean) => void;
}


const AppDrawersContext = createContext<AddDrawersContextType>({
  createTripDrawerOpened: false,
  onCreateTripDrawerToggle: () => null,
});


export const AppDrawerProvider = ({ children }: { children: ReactNode }) => {
  const [createTripDrawerOpened, setCreateTripDrawerOpened] = useState(false);

  const handleCreateTripDrawerToggle = (shouldOpen: boolean) => {
    setCreateTripDrawerOpened(shouldOpen);
  }

  const value: AddDrawersContextType = {
    createTripDrawerOpened,
    onCreateTripDrawerToggle: handleCreateTripDrawerToggle
  };

  return <AppDrawersContext.Provider value={value}>{children}</AppDrawersContext.Provider>;
}

export const useDrawers = () => useContext(AppDrawersContext);
