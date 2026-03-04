import { api, buildRequestUrl } from "../api";
import type { LoginUserRequestType, LoginUserResponseType, RegisterUserRequestType, RegisterUserResponseType } from "../types";

const AUTH_NAMESPACE = 'auth';

export const registerUser = (requestOptions: RegisterUserRequestType) => {
  return api.post<RegisterUserResponseType>(buildRequestUrl(`/${AUTH_NAMESPACE}/register`), requestOptions);
};

export const loginUser = (requestOptions: LoginUserRequestType) => {
  return api.post<LoginUserResponseType>(buildRequestUrl(`/${AUTH_NAMESPACE}/login`), requestOptions);
};