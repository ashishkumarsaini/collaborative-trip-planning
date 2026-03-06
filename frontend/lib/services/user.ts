import { api, buildRequestUrl } from "../api";
import { Trip } from "../types";

const USER_NAMESPACE = 'user';

export const getUserBookedTrips = () => {
  return api.get<Array<Trip>>(buildRequestUrl(`/${USER_NAMESPACE}/trips/booked`));
};

export const getUserCreatedTrips = () => {
  return api.get<Array<Trip>>(buildRequestUrl(`/${USER_NAMESPACE}/trips/created`));
};