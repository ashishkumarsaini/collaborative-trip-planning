import { api, buildRequestUrl } from "../api";
import { TripsResponseType, TripResponseType } from "../types";

const TRIP_NAMESPACE = 'trip';

export const getUserBookedTrips = () => {
  return api.get<TripsResponseType>(buildRequestUrl(`/${TRIP_NAMESPACE}/booked/all`));
};

export const getUserCreatedTrips = () => {
  return api.get<TripsResponseType>(buildRequestUrl(`/${TRIP_NAMESPACE}/created/all`));
};

export const getRecommendations = () => {
  return api.get<TripsResponseType>(buildRequestUrl(`/${TRIP_NAMESPACE}/recommendation`));
}

export const getTrip = (tripId: string) => {
  return api.get<TripResponseType>(buildRequestUrl(`/${TRIP_NAMESPACE}/${tripId}`));
}
