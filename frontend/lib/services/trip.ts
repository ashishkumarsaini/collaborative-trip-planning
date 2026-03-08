import { api, buildRequestUrl } from "../api";
import { TripsResponseType, TripResponseType, CreateTripResponseType, CreateTripRequestBodyType } from "../types";

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

export const getAllTrips = () => {
  return api.get<TripsResponseType>(buildRequestUrl(`/${TRIP_NAMESPACE}/recommendation`));
}

export const getTrip = (tripId: string) => {
  return api.get<TripResponseType>(buildRequestUrl(`/${TRIP_NAMESPACE}/${tripId}`));
}

export const createTrip = (tripData: CreateTripRequestBodyType) => {
  return api.post<CreateTripResponseType>(buildRequestUrl(`/${TRIP_NAMESPACE}/create`), { body: tripData });
}

export const updateTrip = (tripId: string, tripData: CreateTripRequestBodyType) => {
  return api.put<CreateTripResponseType>(buildRequestUrl(`/${TRIP_NAMESPACE}/update/${tripId}`), { body: tripData });
}

export const deleteTrip = (tripId: string) => {
  return api.delete<CreateTripResponseType>(buildRequestUrl(`/${TRIP_NAMESPACE}/delete/${tripId}`));
}
