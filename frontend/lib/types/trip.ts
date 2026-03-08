import { ActivitySchemaType } from "../validators";
import { APIResponseType } from "./api";

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

export interface Trip {
  _id: string,
  name: string,
  description?: string,
  activities: string[]
  numberOfDays: number,
  startDate: string,
  createdByUser: string,
}

export interface TripWithActivity {
  _id: string,
  name: string,
  description?: string,
  activities: Activity[]
  numberOfDays: number,
  startDate: string,
  createdByUser: string,
}

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
