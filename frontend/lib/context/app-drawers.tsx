'use client';
import { createContext, ReactNode, useContext, useState } from "react";
import { Trip } from "../types";

interface AddDrawersContextType {
  createTripDrawerOpened: boolean
  onCreateTripDrawerToggle: (shouldOpen: boolean) => void;
  updateTripDrawerOpened: { opened: boolean, trip?: Trip }
  onUpdateTripDrawerToggle: (shouldOpen: boolean, trip?: Trip) => void;
  addTripPermisionDrawerOpened: { opened: boolean, tripId: string };
  onAddTripPermisionDrawerToggle: (shouldOpen: boolean, tripId: string) => void
  removeTripPermissionDrawerOpened: { opened: boolean, tripId: string };
  onRemoveTripPermissionDrawerToggle: (shouldOpen: boolean, tripId: string) => void;
}


const AppDrawersContext = createContext<AddDrawersContextType>({
  createTripDrawerOpened: false,
  onCreateTripDrawerToggle: () => undefined,
  updateTripDrawerOpened: { opened: false, trip: undefined },
  onUpdateTripDrawerToggle: () => undefined,
  addTripPermisionDrawerOpened: { opened: false, tripId: '' },
  onAddTripPermisionDrawerToggle: () => undefined,
  removeTripPermissionDrawerOpened: { opened: false, tripId: '' },
  onRemoveTripPermissionDrawerToggle: () => undefined,
});


export const AppDrawerProvider = ({ children }: { children: ReactNode }) => {
  const [createTripDrawerOpened, setCreateTripDrawerOpened] = useState(false);
  const [updateTripDrawerOpened, setUpdateTripDrawerOpened] = useState<{ opened: boolean, trip?: Trip }>({ opened: false, trip: undefined });
  const [addTripPermisionDrawerOpened, setAddTripPermisionDrawerOpened] = useState<{ opened: boolean, tripId: string }>({ opened: false, tripId: '' });
  const [removeTripPermissionDrawerOpened, setRemoveTripPermissionDrawerOpened] = useState<{ opened: boolean, tripId: string }>({ opened: false, tripId: '' });

  const handleCreateTripDrawerToggle = (shouldOpen: boolean) => {
    setCreateTripDrawerOpened(shouldOpen);
  }

  const handleUpdateTripDrawerToggle = (shouldOpen: boolean, trip?: Trip) => {
    setUpdateTripDrawerOpened({ opened: shouldOpen, trip: trip })
  }

  const handleAddTripPermisionDrawerToggle = (shouldOpen: boolean, tripId: string) => {
    setAddTripPermisionDrawerOpened({ opened: shouldOpen, tripId: tripId })
  }

  const handleRemoveTripPermissionDrawerToggle = (shouldOpen: boolean, tripId: string) => {
    setRemoveTripPermissionDrawerOpened({ opened: shouldOpen, tripId })
  }

  const value: AddDrawersContextType = {
    createTripDrawerOpened,
    onCreateTripDrawerToggle: handleCreateTripDrawerToggle,
    updateTripDrawerOpened,
    onUpdateTripDrawerToggle: handleUpdateTripDrawerToggle,
    addTripPermisionDrawerOpened,
    onAddTripPermisionDrawerToggle: handleAddTripPermisionDrawerToggle,
    removeTripPermissionDrawerOpened,
    onRemoveTripPermissionDrawerToggle: handleRemoveTripPermissionDrawerToggle
  };

  return <AppDrawersContext.Provider value={value}>{children}</AppDrawersContext.Provider>;
}

export const useDrawers = () => useContext(AppDrawersContext);
