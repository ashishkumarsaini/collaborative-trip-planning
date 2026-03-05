export interface Activity {
  _id: string,
  name: string,
  description: string,
  numberOfDays: number,
  startDate: string,
  location: {
    "_id": string,
    "city": string,
    "address": string,
    "state": string,
    "country": string,
  },
  order: number,
  endDate: string,
};

export interface Trip {
  _id: string,
  description: string,
  name: string,
  createdByUser: string,
  numberOfDays: number,
  startDate: string,
  endDate: string,
  activities: Activity[]
}