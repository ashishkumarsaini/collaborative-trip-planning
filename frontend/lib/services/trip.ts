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

export const addTripPermission = (tripId: string, body: { email: string; permission: string }) => {
  return api.put<CreateTripResponseType>(buildRequestUrl(`/${TRIP_NAMESPACE}/permission/add/${tripId}`), { body });
}

export const removeTripPermission = (tripId: string, permissionId: string) => {
  return api.put<CreateTripResponseType>(buildRequestUrl(`/${TRIP_NAMESPACE}/permission/remove/${tripId}/${permissionId}`));
}

export const getAllPermissionTrips = () => {
  return api.get<TripsResponseType>(buildRequestUrl(`/${TRIP_NAMESPACE}/permission/all`));
}

export const acceptTripRequest = (tripId: string, userId: string) => {
  return api.put<CreateTripResponseType>(buildRequestUrl(`/${TRIP_NAMESPACE}/accept-request/${tripId}/${userId}`));
}

export const requestTrip = (tripId: string) => {
  return api.put<CreateTripResponseType>(buildRequestUrl(`/${TRIP_NAMESPACE}/request/${tripId}`));
}
