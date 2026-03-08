
import { api, buildRequestUrl } from '../api';
import { AddActivityRequestBodyType, AddActivityResponseType } from '../types';

const ACTIVITY_NAMESPACE = 'activity';

export const addTripActivity = (tripId: string, actvityData: AddActivityRequestBodyType) => {
  return api.post<AddActivityResponseType>(buildRequestUrl(`/${ACTIVITY_NAMESPACE}/create/${tripId}`), { body: actvityData });
}

export const removeTripActivity = (tripId: string, activityId: string) => {
  return api.delete<AddActivityResponseType>(buildRequestUrl(`/${ACTIVITY_NAMESPACE}/delete/${tripId}/${activityId}`));
}