'use client';
import { createContext, ReactNode, useContext, useState } from "react";
import { Trip } from "../types";

interface AddDrawersContextType {
  createTripDrawerOpened: boolean
  onCreateTripDrawerToggle: (shouldOpen: boolean) => void;
  updateTripDrawerOpened: { opened: boolean, trip: Trip | null }
  onUpdateTripDrawerToggle: (shouldOpen: boolean, trip?: null) => void;
}


const AppDrawersContext = createContext<AddDrawersContextType>({
  createTripDrawerOpened: false,
  onCreateTripDrawerToggle: () => null,
  updateTripDrawerOpened: { opened: false, trip: null },
  onUpdateTripDrawerToggle: () => null,
});


export const AppDrawerProvider = ({ children }: { children: ReactNode }) => {
  const [createTripDrawerOpened, setCreateTripDrawerOpened] = useState(false);
  const [updateTripDrawerOpened, setUpdateTripDrawerOpened] = useState<{ opened: boolean, trip: Trip | null }>({ opened: false, trip: null });

  const handleCreateTripDrawerToggle = (shouldOpen: boolean) => {
    setCreateTripDrawerOpened(shouldOpen);
  }

  const handleUpdateTripDrawerToggle = (shouldOpen: boolean, trip: Trip | null = null) => {
    setUpdateTripDrawerOpened({ opened: shouldOpen, trip: trip })
  }

  const value: AddDrawersContextType = {
    createTripDrawerOpened,
    onCreateTripDrawerToggle: handleCreateTripDrawerToggle,
    updateTripDrawerOpened,
    onUpdateTripDrawerToggle: handleUpdateTripDrawerToggle,
  };

  return <AppDrawersContext.Provider value={value}>{children}</AppDrawersContext.Provider>;
}

export const useDrawers = () => useContext(AppDrawersContext);
