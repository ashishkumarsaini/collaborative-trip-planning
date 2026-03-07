"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { TripsData } from "../types";
import { getUserBookedTrips, getUserCreatedTrips, getRecommendations } from "../services/trip";

interface TripsState {
  isLoading: boolean,
  data: TripsData | null
}

interface UserTripsContextValue {
  tripsCreated: TripsState;
  tripBooked: TripsState,
  recommendations: TripsState,
  onLoadBookedTrips: () => Promise<void> | null,
  onLoadCreatedTrips: () => Promise<void> | null
  onLoadRecommendations: () => Promise<void> | null
}

const UserTripsContext = createContext<UserTripsContextValue>({
  tripsCreated: { isLoading: false, data: null },
  tripBooked: { isLoading: false, data: null },
  recommendations: { isLoading: false, data: null },
  onLoadBookedTrips: () => null,
  onLoadCreatedTrips: () => null,
  onLoadRecommendations: () => null
});

export const UserTripsProvider = ({ children }: { children: ReactNode }) => {
  const [tripsCreated, setTripsCreated] = useState<TripsState>({ isLoading: false, data: null });
  const [tripBooked, setTripBooked] = useState<TripsState>({ isLoading: false, data: null });
  const [recommendations, setRecommendations] = useState<TripsState>({ isLoading: false, data: null });

  const handleLoadBookedTrips = async () => {
    setTripBooked({ isLoading: true, data: null });
    const { data } = await getUserBookedTrips();

    setTripBooked({ isLoading: false, data });
  }

  const handleLoadCreatedTrips = async () => {
    setTripsCreated({ isLoading: true, data: null });
    const { data } = await getUserCreatedTrips();
    setTripsCreated({ isLoading: false, data: data });
  }

  const handleLoadRecommendations = async () => {
    setRecommendations({ isLoading: true, data: null });
    const { data } = await getRecommendations();

    setRecommendations({ isLoading: false, data: data });
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    handleLoadRecommendations();
  }, [])


  const tripsContextValue: UserTripsContextValue = {
    tripsCreated,
    tripBooked,
    recommendations,
    onLoadBookedTrips: handleLoadBookedTrips,
    onLoadCreatedTrips: handleLoadCreatedTrips,
    onLoadRecommendations: handleLoadRecommendations
  }

  return (
    <UserTripsContext.Provider value={tripsContextValue}>
      {children}
    </UserTripsContext.Provider>
  );
}

export const useUserTrips = () => useContext(UserTripsContext);