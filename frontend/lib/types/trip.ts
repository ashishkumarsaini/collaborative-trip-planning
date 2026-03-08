import { ActivitySchemaType } from "../validators";
import { APIResponseType } from "./api";

export enum PERMISSIONS {
  viewer = 'viewer',
  editor = 'editor',
  creator = 'creator',
};

export type Permission = keyof typeof PERMISSIONS;

export interface Activity {
  _id: string,
  name: string,
  description: string,
  numberOfDays: number,
  startDate: string,
  endDate: string,
  location: {
    _id: string,
    city: string,
    description: string,
    state?: string,
    country?: string,
  },
  order: number,
};

type TripCommon = {
  _id: string,
  name: string,
  description?: string,
  activities: string[]
  numberOfDays: number,
  startDate: string,
  createdByUser: string,
  addedUsersEmail?: { _id: string; email: string; permission: string }[],
}

export type Trip = {
  activities: string[]
} & TripCommon;

export type TripWithActivity = {
  activities: Activity[]
} & TripCommon;

export interface TripsData {
  trips: Trip[],
  total: number
}

export type TripsResponseType = APIResponseType<TripsData>;

export type TripResponseType = APIResponseType<{
  trip: TripWithActivity
}>;

export type CreateTripResponseType = APIResponseType<{
  trip: Trip
}>;

export type CreateTripRequestBodyType = {
  name: string;
  description: string;
  startDate: string;
}

export type AddActivityRequestBodyType = {
  order: number,
  startDate: string
} & Omit<ActivitySchemaType, 'startDate'>

export type AddActivityResponseType = APIResponseType<{
  activity: Activity
}>;
