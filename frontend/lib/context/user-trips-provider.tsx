"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import { Trip } from "../types";
import { getUserBookedTrips, getUserCreatedTrips } from "../services/user";

interface UserTripsContextValue {
  tripsCreated: Trip[];
  tripBooked: Trip[],
  onLoadBookedTrips: () => Promise<void> | null,
  onLoadCreatedTrips: () => Promise<void> | null
}

const UserTripsContext = createContext<UserTripsContextValue>({
  tripsCreated: [],
  tripBooked: [],
  onLoadBookedTrips: () => null,
  onLoadCreatedTrips: () => null
});

export const UserTripsProvider = ({ children }: { children: ReactNode }) => {
  const [tripsCreated, setTripsCreated] = useState<Trip[]>([]);
  const [tripBooked, setTripBooked] = useState<Trip[]>([]);

  const handleLoadBookedTrips = async () => {
    const bookedTrips = await getUserBookedTrips();

    setTripBooked(bookedTrips || []);
  }
  const handleLoadCreatedTrips = async () => {
    const createdTrips = await getUserCreatedTrips();

    setTripsCreated(createdTrips || []);
  }


  const tripsContextValue: UserTripsContextValue = {
    tripsCreated,
    tripBooked,
    onLoadBookedTrips: handleLoadBookedTrips,
    onLoadCreatedTrips: handleLoadCreatedTrips
  }

  return (
    <UserTripsContext.Provider value={tripsContextValue}>
      {children}
    </UserTripsContext.Provider>
  );
}

export const useUserTrips = () => useContext(UserTripsContext);